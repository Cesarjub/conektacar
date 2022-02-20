import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { firebase, auth } from "../Firebase"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/:op',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LogIn.vue')
  },
  {
    path: "/login",
    redirect: "/login/ingresar"
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "Perfil" */ '../views/Perfil.vue')
    //,meta: { requiresAuth: true }
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

export default router
