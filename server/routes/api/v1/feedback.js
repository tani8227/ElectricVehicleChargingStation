import express from 'express'
const feedbackRouter= express.Router();
import passport from '../../../config/passport-jwt.js'
import * as feedbackController from '../../../controller/EVBunk/user-feedbacks/userfeedback.js'



feedbackRouter.post('/create', passport.authenticate('jwt',{session: false}), feedbackController.createFeedback);
feedbackRouter.get('/getFeedback', feedbackController.getAllFeedback);



export default feedbackRouter;