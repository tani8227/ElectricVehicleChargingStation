import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFeedback = createAsyncThunk(
  '/getAllFeedback', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/user/feedback/getFeedback');
      
      // Return the response data if the request is successful
      return response.data;
      
    } catch (error) {
      // Use rejectWithValue to provide additional error information
      return rejectWithValue({
        status: error.response?.status || 500,  // Ensure a status code is returned
        message: error.response?.data?.message || 'Something went wrong',
        details: error.message,  // Optionally add more detailed error info
      });
    }
  }
);
