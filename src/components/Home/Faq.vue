
<template>

    <!-- Preguntas frecuentes -->
    <section id = "faq" class = "faq section-bg mb-5">
      <div class = "container">

        <div class = "section-title mt-5">
          <h2>Centro de ayuda sobre viajes compartidos</h2>
        </div>

        <div class = "faq-list">
          
          <ul  v-for = "(pregunta, index) in preguntas" :key = "pregunta">

            <li data-aos = "fade-up">
              
              <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" fill = "currentColor" class = "bi bi-arrow-right-circle icon-help" viewBox = "0 0 16 16">
                <path fill-rule = "evenodd" d = "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
              </svg>  
                                            <!-- collapse -->
              <a data-bs-toggle = "collapse" class = "collapsed ms-1 text-decoration-none" 
              :data-bs-target = "'#colapse' + index"> {{ pregunta.Pregunta }}
              
              <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" fill = "currentColor" class = "bi bi-caret-down icon-show" viewBox = "0 0 16 16">
                <path d = "M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
              </svg>

              <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" fill = "currentColor" class = "bi bi-caret-up icon-close" viewBox = "0 0 16 16">
                <path d = "M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
              </svg>
            
              </a> 
                                    <!-- show -->
              <div :id = "'colapse' + index" class = "collapse " data-bs-parent = ".faq-list">
                <p>
                  {{ pregunta.Respuesta }}
                </p>
              </div>
            </li>

          </ul>
        </div>

      </div>

      <!-- Ir al centro de ayuda -->
      <div class = "text-center mt-5 mb-5">
        <router-link to = "/ayuda" type = "button" class = "btn btn-lg btn-primary px-5 mb-5">Consulta nuestro Centro de Ayuda</router-link>
      </div>

    </section>
    
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default 
{
  setup() 
  {
    const store = useStore()

    const preguntas = computed(() => {
      return store.state.preguntasFrecuentesDestacadas
    })  

    onMounted(async() => 
    {
      await store.dispatch('getPreguntasFrecuentes')
          
      await store.dispatch('getPreguntasDestacadas')
    }) 

    return { preguntas }
  }    
}
</script>

<style scoped>

.faq .faq-list 
{
  padding: 0 100px;
}

.faq .faq-list ul 
{
  padding: 0;
  list-style: none;
}

.faq .faq-list li + li 
{
  margin-top: 15px;
}

.faq .faq-list li 
{
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  position: relative;
}

.faq .faq-list a 
{
  display: block;
  position: relative;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  padding: 0 30px;
  outline: none;
  cursor: pointer;
}

.faq .faq-list .icon-help 
{
  font-size: 24px;
  position: absolute;
  right: 0;
  left: 20px;
  color: #023e8a;
}

.faq .faq-list .icon-show, .faq .faq-list .icon-close 
{
  font-size: 24px;
  position: absolute;
  right: 0;
  top: 0;
}

.faq .faq-list p 
{
  margin-bottom: 0;
  padding: 10px 0 0 0;
}

.faq .faq-list .icon-show 
{
  display: none;
}

.faq .faq-list a.collapsed 
{
  color: #023e8a;
  transition: 0.3s;
}

.faq .faq-list a 
{
  color: #023e8a;
  transition: 0.3s;
}

.faq .faq-list a.collapsed:hover 
{
  color: #023e8a;
}

.faq .faq-list a.collapsed .icon-show 
{
  display: inline-block;
}

.faq .faq-list a.collapsed .icon-close 
{
  display: none;
}

@media (max-width: 1200px) 
{
  .faq .faq-list 
  {
    padding: 0;
  }
}    

/*  */
.btn1 
{
    background: #ff4157;
    border: 1px solid #ff4157
}

.section-bg 
{
  background-color: #f7f8fa;
  padding-top:1px;

}

.section-title 
{
  text-align: center;
  padding-bottom: 30px;
  margin-top: 20px;
}
</style>