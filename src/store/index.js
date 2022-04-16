import { createStore } from 'vuex'
import { auth, firebase, db } from '../Firebase'
import router from '../router'
import { useImagen } from  '../Composables/useImagen'
import { getDatos } from '../Composables/getDatos'
import { setViaje } from '../Composables/setViaje'
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'

export default createStore({
  state: 
  {
    usuario: null,
    telefono: null,
    error: null,
    preguntasFrecuentes: [],
    preguntasFrecuentesDestacadas: [],
    viajes: [],
    viajesBusqueda: [],
  },
  mutations: 
  {
    setUsuario(state, usuario) 
    {
      state.usuario = usuario
    },
    setTelefono(state, telefono)
    {
      state.telefono = telefono
    },
    setError(state, error) 
    {

      const mostrarOpcion = {
        'auth/user-not-found': 'El correo electrónico ingresado no está asociado a ninguna cuenta.',
        'auth/invalid-password': 'La contraseña ingresada es incorrecta. Debe tener al menos 6 caracteres.',
        'auth/email-already-in-use': 'El correo electrónico ya está asociado a una cuenta.',
        'auth/invalid-email': 'El correo electrónico ingresado es incorrecto.',
        'auth/internal-error': 'El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. Inténtelo de nuevo en otro momento.',
        'auth/wrong-password': 'La contraseña ingresada es incorrecta.',
        'errorNumeroValidar': 'El número de teléfono ingresado no es válido.',
        'errorCodigoValidar': 'El código ingresado es incorrecto.'
      }

      const mensaje = mostrarOpcion[error] || '¡Ha ocurrido un error desconocido! Inténtelo de nuevo en otro momento.'

      state.error = (error != null ? mensaje : null)
    },
    setPreguntasFrecuentes(state, pregunta)
    {
      state.preguntasFrecuentes = pregunta
    },
    setPreguntasFrecuentesDestacadas(state, pregunta)
    {
      state.preguntasFrecuentesDestacadas = pregunta
    },
    setViajes(state, viaje)
    {
      state.viajes = viaje
    },
    setViajesBusqueda(state, viaje)
    {
      state.viajesBusqueda = viaje
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
          await router.push('/verificar/usuario')
          commit('setError', null)  

        } catch (error) {
          console.log(error)
          commit('setError', error.code)          
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
          commit('setError', null)  

        } catch (error) {
          console.log(error)
          commit('setError', error.code)
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
        db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + respuesta.user.uid + '/customData')
        .child('status').set(" ") 

        commit('setUsuario', Object.assign({uid: respuesta.user.uid}, usuarioIniciado ))
        await router.push("/")
        commit('setError', null)  

      } catch (error) 
      {
        console.log(error)
        commit('setError', error.code)
      }
    },

     async verificarTelefono({commit}, telefono)
    {

      console.log(telefono)

      try
      {
        const response = await fetch(`https://twilio-verify-api.herokuapp.com/number?phonenumber=${telefono}`)
        const data = await response.json()

        console.log(data)
        console.log(data.data.status)

        if(data.data.status === 'pending')
        {
          router.push('/verificar/comprobar')
          commit("setTelefono", telefono) 
          commit('setError', null)  
        }
        else
        {
          commit('setError', 'errorNumeroValidar')  
        }

      }
      catch(error)
      {
        console.log("error:" + error)
        commit('setError', error)  
      }

    },
    async verificarCodigo({commit, state}, verificacion)
    {
      try 
      {
        commit('setError', null) 
        console.log(verificacion.codigo + " - " + verificacion.telefono)

        const response = await fetch(`https://twilio-verify-api.herokuapp.com/verify?phonenumber=${verificacion.telefono}&code=${verificacion.codigo}`)
        const data = await response.json()

        console.log(data)
        console.log(data.data.status)

        
        if(data.data.valid)
        {
      
          commit('setError', null) 

          db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid)
          .child('status').set(verificacion.telefono)             

          alert('Correcto')
          await router.push('/')
      
        }
        else
        {
          commit('setError', 'errorCodigoValidar') 
        }
        

      } 
      catch (error) 
      {
        console.log("error:" + error)
        commit('setError', error)          
      }
    },
    async cerrarSesion({commit}) 
    {
      await auth.signOut()
      router.push("/")
      commit("setUsuario", null) 
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
    },


  //////////
  async getPreguntasFrecuentes({commit})
  {
    try 
    {

      const referencia = db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Preguntas frecuentes')

      await referencia.once('value', function(snapshot) 
      {
        var data = snapshot.val()
        //commit('setPreguntasFrecuentes', data)  

        const arrayDatos = []

        for (let id in data)
        {
          arrayDatos.push(data[id])
        }
          
        console.log(arrayDatos)
        commit('setPreguntasFrecuentes', arrayDatos)  
      }) 

    } catch (error) 
    {
      console.log(error)
    }
  },
  getPreguntasDestacadas({commit, state})
  {
    /*const filtro = state.preguntasFrecuentes.filter(pregunta => {
      return pregunta.destacado.includes('true')
    })*/
    const arrayDatos = []
    
    for (let id in state.preguntasFrecuentes)
    {

      if(state.preguntasFrecuentes[id].Destacado)
      {
        arrayDatos.push(state.preguntasFrecuentes[id])
      }
    }
    commit('setPreguntasFrecuentesDestacadas', arrayDatos)  
    console.log(arrayDatos)
  },
  async enviarSolicitudConductor({commit, state}, conductor)
  {
    console.log(conductor)

    const { subirImagen } = useImagen()  

    try 
    {

      const datosConductor = {
        nombre: conductor.nombre,
        telefono: conductor.telefono,
        correo: state.usuario.email,
        ['foto de perfil']: await subirImagen(conductor.fotoPerfil, state.usuario.uid + 'fcf'),
        ['dni fontral']: await subirImagen(conductor.cedulaFrontal, state.usuario.uid + 'fdcf'),
        ['dni posterior']: await subirImagen(conductor.cedulaPosterior, state.usuario.uid + 'fdcp'),
        ['licencia frontal']: await subirImagen(conductor.licenciaFrontal, state.usuario.uid + 'flcf'),
        ['licencia posterior']: await subirImagen(conductor.licenciaPosterior, state.usuario.uid + 'flcp'),
        status: 'pendiente'
      }
  
      const datosCarro = {
        placa: conductor.placa,
        marca: conductor.marca,
        ['foto vehiculo']: await subirImagen(conductor.carroFoto, state.usuario.uid + 'fcv'),
        ['foto placa']: await subirImagen(conductor.matriculaFoto, state.usuario.uid + 'fcp')
      }
  
      db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Solicitudes/' + state.usuario.uid)
      .set(datosConductor)
      
      db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Solicitudes/' + state.usuario.uid + '/Vehiculos asignados/' + state.usuario.uid)
      .set(datosCarro) 

      // Guardar foto de perfil en members
      db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid)
      .child('photoURL').set(datosConductor['foto de perfil'])

      commit('setError', null)
      alert('Correctoooo')
      router.push('/')

    } catch (error) 
    {
      console.log(error)
      commit('setError', error)   
    }

  },

  async publicarViajeNormal({commit, state}, viaje)
  {
    const { getDatosFirebase } = getDatos()
    const { setViajeNormal  } = setViaje()

    const getUsuario = await getDatosFirebase('projects/proj_xxBUmVeZH1i7CKg2Uph27C/apps/app_fXEypfETn4hzKcy9uyfNhF/members/' + state.usuario.uid)

    const getConductor = await getDatosFirebase('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Solicitudes/' + state.usuario.uid)

    console.log(getUsuario)
    console.log(getConductor)

    const datosUsuario = {
      ['User id']: state.usuario.uid,
      ['Chofer nombre']: getUsuario.name,
      ['foto de perfil']: getConductor['foto de perfil']
    }

    await setViajeNormal(viaje, datosUsuario)

    router.push('/')

  },

  ////
  async getViajes({commit})
  {
    try 
    {

      const { getCiudadViaje } = getDatosViaje()

      const referencia = db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje')

       referencia.once('value', async function (snapshot) 
      {
        var data = snapshot.val()

        const arrayDatos = []
        let varia = 0

        for (let id in data)
        {

          arrayDatos.push(data[id])
          arrayDatos[varia].ciudadOrigen = await getCiudadViaje(data[id]['Origen latitude'], data[id]['Origen longitude'])
          arrayDatos[varia].ciudadDestino = await getCiudadViaje(data[id]['Destino latitude'], data[id]['Destino longitude'])

          varia++
        }
   
        console.log(arrayDatos) 
        commit('setViajes', arrayDatos)  

      }) 

    } catch (error) 
    {
      console.log(error)
    }
  },

  getViajesBusqueda({commit, state}, busqueda)
  {

    const arrayDatos = []

    for (let id in state.viajes)
    {

      if(state.viajes[id]['Fecha salida'] === busqueda.busquedaFecha 
        && state.viajes[id]['ciudadOrigen'] === busqueda.busquedaOrigen 
        && state.viajes[id]['ciudadDestino'] === busqueda.busquedaDestino)
      {
        arrayDatos.push(state.viajes[id])
      }

    }

    commit('setViajesBusqueda', arrayDatos)  
  },

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


