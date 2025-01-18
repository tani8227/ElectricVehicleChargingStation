import express from 'express'
import apiRouter from './api/index.js';
import * as  evBunkSlotController from '../controller/EVBunk/EVBunkSlot/EVBunkSlot.js'
import passport from '../config/passport-jwt.js'
const router = express.Router();

router.post('/process-payment', passport.authenticate('jwt', {session:false}), evBunkSlotController.bookEVBunkSlot)
router.use('/api', apiRouter);





export default router