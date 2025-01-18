import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const  createFeedback=createAsyncThunk(
    '/user/create-feedback',
    async(credentials, {rejectWithValue})=>
        {
            try {
                   const token = localStorage.getItem('token');
                   if(!token)
                    {
                        return  rejectWithValue({status: 401, message: "Token not found. Please log in again."});
                    }
                    console.log(credentials)
                    const response= await axios.post(`http://localhost:7000/api/v1/user/feedback/create`, credentials, 
                     {
                        headers:
                        {
                            Authorization:`Bearer ${token}`
                        }
                    })
                    
                    console.log(response.data);
                    return response.data

            } catch (error) {
                
                 if(error.response.status===401&&error.response.message==='User not found')
                    {
                        return rejectWithValue({ status: 401, message: "invalid user" });
                    }
                    return rejectWithValue({
                        status: error.response?.status,
                        message: error.response?.data || 'Something went wrong',
                    });
             
            }
        }
)