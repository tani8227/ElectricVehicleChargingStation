import mongoose, { Types } from 'mongoose';
import EVBunk from '../evBunkLocation/evBunkLocation.js';
import User from '../user.js';

const feedbackSchema= new mongoose.Schema(
    {
        bunkId:
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'EVBunk',
           required : true,
        },
        userId:
        {
            
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required : true,
        },
        name:
        {
            type:String ,
            required:true,
        },
        message:
        {
            type:String,
            required: true,
        },
        rating:
        {
            type :Number,
            min:1,
            max:5,
            required:true,
        }

    },{ timestamps: true });

    const FeedBack= mongoose.model('Feedback', feedbackSchema);
    export default FeedBack;