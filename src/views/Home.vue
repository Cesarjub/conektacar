<template>

<div class = "text-center">INICIOOO</div>

<button type = "button" class = "btn btn-primary" @click = "verificarTelefono">Primary</button>

</template>

<script>
import {mapActions} from 'vuex'

export default 
{
  name: 'Home',
  methods: {
    ...mapActions(['verificarTelefono'])
  }
}
</script>
