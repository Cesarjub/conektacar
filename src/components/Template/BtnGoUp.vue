
<template>

        <!-- Boton ir hacia arriba -->
        <section>
            <div class = "ir-arriba " :class = "clase">
                <a class = "item botonArriba">
                  <svg xmlns = "http://www.w3.org/2000/svg" width = "27" height = "27" fill = "currentColor" class = "bi bi-arrow-up-short" viewBox = "0 0 16 16">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                </svg>
                </a>
            </div>
        </section>

</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default 
{
    setup() 
    {
        const clase = ref('')

        onBeforeMount(() => 
        {

            /*window.onscroll = () => 
            {
                if (document.documentElement.scrollTop > 100)
                {
                    clase.value = 'shows' 
                    console.log("rr")
                }
                else {
                    clase.value = null
                }
                buttonTop.addEventListener('click', () => 
                {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                })
            }*/
        })

        return { clase }
    }
}
</script>

<style scoped>

.ir-arriba 
{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all .5s ease;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ir-arriba .item 
{
  width: 0%;
  height: 0%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #097440; 
  color: #fff !important;
  opacity: 0;
  transform: scale(0);
  cursor: pointer;
  box-shadow: var(--box-shadow);
  transition: all .5s ease;
  font-size: 25px;
}

.ir-arriba .item:hover 
{
  background-color: #1eaa66;
}

.ir-arriba .shows 
{
  animation: popup .5s ease-in-out !important;
  transform: scale(1) !important;
  opacity: 1 !important;
  width: 100% !important;
  height: 100% !important;
  transition: all .5s ease;
}

@keyframes popup 
{
  0% {
      width: 0% !important;
      height: 0% !important;
      opacity: 0 !important;
  }

  50% {
      width: 50% !important;
      height: 50% !important;
      opacity: 0.5 !important;
  }

  100% {
      width: 100% !important;
      height: 100% !important;
      opacity: 1 !important;
  }
}

</style>