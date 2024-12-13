//position put in below blin nwr[type~"^(cafe|shop)$"];
async function loadPlaces(cords) {
	console.log('inLoadPlaces');
	var result = await fetch(
		"https://overpass-api.de/api/interpreter",
		{
			method: "POST",
			body: "data="+ encodeURIComponent(`
				[out:json][timeout:60];
				node(around:2000, 51.507351, -0.127758);	
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
    const gcam = document.querySelector('[gps-new-camera]');
	//return navigator.geolocation.getCurrentPosition(function (position) {
	//var positioncords;
	//const positioncords = 	{latitude: 55.869743, longitude: 37.600729};
	
	//const positioncords = navigator.geolocation.getCurrentPosition(succes);
	//const scene = document.querySelector('a-scene')
	return navigator.geolocation.getCurrentPosition(function (position) { //maybe put down
		//if (gcam){
		console.log('yesgcam');
		loadPlaces(position.cords)
			.then((places) => {
				console.log('stillintact');
				alert('stillintact');
				document.querySelector('[gps-new-camera]').addEventListener("gps-camera-update-position", e => {
				
				console.log('try to dispatch places');
				alert('try to dispatch places');
				places.elements.forEach((place) => {
					console.log(place);
					alert(place.tags.name);
					const placeText = document.createElement('a-link');
					placeText.setAttribute('gps-new-entity-place', {
						latitude: place.lat + 0.001,
						longitude: place.lon
					});
						
					placeText.setAttribute('title', place.tags.name);
					placeText.setAttribute('scale', '25 25 25');
									
					placeText.addEventListener('loaded', () => { //мб убрать
						alert('placeTextloaded');
						window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
					});

					document.querySelector('a-scene').appendChild(placeText);
					console.log('tried to dispatch');
				});
									
				});
			});
		//}
		//else{ console.log('nogcam')};
	});	
	console.log('hihihi');
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
