
<template>

  <Navbar />
  <BtnGoUp />
  <router-view />
  
</template>

<script>
import Navbar from './components/Template/Navbar'
import BtnGoUp from './components/Template/BtnGoUp'
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar,
    BtnGoUp
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

.margin-top {
  margin-top: 75px;
}

</style>
