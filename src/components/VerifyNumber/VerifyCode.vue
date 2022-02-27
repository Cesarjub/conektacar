
<template>

    <section class = "margin-top">

        <!-- Formulario para validar codigo -->
        <div v-if = "error !== null" class = "col-md-7 mx-auto align-items-center">
            <AlertDanger :alerta = "error" />
        </div>

        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "text-center mt-5 mb-2">
                        <h2 class = "fw-bold">Introduce tu código de verificación</h2>
                        <p>El código ha sido enviado a +{{telefono}} .</p>
                    </div>   

                <form @submit.prevent = "verificarCodigo">

                    <div id = "otp" class = "inputs d-flex flex-row justify-content-center mt-2"> 
                        <input class = "m-1 text-center form-control rounded"  type = "text" v-model = "codigoVerifiacion.uno" maxlength = "1" required /> 
                        <input class = "m-1 text-center form-control rounded" type = "text" v-model = "codigoVerifiacion.dos" maxlength = "1" required /> 
                        <input class = "m-1 text-center form-control rounded" type = "text" v-model = "codigoVerifiacion.tres" maxlength = "1"  required /> 
                        <input class = "m-1 text-center form-control rounded" type = "text" v-model = "codigoVerifiacion.cuatro" maxlength = "1"  required /> 
                        <input class = "m-1 text-center form-control rounded" type = "text" v-model = "codigoVerifiacion.cinco" maxlength = "1"  required /> 
                        <input class = "m-1 text-center form-control rounded" type = "text" v-model = "codigoVerifiacion.seis" maxlength = "1" required /> 
                    </div>
           
                    <!-- Enviar numero de telefono -->
                    <div class = "row justify-content-center d-grid mt-4">
                        <div class = "col">
                            <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-5" :disabled = "bloquearBoton">Validar</button>
                        </div>             
                    </div> 

            <!-- Reenviar codigo -->
            <div class = "row justify-content-center d-grid mt-5">
              <p class = "small fw-bold mt-3 pt-1 mb-5">¿Todavía no ha llegado? 
                <router-link to = "/verificar/usuario" class = "link-secondary text-decoration-none">Reenviar código</router-link>
              </p>
            </div>

                </form> 

            </div>
        </div>
    </section>

</template>

<script>
import AlertDanger from '../Alerts/AlertDanger'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default 
{
    components: {
      AlertDanger
    },    
    setup() 
    {        
        const bloquearBoton = ref(false)
        const codigoVerifiacion = ref({})
        const store = useStore()

        const telefono = computed(() => store.state.telefono)

        const error = computed(() => store.state.error)

        const verificarCodigo = () => {
            //console.log(codigoVerifiacion.value)
            store.dispatch('verificarCodigo', {codigo: codigoVerifiacion.value.uno + codigoVerifiacion.value.dos + codigoVerifiacion.value.tres + codigoVerifiacion.value.cuatro + codigoVerifiacion.value.cinco + codigoVerifiacion.value.seis, telefono: telefono.value})
        }

        const reenviarCodigo = () => {

        }

        return { error, bloquearBoton, verificarCodigo, telefono, codigoVerifiacion, reenviarCodigo }         
    }
}
</script>

<style scoped>

.inputs input 
{
    width: 50px;
    height: 50px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button 
{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

.form-control:focus 
{
    box-shadow: none;
    border: 2px solid #023e8a;
}

</style>