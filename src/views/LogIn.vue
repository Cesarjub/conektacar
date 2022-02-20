
<template>

    <SignIn v-if = "$route.params.op ===  'ingresar'" />
    <SignUp v-if = "$route.params.op === 'registro'" />

 
</template>

<script>
import SignIn from '../components/LogIn/SignIn'
import SignUp from '../components/LogIn/SignUp'

export default {
    name: 'Login',
    components: {
        SignIn,
        SignUp
    }
}
</script>