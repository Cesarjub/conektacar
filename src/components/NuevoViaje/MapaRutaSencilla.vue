
<template>

        <!-- Mapa -->
        <div class = "mapa">
            <GMapMap
                :center = "{ lat: ubicacion.latOrigen, lng: ubicacion.lngOrigen }"
                :zoom = "6"
                :options = "{   
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: true,
                    fullscreenControl: false,
                }"
            >

        <!-- Marcador de salida -->
        <GMapMarker
            :position = "{ lat: ubicacion.latOrigen, lng: ubicacion.lngOrigen }"
            :clickable = "false"
            :draggable = "false"
            :icon = '{
                url: "https://cdn-icons.flaticon.com/png/512/3193/premium/3193820.png?token=exp=1647482693~hmac=e40f8731eacfeeb849d8c83955484e19",
                scaledSize: {width: 40, height: 40},
                labelOrigin: {x: 16, y: -10}
            }'  
        />

        <!-- Marcador de destino -->
        <GMapMarker
            :position = "{ lat: ubicacion.latDestino, lng: ubicacion.lngDestino }"
            :clickable = "false"
            :draggable = "false"
            :icon = '{
                url: "https://cdn-icons-png.flaticon.com/512/3237/3237510.png",
                scaledSize: {width: 40, height: 40},
                labelOrigin: {x: 16, y: -10}
            }'
        />

        </GMapMap>  
      </div>      

</template>

<script>
import { ref } from 'vue'

export default 
{
    props: ['ubicacion']
}
</script>

<style scoped>

.vue-map-container,
.vue-map-container .vue-map 
{
    width: 100%;
    height: 100%;
}

div .mapa 
{
    width: 100%;
    height: 500px;
    margin-top: -50px;
}

</style>