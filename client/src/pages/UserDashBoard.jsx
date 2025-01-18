import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Button, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useDispatch, useSelector } from 'react-redux';
import { getNearByEVBunkList } from '../reducers/user/EVBunk/EVBunkThunks/getNearByEVBunkListThunk.jsx';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import getcordinates from '../getCoordinates.jsx';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { NearByEVBunkList } = useSelector((state) => state.EVBunk);
  const [userLocation, setUserLocation] = useState({ lat: '', lng: '' });
  const [locationSelected, setLocationSelected] = useState(false);
  const geocoderRef = useRef(null);






  // Handle search action
  const handleSearch = async () => {
    if (!userLocation.lat || !userLocation.lng) {
      console.error('No location set!');
      return;
    }

    const result = await dispatch(getNearByEVBunkList(userLocation)).unwrap();

    console.log('Searching for nearby EV Bunks at location:', result, userLocation);
  };

  // Handle "Use Location" button click
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationSelected(true); // Enable search after setting location
          console.log('User current location:', { latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a location',
      marker: false, // Optional: To remove the marker from the map while typing
    });

    // Detect when user selects a result
    geocoder.on('result', (event) => {
      const { place_name, center } = event.result;
      setUserLocation({ lat: center[1], lng: center[0] });
      setLocationSelected(true); // Set location selected when a place is chosen
      console.log('Selected place:', place_name, 'Coordinates:', center);
    });

    // Access the geocoder input element after it's added to the DOM
    const handleTyping = () => {
      const inputElement = document.querySelector('.mapboxgl-ctrl-geocoder--input');
      if (inputElement) {
        inputElement.addEventListener('input', () => {
          const value = inputElement.value.trim();
          console.log('User typing:', value);
          const coord = getcordinates(value);
          if (value) {
            coord.then((data) => setUserLocation({ lat: data[1], lng: data[0] }));
            setLocationSelected(true); // Enable search if typing starts
          } else {
            setLocationSelected(false); // Disable search if input is cleared
          }
        });
      }
    };

    // Initialize the geocoder and append it to the ref
    if (geocoderRef.current) {
      geocoderRef.current.appendChild(geocoder.onAdd());
      handleTyping(); // Add input event listener after geocoder is added
    }

    // Cleanup function when component is unmounted or re-renders
    return () => {
      geocoder.onRemove();
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, minHeight:'262px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Search for Nearby EV Bunks
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              {/* Mapbox Geocoder input */}
              <div ref={geocoderRef} style={{ width: '100%' }}></div>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: "column", sm: "row" }, gap: 1, justifyContent: "center", alignItems: "center", }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUseLocation}
                sx={{ marginRight: 2, textAlign: "center" }}
              >
                Use My Location
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
                sx={{ marginRight: 2, textAlign: "center" }}
                disabled={!locationSelected}
              >
                Search EV Bunks
              </Button>
            </Box>
          </Item>
        </Grid>
        {NearByEVBunkList && NearByEVBunkList.length > 0 && (
          <Grid item xs={12}>
            <Item>
              <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Nearby EV Bunk List
              </Typography>
              <Box>
                {NearByEVBunkList.map((item, key) => (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: 'space-between',
                      gap: 2,
                      padding: 2,
                      borderBottom: '1px solid lightgrey',
                    }}
                    key={key}
                  >
                    {/* Left Section - Bunk Name and Address */}
                    <Box
                      sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'black',
                          textAlign: 'left',
                          wordWrap: 'break-word',
                        }}
                      >
                        {`${key + 1}. ${item.evbunkname}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'gray',
                          textAlign: 'left',
                          wordWrap: 'break-word',
                        }}
                      >
                        {`${item.address}`}
                      </Typography>
                    </Box>

                    {/* Right Section - Other Details */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { xs: 'flex-start', md: 'space-evenly' },
                        gap: { xs: 2, sm: 3 },
                        width: { xs: '100%', md: '50%' },
                      }}
                    >
                      {/* Operating Hours */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'green',
                          textAlign: { xs: 'left', md: 'center' },
                          fontWeight: 'bold',
                        }}
                      >
                        {item.operatingHours ? `OPEN: ${item.operatingHours}` : ''}
                      </Typography>

                      {/* Distance */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'blue',
                          textAlign: { xs: 'left', md: 'center' },
                        }}
                      >
                        {item.distance !== undefined && item.distance !== null
                          ? item.distance >= 1
                            ? `${item.distance.toFixed(2)} km`
                            : `${(item.distance * 1000).toFixed(0)} m`
                          : ''}
                      </Typography>

                      {/* Location Icon with Link */}
                      <Link to={`/user/dashboard/map-loaction/${item.location.coordinates}`} style={{ textAlign: 'left' }}>
                        <LocationOnIcon sx={{ color: 'red', fontSize: 24 }} />
                      </Link>

                      {/* Details Icon with Link */}
                      <Link to={`/evbunk-details/${item._id}`} style={{ textAlign: 'left' }}>
                        <EventAvailableIcon sx={{ color: 'red', fontSize: 24 }} />
                      </Link>

                      {/* Mobile Number */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'black',
                          textAlign: { xs: 'left', md: 'center' },
                        }}
                      >
                        {`+91 ${item.mobile ? item.mobile : '9999999999'}`}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Item>
          </Grid>
        )}

      </Grid>
    </Box>
  );
}
