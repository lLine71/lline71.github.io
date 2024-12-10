//position put in below blin
async function loadPlaces(cords) {
	
	var result = await fetch(
		"https://overpass-api.de/api/interpreter",
		{
			method: "POST",
			body: "data="+ encodeURIComponent(`
				[out:json][timeout:60];
				node(around:100, ${cords.latitude}, ${cords.longitude});
				nwr[type~"^(cafe|shop)$"]; 
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
    const scene = document.querySelector('a-scene');
	//return navigator.geolocation.getCurrentPosition(function (position) {
	//var positioncords;
	//positioncords = 	{latitude: 36.01068878173828, longitude: 37.20875549316406}
	return navigator.geolocation.getCurrentPosition(function (position) {
		loadPlaces(position.cords)
			.then((places) => {
				places.elements.forEach((place) => {
					console.log(place);
					const latitude = place.lat;
					const longitude = place.lon;
					const name = place.tags.name;
						
					const placeText = document.createElement('a-link');
					placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
					placeText.setAttribute('title', name);
					placeText.setAttribute('scale', '15 15 15');
						
					placeText.addEventListener('loaded', () => {
						window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
					});

					scene.appendChild(placeText);
			});
					
		});
		
	});
	//}
};	
	console.log('hihihi')
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
