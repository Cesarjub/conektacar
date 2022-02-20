import { createStore } from 'vuex'
import {auth, firebase, db} from '../Firebase'
import router from '../router'

export default createStore({
  state: 
  {
    usuario: null,
    error: null
  },
  mutations: 
  {
    setUsuario(state, usuario) 
    {
      state.usuario = usuario
    },
    setError(state, error) 
    {
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
            name: usuario.nombre,
            email: respuesta.user.email
          }

          db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid)
          .set(usuarioCreado)
          //db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid + '/customData')
          //.child('Fecha de Nacimiento').set(usuario.nacimiento)  
          db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid + '/customData')
          .child('status').set(" ") 

          commit('setUsuario', Object.assign({uid: respuesta.user.uid}, usuarioCreado ))
          await router.push('/')

        } catch (error) {
          console.log(error)
          commit('setError', error)          
        }
    },
    async ingresoUsuario({commit}, usuario) 
    {
        try 
        {

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
    async ingresarGoogle({commit}) 
    {
      try 
      {
        const provider = new firebase.auth.GoogleAuthProvider()
        const respuesta = await auth.signInWithPopup(provider)

        console.log(respuesta)

        const usuarioIniciado = {
          email: respuesta.user.email,    
          name: respuesta.user.displayName
        }  

        db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid).set(usuarioIniciado)
        //db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid + '/customData')
        //.child('Fecha de Nacimiento').set(usuario.nacimiento)  
        db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid + '/customData')
        .child('status').set(" ") 

        commit('setUsuario', Object.assign({uid: respuesta.user.uid}, usuarioIniciado ))
        await router.push("/")

      } catch (error) 
      {
        console.log(error)
        commit('setError', error)
      }
    },

     async verificarTelefono({commit})
    {


     try
      {
        const response = await fetch('https://twilio-verify-api.herokuapp.com/number?phonenumber=529381510496')
        const data = await response.json()

        console.log(data)

      }
      catch(error)
      {
        console.log("error:" + error)
      }

      console.log('Adentroooo')

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

          if(router.isReady() && (router.currentRoute.value.path === '/login/ingresar' 
            || router.currentRoute.value.path === '/login/registro'))
          {
            router.push('/')
          }

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


