//position put in below blin
async function loadPlaces(cords) {
	
	var result = await fetch(
		"https://overpass-api.de/api/interpreter",
		{
			method: "POST",
			body: "data="+ encodeURIComponent(`
				[out:json][timeout:60];
				node(around:2000, ${cords.latitude}, ${cords.longitude});
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
	const positioncords = 	{latitude: 55.869743, longitude: 37.600729};
	return navigator.geolocation.getCurrentPosition(function (position) {
		loadPlaces(position.cords)
			.then((places) => {
				places.elements.forEach((place) => {
					console.log(place);
					const latitude = place.lat;
					const longitude = place.lon;
					const name = place.tags.name;
					alert(name);
					const placeText = document.createElement('a-link');
					placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
					placeText.setAttribute('title', name);
					placeText.setAttribute('scale', '15 15 15');
							
					placeText.addEventListener('loaded', () => {
						window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
					});

					scene.appendChild(placeText);
			});
						
		});
		(err) => console.error('Error in retrieving position', err),
		   {
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: 27000,
		   }
		
	});
	//}
	console.log('hihihi')
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
