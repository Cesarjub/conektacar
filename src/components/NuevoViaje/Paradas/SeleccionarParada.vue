
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar direccion de destino  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>

                      <form @submit.prevent = "procesarFormulario">
                          
                    <div class = "row justify-content-between mt-5 mb-3">

                        <!-- -->
                        <div class = "form-group col-sm-6 mt-4 flex-column d-flex"> 
                            <h2 class = "fw-bold">¿Dónde te gustaría dejar a los pasajeros?</h2>
        
                            <!-- Input autocompletado -->
                            <GMapAutocomplete                    
                                class = "form-control form-control-lg mt-2 mb-4"
                                @place_changed = "setPlace"
                                :required = "true"
                                :value = "direccion"
                                ref = "myMarker"
                            >
                            </GMapAutocomplete>

                            <!--<input type = "text" class = "form-control form-control-lg mt-2 mb-4" > -->
                        <button type = "submit" class = "btn btn-primary col-sm-4 btn-lg shadow-sm">Continuar</button>
                        </div>

                    <!-- Mapa  -->
                    <div class = "col-sm-6 ">  

                        <Mapa :ubicacion = "ubicacionParada" :detectarUbicacion = "detectarUbicacion" />

                    </div>
                    
                </div>

                </form>
    
            </div>
        </div>
    </section>

    <div class = "d-none"> {{ obtenerDireccion }} </div>

    <ViajeRuta v-if = "!siguienteForm" :datosViajes = "datosViajes" />  

</template>

<script>
import ViajeRuta from '../ViajeRuta'
import Mapa from '../Mapas/Mapa'
import { ref, computed } from 'vue'

export default 
{
    props: ['ubicacionParada', 'datosViajes'],
    components: {
        ViajeRuta,
        Mapa
    },
    setup(props) 
    {
        const siguienteForm = ref(true) 
        const ubicacionParada = ref(props.ubicacionParada)
        const direccion = ref('')

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
            props.datosViajes.latParada = ubicacionParada.value.lat
            props.datosViajes.lngParada = ubicacionParada.value.lng
            props.datosViajes.direccionParada = direccion.value
        }

        const setPlace = (ciudad) => 
        {
            ubicacionParada.value.lat = ciudad.geometry.location.lat()
            ubicacionParada.value.lng = ciudad.geometry.location.lng()

            console.log(ciudad)
        } 

        const detectarUbicacion = (ciudad) =>
        {

            ubicacionParada.value.lat = ciudad.latLng.lat()
            ubicacionParada.value.lng = ciudad.latLng.lng()
            
             console.log(ciudad)
        }       

        const obtenerDireccion = computed(async () => 
        {

            if(ubicacionParada !== null)
            {

                try
                {
                    const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + ubicacionParada.value.lat + ',' + ubicacionParada.value.lng + '&key=AIzaSyBSUwF0_JfS0CZybBeAI-aqzz04_e67jDg')

                    const direccionObtenida = await res.json()

                    console.log(direccionObtenida)
                    direccion.value = direccionObtenida.results[0].formatted_address

                }
                catch(error)
                {
                    alert("error: " + error)
                }

                }

        })

        return { procesarFormulario, siguienteForm, ubicacionParada, setPlace, detectarUbicacion, direccion, obtenerDireccion }
    }    
}
</script>