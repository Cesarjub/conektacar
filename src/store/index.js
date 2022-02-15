import { createStore } from 'vuex'
import {auth, firebase, db} from '../Firebase'
import router from '../router'

export default createStore({
  state: {
    usuario: null,
    error: null
  },
  mutations: 
  {
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: 
  {
    async crearNuevoUsuario({commit}, usuario) 
    {
        try 
        {
          const respuesta = await auth.createUserWithEmailAndPassword(usuario.email, usuario.clave)

          console.log(respuesta)

          const usuarioCreado = {
            email: respuesta.user.email,
            uid: respuesta.user.uid
          }

          commit('setUsuario', usuarioCreado)
          
          await router.push('/')

        } catch (error) {
          console.log(error)
          commit('setError', error)          
        }
    },
    async ingresoUsuario({commit}, usuario) 
    {
      
        try {
          const respuesta = await auth.signInWithEmailAndPassword(usuario.email, usuario.clave)

          console.log(respuesta)

          const usuarioIniciado = {
            email: respuesta.user.email,
            uid: respuesta.user.uid
          }       
          
          commit('setUsuario', usuarioIniciado)
          await router.push("/")

        } catch (error) {
          console.log(error)
          commit('setError', error)
        }
    },
    async ingresarGoogle({commit}) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const respuesta = await auth.signInWithPopup(provider)

        console.log(respuesta)

        const usuarioIniciado = {
          email: respuesta.user.email,        
          uid: respuesta.user.uid
        }  

        commit('setUsuario', usuarioIniciado)
        await router.push("/")

      } catch (error) 
      {
        console.log(error)
        commit('setError', error)
      }
    },
    async prueba({commit, state}, usuario) 
    {
      
      console.log(state.usuario.uid)

      try 
      {

        await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid).set({
          name: usuario.nombre,
          email: state.usuario.email,
          phone: usuario.telefono        

        })

        await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid + '/customData')
        .child('Fecha de Nacimiento').set(usuario.nacimiento)  

        await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid + '/customData')
        .child('status').set(" ")  

      } catch (error) 
      {
        console.log(error)  
      }

    },
    async cerrarSesion({commit}) 
    {
      await auth.signOut()
      router.push("/")
    },
    autenticarUsuario({commit}) 
    {
      firebase.auth().onAuthStateChanged(user => {
        if (user) 
        {
          commit("setUsuario", user)
        } else {
          commit("setUsuario", null)
        }
      })
    }
  },
  getters: 
  {
    existeUsuario(state)
    {
      return !!state.usuario
    }
  },
  modules: {
  }
})


