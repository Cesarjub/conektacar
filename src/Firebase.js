import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

import { getDatabase } from "firebase/database"

//Configuracion de firebase
const firebaseConfig = 
{
  apiKey: "AIzaSyARP2tF49GTRbUHLSCYTUWLg_Dc882ozTw",
  authDomain: "transervisoro-taxi-ejecutivo.firebaseapp.com",
  databaseURL: "https://transervisoro-taxi-ejecutivo-default-rtdb.firebaseio.com",
  projectId: "transervisoro-taxi-ejecutivo",
  storageBucket: "transervisoro-taxi-ejecutivo.appspot.com",
  messagingSenderId: "1092003816032",
  appId: "1:1092003816032:web:a4d45777ebd62c474cd905"
}

//Inicializacion de firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

//
const db = firebase.database()
//const db = firebase.firestore()

//Metodos de autenticacion
const auth = firebase.auth()

//Verifica si el usuario esta conectado
firebase.getCurrentUser = () => 
{
  return new Promise((resolve, reject) => {
    //Observador para comprobar si el usuario esta activo
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export { db, auth, firebase }