import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue }) => {
        try {
            
            const token = localStorage.getItem('token');

            
            if (!token) {
                console.log("API Error:",token);
                return rejectWithValue("No token found, user not authenticated");
            }

            
            const response = await axios.get(`http://localhost:7000/api/v1/getuser`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            
            return response.data; 
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(
                error.response?.data || "Failed to fetch user data"
            );
        }
    }
);
