<template>
        
    <section class = "margin-top" v-if = "mostrarForm">

    <!-- Formulario para  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Confirma tu ruta de regreso</h2>
                        <p>Selecciona alguna de las siguientes opciones para tu regreso.</p>
                    </div>

                      <form>
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "procesarFormulario('op1')">
                                    <div  class = "border border-primary rounded-3 p-3">Regresaré por la misma ruta.
                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!--  -->
                            <div v-if = "opcionParada" class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "procesarFormulario('op2')">
                                    <div  class = "border border-primary rounded-3 p-3">Regreso a mi origen sin pasar por la parada.
                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <div v-if = "opcionParada" class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "procesarFormulario('op3')">
                                    <div  class = "border border-primary rounded-3 p-3">Regreso a mi origen cambiando la parada.
                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!-- -->
                            <div class = "row justify-content-center text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none "></div>
                                    <!--<img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/users/users/taxi-ride-3-wfkiz8cq6l2ddfz9jb3q6.png" 
                                        class = "" style = "width: 290px;" >-->
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>

    <NuevaParada v-if = "cambiarParada" :datosViajes = "datosViajes" />
    <RutaViajeRedondo v-if = "siguienteForm" :datosViajes = "datosViajes" />

</template>

<script>
import RutaViajeRedondo from './RutaViajeRedondo'
import NuevaParada from '../ViajeCambiarParada/NuevaParada'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],  
    components: {
        RutaViajeRedondo,
        NuevaParada
    },
    setup(props) 
    {
        const siguienteForm = ref(false)
        const mostrarForm = ref(true)
        const cambiarParada = ref(false)
        const opcionParada = ref(props.datosViajes.agregarParada)   

        const procesarFormulario = (op) => 
        {
            console.log(op)
            props.datosViajes.opcionRegreso = op

            if(op !== 'op3')
            {
                siguienteForm.value = true
                mostrarForm.value = false
            }
            else
            {
                cambiarParada.value = true
                mostrarForm.value = false
            }
            
        }

        return { opcionParada, procesarFormulario, siguienteForm, mostrarForm, cambiarParada }
    } 
}
</script>