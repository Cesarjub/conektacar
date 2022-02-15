
<template>
   
    <Acceder v-if = "$route.params.op ==  'ingresar'" />
    <Registro v-if = "$route.params.op == 'registro'" />

</template>

<script>
import Acceder from '../components/Login/Acceder'
import Registro from '../components/Login/Registro'

export default {
    name: 'Login',
    components: {
        Acceder,
        Registro
    }
}
</script>