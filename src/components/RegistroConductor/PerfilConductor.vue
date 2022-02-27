
<template>

<!-- Formulario 1: solicitud de conductores -->
<section class = "container-fluid mx-auto margin-top" v-if = "siguienteForm"> <!-- px-1 py-2   -->
    <div class = "row d-flex justify-content-center">
        <div class = "col-xl-7 col-md-9 col-11">
            
            <div class = "form-conductor mt-4">

                <div class = "text-center my-3 mb-2">
                    <h2 class = "fw-bold">Registro como conductor</h2>
                    
                </div> 

                <!-- Barra de progreso -->
                <div class = "card text-center px-0 pt-4 pb-0 mb-2">
                
                    <ul class = "progressbar">
                        <li class = "perfil active"><strong>Perfil</strong></li>
                        <li class = "foto"><strong>Fotografía</strong></li>
                        <li class = "identificate"><strong>Identifícate</strong></li>
                        <li class = "carro"><strong>Carro</strong></li>
                        <li class = "licencia"><strong>Licencia</strong></li>
                    </ul>
                
                </div>
            
                <div class = "row mb-4">
                    <div class = "col-7 text-start">
                        <h4>Completa tu perfil</h4>
                    </div>
                    <div class = "col-5 text-end">
                        <h4 class = "text-muted">Paso 1/5</h4>
                    </div>
                </div>

                <!-- Formulario de perfil del conductor -->
                <form @submit.prevent = "procesarFormulario">

                    <div class = "row justify-content-between mb-3">

                        <!-- Campo de nombre completo -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Nombre completo:</label> 
                            <input type = "text" class = "form-control mb-4" 
                             v-model = "datosConductor.nombre" required> 
                        </div>

                        <!-- Campo de telefono -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "numero-usuario">Número de teléfono:</label> 
                            <input type = "tel" class = "form-control"  pattern = "[0-9]{10}" size = "10" 
                            title = "El número de teléfono debe de consistir en 10 dígitos"
                             v-model = "datosConductor.telefono" required> 
                        </div>

                    </div>

                    <!-- Avanzar al siguiente formulario -->
                    <div class = "row justify-content-between mt-4">
                        <div class = "d-block d-sm-block d-md-none mt-4">
                        </div>
                        <div class = "text-center text-lg-end">
                            <button type = "submit" class = "btn btn-primary shadow-sm rounded-3 mb-2 px-5"
                            >Siguiente</button>
                        </div>

                    </div>                    

                </form>

            </div>
        </div>
    </div>
</section>

    <FotoConductor v-if = "!siguienteForm" :conductor = "datosConductor" />

{{ datosConductor }}

</template>

<script>
import FotoConductor from './FotoConductor'
import { ref } from 'vue'

export default 
{
    components: {
        FotoConductor
    },
    setup() 
    {
     
        const datosConductor = ref({})
        const siguienteForm = ref(true)

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
        }

        return { siguienteForm, procesarFormulario, datosConductor }
    }
}
</script>