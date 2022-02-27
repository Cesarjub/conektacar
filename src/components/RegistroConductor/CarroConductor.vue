
<template>

<!-- Formulario 4: solicitud de conductores -->
<section class = "container-fluid mx-auto margin-top" v-if = "siguienteForm">
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
                        <li class = "foto active"><strong>Fotografía</strong></li>
                        <li class = "identificate active"><strong>Identifícate</strong></li>
                        <li class = "carro active"><strong>Carro</strong></li>
                        <li class = "licencia"><strong>Licencia</strong></li>
                    </ul>
                
                </div>
            
                <div class = "row mb-4">
                    <div class = "col-7 text-start">
                        <h4>Agrega tu coche</h4>
                    </div>
                    <div class = "col-5 text-end">
                        <h4 class = "text-muted">Paso 4/5</h4>
                    </div>
                </div>

                <!-- Formulario de carro del conductor -->
                <form @submit.prevent = "procesarFormulario">

                    <div class = "row justify-content-between">

                        <!-- Campo de marca de carro -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Marca de tu carro:</label> 
                            <input type = "text" class = "form-control mb-4" 
                             v-model = "conductor.marca" required> 
                        </div>

                        <!-- Campo de placa de carro -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Placa de tu carro:</label> 
                            <input type = "text" class = "form-control mb-4" placeholder = "Ej: AAA-1234"
                             v-model = "conductor.placa" required> 
                        </div>

                    </div>

                    <div class = "row justify-content-between mb-3">

                        <!-- Campo de foto del carro -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Fotografía del coche:</label> 
                            <input type = "file" class = "form-control mb-4" accept = "image/*"
                            @change = "onFileSelected($event, 'carroFoto')" required> 
                        </div>

                        <!-- Campo de foto de la placa -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Fotografía de la matrícula:</label> 
                            <input type = "file" class = "form-control mb-4" accept = "image/*"
                            @change = "onFileSelected($event, 'matriculaFoto')" required> 
                        </div>

                    </div>

                    <!-- Avanzar al siguiente formulario -->
                    <div class = "row justify-content-between">

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


    <LicenciaConductor v-if = "!siguienteForm" :conductor = "conductor" />    


</template>

<script>
import LicenciaConductor from './LicenciaConductor'
import { ref } from 'vue'

export default 
{
    components: {
        LicenciaConductor
    },
    props: ['conductor'],
    setup(props) 
    {
     
        const siguienteForm = ref(true)

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
        }

        const onFileSelected = (e, nombre) =>
        {
            if(nombre === 'carroFoto')
            {
                props.conductor.carroFoto = e.target.files[0]
            }
            if(nombre === 'matriculaFoto')
            {
                props.conductor.matriculaFoto = e.target.files[0]
            }
        }

        return { siguienteForm, procesarFormulario, onFileSelected }
    }
}
</script>