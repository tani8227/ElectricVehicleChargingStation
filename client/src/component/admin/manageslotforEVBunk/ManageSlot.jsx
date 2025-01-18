import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk';
import { getEVBunkList } from '../../../reducers/user/EVBunk/EVBunkThunks/getEVBunkListThunk';
import { deleteEVBunk } from '../../../reducers/user/EVBunk/EVBunkThunks/deleteEVBunkThunk';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddSlot() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleUser() {
            try {
                const user = await dispatch(getUser()).unwrap();
                const EVBunkList = await dispatch(getEVBunkList()).unwrap();
                console.log('Login successful:', user);
                console.log('Login successful:', EVBunkList);
            } catch (error) {
                console.error('Login failed:', error);

            }
        }
        handleUser();
    }, [dispatch]);




    const { EVS } = useSelector((state) => state.EVBunk)


    console.log(EVS);




    return (
        <Box
            sx={{
                flexGrow: 0,
                height: {

                    xs: '50vh',
                    sm: '70vh',
                },
                width: '100%'

            }}
        >
            <Grid
                container
                spacing={0}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#e0ebeb54',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        backgroundColor: '#4DB6AC',
                        alignItems: "center",
                        flexDirection: "column",
                        padding: 3,
                        gap: 2,
                    }}
                >
                    <Item
                        elevation={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '100%',
                            height: 'fit-content',
                            gap: 2,
                            backgroundColor: "transparent"
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'White' }}>
                        MANAGE SLOT FOR EV BUNK
                        </Typography>


                    </Item>

                    <Item
                        elevation={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '100%',
                            height: 'fit-content',
                            padding: 1,
                            gap: 1,
                            backgroundColor: "#212121"
                        }}
                    >
                        <Typography variant="h6" sx={{ textAlign: "left", color: 'White', width: "40%", }}>
                            BUNK NAME
                        </Typography>
                        <Typography variant="h6" sx={{ textAlign: "left", color: 'White', width: "40%", }}>
                            BUNK ADDRESS
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                gap: 1,
                                width: "20%",
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: "right", color: 'White', }}>
                                CREATE
                            </Typography>
                            <Typography variant="h6" sx={{ textAlign: "right", color: 'White', }}>
                                VIEW
                            </Typography>
                        </Box>

                    </Item>
                    <Item
                        elevation={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: "flex-start",
                            width: '100%',
                            gap: 2,
                            padding: 1,

                        }}
                    >
                        {EVS && EVS.map((item, key) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 1,
                                    width: "100%"
                                }}
                                key={key}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'black',
                                        textAlign: "left",
                                        width: "40%",

                                    }}
                                >
                                    {`${key + 1}. ${item.evbunkname}`}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'black',
                                        textAlign: "left",
                                        width: "40%",

                                    }}
                                >
                                    {`${item.address}`}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        gap: 1,
                                        width: "15%",
                                    }}
                                    key={key}>
                                  <Link to={`/admin/dashboard/add-slot/${item._id}`}>
                                        <AddCircleRoundedIcon sx={{ color: "blue" }} onClick={() => handledelete(item._id)} />
                                    </Link>
                                    <Link to={`/admin/dashboard/view-slot/${item._id}`}>
                                        <PreviewOutlinedIcon sx={{ color: "black" }} />
                                    </Link>
                                </Box>
                               

                            </Box>

                        ))}



                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
