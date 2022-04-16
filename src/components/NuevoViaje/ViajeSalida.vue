
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar ciudad de salida  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿Desde dónde sales?</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                    
                                    <!-- Input autocompletado -->
                                    <GMapAutocomplete
                                        class = "form-control form-control-lg"
                                        @place_changed = "setPlace"
                                        :required = "true"
                                        ref = "myMarker"
                                    >
                                    </GMapAutocomplete>

                                </div>
                                  
                            </div>

                            <!-- Enviar formulario -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button v-if = "btnFormulario" type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4">Continuar</button>
                                </div>             
                            </div>    

                            <!-- -->
                            <div class = "row justify-content-center mt-2 mb-1 text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                                    <img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/business/business/business-trip-3-7y6bs6l12h6tljknen5so.png" 
                                        class = "" style = "width: 300px;" >
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>

    <RecogerPasajeros v-if = "!siguienteForm" :ubicacionSalida = "ciudadSeleccionada" />

    <!--Salida: {{ ciudadSeleccionada }}-->

</template>

<script>
import RecogerPasajeros from './RecogerPasajeros'
import { ref } from 'vue'

export default 
{
    components: {
        RecogerPasajeros
    },
    setup() 
    {
        const siguienteForm = ref(true) 
        const btnFormulario = ref(false) 
        const ciudadSeleccionada = ref({})  

        const procesarFormulario = () => 
        {  

            siguienteForm.value = false
            
        }

        const setPlace = (ciudad) => 
        {
            ciudadSeleccionada.value.lat = ciudad.geometry.location.lat()
            ciudadSeleccionada.value.lng = ciudad.geometry.location.lng()
            btnFormulario.value = true
            console.log(ciudad)  
        }

        return { procesarFormulario, siguienteForm, btnFormulario, setPlace, ciudadSeleccionada }
    }
}
</script>