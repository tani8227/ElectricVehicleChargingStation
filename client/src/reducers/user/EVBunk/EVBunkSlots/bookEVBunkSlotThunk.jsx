import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const bookEVBunkSlot = createAsyncThunk(
    'auth/bookEVBunkSlot',
            
    async (credentials, {rejectWithValue}) => {

        try {
            console.log(credentials);
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue({ status: 401, message: "Token not found. Please log in again." });
            }

             console.log(credentials);
                 
            const response = await axios.post(`http://localhost:7000/process-payment`, credentials,{
               
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);

            return response.data;

        } catch (error) {
            console.error('API Error:', error);

            if (!error.response) {
                // Network error or other non-HTTP error
                return rejectWithValue({
                    status: 500,
                    message: "Network error or server is unreachable. Please try again later.",
                });
            }

            // Handle specific error statuses
            if (error.response?.status === 401 && error.response?.data.message === "User not found") {
                return rejectWithValue({ status: 401, message: "Invalid user. Please check your credentials." });
            }

            // Default error handling
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data.message || "Something went wrong.",
            });
        }

    }
)