
<template>
        
    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Confirmar ruta de regreso  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>

                      <form @submit.prevent = "procesarFormulario">
                          
                    <div class = "row justify-content-between mt-5 mb-3">

                        <!-- Resumen de ruta de viaje -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <h2 class = "fw-bold mb-4">Confirma tu ruta</h2> 

                            <!-- -->
                            <div class = "alert alert-primary" role = "alert">
                                {{ datosViajes.direccionDestino }}
                            </div>

                            <!-- -->
                            <div v-if = "datosViajes.agregarParada && datosViajes.opcionRegreso === 'op1'" class = "alert alert-warning" role = "alert">
                                {{ datosViajes.direccionParada }}
                            </div>

                            <!-- -->
                            <div v-if = "datosViajes.agregarParada && datosViajes.opcionRegreso === 'op3'" class = "alert alert-warning" role = "alert">
                                {{ datosViajes.direccionNuevaParada }}
                            </div>

                            <!-- -->
                            <div class = "alert alert-success" role = "alert">
                                {{ datosViajes.direccionOrigen }}
                            </div>

                            <!-- -->
                            <button type = "submit" class = "btn btn-primary mt-2 col-sm-4 btn-lg shadow-sm">Continuar</button>
                       
                            <p class = "mt-5">Distancia: {{ distancia.distancia }}</p>
                            <p class = "">Distancia en carro: {{ distancia.distanciaCarro }} </p>
                            <p class = "">Tiempo en carro: {{ distancia.duracionCarro }} </p>
                            
                            <div v-if = "datosViajes.agregarParada && datosViajes.opcionRegreso !== 'op2'">
                                <p class = "mt-2">Parada:</p>
                                <p >-Distancia: {{ distancia.distanciaParada }}</p>
                                <p class = "">Distancia en carro: {{ distancia.distanciaCarroParada }} </p>
                                <p class = "mb-2">Tiempo en carro: {{ distancia.duracionCarroParada }} </p>

                                <p>-Distancia: {{ distancia.distanciaParadaDestino }}</p>
                                <p class = "">Distancia en carro: {{ distancia.distanciaCarroParadaDestino }} </p>
                                <p class = "mb-5">Tiempo en carro: {{ distancia.duracionCarroParadaDestino }} </p>
                            </div>
                       
                        </div>

                    <!-- Mapa -->
                    <div class = "col-sm-6 ">  

                        <MapaRutaSencilla v-if = "!datosViajes.agregarParada || datosViajes.opcionRegreso === 'op2'" :ubicacion = "{latOrigen: datosViajes.latDestino, lngOrigen: datosViajes.lngDestino, latDestino: datosViajes.latOrigen, lngDestino: datosViajes.lngOrigen}"  />
                        <MapaRutaParada v-if = "datosViajes.agregarParada && datosViajes.opcionRegreso === 'op1'" :ubicacion = "{latOrigen: datosViajes.latDestino, lngOrigen: datosViajes.lngDestino, latDestino: datosViajes.latOrigen, lngDestino: datosViajes.lngOrigen, latParada: datosViajes.latParada, lngParada: datosViajes.lngParada}" />
                        <MapaRutaParada v-if = "datosViajes.agregarParada && datosViajes.opcionRegreso === 'op3'" :ubicacion = "{latOrigen: datosViajes.latDestino, lngOrigen: datosViajes.lngDestino, latDestino: datosViajes.latOrigen, lngDestino: datosViajes.lngOrigen, latParada: datosViajes.latNuevaParada, lngParada: datosViajes.lngNuevaParada}" />

                    </div>  

            </div>
                    
        </form>
    
            </div>
        </div>
    </section> 

<FechaRegreso v-if = "!siguienteForm" :datosViajes = "datosViajes" />

</template>

<script>
import { getDistancia } from '/src/Composables/getDistancia.js'
import { ref, onMounted } from 'vue'
import FechaRegreso from './FechaRegreso'
import MapaRutaSencilla from '../Mapas/MapaRutaSencilla'
import MapaRutaParada from '../Mapas/MapaRutaParada'

export default 
{
    props: ['datosViajes'],  
    components: {
        FechaRegreso,
        MapaRutaParada,
        MapaRutaSencilla
    },   
    setup(props) 
    {
        const siguienteForm = ref(true) 
        const distancia = ref({})

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
        }

        onMounted(async() => 
        {

            const { getDistanciaMapa } = getDistancia()

            const distanciaObtenida = await getDistanciaMapa({latOrigen: props.datosViajes.latDestino, lngOrigen: props.datosViajes.lngDestino, latDestino: props.datosViajes.latOrigen, lngDestino: props.datosViajes.lngOrigen})

            distancia.value.distancia = distanciaObtenida.distancia + " mi."
            distancia.value.distanciaCarro = distanciaObtenida.distanciaCarro
            distancia.value.duracionCarro = distanciaObtenida.tiempoCarro

            props.datosViajes.distanciaRegreso = distanciaObtenida.distanciaCarro
            props.datosViajes.duracionRegreso = distanciaObtenida.tiempoCarro

            if(props.datosViajes.opcionRegreso === 'op1' && props.datosViajes.agregarParada)
            {
                const distanciaParada = await getDistanciaMapa({latOrigen: props.datosViajes.latDestino, lngOrigen: props.datosViajes.lngDestino, latDestino: props.datosViajes.latParada, lngDestino: props.datosViajes.lngParada})
            
                distancia.value.distanciaParada = distanciaParada.distancia + " mi."
                distancia.value.distanciaCarroParada = distanciaParada.distanciaCarro
                distancia.value.duracionCarroParada = distanciaParada.tiempoCarro

                props.datosViajes.distanciaRegresoOrigenParada = distanciaParada.distanciaCarro
                props.datosViajes.duracionRegresoOrigenParada = distanciaParada.tiempoCarro

                /////////////////////
                const distanciaParadaOrigen = await getDistanciaMapa({latOrigen: props.datosViajes.latParada, lngOrigen: props.datosViajes.lngParada, latDestino: props.datosViajes.latOrigen, lngDestino: props.datosViajes.lngOrigen})
            
                distancia.value.distanciaParadaDestino = distanciaParadaOrigen.distancia + " mi."
                distancia.value.distanciaCarroParadaDestino = distanciaParadaOrigen.distanciaCarro
                distancia.value.duracionCarroParadaDestino = distanciaParadaOrigen.tiempoCarro

                props.datosViajes.distanciaRegresoParadaDestino = distanciaParadaOrigen.distanciaCarro
                props.datosViajes.duracionRegresoParadaDestino = distanciaParadaOrigen.tiempoCarro

            }

            if(props.datosViajes.opcionRegreso === 'op3' && props.datosViajes.agregarParada)
            {
                const distanciaParada = await getDistanciaMapa({latOrigen: props.datosViajes.latDestino, lngOrigen: props.datosViajes.lngDestino, latDestino: props.datosViajes.latNuevaParada, lngDestino: props.datosViajes.lngNuevaParada})
            
                distancia.value.distanciaParada = distanciaParada.distancia + " mi."
                distancia.value.distanciaCarroParada = distanciaParada.distanciaCarro
                distancia.value.duracionCarroParada = distanciaParada.tiempoCarro

                props.datosViajes.distanciaRegresoOrigenParada = distanciaParada.distanciaCarro
                props.datosViajes.duracionRegresoOrigenParada = distanciaParada.tiempoCarro

                /////////////////////
                const distanciaParadaOrigen = await getDistanciaMapa({latOrigen: props.datosViajes.latNuevaParada, lngOrigen: props.datosViajes.lngNuevaParada, latDestino: props.datosViajes.latOrigen, lngDestino: props.datosViajes.lngOrigen})
            
                distancia.value.distanciaParadaDestino = distanciaParadaOrigen.distancia + " mi."
                distancia.value.distanciaCarroParadaDestino = distanciaParadaOrigen.distanciaCarro
                distancia.value.duracionCarroParadaDestino = distanciaParadaOrigen.tiempoCarro
                
                props.datosViajes.distanciaRegresoParadaDestino = distanciaParadaOrigen.distanciaCarro
                props.datosViajes.duracionRegresoParadaDestino = distanciaParadaOrigen.tiempoCarro

            }

        })

        return { siguienteForm, distancia, procesarFormulario }
    } 
}
</script>