import { firebase } from '../Firebase'
import  { customAlphabet }  from  'nanoid'
import 'firebase/storage'

export const useImagen = () => 
{

    const setImagenn = async(foto, nombre) =>
    {
        const urlAlfabeto = 'useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict'
      
        const  nanoid  =  customAlphabet (urlAlfabeto, 10) 

        //
        let storageRef = firebase.storage().ref('/media/proj_xxBUmVeZH1i7CKg2Uph27C/app_fXEypfETn4hzKcy9uyfNhF/dataApplications/' + nanoid(22))
    
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