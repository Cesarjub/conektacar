
<template>

<div class = "text-center" v-if = "existeUsuario">

Pefil
<br/>
{{usuario.email}} - 
{{usuario.uid}} - {{usuario.nombre}} - 
<br/>
<img :src = "usuario.foto" alt = "foto" class = "img-fluid" />
</div>


</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default 
{
    computed: {
        ...mapState(['usuario']),
        ...mapGetters(['existeUsuario'])
    }      
}
</script>