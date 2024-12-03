function loadPlaces(position) {
    const params = {
        radius: 300,    
        clientId: 'TP325WB3HL43TLO3IY5XS52EFS2GLXUKD1FWYBTHOTCD3MVI',
        clientSecret: 'YEDHWPKLGAGREQJ5CEJQ3FXX50JNGUE1SALTNABWJTXBUVAQ',
        version: '20300101', 
    };

    //const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    const endpoint = `https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30 
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    return navigator.geolocation.getCurrentPosition(function (position) {

        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', 'href', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', place.name);
                    placeText.setAttribute('scale', '15 15 15');
                    
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
