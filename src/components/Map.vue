<template>

    <GoogleMap
     ref="mapRef"
    style = "margin-top: -50px; width: 100%; height: 500px"
    :center = "center"
    :zoom = "15"
    :disableDefaultUI = "true"
    :fullscreenControl = "false"
    :streetViewControl = "false"
    :mapTypeControl = "false"
    >

        <!--<Marker :options = "{ position: center }" />
        <Marker :options = "{ position: center }" :draggable="true" />-->
<!--
<Marker :options = "{ position: center, clickable: false, icon: {url: 'https://cdn-icons-png.flaticon.com/512/741/741407.png', scaledSize: {width: 30, height: 30}, labelOrigin: {x: 16, y: -10} } }" />

 <Marker :options = "{ position: center, clickable: true, draggable: true }" @dragend ="prueba"  />--> <!--@drag -->

<Marker
        :key="index"
        v-for="(m, index) in markers"
        :options = "{position: m.position }"
 />

    </GoogleMap>

    <button type = "button" @click = "boton">Aplica</button>

    {{center}}

</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref, onMounted, onUpdated } from 'vue'

export default 
{
    props: ['ubicacion'],
    components: { 
        GoogleMap, 
        Marker 
    },    
    setup(props) 
    {
        const center = ref({lat: props.ubicacion.lat, lng: props.ubicacion.lng})
        const dos = ref({})

        const markers = ref(
        {
        
            lat: center.value.lat,
            lng: center.value.lng,
          
        }
      )

        const prueba = (e) =>
        {
            center.value.lat = e.latLng.lat()
            center.value.lng = e.latLng.lng()
            props.ubicacion.lat = e.latLng.lat()
            props.ubicacion.lng = e.latLng.lng()

            markers.value.position.lat = 0

       //dos.value.lat = e.latLng.lat()
        //dos.value.lng = e.latLng.lng()

            console.log(center.value)
        }

        const boton = () =>
        {
            console.log("ee")
                 props.ubicacion.lat = 0
            props.ubicacion.lng = 0

                       center.value.lat = 0
            center.value.lng = 0

            console.log(markers.value)
        } 

        onMounted(async() => {
  //boton()
  //console.log("act")
})



        return { center, prueba, boton, markers }
    }
}
</script>