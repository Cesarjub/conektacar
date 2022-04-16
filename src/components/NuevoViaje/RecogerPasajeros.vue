
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar direccion de salida  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>

                      <form @submit.prevent = "procesarFormulario">
                          
                    <div class = "row justify-content-between mt-5 mb-3">

                        <!-- Campo de foto del carro -->
                        <div class = "form-group col-sm-6 mt-4 flex-column d-flex"> 
                            <h2 class = "fw-bold">¿Dónde te gustaría recoger a los pasajeros?</h2>
        
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

                    <!-- Mapa -->
                    <div class = "col-sm-6 ">  

                        <Mapa :ubicacion = "ubicacionSalida" :detectarUbicacion = "detectarUbicacion" />

                    </div>
                    
                </div>

                </form>
    
            </div>
        </div>
    </section>

    <div class = "d-none"> {{ obtenerDireccion }} </div>

    <ViajeDestino v-if = "!siguienteForm" :datosViajes = "datosViajes" />

</template>

<script>
import ViajeDestino from './ViajeDestino'
import Mapa from './Mapas/Mapa'
import { ref, computed } from 'vue'

export default 
{
    props: ['ubicacionSalida'],
    components: {
        ViajeDestino,
        Mapa
    },
    setup(props) 
    {
        const siguienteForm = ref(true) 
        const ubicacionSalida = ref(props.ubicacionSalida)
        const direccion = ref('')
        const datosViajes = ref({})

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
            datosViajes.value = {
                latOrigen: ubicacionSalida.value.lat,
                lngOrigen: ubicacionSalida.value.lng,
                direccionOrigen: direccion.value
            }
        }

        const setPlace = (ciudad) => 
        {
            /*ciudadSeleccionada.value.lat = ciudad.geometry.location.lat()
            ciudadSeleccionada.value.lng = ciudad.geometry.location.lng()
            btnFormulario.value = true*/
            ubicacionSalida.value.lat = ciudad.geometry.location.lat()
            ubicacionSalida.value.lng = ciudad.geometry.location.lng()

            console.log(ciudad)
        } 

        const detectarUbicacion = (ciudad) =>
        {

            ubicacionSalida.value.lat = ciudad.latLng.lat()
            ubicacionSalida.value.lng = ciudad.latLng.lng()
            
             console.log(ciudad)
        }       

        const obtenerDireccion = computed(async () => 
        {

            if(ubicacionSalida !== null)
            {

                try
                {
                    const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + ubicacionSalida.value.lat + ',' + ubicacionSalida.value.lng + '&key=AIzaSyBSUwF0_JfS0CZybBeAI-aqzz04_e67jDg')

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

        return { procesarFormulario, siguienteForm, ubicacionSalida, setPlace, detectarUbicacion, direccion, obtenerDireccion, datosViajes }
    }    

}
</script>
