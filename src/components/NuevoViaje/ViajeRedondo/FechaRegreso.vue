
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar fecha de regreso -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿Cuándo vas a regresar?</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                    <input type = "date" class = "form-control form-control-lg" :min = "datosViajes.fechaIda" v-model = "datosViajes.fechaRegreso" required>
                                </div>
                                  
                            </div>

                            <!-- Enviar formulario -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4">Continuar</button>
                                </div>             
                            </div>    

                            <!-- -->
                            <div class = "row justify-content-center mt-3 mb-1 text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                                    <!--<img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/product/product/coming-soon-1-5v3kv8xmbarmznb0aognkj.png" 
                                        class = "" style = "width: 290px;" >-->
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>        

    <HoraRegreso v-if = "!siguienteForm" :datosViajes = "datosViajes" /> 

</template>

<script>
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'
import HoraRegreso from './HoraRegreso'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],  
    components: {
        HoraRegreso
    },   
    setup(props) 
    {
        const siguienteForm = ref(true) 

        const { getTarifaDistancia } = getDatosViaje()

        const procesarFormulario = async() => 
        {   
            siguienteForm.value = false

            //Establecer precio de regreso
            props.datosViajes.precioPlazaRegreso = props.datosViajes.precioPlazaIda

            if(props.datosViajes.agregarParada && props.datosViajes.opcionRegreso !== 'op2')
            {

                props.datosViajes.precioRegresoOrigenParada = await getTarifaDistancia(props.datosViajes.distanciaRegresoOrigenParada)
                props.datosViajes.precioRegresoParadaDestino = await getTarifaDistancia(props.datosViajes.distanciaRegresoParadaDestino)

            }

        }

        return { procesarFormulario, siguienteForm }
    } 
}
</script>