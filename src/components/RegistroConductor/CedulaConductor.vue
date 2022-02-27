
<template>

<!-- Formulario 3: solicitud de conductores -->
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
                        <li class = "carro"><strong>Carro</strong></li>
                        <li class = "licencia"><strong>Licencia</strong></li>
                    </ul>
                
                </div>
            
                <div class = "row mb-3">
                    <div class = "col-7 text-start">
                        <h4>Cédula de identidad </h4>
                    </div>
                    <div class = "col-5 text-end">
                        <h4 class = "text-muted">Paso 3/5</h4>
                    </div>
                </div>

                <!-- Formulario de cedula de identidad del conductor -->
                <form @submit.prevent = "procesarFormulario">

    <div class = "row mt-3 mx-auto">

        <!-- Imagen -->
        <div class = "col-md-12 ">
            <div class = "row ">
                <div class = "col-md-4  mb-1 text-center">
                    <img src = "https://cdn-icons-png.flaticon.com/512/2037/2037897.png" 
                    class = "mt-3" style = "width: 150px;" >
                </div>
                
                <div class = "col-sm-8  mx-auto">

            <div class = "row ">
                <div class = "col-md-12 ">
                    <div class = "row mb-3">

                        <!-- Campo de cedula de identidad frontal-->
                        <div class = "form-group col-sm-11 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "foto-usuario">Cédula de identidad (frontal):</label> 
                            <input type = "file" class = "form-control" accept = "image/*" 
                            @change = "onFileSelected($event, 'cedulaFrontal')" required> 
                        </div>
                            
                    </div>

            <div class = "row">
                <div class = "col-md-12 ">

                        <!-- Campo de identidad posterior -->
                        <div class = "form-group col-sm-11 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "foto-usuario">Cédula de identidad (trasera):</label> 
                            <input type = "file" class = "form-control" accept = "image/*" 
                            @change = "onFileSelected($event, 'cedulaPosterior')" required> 
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
                
            </div>

        </div>
    </div>

                    <!-- Avanzar al siguiente formulario -->
                    <div class = "row justify-content-between mt-3">

                        <div class = "text-center text-lg-end pt-2">
                        <div class = "d-block d-sm-block d-md-none mt-4">
                        </div>
                            <button type = "submit" class = "btn btn-primary shadow-sm rounded-3 mb-2 px-5"
                            >Siguiente</button>
                        </div>

                    </div>                    

                </form>
            </div>
        </div>
    </div>
</section>

    <CarroConductor v-if = "!siguienteForm" :conductor = "conductor" />

</template>

<script>
import CarroConductor from './CarroConductor'
import { ref } from 'vue'

export default 
{
    components: {
        CarroConductor
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
            if(nombre === 'cedulaFrontal')
            {
                props.conductor.cedulaFrontal = e.target.files[0]
                //console.log(e)
            }
            if(nombre === 'cedulaPosterior')
            {
                props.conductor.cedulaPosterior = e.target.files[0]
            }
        }

        return { siguienteForm, procesarFormulario, onFileSelected }
    }
}
</script>