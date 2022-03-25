
<template>

    <section class = "margin-top">

    <!-- Formulario para verificar numero -->
        <div v-if = "error !== null" class = "col-md-7 mx-auto align-items-center">
            <AlertDanger :alerta = "error" />
        </div>


        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "text-center mt-5 mb-3">
                        <h2 class = "fw-bold">Verifica tu número de teléfono</h2>
                        <p>Recibirás un mensaje de texto con un código de verificación.</p>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!-- Campo de telefono -->
                            <div class = "row justify-content-center mb-2">
    
                            <div class = "col-12 col-md-6">
                                <vue-tel-input class = "form-control form-control-lg" 
                                    v-model = "phone" 
                                    v-bind = "bindProps"
                                    @validate = "procesarInput">
                                </vue-tel-input>
                            </div>
                                  
                            </div>

                            <!-- Enviar numero de telefono -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-4" :disabled = "bloquearBoton">Continuar</button>
                                </div>             
                            </div>    
    
                      </form>
    
            </div>
        </div>
    </section>

<!-- {{phone}} -->
</template>

<script>
import AlertDanger from '../Alerts/AlertDanger'
import { VueTelInput } from 'vue-tel-input'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default 
{
    components: {
      VueTelInput,
      AlertDanger
    },
    setup() 
    {
        const phone = ref('')     
        const bloquearBoton = ref(true)
        const numeroFinal = ref('')
        const store = useStore()
        const bindProps = {
            clearable: true,
            mode: "international",
            disabledFetchingCountry: false,
            disabled: false,
            disabledFormatting: true,
            placeholder: "Introduce tu número de teléfono",
            required: true,
            enabledCountryCode: true,
            enabledFlags: true,
            //preferredCountries: ["US", "MX"],
            onlyCountries: ["US", "MX"],
            ignoredCountries: [],
            autocomplete: "on",
            name: "telephone",
            maxLen: 25,
            wrapperClasses: "",
            inputClasses: "",
            inputOptions: {
            showDialCode: true, //
            },
            validCharactersOnly: true,
        }

        const procesarInput = (data) => 
        {
            console.log(data)
            numeroFinal.value = data.number

            if(data.valid)
            {
                bloquearBoton.value = false
            }
            else
                bloquearBoton.value = true
        }   

        const procesarFormulario = () => {
            store.dispatch('verificarTelefono', numeroFinal.value.slice(1))
        }      

        const error = computed(() => store.state.error)

        return { phone, bloquearBoton, bindProps, procesarInput, procesarFormulario, error } 
    }
}
</script>

<style src = "vue-tel-input/dist/vue-tel-input.css"></style>