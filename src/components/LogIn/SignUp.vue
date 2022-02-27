
<template>

    <section class = "container margin-top">
        <div class = "container-fluid h-custom">
          <div class = "row d-flex justify-content-center align-items-center h-100">
            
            <div class = "col-md-9 col-lg-6 col-xl-5">
              <img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/users/users/taxi-ride-2-gxqbhw4bp9ft5wg8op3cb.png" class = "img-fluid"
                alt = "Login">
            </div>
            
            <div class = "col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form @submit.prevent = "procesarFormulario">

                <div class = "divider d-flex align-items-center my-3 mt-3 mb-3">
                    <h2 class = "fw-bold text-center">Crear cuenta</h2>
                </div> 

                <AlertDanger v-if = "error !== null" :alerta = "error" />

                <!-- Campo de nombre -->
                <div class = "mb-1">
                    <label for = "nombre-usuario" class = "form-label">Nombre completo:</label>
                    <input type = "text" class = "form-control form-control-lg" id = "nombre-usuario" 
                    v-model = "datosForm.nombre" pattern = "^[a-zA-Z ]+$" title = "Introduzca su nombre completo." required>
                </div> 

                <!-- Campo de correo electronico -->
                <div class = "mb-2 mt-1">
                    <label for = "email-usuario" class = "form-label">Correo electrónico:</label>
                    <input type = "email" class = "form-control form-control-lg" id = "email-usuario"
                    title = "Ingresa tu correo electrónico." 
                    v-model = "datosForm.email" required>
                </div>                
      
                <!-- Campo de contraseña -->
                <div class = "mb-2">
                    <label for = "clave-iniciar" class = "form-label">Contraseña: <span class = "fst-italic">(Mínimo 6 caracteres)</span></label>
                    <input type = "password" class = "form-control form-control-lg" id = "clave-iniciar" pattern = ".{6,}" title = "La contraseña debe contener un mínimo de 6 caracteres."
                    v-model = "datosForm.clave" required>
                </div>            
  
                <!-- Crear cuenta -->
                <div class = "text-center text-lg-start mt-2 pt-2">
                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm rounded-3 mb-2 px-5"
                    >Crear</button>
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
                    
              <p class = "small fw-bold mt-3 pt-1 mb-5">¿Ya tienes una cuenta? 
                <router-link to = "/login/ingresar" class = "link-secondary text-decoration-none">Inicia sesión</router-link>
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
          store.dispatch('crearNuevoUsuario', datosForm.value)
        }

        const procesarGoogle = () => {
          store.dispatch('ingresarGoogle')
        }

        const error = computed(() => store.state.error)      

        return { datosForm, procesarFormulario, procesarGoogle, error }      
    }
}
</script>

<style>
.line-form 
{
    height: 1px;
    width: 45%;
    background-color: #E0E0E0;
    margin-top: 10px
}

.or-form 
{
    width: 10%
}
</style>