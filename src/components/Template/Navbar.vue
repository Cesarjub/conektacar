
<template>

    <header class = "header-nav">
        <nav id = "navbar-inicio" class = "navbar fixed-top navbar-expand-lg p-md-3 " :class = "clase">
            <div class = "container"> 

                <router-link to = "/" class = "navbar-brand">Prueba</router-link>

                <button class = "navbar-toggler" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navbarNav" aria-controls = "navbarNav" aria-expanded = "false" aria-label = "Toggle navigation"> 
                    <span class = "navbar-toggler-icon"></span> 
                </button>

                <div class = "collapse navbar-collapse" id = "navbarNav">
                    <ul class = "navbar-nav ms-auto">
                        <li class = "nav-item"> <router-link to = "/" class = "nav-link seleccion">Inicio</router-link> </li>
                        <li class = "nav-item"> <router-link to = "/viajes/nuevo"  class = "nav-link seleccion" href = "#">Nuevo viaje</router-link> </li>
                    
                    <!--  -->
                    <li class = "nav-item dropdown me-2" v-if = "existeUsuario">
                        <a href = "#" class = "nav-link dropdown-toggle">Hola, {{ usuario.email }}</a>
                        <ul class = "dropdown-menu mb-3">
                            <li><router-link to = "/perfil" class = "dropdown-item">Perfil</router-link></li>
                            <li><router-link to = "/conductores/nuevo" class = "dropdown-item">Ser conductor</router-link></li>
                            <li><router-link to = "/usuarios/preferencias" class = "dropdown-item">Mis preferencias</router-link></li>
                            <li><label class = "dropdown-item" @click = "cerrarSesion">Cerrar sesión</label></li>
                        </ul>
                    </li>                    
                    
                    </ul>
                        
                    <div>
                        <router-link to = "/login/ingresar" class = "btn btn-primary shadow-none ms-2" v-if = "!existeUsuario">Acceder</router-link>    
                    </div>

                    </div>
                </div>
            </nav>
    </header>

</template>

<script>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default 
{
    setup() 
    {

        const clase = ref('shadow bg-navbar')
        const store = useStore()   

        const cerrarSesion = () => {
            store.dispatch('cerrarSesion')
        }   

        const existeUsuario = computed(() => store.getters.existeUsuario)                     

        const usuario = computed(() => store.state.usuario)      

        onBeforeMount(() => 
        {
            clase.value = null

            window.addEventListener('scroll', function () 
            {
                if (window.pageYOffset > 100)
                {
                    clase.value = 'shadow bg-navbar' 
                }
                else
                {
                    clase.value = null
                }
            })

        })

        return { cerrarSesion, existeUsuario, usuario, clase }

    }
}
</script>


<style scoped >

.navbar .navbar-brand, .navbar .navbar-brand:hover
{
    /*color: #023e8a;*/
    color: #fff;
    font-weight: 600;
}

.navbar .container div .btn.btn-primary 
{
    text-transform: capitalize;
    width: 100px;
    background-color: transparent;
    /*color: #023e8a;*/
    color: #fff;
    font-weight: 600;
    /*border: 2px solid #023e8a;*/
    border: 2px solid #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 20px;
    transition: .5s;
}

.navbar .container div .btn.btn-primary:hover 
{
    background-color: #fff;
    color: #000;
}

.navbar .container ul li.nav-item .nav-link 
{
    /*color: black;*/
    color: #fff;
    font-size: 1rem;
    border-bottom: 2px solid transparent;
    padding: .5rem 0;
    margin: 0 .8rem;
}

.navbar .container ul li.nav-item .seleccion:hover 
{
    /*border-bottom: 2px solid #023e8a;*/
    border-bottom: 2px solid #fff;
}

.navbar .container ul li.nav-item .nav-link.active 
{
    border-bottom: 2px solid #023e8a;
}   

.navbar ul li:hover > ul,
 ul li ul:hover 
 {
    visibility: visible;
    opacity: 1;
    display: block;
    min-width: 200px;
    text-align: left;
}

.navbar ul li ul li a:hover, .navbar ul li ul li label:hover  
{
    padding-left: 10px;
    border-left: 2px solid #023e8a;
    transition: all 0.3s ease;
}

.navbar ul li ul li a 
{
    transition: all 0.5s ease;
}

/* */
.header-nav .bg-navbar 
{
    background: hsla(210, 13%, 94%, 1);
    background: linear-gradient(90deg, rgb(238, 238, 242) 0%, rgb(229, 228, 236) 100%);
    background: -moz-linear-gradient(90deg, hsla(210, 13%, 94%, 1) 0%, rgb(228, 230, 236) 100%);
    background: -webkit-linear-gradient(90deg, hsla(210, 13%, 94%, 1) 0%, rgb(228, 228, 236) 100%);
}

.header-nav .bg-navbar a, .header-nav .bg-navbar .navbar-brand:hover {
    color: #023e8a;
}

.header-nav .bg-navbar .container ul li.nav-item .nav-link 
{
color: #000;
}

.header-nav .bg-navbar .container ul li.nav-item .seleccion:hover 
{
    border-bottom: 2px solid #023e8a;
}

.header-nav .bg-navbar .container div .btn.btn-primary 
{
    color: #023e8a;
    border: 2px solid #023e8a;
}

.header-nav .bg-navbar .container div .btn.btn-primary:hover 
{
    background-color: #023e8a;
    color: #fff;
}

.header-nav .bg-navbar ul li ul li a 
{
    color: #000;
}
</style>