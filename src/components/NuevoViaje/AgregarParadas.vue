
<template>
        
    <section class = "margin-top" v-if = "mostrarForm">

    <!-- Agregar parada  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-2">
                        <h2 class = "fw-bold">¿Deseas agregar paradas?</h2>
                        <p>Los pasajeros podrán reservarlas.</p>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "agregarParada">
                                <div  class = "border border-primary rounded-3 p-3">Añadir parada
                                <span class = "">
                                    <svg xmlns = "http://www.w3.org/2000/svg" width = "19" height = "19" fill = "currentColor" class = "bi bi-caret-right-fill text-primary" viewBox = "0 0 16 16">
                                        <path d = "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </span>
                                </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!-- Enviar formulario -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4">No en este viaje</button>
                                </div>             
                            </div>    

                            <!-- -->
                            <div class = "row justify-content-center text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none "></div>
                                    <img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/users/users/taxi-ride-3-wfkiz8cq6l2ddfz9jb3q6.png" 
                                        class = "" style = "width: 290px;" >
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>

    <ViajeRuta v-if = "!siguienteForm" :datosViajes = "datosViajes" />  
    <CiudadParada v-if = "irAgregarParada" :datosViajes = "datosViajes" />

</template>

<script>
import ViajeRuta from './ViajeRuta'
import CiudadParada from './Paradas/CiudadParada'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        ViajeRuta,
        CiudadParada
    },
    setup(props) 
    {
        const siguienteForm = ref(true)  
        const irAgregarParada = ref(false) 
        const mostrarForm = ref(true) 

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
            mostrarForm.value = false
            props.datosViajes.agregarParada = false
        }

        const agregarParada = () =>
        {
            irAgregarParada.value = true
            mostrarForm.value = false
            props.datosViajes.agregarParada = true
        }

        return { procesarFormulario, siguienteForm, agregarParada, irAgregarParada, mostrarForm }
    }         
}
</script>