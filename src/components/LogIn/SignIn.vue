
<template>

    <section class = "container margin-top">
        <div class = "container-fluid h-custom">
          <div class = "row d-flex justify-content-center align-items-center h-100">
            
            <div class = "col-md-9 col-lg-6 col-xl-5">
              <img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/interface/interface/logged-in-3-58zjtozcrrvxairlb9f2kq.png" class = "img-fluid"
                alt = "Login">
            </div>
            
            <div class = "col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form @submit.prevent = "procesarFormulario">

                <div class = "divider d-flex align-items-center my-3 mt-3 mb-3">
                    <h2 class = "fw-bold text-center">Iniciar sesión</h2>
                </div> 

                <AlertDanger v-if = "error !== null" :alerta = "error" />

                <!-- Campo de correo electronico -->
                <div class = "mb-3 mt-1">
                    <label for = "email-usuario" class = "form-label">Correo electrónico:</label>
                    <input type = "email" class = "form-control form-control-lg" id = "email-usuario"
                    title = "Ingresa tu correo electrónico" 
                    v-model = "datosForm.email" required>
                </div>                
      
                <!-- Campo de contraseña -->
                <div class = "mb-4">
                    <label for = "clave-iniciar" class = "form-label">Contraseña:</label>
                    <input type = "password" class = "form-control form-control-lg" id = "clave-iniciar" 
                    v-model = "datosForm.clave" required>
                </div>
      
                <div class = "d-flex justify-content-between align-items-center">
                  
                    <!-- Checkbox -->
                    <div class = "form-check mb-0">
                        <input class = "form-check-input me-2" type = "checkbox" id = "check-recordar" />
                        <label class = "form-check-label" for = "check-recordar">
                            Recordarme
                        </label>
                    </div>

                    <a href = "#" class = "text-body text-decoration-none">¿Olvidaste tu contraseña?</a>
                </div>
      
                <!-- Ingresar -->
                <div class = "text-center text-lg-start mt-4 pt-2">
                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm rounded-3 mb-2 px-4"
                    >Ingresar</button>
                </div>

              </form>

              <div class = "row px-3 mt-2 mb-2">
                <div class = "line-form"></div> <small class = "text-muted or-form text-center">O</small>
                <div class = "line-form"></div>
              </div>

              <!-- Ingresar con Google -->
              <div class = "text-center">

                <button class = "btn btn-lg btn-block text-black shadow-sm bg-white rounded-3 px-4 w-100"
                type = "submit" @click = "procesarGoogle">
                <img src = "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" 
                alt = "Google" class = "me-2" width = "32">
                Inicia sesión con Google</button>   
              </div>
                    
              <p class = "small fw-bold mt-3 pt-1 mb-5">¿Todavía no tienes una cuenta? 
                <router-link to = "/login/registro" class = "link-secondary text-decoration-none">Registrate</router-link>
              </p>

            </div>

          </div>
        </div>

      </section>

</template>

<script>
import AlertDanger from '../Alerts/AlertDanger'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default 
{
    components: {
      AlertDanger
    },
    setup() 
    {
        
        const datosForm = ref({})
        const store = useStore()

        const procesarFormulario = () => {
          store.dispatch('ingresoUsuario', datosForm.value)
        }

        const procesarGoogle = () => {
          store.dispatch('ingresarGoogle')
        }

        const error = computed(() => store.state.error)

        return { datosForm, procesarFormulario, procesarGoogle, error }

    }
}
</script>