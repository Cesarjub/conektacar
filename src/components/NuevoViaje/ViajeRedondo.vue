
<template>
        
    <section class = "margin-top" v-if = "mostrarForm">

    <!-- Formulario para  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿Vas a hacer un viaje de ida y vuelta?</h2>
                        <p>Publica tu viaje de regreso ahora.</p>
                    </div>

                      <form>
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "siguienteForm">
                                    <div  class = "border border-primary rounded-3 p-3 text-primary">¡Si, seguro!
                      
                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "procesarFormulario">
                                    <div  class = "border border-primary rounded-3 p-3">Publicaré mi viaje de regreso más tarde.
                                     
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

    <OpcionRutaRegreso v-if = "irOpcionRuta" :datosViajes = "datosViajes" />
    <ViajeUltimosDetalles v-if = "avanzarForm" :datosViajes = "datosViajes" />

</template>

<script>
import OpcionRutaRegreso from './ViajeRedondo/OpcionRutaRegreso'
import ViajeUltimosDetalles from './ViajeUltimosDetalles'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        OpcionRutaRegreso, 
        ViajeUltimosDetalles
    },
    setup(props) 
    {
        const avanzarForm = ref(false)  
        const irOpcionRuta = ref(false) 
        const mostrarForm = ref(true) 

        const siguienteForm = () => 
        {   
            irOpcionRuta.value = true
            mostrarForm.value = false
            props.datosViajes.publicarRegreso = true
        }

        const procesarFormulario = () =>
        {
            avanzarForm.value = true
            mostrarForm.value = false

            //store.dispatch('publicarViajeNormal', props.datosViajes)
        }

        return { procesarFormulario, siguienteForm, mostrarForm, irOpcionRuta, avanzarForm }        
    }    
}
</script>