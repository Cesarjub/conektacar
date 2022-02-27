
<template>
        
    <NumberPhone v-if = "$route.params.op ===  'usuario'" />
    <VerifyCode v-if = "$route.params.op === 'comprobar'" />

</template>

<script>
import NumberPhone from '../components/VerifyNumber/NumberPhone'
import VerifyCode from '../components/VerifyNumber/VerifyCode'

export default {
    components: {
        NumberPhone,
        VerifyCode
    }    
}
</script>

<style>
    
</style>