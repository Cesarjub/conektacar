
<template>
        
    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Seleccionar opcion de modo de reserva  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿Quieres que los pasajeros reserven de forma automática?</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "formaReserva(true)">
                                    <div  class = "border border-primary rounded-3 p-3 text-primary">¡Si, por supuesto!

                                    </div>
                                </router-link>
                                </div>
                                  
                            </div>

                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "col-12 col-md-6">
                                <router-link to = "" class = "text-decoration-none text-dark" @click = "formaReserva(false)">
                                    <div  class = "border border-primary rounded-3 p-3">No, responderé a las solicitudes personalmente.
                                     
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

    <PrecioPlaza v-if = "!siguienteForm" :datosViajes = "datosViajes" />  

</template>

<script>
import PrecioPlaza from './PrecioPlaza'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        PrecioPlaza
    },
    setup(props) 
    {
        const siguienteForm = ref(true)  

        const formaReserva = (op, e) =>
        {
            siguienteForm.value = false
            props.datosViajes.formaReserva = op
        }

        return { siguienteForm, formaReserva }
    }     
}
</script>