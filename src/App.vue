<template>
  <div id="app">
    <router-view/>
    <Navbar v-if="this.$route.name === 'home' || this.$route.name === 'my-profil'"/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  data(){
    return {
      
    }
  },
  methods:{
  } 
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

body {
  overflow: hidden;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0px;
  background-color: $bg_black;
  font-family: Poppins, Helvetica, Arial, sans-serif;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  color: $white;
}
</style>
