<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/_variables.scss";

body {
  overflow: hidden;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 25px;
  background-color: $bg_black;
  font-family: Poppins, Helvetica, Arial, sans-serif;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  color: $white;
}
</style>
