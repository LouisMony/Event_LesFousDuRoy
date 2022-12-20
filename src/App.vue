<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
    <Navbar v-if="this.$route.name === 'home' || this.$route.name === 'my-profil' || this.$route.name === 'options'"  />
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
    this.fixheight()
  },
  methods:{
    fixheight(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', () => {
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }
  } 
}
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: ease;
}

.slide-enter{
  transform: translateX(100vw);
  opacity: 0;
}
.slide-leave-active {
  transform: translateX(-100vw);
  opacity: 0;
}

body {
  overflow-x: hidden;
  overflow-y: auto;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0px;
  background-color: $main_bg;
  font-family: Poppins, Helvetica, Arial, sans-serif;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  color: $fontcolor;
}
</style>
