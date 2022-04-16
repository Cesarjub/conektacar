
<template>

  <!-- Banner inicio -->
  <section id = "hero" class = "d-flex flex-column justify-content-center" data-aos = "zoom-in">

    <div class = "container" data-aos = "zoom-in" data-aos-delay = "100">

    <!-- Formulario para consultar viajes -->
    <div class = "row ">
      <div class = "col-xl-5 col-lg-6 pt-3 pt-lg-0 order-lg-1 d-flex flex-column">
        <!-- <h1 class = "text-capitalize">1111</h1> -->

        <div class = "card shadow-lg">
          <div class = "card-body">
            <h3 class = "text-center mt-2 mb-4">¿A dónde iremos hoy?</h3>

      <form @submit.prevent = "procesarFormulario">
            <div class = "signup mt-3"> 

              <!-- Input autocompletado -->
              <GMapAutocomplete                    
                class = "form-control form-control-lg"
                @place_changed = "setOrigen"
                :required = "true"
                placeholder = "Origen"
              >
              </GMapAutocomplete>            
              
              <!-- Input autocompletado -->
              <GMapAutocomplete                    
                class = "form-control form-control-lg"
                @place_changed = "setDestino"
                :required = "true"
                placeholder = "Destino"
              >
              </GMapAutocomplete>       

              <input type = "date" :min = "fechaHoy" v-model = "ubicacionBusqueda.fecha" class = "form-control" required> 
              <!--<input type = "text" class = "form-control" placeholder = "Pasajeros">-->
            </div>
            
            <div class = "mt-3"> 
              <button class = "btn btn-lg btn-primary btn-block shadow-sm">Buscar un viaje</button> 
            </div>

      </form>
          
          </div>
        </div>

      </div>

      <!-- Texto derecha -->
      <div class = "d-none d-sm-none d-md-block col-lg-6 order-1 order-lg-2 " data-aos = "zoom-in" data-aos-delay = "150">

        <div class = "intro-info">
          <h2>Miles de <span>viajes</span> al<br>mejor precio</h2>
        </div>

      </div>
    </div>

    </div>
  </section> 

</template>

<script>
import { getDatosViaje } from '/src/Composables/getDatosViaje.js'
import { computed, ref } from 'vue'
import router from '/src/router'

export default 
{
  setup() 
  {
    const tiempoTranscurrido = Date.now()
    const hoy = new Date(tiempoTranscurrido)

    const ubicacionBusqueda = ref({}) 

    const { getCiudadViaje } = getDatosViaje()

    const setOrigen = async(ciudad) => 
    {
      ubicacionBusqueda.value.ciudadOrigen = await getCiudadViaje(ciudad.geometry.location.lat(), ciudad.geometry.location.lng())
      console.log(ubicacionBusqueda.value.ciudadOrigen)
    }     

    const setDestino = async(ciudad) => 
    {
      ubicacionBusqueda.value.ciudadDestino = await getCiudadViaje(ciudad.geometry.location.lat(), ciudad.geometry.location.lng())
      console.log(ubicacionBusqueda.value.ciudadDestino)
    }     

    const procesarFormulario = async() => 
    {
      //ubicacionBusqueda.value.ciudadDestino = await getCiudadViaje(ciudad.geometry.location.lat(), ciudad.geometry.location.lng())
      router.push({ path: "/viajes/busqueda", query: { origen: ubicacionBusqueda.value.ciudadOrigen, destino: ubicacionBusqueda.value.ciudadDestino, fecha: ubicacionBusqueda.value.fecha }})
    }    

    const fechaHoy  = computed(() =>  hoy.toISOString().split('T')[0] )
  
    return { fechaHoy, ubicacionBusqueda, setDestino, setOrigen, procesarFormulario }
  }    
}
</script>

<style scoped>

/* Banner inicio */
#hero 
{
  width: 100%;
  height: 100vh;
  background: url("https://i.blogs.es/0e5338/anotacion-2020-01-24-173557/1366_2000.jpg") top right no-repeat;
  background-size: cover;
  position: relative;
}

@media (min-width: 992px) 
{
  #hero 
  {
    padding-left: 160px;
  }
}

#hero:before 
{
  content: "";
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

#hero .container 
{
  position: relative;  
  
}

#hero h1 
{
  margin: 0;
  font-size: 64px;
  font-weight: 700;
  line-height: 56px;
  color: #45505b;
}

#hero p 
{
  color: #45505b;
  margin: 15px 0 0 0;
  font-size: 26px;
  font-family: "Poppins", sans-serif;
}

#hero p span 
{
  color: #0563bb;
  letter-spacing: 1px;
}

@media (max-width: 992px) 
{
  #hero 
  {
    text-align: center;
  }

  #hero h1 
  {
    font-size: 32px;
    line-height: 36px;
  }

  #hero p
  {
    margin-top: 10px;
    font-size: 20px;
    line-height: 24px;
  }
}
  
@media (min-width: 992px) 
{
  #hero .intro-info 
  {
    padding-top: 100px;
  }
}

@media (max-width: 991px) 
{
  #hero .intro-info 
  {
    text-align: center;
    padding-top: 40px;
  }
}

#hero .intro-info h2 
{
  color: #fff;
  margin-bottom: 40px;
  font-size: 48px;
  font-weight: 700;
}

#hero .intro-info h2 span 
{
  color: #4bcdf1;
}

@media (max-width: 991px) 
{
  #hero .intro-info h2 
  {
    font-size: 34px;
    margin-bottom: 30px;
  }
}
  
/* Formulario */
.card 
{
  border-radius: 8px;
  border: none
}

.signin-link 
{
  color: #db0a5b;
  font-weight: 600
}

.signin-link:hover 
{
  color: #b90b4f
}

.form-control 
{
  margin-top: 13px;
  height: 49px !important
}    

</style>