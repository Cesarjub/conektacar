<template>

  <Navbar/>
  <router-view/>
  
</template>

<script>
import Navbar from './components/Template/Navbar'
import {mapActions} from 'vuex'

export default {
  components: {
    Navbar
  },
  mounted() 
  {
    this.autenticarUsuario()
  },
  methods: 
  {
    ...mapActions(['autenticarUsuario'])
  }
}
</script>

<style>
</style>
