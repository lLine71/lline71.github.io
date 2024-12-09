//position put in below blin nwr[type~"^(cafe|shop)$"];
async function loadPlaces(cords) {
	
	var result = await fetch(
		"https://overpass-api.de/api/interpreter",
		{
			method: "POST",
			body: "data="+ encodeURIComponent(`
				[out:json][timeout:60];
				node(around:2000, ${cords.latitude}, ${cords.longitude});			 
				out;
			`)//add some more stuff to search
		},
	).then(
		(data)=>data.json()
	)

	//console.log(JSON.stringify(result , null, 2))
	
	return result;
};


window.onload = () => {
    const gcam = document.querySelector('gps-new-camera');
	//return navigator.geolocation.getCurrentPosition(function (position) {
	//var positioncords;
	//const positioncords = 	{latitude: 55.869743, longitude: 37.600729};
	
	const positioncords = navigator.geolocation.getCurrentPosition(showPosition);
	gcam.addEventListener("gps-camera-update-position", e => {
		loadPlaces(positioncords)
			.then((places) => {
				places.elements.forEach((place) => {
					console.log(place);
					//const latitud = place.lat;
					//const longitude = place.lon; //мб не const
					//const name = place.tags.name;
					alert(name);
					const placeText = document.createElement('a-link');
					placeText.setAttribute('gps-new-entity-place', {
						latitude: place.lat + 0.001,
						longitude: place.lon
					});
					
					placeText.setAttribute('title', place.tags.name);
					placeText.setAttribute('scale', '25 25 25');
								
					placeText.addEventListener('loaded', () => { //мб убрать
						window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
					});

					document.querySelector("a-scene").appendChild(placeText);
			});
							
		});
		
	console.log('hihihi')
	});	
};
   // return navigator.geolocation.getCurrentPosition(function (position) {

   //     loadPlaces(position.coords)
    //        .then((places) => {
   //             places.forEach((place) => {
   //                 const latitude = place.lat;
 //                   const longitude = place.lon;
//
 //                   const placeText = document.createElement('a-link');
  //                  placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
   //                 placeText.setAttribute('title', place.name);
   //                 placeText.setAttribute('scale', '15 15 15');
   //                 
   //                 placeText.addEventListener('loaded', () => {
   //                     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
   //                 });
//
   //                 scene.appendChild(placeText);
    //            });
    //        })
    //},
    //    (err) => console.error('Error in retrieving position', err),
     //   {
      //      enableHighAccuracy: true,
     //       maximumAge: 0,
      //      timeout: 27000,
      //  }
   // );
//};
