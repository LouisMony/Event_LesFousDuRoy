<template>
  <div class="options">
    <div>
      Modifier mon profil
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div @click="$router.replace({ path: '/update-pp' })">
      Modifier ma photo profil
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div>
      Nous contactez
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div>
      Utilisation des données
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div id="deco" @click="Disconnect()">
      Me déconnecter
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
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
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    div{
        height: 50px;
        display: flex;
        justify-content: space-between ;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        background-color: $scnd_bg;

        img{
          height: 15px;
        }
    }

    #deco{
        color: $rouge;
    }
}
</style>
