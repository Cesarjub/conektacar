
<template>

    <section class = "container">
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

                <div class = "alert alert-danger" role = "alert"  v-if = "error !== null">
                  {{error}}
                </div>

                <!-- Campo de nombre -->
                <div class = "mb-1">
                    <label for = "nombre-usuario" class = "form-label">Nombre completo:</label>
                    <input type = "text" class = "form-control form-control-lg" id = "nombre-usuario" 
                    v-model = "datosForm.nombre" title = "Introduzca su nombre" required>
                </div> 

                <!-- Campo de correo electronico -->
                <div class = "mb-2 mt-1">
                    <label for = "email-usuario" class = "form-label">Correo electrónico:</label>
                    <input type = "email" class = "form-control form-control-lg" id = "email-usuario"
                    title = "Ingresa tu correo electrónico" 
                    v-model = "datosForm.email" required>
                </div>                
      
                <!-- Campo de contraseña -->
                <div class = "mb-2">
                    <label for = "clave-iniciar" class = "form-label">Contraseña: <span class = "fst-italic">(Mínimo 6 caracteres)</span></label>
                    <input type = "password" class = "form-control form-control-lg" id = "clave-iniciar" pattern = ".{6,}" title = "La contraseña debe de ser mínimo de 6 caracteres."
                    v-model = "datosForm.clave" required>
                </div>            
  
                <!-- Crear cuenta -->
                <div class = "text-center text-lg-start mt-2 pt-2">
                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm rounded-3 mb-2 px-5"
                    >Crear</button>
                </div>

              </form>

              <!-- Ingresar con Google -->
              <div class = "text-center">
                <hr/>
                <button class = "btn btn-lg btn-block text-black shadow-sm bg-white rounded-3 px-4"
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default 
{
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