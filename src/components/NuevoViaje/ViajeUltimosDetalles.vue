
<template>
        
    <section class = "margin-top" v-if = "true">

    <!-- Formulario de ultimos detalles sobre el viaje -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Ultimos detalles acerca de tu viaje</h2>
                        <p>Cuéntanos más sobre tu viaje.</p>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          

                            <!--  -->
                            <div class = "row justify-content-center mt-1 mb-4">
    
                                <div class = "col-12 col-md-6">
                                    <textarea class = "form-control form-control-lg" v-model = "datosViajes.comentarios" placeholder = "¿El espacio de tu maletero es limitado? ¿Aceptas mascotas? Informa a tus pasajeros" rows = "3" required></textarea>
                                </div>
                                  
                            </div>

                            <!--  -->
                            <div class = "row justify-content-center mb-4">
    
                                <div class = "col-12 col-md-6">
                                    <div class = "form-check form-switch">
                                        <input class = "form-check-input" v-model= "opcionMujeres" type = "checkbox" role = "switch" id = "flexSwitchCheckChecked">
                                        <label class = "form-check-label" for = "flexSwitchCheckChecked">¿Este viaje solo acepta mujeres?</label>
                                    </div>
                                </div>
                                  
                            </div>

                            <!-- Enviar formulario -->
                            <div class = "row justify-content-center d-grid mt-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-5">Publicar</button>
                                </div>             
                            </div>  
    
                      </form>
    
            </div>
        </div>
    </section>

</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default 
{
    props: ['datosViajes'],
    setup(props) 
    {
        const opcionMujeres = ref(false)
        const store = useStore()

        const procesarFormulario = () =>
        {
            props.datosViajes.aceptaMujeres = opcionMujeres

            store.dispatch('publicarViajeNormal', props.datosViajes)
        }   

        return { procesarFormulario, opcionMujeres } 
    }
}
</script>