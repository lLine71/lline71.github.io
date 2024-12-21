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

function calculateGPSOffset(CGPS, objectGPS) {
	   // Use a library or formula to convert lat/lng to a 3D offset (simplified example)
	   const xOffset = (objectGPS.lng - CGPS.lng) * 1000; // Simple scaling for demo
	   const yOffset = 0; // Assume no change in altitude
	   const zOffset = (objectGPS.lat - CGPS.lat) * 1000; // Simple scaling for demo

	   return {
		  x: xOffset,
		  y: yOffset,
		  z: zOffset
	   }; // Example function to calculate the difference between two GPS points
	}
	
window.onload = () => {
	const objectGPS = {
	   lat: 55.870175, 
	   lng: 37.602724
	}; // Example location (patyorochka)

	// Get current device location as CGPS (starting point)
	navigator.geolocation.getCurrentPosition(function(position) {
	   const CGPS = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
	   };

	   // Convert GPS difference to AR offset (this part requires some geospatial math)
	   const offset = calculateGPSOffset(CGPS, objectGPS);

	   // Now, create your AR object and place it at the offset
	   const arObjectPosition = new THREE.Vector3(offset.x, offset.y, offset.z);

	   // Add the object to your scene or AR world
	   const mesh = new THREE.Mesh(geometry, material);
	   mesh.position.set(arObjectPosition.x, arObjectPosition.y, arObjectPosition.z);
	   scene.add(mesh);
	   alert("addedMesh");
	});

	
	
};
   // const gcam = document.querySelector('[gps-new-camera]');
	//return navigator.geolocation.getCurrentPosition(function (position) {
	//var positioncords;
	//const positioncords = 	{latitude: 55.869743, longitude: 37.600729};
	
	//const positioncords = navigator.geolocation.getCurrentPosition(succes);
	//const scene = document.querySelector('a-scene')
//	return navigator.geolocation.getCurrentPosition(function (position) { //maybe put down
		//if (gcam){
	//	console.log('yesgcam');
		//loadPlaces(position.cords)
			//.then((places) => {
				//console.log('stillintact');
				//alert('stillintact');
				//document.querySelector('[gps-new-camera]').addEventListener("gps-camera-update-position", e => {
				
			//	console.log('try to dispatch places');
				//alert('try to dispatch places');
				//places.elements.forEach((place) => {
					//console.log(place);
					//alert(place.tags.name);
					//const placeText = document.createElement('a-link');
					//placeText.setAttribute('gps-new-entity-place', {
						//latitude: place.lat + 0.001,
						//longitude: place.lon
					//});
						
				//	placeText.setAttribute('title', place.tags.name);
				//	placeText.setAttribute('scale', '25 25 25');
									
					//placeText.addEventListener('loaded', () => { //мб убрать
					//	alert('placeTextloaded');
					//	window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
					//});

				//	document.querySelector('a-scene').appendChild(placeText);
				//	console.log('tried to dispatch');
				//});
									
				//});
			//});
		//}
		//else{ console.log('nogcam')};
	//});	
//	console.log('hihihi');
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
