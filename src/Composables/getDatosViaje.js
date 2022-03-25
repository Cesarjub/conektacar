import { db } from '../Firebase'
import moment from 'moment'

export const getDatosViaje = () =>
{
    const getTarifaDistancia = async(km) =>
    {
        const referencia = db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Configuraciones/0')

        let datos = ''

        await referencia.once('value', function(snapshot) 
        {
          //var data = snapshot.val()
          //console.log(data)

          datos = snapshot.val()

        })    

        console.log(datos['costo por km'])
        console.log((km).replace(',', ''))

        return ((km).replace(',', '') * datos['inicial'])

    }

    const getHorarioLlegada = (tiempoEstimado, horaSalida) =>
    {
        console.log(tiempoEstimado)

        let hora = 0
        let minutos = 0

        if(tiempoEstimado.includes('h') && tiempoEstimado.includes('min'))
        {
            hora = tiempoEstimado.split("h")[0]
            minutos = (tiempoEstimado.split("h")[1]).replace('min', '')
        }

        if(!tiempoEstimado.includes('h') && tiempoEstimado.includes('min'))
        {
            minutos = (tiempoEstimado.split("h")[0]).replace('min', '')
        }

        const horaMinuto = parseInt((hora * (60)) / 1)
        const horaMilisegundo = parseInt(horaMinuto * (60 / 1) * (1000 / 1))
        const minutosMilisegundos = parseInt(minutos * (60 / 1) * (1000 / 1))

        const horaLlegada = minutosMilisegundos + horaMilisegundo

        console.log(horaLlegada)

        return horaLlegada + horaSalida
    }

    const getHoraViaje = (fecha) =>
    {
        const date = new Date(fecha)

        return moment(date.getHours(), "h").format("HH") + ":" + moment(date.getMinutes(), "mm").format("mm")
        //return date.getHours() + ":" + date.getMinutes() //+ ":" + date.getSeconds()

        /*console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());*/
    }

    const getCiudadViaje = async(lat, lng) =>
    {
        try
        {

            const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBSUwF0_JfS0CZybBeAI-aqzz04_e67jDg')

            const direccionObtenida = await res.json()

            console.log(direccionObtenida)

            let ciudad = ""
            const address = direccionObtenida.results[0].address_components

            //recorremos todos los elementos de address
            address.map(async function(ubicacion, p)
            {

                //si es una ciudad 
                if(address[p].types.indexOf("locality") !== -1) 
                {
                    let v = address[p].long_name
                    if(v !== undefined){
                        ciudad = v;
                    }
                }
            
                if(ciudad === "")
                {
                    //si es una ciudad de nivel 2
                    if(address[p].types.indexOf("administrative_area_level_2") !== -1) {
                        let v = address[p].long_name;
                        if(v !== undefined){
                            ciudad = v
                        }
                    }
                }
            })

            return ciudad

        }
        catch(error)
        {
            alert("error viaje: " + error)
        }
    }

    const getDiferenciasHoras = (horaSalida, horaLlegada) =>
    {

        const date = new Date(horaSalida)
        console.log(date)

        var dos = new Date(horaLlegada)

        const dateFormat = "YYYY-MM-DD HH:mm:ss"
        // Get your start and end date/times
        const rightNow = moment(dos).format(dateFormat)
        const thisTimeYesterday = moment(date).format(dateFormat)
        // pass in hours as the second parameter to the diff function

        const differenceInHours = moment(rightNow).diff(thisTimeYesterday, 'hours')
        const min = moment(rightNow).diff(thisTimeYesterday, 'minutes')

        console.log(differenceInHours)
        return differenceInHours  + "h"// + min
    }

    return { getTarifaDistancia, getHorarioLlegada, getHoraViaje, getCiudadViaje, getDiferenciasHoras }
}