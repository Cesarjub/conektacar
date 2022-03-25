import { db } from '../Firebase'

export const getDatos = () => 
{
    const getDatosFirebase = async(coleccion) =>
    {
        const referencia = db.ref(coleccion)

        let datos = ''

        await referencia.once('value', function(snapshot) 
        {
          //var data = snapshot.val()
          //console.log(data)

          datos = snapshot.val()

        })    
        
        return datos
        
    }

    return { getDatosFirebase }
}