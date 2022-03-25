
<template>
        
<div class = "container mb-2">
    <div class = "row justify-content-center">

        <div class = "col-md-6">
            <div class = "card p-3 mb-2 shadow-sm bg-body rounded-3 justify-content-between">
                      
        <div class = "row ">
            <div class = "col-2">

            <div class = "col text-start mt-2 mb-2"> {{ datosViajes.horaSalida }} </div>
                <div class = "col text-start mb-2 text-muted fw-light"> {{ datosViajes.diferenciaHoras }} </div>
                    <div class = "col text-start"> {{ datosViajes.horaLlegada }} </div>

            </div>
            <div class = "col-7 ">
      
                    <div class = "tl-item">
                        <div class = "tl-dot b-primary"></div>
                        <div class = "tl-content">
                            <div class = "fw-bold"> {{ datosViajes.ciudadOrigen }}
                            <div class = "col ">xxx</div>
                            </div>
                        </div>
                    </div>      

                    <div class = "tl-item active">
                        <div class = "tl-dot b-primary"></div>
                        <div class = "tl-content">
                            <div class = "fw-bold"> {{ datosViajes.ciudadDestino }}
                            <div class = "col">xxx</div>
                            </div>
                        </div>
                    </div>
      
            </div>
                <div class = "col-3 text-end fw-bold"> <span class = "text-primary">$</span>{{ datosViajes['Precio plaza'] }} </div>
        </div>

  <div class = "row">

    <div class = "col-2 ">
        <div class = "div-circular">
            <img :src = "datosViajes['foto de perfil']" :alt = "datosViajes['Chofer nombre']" />
    
        </div>
    </div>
    
    <div class = "col-3 mt-3 text-capitalize margin-name"> {{ datosViajes['Chofer nombre'] }} </div>

  </div>

            </div>
        </div>

    </div>
</div>
    

</template>

<script>

export default 
{
    props: ['datosViajes']
}
</script>

<style scroped>

/*
img {
  width: 60px;
  height:60px;
  border-radius: 50%;
}*/

.margin-name 
{
    margin-left:-24px
}

/* */
.div-circular
{
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    text-align : center;
    display: flex;
    justify-content: center;
}

.div-circular img 
{
    width: 60px;
    height: 50px;
}

/* */
.tl-item 
{
    border-radius: 3px;
    position: relative;
    display: -ms-flexbox;
    display: flex
}

.tl-item>* 
{
    padding: 10px
}

.tl-item .avatar 
{
    z-index: 2
}

.tl-item:last-child .tl-dot:after 
{
    display: none
}

.tl-item.active .tl-dot:before 
{
    border-color: #448bff;
    box-shadow: 0 0 0 4px rgba(68, 139, 255, .2)
}

.tl-item:last-child .tl-dot:after 
{
    display: none
}

.tl-item.active .tl-dot:before 
{
    border-color: #448bff;
    box-shadow: 0 0 0 4px rgba(68, 139, 255, .2)
}

.tl-dot 
{
    position: relative;
    border-color: rgba(160, 175, 185, .15)
}

.tl-dot:after,
.tl-dot:before 
{
    content: '';
    position: absolute;
    border-color: inherit;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%)
}

.tl-dot:after 
{
    width: 0;
    height: auto;
    top: 25px;
    bottom: -15px;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 0;
    border-radius: 0
}

tl-item.active .tl-dot:before 
{
    border-color: #448bff;
    box-shadow: 0 0 0 4px rgba(68, 139, 255, .2)
}

.tl-dot 
{
    position: relative;
    border-color: rgba(160, 175, 185, .15)
}

.tl-dot:after,
.tl-dot:before 
{
    content: '';
    position: absolute;
    border-color: inherit;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%)
}

.tl-dot:after 
{
    width: 0;
    height: auto;
    top: 25px;
    bottom: -15px;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 0;
    border-radius: 0
}

.tl-content p:last-child 
{
    margin-bottom: 0
}

.b-warning 
{
    border-color: #f4c414 !important
}

.b-primary 
{
    border-color: #448bff !important
}

.b-danger 
{
    border-color: #f54394 !important
}
  
</style>