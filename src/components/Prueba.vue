 
<template>
  <div>
    <div
      class="mapa"
      ref="mapa"
    ></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>
 
<script>
 

  export default {

    data() {
      return {
        google: null,
        map: null
      };
    },
 
    async mounted() {
      const googleMapApi = await fetch('https://maps.googleapis.com/maps/api/js?key=&key=AIzaSyBSUwF0_JfS0CZybBeAI-aqzz04_e67jDg')
 
      this.google = googleMapApi;
      this.initializeMap();
    },
 
    methods: {
      initializeMap() {
        const mapContainer = this.$refs.mapa;
        this.map = new this.google.maps.Map(mapContainer, { lat: -13.1583635, lng: -72.603623 });
      }
    }
 
  };
</script>
 
<style scoped>
  .mapa {
    width: 100%;
    min-height: 100%;
  }
</style>


