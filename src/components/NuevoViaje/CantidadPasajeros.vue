
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Formulario para  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">¿Cuántos pasajeros van a acompañarte?</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-5 mt-5">
    
                                <div class = "col-1 col-md-1">
                                    <button class = "btn btn-dark btn-lg btn-circle px-4 fs-2" type = "button" :disabled = "desactivarBotonDisminuir" @click = "disminuirPasajeros"> - </button>
                                </div>

                                <div class = "col-3 col-md-3">
                                <h1 class = "text-center">{{ datosViajes.cantidadPasajeros }}</h1> 
                                    <!--<input type = "text" pattern = "[1-4]{1}" size = "1" title = "Puede agregar un máximo de 4 pasajeros."
                                    class = "form-control form-control-lg text-center" v-model = "datosViajes.cantidadPasajeros" required>
                                --></div>

                                <div class = "col-1 col-md-1">
                                    <button class = "btn btn-dark btn-lg btn-circle px-4 fs-2" type = "button" :disabled = "desactivarBotonAumentar" @click = "aumentarPasajeros"> + </button>
                                </div>                                
  
                            </div>

                            <!-- Enviar -->
                            <div class = "row justify-content-center d-grid mt-5">
                                <div class = "col mt-3">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4">Continuar</button>
                                </div>             
                            </div>    

                            <!-- -->
                            <div class = "row justify-content-center mt-3 mb-1 text-center">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                                    <!--<img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/healthcare/healthcare/mask-uses-2-08lc67zrev8louu5fzd9ixd.png" 
                                        class = "" style = "width: 270px;" >-->
                                </div>
                                  
                            </div>
    
                      </form>
    
            </div>
        </div>
    </section>         

    <FormaReserva v-if = "!siguienteForm" :datosViajes = "datosViajes" />

</template>

<script>
import FormaReserva from './FormaReserva'
import { ref } from 'vue'

export default 
{
    props: ['datosViajes'],
    components: {
        FormaReserva
    },
    setup(props) 
    {
        const siguienteForm = ref(true)  
        const desactivarBotonDisminuir = ref(false)  
        const desactivarBotonAumentar = ref(false)

        const procesarFormulario = () => 
        {   

            siguienteForm.value = false

        }

        const disminuirPasajeros = () =>
        {
            if(props.datosViajes.cantidadPasajeros === 1)
            {
                desactivarBotonDisminuir.value = true
                return
            }

            desactivarBotonAumentar.value = false
            props.datosViajes.cantidadPasajeros -= 1
        }

        const aumentarPasajeros = () =>
        {

            if(props.datosViajes.cantidadPasajeros === 4)
            {
                desactivarBotonAumentar.value = true
                return
            }

            desactivarBotonDisminuir.value = false
            props.datosViajes.cantidadPasajeros += 1

        }

        return { procesarFormulario, siguienteForm, disminuirPasajeros, aumentarPasajeros, desactivarBotonDisminuir, desactivarBotonAumentar }
    }     
}
</script>

<style scoped>
    
.btn.btn-circle 
{
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}

</style>