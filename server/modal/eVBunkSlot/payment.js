import mongoose from "mongoose";
import User from '../user.js'
import EVBunk from "../evBunkLocation/evBunkLocation.js";
import EVBunkSlot from "./evBunkSlot.js";

const paymentSchema= new mongoose.Schema(
    {
        bunkId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'EVBunk',
            required : true,
        },
        slotId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'EVBunkSlot',
            required : true,
        },
        user_ref:
        {
             type : mongoose.Schema.Types.ObjectId,
             ref:'User'
        },
        paymentIntendId:
        {
            type :String, 
            required: true,
        },
        amount:
        {
            type:Number,
            required: true,
        },
        paymentMethodType:
        {
            type:String,
            required: true,
        },
        status:
        {
            type:String,
            required: true,
        },
    }, {timestamps:true})

    const Payment= mongoose.model('Payment', paymentSchema);

    export default Payment;