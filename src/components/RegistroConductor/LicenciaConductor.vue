
<template>

<!-- Formulario 5: solicitud de conductores -->
<section class = "container-fluid mx-auto margin-top">
    <div class = "row d-flex justify-content-center">
        <div class = "col-xl-7 col-md-9 col-11">

            <AlertDanger v-if = "error !== null" :alerta = "error" />  

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
                        <li class = "licencia active"><strong>Licencia</strong></li>
                    </ul>
                
                </div>
            
                <div class = "row mb-3">
                    <div class = "col-7 text-start">
                        <h4>Licencia de conducir</h4>
                    </div>
                    <div class = "col-5 text-end">
                        <h4 class = "text-muted">Paso 5/5</h4>
                    </div>
                </div>

                <!-- Formulario de licencia del conductor -->
                <form @submit.prevent = "procesarFormulario">


    <div class = "row mt-3 ">

        <div class = "col-md-12 ">
            <div class = "row ">
                <div class = "col-sm-8">

                <div class = "row">
                    <div class = "col-md-12">
                        <div class = "row mb-3">

                        <!-- Campo licencia frontal -->
                        <div class = "form-group col-sm-11 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "foto-usuario">Licencia de conducir (frontal):</label> 
                            <input type = "file" class = "form-control" accept = "image/*"  
                            @change = "onFileSelected($event, 'licenciaFrente')" required> 
                        </div>
                            
                    </div>

                    <div class = "row">
                        <div class = "col-md-12">

                        <!-- Campo licencia posterior -->
                        <div class = "form-group col-sm-11 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "foto-usuario">Licencia de conducir (trasera):</label> 
                            <input type = "file" class = "form-control" accept = "image/*"  
                            @change = "onFileSelected($event, 'licenciaPosterior')" required> 
                        </div>

                    </div>
                </div>

            </div>
        </div>

                </div>

                <!-- Imagen -->
                <div class = "col-md-4  mb-1 text-center">
                    <img src = "https://cdn-icons.flaticon.com/png/512/4040/premium/4040329.png?token=exp=1645755517~hmac=547606aafaa0639764341a304ac65bcb" 
                    class = "mt-3" style = "width: 150px;">
                </div>
                
            </div>

        </div>
    </div>

                    <!-- Guardar datos -->
                    <div class = "row justify-content-between mt-3">

                        <div class = "text-center text-lg-end pt-2">
                        <div class = "d-block d-sm-block d-md-none mt-4">
                        </div>
                            <button type = "submit" class = "btn btn-primary shadow-sm rounded-3 mb-2 px-5"
                            :disabled = "bloquearBoton">{{ mensajeBoton }}</button> <!-- btn-success -->
                        </div>
                    </div>                    
                </form>

            </div>
        </div>
    </div>
</section>

</template>

<script>
import AlertDanger from '../Alerts/AlertDanger'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
    props: ['conductor'],
    components: {
      AlertDanger
    },
    setup(props) 
    {
        const bloquearBoton = ref(false)
        const mensajeBoton = ref('Enviar solicitud')
        const store = useStore()

        const procesarFormulario = () => 
        {
          store.dispatch('enviarSolicitudConductor', props.conductor)
          bloquearBoton.value = true
          mensajeBoton.value = 'Espere un momento'
        }

        const onFileSelected = (e, nombre) =>
        {
            if(nombre === 'licenciaFrente')
            {
                props.conductor.licenciaFrontal = e.target.files[0]
            }
            if(nombre === 'licenciaPosterior')
            {
                props.conductor.licenciaPosterior = e.target.files[0]
            }
        }

        const error = computed(() => store.state.error)

        return { procesarFormulario, onFileSelected, bloquearBoton, mensajeBoton, error }
    }    
}
</script>