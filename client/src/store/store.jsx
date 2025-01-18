import { configureStore,  } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/user/Auth/authSlice'
import { EVBunkReducer } from '../reducers/user/EVBunk/evBunkSlice';
import { feedbackReducer } from '../reducers/user/feedback/feedbackSlice';

const store= configureStore(
    {
        reducer:
        {
            Auth:authReducer,
            EVBunk:EVBunkReducer,
            Feedback:feedbackReducer,
        }
    })



    export default store;