
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar hora de regreso  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿A qué hora regresarás?</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                    <input type = "time" class = "form-control form-control-lg" v-model = "datosViajes.horaRegreso" required>
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
                                    <!--<img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/marketing/marketing/marketing-target-3-omkdepptzbv3z523g5yr.png" 
                                        class = "" style = "width: 290px;" >-->
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section> 

    <ViajeUltimosDetalles v-if = "!siguienteForm" :datosViajes = "datosViajes" /> 

</template>

<script>
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'
import ViajeUltimosDetalles from '../ViajeUltimosDetalles'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],  
    components: {
        ViajeUltimosDetalles
    },   
    setup(props) 
    {
        
        const siguienteForm = ref(true)

        const { getHorarioLlegada } = getDatosViaje()

        const procesarFormulario = () => 
        {   

            const fecha = new Date(props.datosViajes.fechaRegreso + " " +  props.datosViajes.horaRegreso)

            props.datosViajes.horaRegreso = Date.parse(fecha.toDateString() + " " + fecha.toLocaleTimeString())
     
            //store.dispatch('publicarViajeNormal', props.datosViajes)

            siguienteForm.value = false

            //Obtener horario de regreso
            props.datosViajes.horaRegresoLlegada = getHorarioLlegada(props.datosViajes.duracionRegreso, props.datosViajes.horaRegreso)

            if(props.datosViajes.agregarParada && props.datosViajes.opcionRegreso !== 'op2')
            {
                props.datosViajes.horaRegresoLlegadaOrigenParada = getHorarioLlegada(props.datosViajes.duracionRegresoOrigenParada, props.datosViajes.horaRegreso)
                props.datosViajes.horaRegresoLlegadaParadaDestino = getHorarioLlegada(props.datosViajes.duracionRegresoParadaDestino, props.datosViajes.horaRegreso)
            }

        }

        return { procesarFormulario, siguienteForm }
    } 
}
</script>