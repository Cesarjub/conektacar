
<template>


    <header class = "container p-1">
        <nav class = "navbar navbar-expand-lg navbar-light">
            <div class = "container-fluid"> 

                <router-link to = "/" class = "navbar-brand">Prueba</router-link>

                <button class = "navbar-toggler" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navbarNav" aria-controls = "navbarNav" aria-expanded = "false" aria-label = "Toggle navigation"> 
                    <span class = "navbar-toggler-icon"></span> 
                </button>

                <div class = "collapse navbar-collapse" id = "navbarNav">
                    <ul class = "navbar-nav ms-auto">
                        <li class = "nav-item"> <router-link to = "/" class = "nav-link seleccion">Inicio</router-link> </li>
                        <li class = "nav-item"> <a class = "nav-link seleccion" href = "#">Otro</a> </li>
                    
                    <!--  -->
                    <li class = "nav-item dropdown me-2" v-if = "existeUsuario">
                        <a href = "#" class = "nav-link dropdown-toggle">{{usuario.email}}</a>
                        <ul class = "dropdown-menu mb-3">
                            <li><router-link to = "/perfil" class = "dropdown-item">Perfil</router-link></li>
                            <li><label class = "dropdown-item" @click = "cerrarSesion">Cerrar sesión</label></li>
                        </ul>
                    </li>                    
                    
                    </ul>
                        
                    <form>
                        <router-link to = "/login/ingresar" class = "btn btn-primary shadow-none ms-2" v-if = "!existeUsuario">Acceder</router-link>    
                    </form>

                    </div>
                </div>
            </nav>
    </header>

<!--{{existeUsuario}} {{usuario}}-->

</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default 
{
    methods: 
    {
        ...mapActions(['cerrarSesion', 'autenticarUsuario'])
    },
    computed: {
        ...mapState(['usuario']),
        ...mapGetters(['existeUsuario'])
    }
}
</script>


<style scoped>

.navbar .navbar-brand 
{
    color: #023e8a;
    font-weight: 600;
}

.navbar .container-fluid form .btn.btn-primary 
{
    text-transform: capitalize;
    width: 100px;
    background-color: transparent;
    color: #023e8a;
    font-weight: 600;
    border: 2px solid #023e8a;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 20px;
    transition: .5s;
}

.navbar .container-fluid form .btn.btn-primary:hover 
{
    background-color: #023e8a;
    color: #fff;
}

.navbar .container-fluid ul li.nav-item .nav-link 
{
    color: black;
    font-size: 1rem;
    border-bottom: 2px solid transparent;
    padding: .5rem 0;
    margin: 0 .8rem;
}

.navbar .container-fluid ul li.nav-item .seleccion:hover 
{
    border-bottom: 2px solid #023e8a;
}

.navbar .container-fluid ul li.nav-item .nav-link.active 
{
    border-bottom: 2px solid #023e8a;
}   

.navbar ul li:hover > ul,
 ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
  min-width: 200px;
  text-align: left;
}

.navbar ul li ul li a:hover, .navbar ul li ul li label:hover  {
  padding-left: 10px;
  border-left: 2px solid #023e8a;
  transition: all 0.3s ease;
}

.navbar ul li ul li a {
  transition: all 0.5s ease;
}

</style>