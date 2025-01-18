import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk';
import { getEVBunk } from '../../../reducers/user/EVBunk/EVBunkThunks/getOneEVBunkThunk';
import { editEVBunk } from '../../../reducers/user/EVBunk/EVBunkThunks/EditEVBunkThunk';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function EditBunk() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { EVOneBunk } = useSelector((state) => state.EVBunk);

    const [bunk, setBunk] = useState({
        evbunkname: '',
        operatingHours: '',
        mobile: '',
        city: '',
        state: '',
        address: '',
    });

    const params = useParams();
    console.log(params);

    useEffect(() => {
        async function handleUser() {
            try {
                const user = await dispatch(getUser()).unwrap();
                const evbunk = await dispatch(getEVBunk(params.id)).unwrap();
                console.log('Login successful:', user);
                console.log('L/*987:', evbunk.data);
                setBunk(evbunk.data)
            } catch (error) {
                console.error('Login failed:', error);

            }
        }
        handleUser();
    }, [dispatch]);


    async function handleSubmit(e) {
        e.preventDefault();


        try {

            const updatedBunk = await dispatch(editEVBunk(bunk)).unwrap();
            console.log(updatedBunk)


        } catch (error) {

            console.error('Error creating EV Bunk:', error);



            alert(error.message);
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setBunk((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    if (!EVOneBunk && !bunk) {
        return <h1>Loading...</h1>
    }


    return (

        <Box
            sx={{
                flexGrow: 0,
                height: {
                    xs: '50vh',
                    sm: '70vh',
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"aliceblue"
            }}
        >
            <Grid
                container
                spacing={0}
                sx={{
                    width: '50vw',
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
                        backgroundColor: '#81C784',
                        padding: 2,
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
                        }}
                    >
                        <Typography variant="h4" component="h2" sx={{ color: 'grey' }}>
                            EDIT EV BUNK
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ margin: 0, padding: 0, width: '100%' }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={6}>
                                        <TextField
                                            type="text"
                                            name="evbunkname"
                                            label="Enter Bunk Name"
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.evbunkname}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="text"
                                            name="operatingHours"
                                            label="Operating Hours"
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.operatingHours}
                                            fullWidth
                                            required
                                        />
                                    </Grid>


                                    <Grid item xs={4}>
                                        <TextField
                                            type="text"
                                            name="mobile"
                                            label="Phone No."
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.mobile}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            type="text"
                                            name="city"
                                            label="City"
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.city}
                                            fullWidth
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            type="text"
                                            name="state"
                                            label="State"
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.state}
                                            fullWidth
                                            required
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            type="text"
                                            name="address"
                                            label="Address"
                                            onChange={handleChange}
                                            variant="outlined"
                                            value={bunk && bunk.address}
                                            fullWidth
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 2, backgroundColor:"#2E7D32" }}
                                        >
                                            SAVE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>


                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
