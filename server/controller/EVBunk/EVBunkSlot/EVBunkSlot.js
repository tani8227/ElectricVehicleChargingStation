import EVBunkSlot from "../../../modal/eVBunkSlot/evBunkSlot.js";
import User from "../../../modal/user.js";
import Payment from '../../../modal/eVBunkSlot/payment.js';
import mongoose from "mongoose";
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config();



const stripe= new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

export const createEVBunkSlot = async (req, res) => {
  try {
    // Extract availableSlots from the request body
    const { availableSlots = [] } = req.body;

    // If availableSlots are provided, use them as the default for this EVBunk.
    // Otherwise, defaultVacancy remains empty, and we just store the availableSlots.
    const defaultVacancy = availableSlots.map((slot) => ({
      time: slot.time,
      vacancy: slot.vacancy, // Setting the vacancy from the availableSlots provided
    }));

    // Create the new EVBunk with availableSlots and defaultSlots
    const newEVBunk = await EVBunkSlot.create({
      ...req.body,
      defaultSlots: defaultVacancy,  // Set the defaultSlots to availableSlots
      availableSlots: availableSlots,  // Use provided availableSlots initially
    });
    // console.log(newEVBunk)
    return res.status(200).json({
      message: "EV Bunk created successfully!",
      data: newEVBunk,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};



export const getEVBunkSlot = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("jjjjj", id)
    const evbunkslot = await EVBunkSlot.findOne({ evbunk_ref: id });
    if (evbunkslot) {
      return res.status(200).json(
        {
          data: evbunkslot,
          message: "got the evbunkslot"
        })
    } else {
      return res.status(201).json(
        {
          data: [],
          message: "not found the evbunkslot"
        })
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}


export const bookEVBunkSlot = async (req, res) => {
  try {

    
    const { bunkId, slotId, paymentMethodId, amount } = req.body;
    // console.log(req.body);  // Make sure to log the incoming request

    // Check if the amount is valid
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in paise (100 paise = 1 INR)
      currency: "inr", // Use INR currency
      payment_method: paymentMethodId, // The ID of the payment method (e.g., card)
      confirm: true, // Confirm payment immediately
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",  // Disables redirect-based payment methods
      }
    });
     
    
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      console.log(bunkId, slotId);
      // Payment was successful, proceed with booking the slot

      const payment= await Payment.create(
        {
          bunkId:bunkId,
          slotId:slotId,
          user_ref:req.user.id,
          paymentIntendId:paymentIntent.id,
          amount:paymentIntent.amount,
          paymentMethodType:paymentIntent.payment_method_types[0],
          status:paymentIntent.status,
        })

      if(payment)
        {

         
          const evbunk = await EVBunkSlot.findByIdAndUpdate(
        bunkId,
        {
          $inc: {
            "availableSlots.$[slot].vacancy": -1, // Decrement the vacancy of the matched slot
          },
        },
        {
          new: true, // Return the updated document
          arrayFilters: [{ "slot._id": slotId }], // Match the slot with the given slotId
        }
      );
      
      if (evbunk) {

      
        const slot = evbunk.availableSlots.find((s) => s._id.toString() === slotId);

        if (!slot) {
          return res.status(404).json({
            message: "EV Bunk not found or slot not available!",
          });
        }
        
        // Extract the time from the slot
        const slotTime = slot.time;
        
        
        const user = await User.findById(req.user.id);
        
        
        if (user) {
          user.slotbook.push(slotId);
          user.slotbookrecord.push({
            slotId,
            bunkId,
            paymentId:payment._id,
            paymentIntendId:payment.paymentIntendId,
            amount:payment.amount,
            time: slotTime,
            feedbackGiven: false, 
            bookedAt: new Date(),
            bunk:evbunk.evbunkname
            
          })
            
          await user.save();
           
          return res.status(200).json({
            data: evbunk,
            message: "Slot booked successfully!",
          });
        }else
        {
          return res.status(401).json({
            message: "user not found",
          });
        }
      }
      
      } else {
       
        return res.status(404).json({
          message: "EV Bunk not found or slot not available!",
        });
      }

    } else {
      return res.status(400).json({
        message: "Payment failed or paymentIntent creation failed!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Error in booking slot!",
    });
  }
};



// Backend Controller (already provided by you)
export const getEVBunkWithSlot = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Find the EVBunkSlot based on the reference id
    const bunkwithslot = await EVBunkSlot.findOne({
      evbunk_ref: new mongoose.Types.ObjectId(id),
    }).populate('evbunk_ref'); // Populate if you want related data from EVBunk

    if (!bunkwithslot) {
      console.log("No slot found for the given EV Bunk ID.");
      return res.status(404).json({ error: "No slot found." });
    }

    // console.log("Bunk with Slot Found:", bunkwithslot);

    return res.status(200).json({
      message: "Got the EV Bunk with Slot",
      data: bunkwithslot,
    });

  } catch (error) {
    console.error("Error fetching slot:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
