import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken=import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const getcordinates = (address) => {

    console.log(address);
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



export default getcordinates;