<template>
  <div class="options">
    <button>Modifier mon profil</button>
    <button @click="$router.replace({ path: '/update-pp' })">Modifier ma photo profil</button>
    <button @click="Disconnect()">Me déconnecter</button>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'OptionsView',
  components: {
  },
  data(){
    return {
    
    }
  },

  mounted(){

  },
  methods:{
    Disconnect(){
      localStorage.clear()
      this.$router.push('/me-connecter')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.options{
    padding: 40px 0;
    height: fit-content;
    width: 80%;
    border-radius: 10px;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 30px;

    button{
        width: calc(100% - 100px);
        height: 45px;
        font-family: Poppins, Helvetica, Arial, sans-serif;
        background-color: transparent;
        color: $fontcolor;
        font-weight: 500;
        font-size: 16px;
        border: none;
        outline:none;
        border-radius: 10px;

        &:nth-child(3){
            color: $rouge;
        }
    }
}
</style>
