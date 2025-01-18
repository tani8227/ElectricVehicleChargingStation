import {  createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedbackThunks/createFeedbackThunk";
import { getAllFeedback } from "./feedbackThunks/getAllfeedbackThunk";


const initialState=
{
    feedback:null,
    loading:false,
    error:null,
    Allfeedback:null

}

const feedbackSlice= createSlice(
    {
        name:'feedback',
        initialState,

        extraReducers:(builder)=>
            {
                
                builder
                        .addCase(createFeedback.pending, (state)=>
                            {
                                state.loading = true;
                                state.error = null;
                            }) 
                        .addCase(createFeedback.fulfilled, (state, action)=>
                            {
                                state.loading = false;
                                state.feedback = action.payload;
                            }) 
                        .addCase(createFeedback.rejected, (state, action)=>
                            {
                                state.loading = false;
                                state.error = action.payload;
                            }) 
                builder
                        .addCase(getAllFeedback.pending, (state)=>
                            {
                                state.loading = true;
                                state.error = null;
                            }) 
                        .addCase(getAllFeedback.fulfilled, (state, action)=>
                            {
                                state.loading = false;
                                state.feedback = action.payload;
                            }) 
                        .addCase(getAllFeedback.rejected, (state, action)=>
                            {
                                state.loading = false;
                                state.error = action.payload;
                            }) 
            }
    })

    export const feedbackReducer = feedbackSlice.reducer;
    export const Actions = feedbackSlice.actions;