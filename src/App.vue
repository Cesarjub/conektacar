<template>

  <Navbar />
  <router-view />
  
</template>

<script>
import Navbar from './components/Template/Navbar'
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar
  },
  setup()
  {
    
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('autenticarUsuario')
    })

  }
}
</script>

<style>
</style>
