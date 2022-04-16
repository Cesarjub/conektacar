
<template>

    <section class = "margin-top" v-if = "siguienteForm">

    <!-- Confirmar ruta de ida  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>

                      <form @submit.prevent = "procesarFormulario">
                          
                    <div class = "row justify-content-between mt-5 mb-3">

                        <!-- Ruta de ida -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <h2 class = "fw-bold mb-4">Confirma tu ruta</h2> 

                            <!-- -->
                            <div class = "alert alert-primary" role = "alert">
                                {{ datosViajes.direccionOrigen }}
                            </div>

                            <!-- -->
                            <div v-if = "datosViajes.agregarParada" class = "alert alert-warning" role = "alert">
                                {{ datosViajes.direccionParada }}
                            </div>

                            <!-- -->
                            <div class = "alert alert-success" role = "alert">
                                {{ datosViajes.direccionDestino }}
                            </div>

                            <!-- -->
                            <button type = "submit" class = "btn btn-primary mt-2 col-sm-4 btn-lg shadow-sm">Continuar</button>
                       
                            <p class = "mt-5">Distancia: {{ distancia.distancia }}</p>
                            <p class = "">Distancia en carro: {{ distancia.distanciaCarro }} </p>
                            <p class = "">Tiempo en carro: {{ distancia.duracionCarro }} </p>
                            
                            <div v-if = "datosViajes.agregarParada">
                                <p class = "mt-2">Parada:</p>
                                <p>-Distancia: {{ distancia.distanciaParada }}</p>
                                <p class = "">Distancia en carro: {{ distancia.distanciaCarroParada }} </p>
                                <p class = "mb-2">Tiempo en carro: {{ distancia.duracionCarroParada }} </p>

                                <p>-Distancia: {{ distancia.distanciaParadaDestino }}</p>
                                <p class = "">Distancia en carro: {{ distancia.distanciaCarroParadaDestino }} </p>
                                <p class = "mb-5">Tiempo en carro: {{ distancia.duracionCarroParadaDestino }} </p>
                            </div>
                       
                        </div>

                    <!-- Mapa -->
                    <div class = "col-sm-6 ">  

                    <MapaRutaSencilla v-if = "!datosViajes.agregarParada" :ubicacion = "{latOrigen: datosViajes.latOrigen, lngOrigen: datosViajes.lngOrigen, latDestino: datosViajes.latDestino, lngDestino: datosViajes.lngDestino}"  />
                    <MapaRutaParada v-if = "datosViajes.agregarParada" :ubicacion = "{latOrigen: datosViajes.latOrigen, lngOrigen: datosViajes.lngOrigen, latDestino: datosViajes.latDestino, lngDestino: datosViajes.lngDestino, latParada: datosViajes.latParada, lngParada: datosViajes.lngParada}"  />

                </div>  

            </div>
                    
        </form>
    
            </div>
        </div>
    </section>   

    <div id = "map"></div>

    <ViajeFecha v-if = "!siguienteForm" :datosViajes = "datosViajes" />     

</template>

<script>
import { getDistancia } from '/src/Composables/getDistancia.js'
import { ref, onMounted } from 'vue'
import ViajeFecha from './ViajeFecha'
import MapaRutaSencilla from './Mapas/MapaRutaSencilla'
import MapaRutaParada from './Mapas/MapaRutaParada'

export default 
{
    props: ['datosViajes'],
    components: {
        ViajeFecha,
        MapaRutaSencilla,
        MapaRutaParada
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

            const distanciaObtenida = await getDistanciaMapa({latOrigen: props.datosViajes.latOrigen, lngOrigen: props.datosViajes.lngOrigen, latDestino: props.datosViajes.latDestino, lngDestino: props.datosViajes.lngDestino})

            distancia.value.distancia = distanciaObtenida.distancia + " mi."
            distancia.value.distanciaCarro = distanciaObtenida.distanciaCarro
            distancia.value.duracionCarro = distanciaObtenida.tiempoCarro

            props.datosViajes.distanciaIda = distanciaObtenida.distanciaCarro
            props.datosViajes.duracionIda = distanciaObtenida.tiempoCarro

            if(props.datosViajes.agregarParada)
            {
                const distanciaParada = await getDistanciaMapa({latOrigen: props.datosViajes.latOrigen, lngOrigen: props.datosViajes.lngOrigen, latDestino: props.datosViajes.latParada, lngDestino: props.datosViajes.lngParada})
            
                distancia.value.distanciaParada = distanciaParada.distancia + " mi."
                distancia.value.distanciaCarroParada = distanciaParada.distanciaCarro
                distancia.value.duracionCarroParada = distanciaParada.tiempoCarro

                props.datosViajes.distanciaIdaOrigenParada = distanciaParada.distanciaCarro
                props.datosViajes.duracionIdaOrigenParada = distanciaParada.tiempoCarro
            
                /////////////////////
                const distanciaParadaDestino = await getDistanciaMapa({latOrigen: props.datosViajes.latParada, lngOrigen: props.datosViajes.lngParada, latDestino: props.datosViajes.latDestino, lngDestino: props.datosViajes.lngDestino})
            
                distancia.value.distanciaParadaDestino = distanciaParadaDestino.distancia + " mi."
                distancia.value.distanciaCarroParadaDestino = distanciaParadaDestino.distanciaCarro
                distancia.value.duracionCarroParadaDestino = distanciaParadaDestino.tiempoCarro

                props.datosViajes.distanciaIdaParadaDestino = distanciaParadaDestino.distanciaCarro
                props.datosViajes.duracionIdaParadaDestino = distanciaParadaDestino.tiempoCarro

            }

        })

        return { procesarFormulario, siguienteForm, distancia }
    }     
}
</script>