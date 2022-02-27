
<template>
        
    <PerfilConductor />

</template>

<script>
import PerfilConductor from '../components/RegistroConductor/PerfilConductor'

export default 
{
    components: {
        PerfilConductor
    }
}
</script>

<style>

.form-conductor .card 
{
    z-index: 0;
    border: none;
    position: relative
}

.progressbar 
{
    margin-bottom: 25px;
    overflow: hidden;
    color: lightgrey
}

.progressbar .active 
{
    color: #023e8a;
}

.progressbar li 
{
    list-style-type: none;
    font-size: 13px;
    width: 20%;
    float: left;
    left: -15px;
    position: relative;
    font-weight: 400;
    
}

.progressbar .perfil:before 
{
    /*font-family: FontAwesome;*/
    content: "1";
}

.progressbar .foto:before 
{
    /*font-family: FontAwesome;*/
    content: "2"
}

.progressbar .identificate:before 
{
    /*font-family: FontAwesome;*/
    content: "3"
}

.progressbar .carro:before 
{
    /*font-family: FontAwesome;*/
    content: "4"
}

.progressbar .licencia:before 
{
    /*font-family: FontAwesome;*/
    content: "5";
}

.progressbar li:before 
{
    width: 40px;
    height: 40px;
    line-height: 45px;
    display: block;
    /*font-size: 20px;*/
    font-size: 15px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
    /**/
}

.progressbar li:after 
{
    content: '';
    width: 100%;
    height: 2px;
    background: lightgray;
    position: absolute;
    left: 0;
    top: 20px;
    z-index: -1;
}

.progressbar li.active:before,
.progressbar li.active:after 
{
    background: #023e8a;
}

</style>