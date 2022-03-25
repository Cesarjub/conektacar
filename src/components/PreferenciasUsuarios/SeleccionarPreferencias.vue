
<template>

    <section class = "margin-top" >

    <!-- Formulario para  -->
        <div class = "container w-100 mb-lg-6">
            <div class = "row align-items-stretch">

                    <div class = "d-block d-sm-block d-md-none mt-5"></div>
                    <div class = "text-center mt-5 mb-4">
                        <h2 class = "fw-bold">Selecciona tus preferencias</h2>
                    </div>

                      <form @submit.prevent = "procesarFormulario">
                          
                            <!--  -->
                            <div class = "row justify-content-center mb-3">
    
                                <div class = "">
                                    
                            <!-- Preferencias de conversacion -->
                            <div class = "row justify-content-center mt-3">
    
                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <p class = "fs-4 text-end">Conversación</p>
                                 </div>

                                <div class = "col-md-2 col-sm-2 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionConversacion('Soy callado')" name = "options-conversacion" id = "success-outlined" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined">Soy callado</label>
                                </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionConversacion('Depende del momento')" name = "options-conversacion" id = "success-outlined-2" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-2">Depende del momento</label>
                                </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionConversacion('¡Me encanta platicar!')" name = "options-conversacion" id = "success-outlined-3" autocomplete = "off">
                                    <label class = "btn btn-outline-dark"  for = "success-outlined-3">¡Me encanta platicar!</label>
                                </div>                           
  
                            </div>   

                            <!-- Preferencias de fumar en el auto -->
                            <div class = "row justify-content-center mt-3">
    
                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <p class = "fs-4 text-end">Fumar en el auto</p>
                                 </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionFumar('No es una opción')" name = "options-fumar" id = "success-outlined-4" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-4">No es una opción</label>
                                </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionFumar('A veces lo permito')" name = "options-fumar" id = "success-outlined-5" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-5">A veces lo permito</label>
                                </div>

                                <div class = "col-md-2 col-sm-2 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionFumar('No tengo problema')" name = "options-fumar" id = "success-outlined-6" autocomplete = "off">
                                    <label class = "btn btn-outline-dark"  for = "success-outlined-6">No tengo problema</label>
                                </div>                           
  
                            </div>  

                            <!-- Preferencias de musica -->
                            <div class = "row justify-content-center mt-3">
    
                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <p class = "fs-4 text-end">Música</p>
                                 </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMusica('El silencio es oro')" name = "options-musica" id = "success-outlined-7" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-7">El silencio es oro</label>
                                </div>

                                <div class = "col-md-2 col-sm-2 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMusica('Solo si tengo ganas')" name = "options-musica" id = "success-outlined-8" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-8">Solo si tengo ganas</label>
                                </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMusica('Depende de lo que se escuche')" name = "options-musica" id = "success-outlined-9" autocomplete = "off">
                                    <label class = "btn btn-outline-dark"  for = "success-outlined-9">Depende de lo que se escuche</label>
                                </div>                           
  
                            </div>  

                            <!-- Preferencias de mascotas -->
                            <div class = "row justify-content-center mt-3">
    
                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <p class = "fs-4 text-end">Mascotas</p>
                                 </div>

                                <div class = "col-md-2 col-sm-2 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMascotas('No son permitidas')" name = "options-mascotas" id = "success-outlined-once" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-once">No son permitidas</label>
                                </div>

                                <div class = "col-md-3 col-sm-3 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMascotas('Depende de la mascota')" name = "options-mascotas" id = "success-outlined-0" autocomplete = "off">
                                    <label class = "btn btn-outline-dark" for = "success-outlined-0">Depende de la mascota</label>
                                </div>

                                <div class = "col-md-3 col-sm-2 flex-column d-flex">
                                    <input type = "radio" class = "btn-check" @click = "opcionMascotas('Más que bienvenidas')" name = "options-mascotas" id = "success-outlined-diez" autocomplete = "off">
                                    <label class = "btn btn-outline-dark"  for = "success-outlined-diez">Más que bienvenidas</label>
                                </div>                           
  
                            </div>  


                                </div>
                                  
                            </div>

                            <!-- Enviar -->
                            <div class = "row justify-content-center d-grid mt-5 mb-4">
                                <div class = "col">
                                    <button type = "submit" class = "btn btn-primary btn-lg shadow-sm px-5">Guardar</button>
                                </div>             
                            </div>    

    
                      </form>
    
            </div>
        </div>
    </section>
        
        {{ preferencias }}
    
</template>

<script>
import { ref } from 'vue'

export default 
{
    setup() 
    {
        const preferencias = ref({})

        const opcionConversacion = (op) => preferencias.value.conversacion = op
        const opcionFumar = (op) => preferencias.value.fumar = op
        const opcionMusica = (op) => preferencias.value.musica = op
        const opcionMascotas = (op) => preferencias.value.mascotas = op

        const procesarFormulario = () =>
        {

            if(Object.keys(preferencias.value).length !== 4)
            {
               alert("Debe seleccionar al menos una opción por cada categoria.") 
               return
            }

            alert("Hola " + Object.keys(preferencias.value).length)
        }

        return { procesarFormulario, preferencias, opcionConversacion, opcionFumar, opcionMusica, opcionMascotas }
    }    
}
</script>