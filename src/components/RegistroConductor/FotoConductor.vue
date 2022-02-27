

<template>

<!-- Formulario 2: solicitud de conductores -->
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
                        <li class = "identificate"><strong>Identifícate</strong></li>
                        <li class = "carro"><strong>Carro</strong></li>
                        <li class = "licencia"><strong>Licencia</strong></li>
                    </ul>
                
                </div>
            
                <div class = "row mb-3">
                    <div class = "col-7 text-start">
                        <h4>Foto de perfil</h4>
                    </div>
                    <div class = "col-5 text-end">
                        <h4 class = "text-muted">Paso 2/5</h4>
                    </div>
                </div>

                <!-- Formulario de foto del conductor -->
                <form @submit.prevent = "procesarFormulario">

                    <div class = "row justify-content-between">
                    <div class = "form-group col-sm-6 flex-column d-flex"> 

        <div class = "card" style = "max-width: 540px;">
        <div class = "card-body">

           <!-- Recomendaciones para una buena foto --> 
            <div class = "row g-0 ">
                <div class = "col-sm-4 flex-column d-flex">
                    <img src = "https://cdn-icons.flaticon.com/png/512/547/premium/547590.png?token=exp=1645755709~hmac=2212ff2fca85852dbbd5521ddf28bc4c" 
                    class = "card-img-top mt-1 mb-3" style = "width: 110px;" >
                </div>

            <div class = "col-sm-8 flex-column d-flex">
                <h6 class = "card-subtitle mb-2">Recomendaciones:</h6>
                <ul class = "list-unstyled">
                    <li>
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" fill = "currentColor" class = "bi bi-check-lg text-success" viewBox = "0 0 16 16">
                            <path d = "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg> Foto clara con luz.
                    </li> 

                    <li>
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" fill = "currentColor" class = "bi bi-check-lg text-success" viewBox = "0 0 16 16">
                            <path d = "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg> Mirando a la cámara.
                    </li> 

                    <li>
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" fill = "currentColor" class = "bi bi-check-lg text-success" viewBox = "0 0 16 16">
                            <path d = "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg> Solamente tú.
                    </li> 

                    <li>
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" fill = "currentColor" class = "bi bi-check-lg text-success" viewBox = "0 0 16 16">
                            <path d = "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg> Sin lentes de sol.
                    </li>                         
                </ul>

                </div>
            </div>

            </div>

        </div>

        </div>

                <!-- Campo de foto del conductor -->
                <div class = "form-group col-sm-6 flex-column d-flex"> 
                    <label class = "form-control-label mt-3 mb-2" for = "foto-usuario">Subir fotografía:</label> 
                    <input type = "file" class = "form-control " accept = "image/*" 
                    @change = "onFileSelected" required> 
                </div>

            </div>

                <!-- Avanzar al siguiente formulario -->
                <div class = "row justify-content-between">

                <div class = "text-center text-lg-end">
                    <div class = "d-block d-sm-block d-md-none mt-5">
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

    <CedulaConductor v-if = "!siguienteForm" :conductor = "conductor" />

</template>

<script>
import CedulaConductor from './CedulaConductor'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default 
{
    components: {
        CedulaConductor
    },
    props: ['conductor'],
    setup(props) 
    {
        const siguienteForm = ref(true)
        const store = useStore()

        const procesarFormulario = () => 
        {   
            siguienteForm.value = false
            //store.dispatch('subirImagenesConductores', props.conductor.value)
        }

        const onFileSelected = (e) => 
        {
            props.conductor.fotoPerfil = e.target.files[0]
        }

        return { siguienteForm, procesarFormulario, onFileSelected }
    }
}
</script>