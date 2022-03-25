
<template>
        
    <section class = "margin-top" v-if = "mostrarForm">

    <!-- Formulario para  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Este es nuestro precio recomendado por plaza. ¿Te parece bien?</h2>
                        <h1 class = "fw-bold"><span class = "text-primary">$ </span>{{ datosViajes.precioPlazaIda }}</h1>
                    </div>

                      <form>
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "siguienteForm">
                                    <div  class = "border border-primary rounded-3 p-3 text-primary">¡Si, perfecto!
                      
                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "modificarPrecio">
                                    <div  class = "border border-primary rounded-3 p-3">No, necesito editar este importe.
                                     
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

    <ViajeRedondo v-if = "avanzarForm" :datosViajes = "datosViajes" />  
    <EditarPrecio v-if = "irModificarPrecio" :datosViajes = "datosViajes" />    

</template>

<script>
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'
import EditarPrecio from './EditarPrecio'
import ViajeRedondo from './ViajeRedondo'
import { ref, onMounted } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        EditarPrecio,
        ViajeRedondo
    },
    setup(props) 
    {
        const avanzarForm = ref(false)  
        const irModificarPrecio = ref(false) 
        const mostrarForm = ref(true) 

        const { getTarifaDistancia } = getDatosViaje()

        const siguienteForm = () => 
        {   
            avanzarForm.value = true
            mostrarForm.value = false
            //props.datosViajes.precioPlaza = 400
        }

        const modificarPrecio = () =>
        {
            irModificarPrecio.value = true
            mostrarForm.value = false
            //props.datosViajes.precioPlaza = 400
        }

        onMounted(async() => 
        {
            props.datosViajes.precioPlazaIda = await getTarifaDistancia(props.datosViajes.distanciaIda)

            if(props.datosViajes.agregarParada)
            {
                props.datosViajes.precioIdaOrigenParada = await getTarifaDistancia(props.datosViajes.distanciaIdaOrigenParada)
                props.datosViajes.precioIdaParadaDestino = await getTarifaDistancia(props.datosViajes.distanciaIdaParadaDestino)
            }
        })

        return { avanzarForm, irModificarPrecio, mostrarForm, modificarPrecio, siguienteForm }
    }     
}
</script>