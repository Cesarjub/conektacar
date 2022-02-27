import { firebase } from '../Firebase'
import 'firebase/storage'

export const useImagen = () => 
{

    const setImagenn = async(foto, nombre) =>
    {
        let storageRef = firebase.storage().ref('/media/proj_xxBUmVeZH1i7CKg2Uph27C/app_fXEypfETn4hzKcy9uyfNhF/dataApplications/' + nombre)
    
        await storageRef.put(foto)

        return storageRef
    }

    const subirImagen = async(foto, nombre) => 
    {
        let storageRef = await setImagenn(foto, nombre)

        return storageRef.getDownloadURL()
    }

    return { subirImagen }
    
}