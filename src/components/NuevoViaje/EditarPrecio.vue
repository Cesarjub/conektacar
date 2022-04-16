
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Modificar precio de viaje  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Edita nuestro precio recomendado por plaza</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-4">
    
                                <div class = "col-12 col-md-5">
                                    <input type = "text" v-model = "datosViajes.precioPlazaIda" pattern = "^[0-9]*$" title = "Ingrese una cantidad valida."
                                    class = "form-control form-control-lg text-center" required>
                                </div>
                                  
                            </div>

                            <!-- Enviar formulario -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4">Continuar</button>
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

    <ViajeRedondo v-if = "!siguienteForm" :datosViajes = "datosViajes" />

</template>

<script>
import ViajeRedondo from './ViajeRedondo'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        ViajeRedondo
    },
    setup(props) 
    {
        const siguienteForm = ref(true)    

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
        }

        return { procesarFormulario, siguienteForm }        
    }
}
</script>