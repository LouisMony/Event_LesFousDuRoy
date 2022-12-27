<template>
  <div class="options">
    <div @click="$router.replace({ path: '/update-profil' })">
      Modifier mon profil
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div @click="$router.replace({ path: '/update-pp' })">
      Modifier ma photo profil
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>
    <div id="option_contact" v-on:click="Contact()" v-bind:class="{ active: showContact }">
      <div class="option_contact_first">
        Nous contacter
        <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
      </div>
      <div v-if="showContact" class="option_contact_sncd">
        <div class="ligne"></div>
        <span>Télephone :</span> 01 39 53 30 34<br>
        <span>Mail :</span> contact@lesfousduroy.fr<br>
        <span>Boutique :</span> Ouverte de 10h à 20h, du lundi au samedi<br>
        <span>Facebook :</span> <a href="https://www.facebook.com/fousduroy/" target="_blank">@Les Fous du Roy</a><br>
        <span>Instagram :</span> <a href="https://www.instagram.com/les_fous_du_roy/" target="_blank">@les_fous_du_roy</a>

      </div>
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
      showContact: false
    }
  },

  mounted(){

  },
  methods:{
    Disconnect(){
      localStorage.clear()
      this.$router.push('/me-connecter')
    },

    Contact(){
      if(this.showContact === true){
        this.showContact = false
      }
      else{
        this.showContact = true
      }
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
        overflow: hidden;
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

    #option_contact{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 50px;
      transition: all 200ms linear;
        
        div{
          height: fit-content;
          display: flex;
          justify-content: space-between ;
          align-items: center;
          width: 100%;
          padding: 0;
        }
        .option_contact_sncd{
          font-size: 14px;
          display: block;
          padding: 0 0 15px 0;

          .ligne{
            margin-bottom: 15px;
            border-top: 1px solid $hr ;
          }

          span{
            font-weight: 600;
          }

          a{
            color: $fontcolor;
          }
        }
    }

    .active{
      height: fit-content!important;
      justify-content: flex-start!important;

      .option_contact_first{
        height: 50px!important;
      }
    }

    #deco{
        color: $rouge;
    }
}
</style>
