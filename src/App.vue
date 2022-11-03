<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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
  mounted(){
    if ("paintWorklet" in CSS) {
      CSS.paintWorklet.addModule(
        "https://www.unpkg.com/css-houdini-squircle@0.1.3/squircle.min.js"
      );
    }
  },
  methods:{
  } 
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

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
