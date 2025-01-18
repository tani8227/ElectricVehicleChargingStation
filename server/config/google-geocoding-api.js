import axios from 'axios';
import dotenv from 'dotenv';
import mapboxgl from 'mapbox-gl';
dotenv.config(); 

mapboxgl.accessToken = `${process.env.MAPBOX_ACCESS_TOKEN}`; 
// get coordinate from address
const getcordinates = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const { center } = data.features[0];
                const latitude = center[1];
                const longitude = center[0];
                console.log(`result : ${longitude}, ${latitude}`)
                return [longitude, latitude]; // Return the coordinates
            } else {
                console.error('No results found for this address');
                return []; // Return an empty array if no results
            }
        })
        .catch(error => {
            console.error('Error fetching geocode:', error);
            return []; // Return an empty array in case of error
        });
    };
    
   

// get address from coordinate
    const getPlaceFromCoordinates = (latitude, longitude) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.features && data.features.length > 0) {
              const placeName = data.features[0].place_name;
              console.log(`Place for Coordinates (${latitude}, ${longitude}): ${placeName}`);
            } else {
              console.log('No results found for the given coordinates.');
            }
          })
          .catch(error => console.error('Error fetching reverse geocode:', error));
      };
      
    
   
// get distance from one point to another point
export const getDistanceFromMapbox = async (start_lon,start_lat,dest_lon,dest_lat) => {
    const accessToken =mapboxgl.accessToken; // Replace with your token
    // console.log("hhfhhfhhfjfjjfjfj7770", start_lon,start_lat,dest_lon,dest_lat);
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start_lon},${start_lat};${dest_lon},${dest_lat}?access_token=${accessToken}&geometries=geojson`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const distanceInMeters = route.distance; // Distance in meters
            const distanceInKilometers = distanceInMeters / 1000;
            console.log(`Distance: ${distanceInKilometers.toFixed(2)} km`);
            return distanceInKilometers;
        } else {
            console.error('No routes found!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching distance:', error.message);
        return null;
    }
};




   
export default getcordinates;













