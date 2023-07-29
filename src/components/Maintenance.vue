<template>
    <div class="maintenance">
      <div class="modalprofil_bloc">
          Le site est actuellement en maintenance. 
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Maintenance',
    data(){
      return {
       
      }
    },
  
    methods:{
      
    }
  }
  </script>
  
  <style scoped lang="scss">
  
  @import "@/assets/style/_variables.scss";
  
  .maintenance{
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: $main_bg;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  