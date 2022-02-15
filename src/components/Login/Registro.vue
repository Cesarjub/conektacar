
<template>

    <section class = "container">
        <div class = "container-fluid h-custom">
          <div class = "row d-flex justify-content-center align-items-center h-100">
            
            <div class = "col-md-9 col-lg-6 col-xl-5">
              <img src = "https://res.cloudinary.com/webalys/image/private/w_800,h_800,ar_1/f_auto/v1/icons/illustrations-brooklyn/users/users/taxi-ride-2-gxqbhw4bp9ft5wg8op3cb.png" class = "img-fluid"
                alt = "Login">
            </div>
            
            <div class = "col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form @submit.prevent = "crearNuevoUsuario({email: usuario.email, clave: usuario.claveUno})">

                <div class = "divider d-flex align-items-center my-3 mt-3 mb-3">
                    <h2 class = "fw-bold text-center">Crear cuenta</h2>
                </div> 

                <!-- Campo de correo electronico -->
                <div class = "mb-2 mt-1">
                    <label for = "email-usuario" class = "form-label">Correo electrónico:</label>
                    <input type = "email" class = "form-control form-control-lg" id = "email-usuario"
                    title = "Ingresa tu correo electrónico" 
                    v-model = "usuario.email" required>
                </div>                
      
                <!-- Campo de contraseña -->
                <div class = "mb-2">
                    <label for = "clave-iniciar" class = "form-label">Contraseña: <span class = "fst-italic">(Mínimo 6 caracteres)</span></label>
                    <input type = "password" class = "form-control form-control-lg" id = "clave-iniciar" pattern = ".{6,}" title = "La contraseña debe de ser mínimo de 6 caracteres."
                    v-model = "usuario.claveUno" required>
                </div>

                <!-- Campo de confirmar contraseña -->
                <div class = "mb-1">
                    <label for = "clave-confirmar" class = "form-label">Confirmar contraseña:</label>
                    <input type = "password" class = "form-control form-control-lg" id = "clave-confirmar" 
                    v-model = "usuario.claveDos" title = "Las contraseñas deben coincidir." required>
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
                type = "submit" @click = "ingresarGoogle">
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

<!--<form @submit.prevent = "crearNuevoUsuario({email: usuario.email, clave: usuario.claveUno})">
  <button :disabled = "!desactivar" type="submit" class="btn btn-primary">Submit</button>
</form>-->

{{error}}

</template>

<script>
import {mapActions, mapState} from 'vuex'
//mapstate es para ver el

export default {
  data() {
        return {
            usuario: {
                email: '',
                claveUno: '',
                claveDos: ''
            }
        }
  },
  methods: {
    ...mapActions(['crearNuevoUsuario', 'ingresarGoogle'])
  },
  computed: {
    ...mapState(['error']),
    desactivar() {
      return this.usuario.claveUno.trim() !== '' && this.usuario.claveUno.length > 5
    }
  }
}
</script>