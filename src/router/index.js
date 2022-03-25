import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { firebase, auth } from "../Firebase"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Inicio' }
  },
  {
    path: '/login/:op',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LogIn.vue'),
    meta: { title: 'Inicia sesión' }
  },
  {
    path: "/login",
    redirect: "/login/ingresar"
  },
  {
    path: '/verificar/:op',
    name: 'Verificar',
    component: () => import(/* webpackChunkName: "VerifyNumber" */ '../views/VerifyNumber.vue'),
    meta: { requiresAuth: true, title: 'Verificación' }
  },
  {
    path: "/verificar",
    redirect: "/verificar/usuario"
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "Perfil" */ '../views/Perfil.vue')
    ,meta: { requiresAuth: true, title: 'Perfil' }
  },
  {
    path: '/ayuda',
    name: 'CentroAyuda',
    component: () => import(/* webpackChunkName: "Centro de Ayuda" */ '../views/CentroAyuda.vue'),
    meta: { title: 'Centro de ayuda' }
  },
  {
    path: '/conductores/nuevo',
    name: 'Conductores',
    component: () => import(/* webpackChunkName: "Registro de conductores" */ '../views/RegistroConductor.vue')
    ,meta: { requiresAuth: true, title: 'Conductores' }
  },
  {
    path: '/viajes/nuevo',
    name: 'Viajes',
    component: () => import(/* webpackChunkName: "Viajes" */ '../views/Viajes.vue')
    ,meta: { requiresAuth: true, title: 'Viajes' }
  },
  {
    path: '/viajes/busqueda',
    name: 'BuscarViajes',
    component: () => import(/* webpackChunkName: "Centro de Ayuda" */ '../views/BuscarViajes.vue'),
    meta: { title: 'Viajes' }
  },
  {
    path: '/usuarios/preferencias',
    name: 'Preferencias',
    component: () => import(/* webpackChunkName: "Preferencias" */ '../views/PreferenciasUsuario.vue')
    ,meta: { requiresAuth: true, title: 'Preferencias de usuarios' }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//Verificacion de rutas protegidas
router.beforeEach(async (to, from, next) => 
{

  if((to.path === '/login/ingresar' || to.path === '/login/registro') && auth.currentUser)  
  {
    next('/')
    return
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  
  if(requiresAuth && !(await firebase.getCurrentUser()))  {
    next("/login/ingresar")
  }
  else {
    next()
  }

})


//Cambio de titulo de la pestaña
router.beforeEach((to, from, next) => 
{
  document.title = to.meta.title
  next()
})

export default router
