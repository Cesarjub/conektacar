
<template>

        <!-- Mapa -->
        <div class = "mapa">
            <GMapMap
                :center = "ubicacion"
                :zoom = "15"
                :options = "{   
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: true,
                    fullscreenControl: false,
                }"
            >

        <!-- Marcador input -->
        <GMapMarker
            :position = "ubicacion"
            :clickable = "false"
            :draggable = "false"
                :icon = '{
                url: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
                scaledSize: {width: 30, height: 30},
                labelOrigin: {x: 16, y: -10}
            }'
        />

        <!-- Marcador seleccionar direccion -->
        <GMapMarker
            :position = "ubicacion"
            :clickable = "true"
            :draggable = "true"
            @dragend = "detectarUbicacion"
        />

        </GMapMap>  
      </div>

</template>

<script>
import { ref } from 'vue'

export default 
{
    props: ['ubicacion', 'detectarUbicacion'],
    setup(props) 
    {
        const ubicacion = ref(props.ubicacion)
        const detectarUbicacion = ref(props.detectarUbicacion)

        return { ubicacion, detectarUbicacion }
    }
}
</script>

<style scoped>

.vue-map-container,
.vue-map-container .vue-map {
    width: 100%;
    height: 100%;
}

div .mapa {
    width: 100%;
    height: 500px;
    margin-top: -50px;
}

</style>