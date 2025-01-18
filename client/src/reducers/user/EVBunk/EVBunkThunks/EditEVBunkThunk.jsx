import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editEVBunk = createAsyncThunk(
    'auth/EditEvBunk',
    async (credentials, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found. Please log in again.');
            }

            const response = await axios.patch(
                `http://localhost:7000/api/v1/admin/editEVBunk`,
                credentials,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
           
            if (error.response) {
                return rejectWithValue(error.response.data?.message || 'Failed to edit EV bunk.');
            }
            return rejectWithValue(error.message || 'An unexpected error occurred.');
        }
    }
);
