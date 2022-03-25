import { db } from '../Firebase'
import { v4 as uuidv4 } from 'uuid'

export const setViaje = () => 
{
    const setViajeNormal = async(viaje, usuario) =>
    {
        try 
        {

            /// ORIGEN -> DESTINO (IDA) //////////////////////
            const datosViaje = {
                ['Asientos']: viaje.cantidadPasajeros,
                ['Asientos disponibles']: viaje.cantidadPasajeros,
                ['Solo mujeres']: viaje.aceptaMujeres,
                ['Comentarios viaje']: viaje.comentarios,
                ['Tiene parada']: viaje.agregarParada,
                ['Tipo de reserva']: (viaje.formaReserva ? 'automatica' : 'manual'),
            }

            const viajePadre = {
                ['Fecha salida']: viaje.fechaIda,
                ['Hora salida']: viaje.horaIda,
                ['Precio plaza']: viaje.precioPlazaIda,
                ['Hora llegada']: viaje.horaIdaLlegada,
                ['Viaje padre']: true
            }

            const datosCarro = {

            }

            ///////////////////
            const datosDestino = {
                ['Destino direccion']: viaje.direccionDestino,
                ['Destino latitude']: viaje.latDestino,
                ['Destino longitude']: viaje.lngDestino
            }

            ///////////////////
            const datosOrigen = {
                ['Origen direccion']: viaje.direccionOrigen,
                ['Origen latitude']: viaje.latOrigen,
                ['Origen longitude']: viaje.lngOrigen
            }     
            
            const newPostRef = uuidv4()
            console.log(newPostRef)

             await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + newPostRef)
            .set({...usuario, ...datosViaje, ...datosCarro, ...viajePadre, ...datosDestino, ...datosOrigen})

            /// DESTINO -> ORIGEN (REGRESO) //////////////////////
            if(viaje.publicarRegreso)
            {

                const viajeRedondo = {
                    ['Fecha salida']: viaje.fechaRegreso,
                    ['Hora salida']: viaje.horaRegreso,
                    ['Viaje padre']: false,
                    ['Viaje padre Id']: newPostRef,
                    ['Precio plaza']: viaje.precioPlazaRegreso,
                    ['Hora llegada']: viaje.horaRegresoLlegada,
                }

                ///////////////////
                const datosOrigenRedondo = {
                    ['Origen direccion']: viaje.direccionDestino,
                    ['Origen latitude']: viaje.latDestino,
                    ['Origen longitude']: viaje.lngDestino
                }                

                ///////////////////
                const datosDestinoRedondo = {
                    ['Destino direccion']: viaje.direccionOrigen,
                    ['Destino latitude']: viaje.latOrigen,
                    ['Destino longitude']: viaje.lngOrigen
                }                

                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeRedondo, ...datosOrigenRedondo, ...datosDestinoRedondo})      
                  
            }   

            /// AGREGAR PARADA // PARADA -> DESTINO (IDA) //////////////////////
            if(viaje.agregarParada)
            {
                const viajeParada = {
                    ['Fecha salida']: viaje.fechaIda,
                    ['Hora salida']: viaje.horaIda,
                    ['Viaje padre']: false,
                    ['Viaje padre Id']: newPostRef,
                    ['Precio plaza']: viaje.precioIdaParadaDestino,
                    ['Hora llegada']: viaje.horaIdaLlegadaParadaDestino,
                }

                ///////////////////
                const datosOrigenParada = {
                    ['Origen direccion']: viaje.direccionParada,
                    ['Origen latitude']: viaje.latParada,
                    ['Origen longitude']: viaje.lngParada
                }

                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeParada, ...datosOrigenParada, ...datosDestino})      
                            
            }
            
            /// ORIGEN -> PARADA (IDA) //////////////////////
            if(viaje.agregarParada)
            {
                const viajeParada = {
                    ['Fecha salida']: viaje.fechaIda,
                    ['Hora salida']: viaje.horaIda,
                    ['Viaje padre']: false,
                    ['Viaje padre Id']: newPostRef,
                    ['Precio plaza']: viaje.precioIdaOrigenParada,
                    ['Hora llegada']: viaje.horaIdaLlegadaOrigenParada,
                }

                ///////////////////
                const datosDestinoParada = {
                    ['Destino direccion']: viaje.direccionParada,
                    ['Destino latitude']: viaje.latParada,
                    ['Destino longitude']: viaje.lngParada
                }                

                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeParada, ...datosOrigen, ...datosDestinoParada})      
                     
            }

            //////////////////////////////// 
            if(viaje.agregarParada && viaje.publicarRegreso && viaje.opcionRegreso === 'op1')
            {
                /// DESTINO -> PARADA (REGRESO) //////////////////////
                const viajeRedondo = {
                    ['Fecha salida']: viaje.fechaRegreso,
                    ['Hora salida']: viaje.horaRegreso,
                    ['Viaje padre']: false,
                    ['Viaje padre Id']: newPostRef,
                    ['Precio plaza']: viaje.precioRegresoOrigenParada,
                    ['Hora llegada']: viaje.horaRegresoLlegadaOrigenParada,
                }                

                ///////////////////
                const datosOrigenRedondo = {
                    ['Origen direccion']: viaje.direccionDestino,
                    ['Origen latitude']: viaje.latDestino,
                    ['Origen longitude']: viaje.lngDestino
                }                

                ///////////////////
                const datosDestinoRedondo = {
                    ['Destino direccion']: viaje.direccionParada,
                    ['Destino latitude']: viaje.latParada,
                    ['Destino longitude']: viaje.lngParada
                }  
                
                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeRedondo, ...datosOrigenRedondo, ...datosDestinoRedondo})      
              
                /// PARADA -> DESTINO (REGRESO) //////////////////////            
                ///////////////////
                const datosParadaOrigenRedondo = {
                    ['Origen direccion']: viaje.direccionParada,
                    ['Origen latitude']: viaje.latParada,
                    ['Origen longitude']: viaje.lngParada,
                    ['Precio plaza']: viaje.precioRegresoParadaDestino,
                    ['Hora llegada']: viaje.horaRegresoLlegadaParadaDestino,
                }                

                ///////////////////
                const datosParadaDestinoRedondo = {
                    ['Destino direccion']: viaje.direccionDestino,
                    ['Destino latitude']: viaje.latDestino,
                    ['Destino longitude']: viaje.lngDestino
                }  
                
                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeRedondo, ...datosParadaOrigenRedondo, ...datosParadaDestinoRedondo})      
                      
            }

            ////////////////////////////////
            if(viaje.agregarParada && viaje.publicarRegreso && viaje.opcionRegreso === 'op3')
            {
                /// DESTINO -> NUEVA PARADA (REGRESO) //////////////////////
                const viajeRedondo = {
                    ['Fecha salida']: viaje.fechaRegreso,
                    ['Hora salida']: viaje.horaRegreso,
                    ['Viaje padre']: false,
                    ['Viaje padre Id']: newPostRef,
                    ['Precio plaza']: viaje.precioRegresoOrigenParada,
                    ['Hora llegada']: viaje.horaRegresoLlegadaOrigenParada,
                }                

                ///////////////////
                const datosOrigenRedondo = {
                    ['Origen direccion']: viaje.direccionDestino,
                    ['Origen latitude']: viaje.latDestino,
                    ['Origen longitude']: viaje.lngDestino
                }                

                ///////////////////
                const datosDestinoRedondo = {
                    ['Destino direccion']: viaje.direccionNuevaParada,
                    ['Destino latitude']: viaje.latNuevaParada,
                    ['Destino longitude']: viaje.lngNuevaParada
                }  
                
                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeRedondo, ...datosOrigenRedondo, ...datosDestinoRedondo})      
              
                /// NUEVA PARADA -> DESTINO (REGRESO) //////////////////////            
                ///////////////////
                const datosParadaOrigenRedondo = {
                    ['Origen direccion']: viaje.direccionNuevaParada,
                    ['Origen latitude']: viaje.latNuevaParada,
                    ['Origen longitude']: viaje.lngNuevaParada,
                    ['Precio plaza']: viaje.precioRegresoParadaDestino,
                    ['Hora llegada']: viaje.horaRegresoLlegadaParadaDestino,
                }                

                ///////////////////
                const datosParadaDestinoRedondo = {
                    ['Destino direccion']: viaje.direccionDestino,
                    ['Destino latitude']: viaje.latDestino,
                    ['Destino longitude']: viaje.lngDestino
                }  
                
                await db.ref('projects/proj_xxBUmVeZH1i7CKg2Uph27C/data/Publicar viaje/' + uuidv4())
                .set({...usuario, ...datosViaje, ...datosCarro, ...viajeRedondo, ...datosParadaOrigenRedondo, ...datosParadaDestinoRedondo})      
                     
            }

            alert('correcto')
            
        } catch (error) 
        {
            alert('error: ' + error)
            return error
        }

    }

    return { setViajeNormal }

}