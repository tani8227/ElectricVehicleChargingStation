import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import bgImage from '../assets/main.jpg';
import userhome1 from '../assets/userhome1.webp';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../reducers/user/Auth/authThunks/getUserThunk';
import FeedbackList from '../component/user/feedback/AllFeedbacks';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [loading, setLoading] = useState(true); //  loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching auth user from Redux state
  const { authUser } = useSelector((state) => state.Auth);

  useEffect(() => {
    async function handleUser() {
      try {
       
        const localuser = await dispatch(getUser()).unwrap();
        if (localuser.user && localuser.user.userType === 'user') {
          navigate('/user/dashboard'); // Imperative navigation
        } else {
          navigate('/admin/dashboard'); // Imperative navigation
        }

      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoading(false); // Set loading to false after the logic runs
      }
    }

    if (authUser) {
      // If authUser exists, navigate immediately
      if (authUser.userType === 'user') {
        navigate('/user/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
      setLoading(false); // Directly set loading to false if already authenticated
    } else {
      handleUser(); // Else, fetch user data and navigate accordingly
    }
  }, [authUser, dispatch, navigate]); // Re-run if authUser changes

  // Show a loading screen or placeholder while authentication is processing
  

  // Render content if authUser is null
  if (!authUser) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
        >
          <Grid
            item
            size={12}
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: { xs: '45vh', sm: '70vh' },
              width: '100%',
            }}
          >
            <Item
              square
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#11111142',
                width: { xs: '60%', sm: '40%', md: '30%' },
              }}
            >
              <Typography sx={{ color: '#E8F5E9', fontSize: { xs: '20px', md: '30px', lg: '45px' } }}>
                Smart Solutions for EV Driver
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <Button sx={{ color: '#E8F5E9', backgroundColor: '#42424287' }} href='admin/signin'>
                  Admin Login
                </Button>
                <Button sx={{ color: '#E8F5E9', backgroundColor: '#42424287' }} href='user/signin'>
                  User Login
                </Button>
              </Box>
            </Item>
          </Grid>
          <Grid container sx={{ height: { xs: '100vh', sm: '70vh' }, width: '100%' }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${userhome1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#111111e3',
                padding: { xs: '1px', sm: '32px' },
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: '30px', md: '45px' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: { xs: 'center' },
                }}
              >
                Helping Cities, AutoMakers And Commercial Business Win Huge Advantage of Clean Energy
              </Typography>
            </Grid>
          </Grid>
          <FeedbackList/>
        </Grid>
      </Box>
    );
  }
}
