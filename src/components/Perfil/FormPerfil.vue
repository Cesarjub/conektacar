
<template>

<div class = "container-fluid px-1 py-2 mt-5 mx-auto">
    <div class = "row d-flex justify-content-center">
        <div class = "col-xl-7 col-md-9 col-11">

            
            <div class = "container">

                <div class = "divider d-flex align-items-center my-3 mb-3">
                    <h2 class = "fw-bold text-center">Completa tu perfil</h2>
                </div> 

                <form  @submit.prevent = "prueba({nombre: usuario.nombre, telefono: usuario.numero, nacimiento: usuario.nacimiento})">
                    <div class = "row justify-content-between mb-3">

                        <!-- Campo de nombre -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nombre-usuario">Nombre completo:</label> 
                            <input type = "text" id = "nombre-usuario" class = "form-control" 
                            v-model = "usuario.nombre" required> 
                        </div>
                        
                        <!-- Campo de telefono -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "numero-usuario">Número de teléfono:</label> 
                            <input type = "tel" id = "numero-usuario" class = "form-control"  pattern = "[0-9]{10}" size = "10" 
                            title = "El número de teléfono debe de consistir en 10 dígitos"
                            v-model = "usuario.numero" required> 
                        </div>

                    </div>

                    <!-- Campo de fecha de nacimiento -->
                    <div class = "row justify-content-between">
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "nacimiento-usuario">Fecha de nacimiento:</label> 
                            <input type = "date" id = "nacimiento-usuario" class = "form-control" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                            v-model = "usuario.nacimiento" required> 
                        </div>
                        
                        <!-- Campo de foto -->
                        <div class = "form-group col-sm-6 flex-column d-flex"> 
                            <label class = "form-control-label mb-2" for = "foto-usuario">Foto de perfil:</label> 
                            <input type = "file" id = "foto-usuario" class = "form-control" > 
                        </div>

                    </div>

                    <!-- -->
                    <div class = "row justify-content-between mt-2">

                        <div class = "text-center text-lg-end mt-2 pt-2">
                            <button type = "submit" class = "btn btn-primary shadow-sm rounded-3 mb-2 px-5"
                            >Guardar</button>
                        </div>

                    </div>                    

                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
        return {
            usuario: {
                nombre: '',
                numero: '',
                nacimiento: ''
            }
        }
  },
  methods: {
    ...mapActions(['prueba'])
  }    
}
</script>