
export const getDistancia = () =>
{

    const haversine_distance = (mk1, mk2) => 
    {

        var R = 3958.8 // Radius of the Earth in miles
        var rlat1 = mk1.position.lat() * (Math.PI/180) // Convert degrees to radians
        var rlat2 = mk2.position.lat() * (Math.PI/180) // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180) // Radian difference (longitudes)
        
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)))
        return d
    }

    const getDistanciaMapa = async(ubicacion) =>
    {
        const distanciaTotal = {}

        const center = {lat: ubicacion.latOrigen, lng: ubicacion.lngOrigen}
        const options = {zoom: 15, scaleControl: true, center: center}
        map.value = new google.maps.Map(
            document.getElementById('map'), options)

        // Locations of landmarks
        const dakota = {lat: ubicacion.latOrigen, lng: ubicacion.lngOrigen}
        const frick = {lat: ubicacion.latDestino, lng: ubicacion.lngDestino}
        // The markers for The Dakota and The Frick Collection
        var mk1 = new google.maps.Marker({position: dakota, map: map.value})
        var mk2 = new google.maps.Marker({position: frick, map: map.value})
      
        // Calculate and display the distance between markers
        var distance = haversine_distance(mk1, mk2)
        distanciaTotal.distancia = distance.toFixed(2)
        console.log( "Distance between markersssss: " + distance.toFixed(2) + " mi.")

        ////////////////////////////////////////////////
        let directionsService = new google.maps.DirectionsService()
        let directionsRenderer = new google.maps.DirectionsRenderer()
        directionsRenderer.setMap(map.value) // Existing map object displays directions
        // Create route from existing points used for markers
        const route = {
            origin: dakota,
            destination: frick,
            travelMode: 'DRIVING'
        }

        await directionsService.route(route,
            function(response, status) { // anonymous function to capture directions
            if (status !== 'OK') {
                alert('Directions request failed due to ' + status)
                return
            } else {
                directionsRenderer.setDirections(response) // Add route to the map
                var directionsData = response.routes[0].legs[0] // Get data about the mapped route
                if (!directionsData) {
                alert('Directions request failed')
                return;
                }
                else {
                    distanciaTotal.distanciaCarro = directionsData.distance.text.substring(0, directionsData.distance.text.length - 2)
                    distanciaTotal.tiempoCarro = directionsData.duration.text
                    console.log(" Driving distance isssssss " + directionsData.distance.text + " (" + directionsData.duration.text + ").")
                }
            }
        })

        return distanciaTotal

    }

    return { getDistanciaMapa }
    
}