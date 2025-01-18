import FeedBack from "../../../modal/feedback/feedback.js";
import User from "../../../modal/user.js";
import mongoose from "mongoose";  // Use mongoose to handle ObjectId conversion

export const createFeedback = async (req, res) => {
    try {
        const { userId, bunkId, slotId, paymentId } = req.body;

        // Convert paymentId to ObjectId using 'new' keyword
        const paymentObjectId = new mongoose.Types.ObjectId(paymentId); // Ensure to use 'new'

        if (req.user.id === userId) {
            const feedback = await FeedBack.create(req.body);
            if (feedback) {
                // Update the user's slotbookrecord where the paymentId matches
                const userFeedbackUpdated = await User.findOneAndUpdate(
                    { 'slotbookrecord.paymentId': paymentObjectId },  // Use ObjectId for comparison
                    { $set: { 'slotbookrecord.$.feedbackGiven': true } },
                    { new: true }
                );

                if (userFeedbackUpdated) {
                    return res.status(200).json({
                        message: "Feedback given !!!",
                    });
                } else {
                    return res.status(404).json({
                        message: "No matching record found with the provided paymentId.",
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Invalid user!!!",
                });
            }
        } else {
            return res.status(401).json({
                message: "Feedback not created!!!",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error occurred while processing feedback",
            error: error.message,
        });
    }
};

export const getAllFeedback = async (req, res) => {
    try {
         
        const feedbacks= await FeedBack.find({});
        console.log("kkkkkk")
        if(feedbacks)
            {
                return res.status(200).json({
                    data:feedbacks,
                    message: "All feedback",
                  
                });
            }
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error occurred while processing feedback",
            error: error.message,
        });
    }
};
