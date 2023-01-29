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
    <div v-on:click="$router.replace({ path: '/utilisation-des-donnees'})">
      Utilisation des données
      <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
    </div>

    <div id="option_deco" @click="ShowDisconnect()" v-bind:class="{ active: ShowconfirmDisconnect }">
      <div class="option_contact_first">
        Me déconnecter
        <img src="@/assets/img/arrow-right_scnd.svg" alt="Suivant">
      </div>
      <div class="option_contact_sncd" v-if="ShowconfirmDisconnect">
        <div class="ligne"></div>
        <div class="option_contact_sncd_choice">
          <button class="main_button" @click="Disconnect()">Confirmer</button>
          <button class="retour main_button">Retour</button>
        </div>
      </div>
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
      showContact: false,
      ShowconfirmDisconnect: false,
    }
  },

  mounted(){

  },
  methods:{
    ShowDisconnect(){
      if(this.ShowconfirmDisconnect === true){
        this.ShowconfirmDisconnect = false
      }
      else{
        this.ShowconfirmDisconnect = true
      }
    },

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

    #option_contact, #option_deco{
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

    #option_deco{
        color: $rouge;

        .option_contact_sncd{
          color: $fontcolor;

          button{
            width: 45%;
            height: 50px;
            margin: 10px 0 10px 0;
          }

          .retour{
            background-color: $fontcolor;
          }
        }
    }

    @media only screen and (min-width: 600px) {
    }
}
</style>
