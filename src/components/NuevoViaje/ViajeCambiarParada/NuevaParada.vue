
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar ciudad de nueva parada  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Ingresa tu nueva parada</h2>
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
                            <div class = "row justify-content-center mt-3 mb-1 text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                                    <!--<img src = "https://res.cloudinary.com/webalys/image/private/w_400,h_400,ar_1/f_auto/v1/icons/illustrations-brooklyn/leisure/leisure/trips-1-ugu1oy6y5nxhyqk0jf9po.png" 
                                        class = "" style = "width: 280px;" >-->
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>   

    <SeleccionarNuevaParada v-if = "!siguienteForm" :ubicacionParada = "ciudadSeleccionada" :datosViajes = "datosViajes" />          

</template>

<script>
import SeleccionarNuevaParada from './SeleccionarNuevaParada'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        SeleccionarNuevaParada
    },    
    setup(props) 
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