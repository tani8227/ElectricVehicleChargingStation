import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const updateBunk= createAsyncThunk(

    'auth/UpdateBunk',

    async(creadentials, {rejectWithValue})=>
        {
            try {
                
                const token = localStorage.getItem('token');


                if(!token)
                    {
                        return;
                }
                
                const response = await axios.post('http://localhost:7000/api/v1/admin/updateBunk', creadentials);


                console.log(response.data);
                
                return response.data;
                
            } catch (error) {
                
                return rejectWithValue("not updated");
            }
                
            }
        )