
<template>
        
    <section class = "margin-top">

        <!-- Consulta de viajes  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">
                Viaje: {{ datosBusqueda.busquedaOrigen = $route.query.origen }} 
                -> {{ datosBusqueda.busquedaDestino = $route.query.destino }} 
                // {{ datosBusqueda.busquedaFecha = $route.query.fecha }}
                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">...</h2>
                    </div>
                    
                    <CardViaje v-for = "(viajeT, index) in datosViajes" :key = "viajeT" :datosViajes = "viajeT" />     

            </div>
        </div>
    </section>    

{{ datosViajes.horaLlegada }}
<div class = "d-none"> {{ viajes }} </div>

<!--{{datosViajes}}-->
</template>

<script>
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'
import CardViaje from './CardViaje'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default 
{
    components: {
        CardViaje
    },    
    setup(props) 
    {
        const datosViajes = ref([{}])
        const datosBusqueda = ref({})

        const { getHoraViaje, getCiudadViaje, getDiferenciasHoras } = getDatosViaje()

        const store = useStore()

        const viajes = computed(async() => 
        {
            //return store.state.viajes
            

            await store.dispatch('getViajesBusqueda', datosBusqueda.value)

            if(store.state.viajesBusqueda.length === 0)
            {
                //alert("No hay resultados")
            }

            store.state.viajesBusqueda.map( function(dato, index)
            {

                /*if(dato['Hora llegada'])
                {
                    dato['Hora llegada'] = getHoraViaje(dato['Hora llegada'])
                }

                if(dato['Hora salida'])
                {
                    dato['Hora salida'] = getHoraViaje(dato['Hora salida'])
                }*/

                //dato['Viaje origen'] = await getCiudadViaje(dato['Origen latitude'], dato['Origen longitude'])

                //dato['destino'] = await getCiudadViaje(dato['Destino latitude'], dato['Destino longitude'])
                
                console.log(dato)
                datosViajes.value[index] = dato
                datosViajes.value[index].horaLlegada = getHoraViaje(dato['Hora llegada'])
                datosViajes.value[index].horaSalida = getHoraViaje(dato['Hora salida'])
                datosViajes.value[index].diferenciaHoras = getDiferenciasHoras(dato['Hora salida'], dato['Hora llegada'])
                //datosViajes.value[index].ciudadOrigen = await getCiudadViaje(dato['Origen latitude'], dato['Origen longitude'])
                //datosViajes.value[index].ciudadDestino = await getCiudadViaje(dato['Destino latitude'], dato['Destino longitude'])

            })

        })


        onMounted(async() => 
        {

            await store.dispatch('getViajes')
            
            //await store.dispatch('getViajesBusqueda', datosBusqueda.value)

        }) 

        return { datosViajes, viajes, datosBusqueda }
    }
}
</script>