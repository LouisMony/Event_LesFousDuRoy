<template>
  <div class="profil">
    <transition name="fade" mode="out-in">
        <ModalProfil v-if="activemodal"/>
    </transition>
    <img v-if="!activemodal" class="option"  @click="activemodal = true" src="@/assets/img/option.svg" alt="Option de profil" />
    <img v-if="activemodal" class="close"  @click="activemodal = false" src="@/assets/img/close.svg" alt="Fermer" />
    <div class="profil_top">
        <div class="photo_profil"></div>
        <div class="profil_info">
          <h1>{{username}}</h1>
          <span class="mail">{{mail}}</span><br>
          
        </div>
    </div>
    <hr>
    <p>Mes prochains évènements :</p>
    <div class="event_list">
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
      </div>
  </div>
</template>

<script>

import EventItem from '@/components/EventItem.vue'
import ModalProfil from '@/components/ModalProfil.vue'

export default {
  name: 'ProfilView',
  components: {
    EventItem,
    ModalProfil
  },
  data(){
    return {
      activemodal: false,
      username: localStorage.getItem('username'),
      mail: localStorage.getItem('mail')
    }
  },
  methods:{
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.fade-enter-active, .fade-leave-active {
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
.profil{
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 75px);

    .option{
      position: absolute;
      right: 15px;
      top: 25px;
    }
    .close{
      z-index: 1001;
      position: absolute;
      right: 15px;
      top: 25px;
    }

    .profil_top{
      padding: 10px 0;
      display: flex;
      align-items: center;
      gap: 25px;

      .photo_profil{
          mask: paint(squircle);
          --squircle-radius: 30px;
          --squircle-smooth: 0.4;
          max-width: 200px;
          width: 40%;
          aspect-ratio: 1/1;
          margin: 0;

          background-image: url("@/assets/img/bg_username.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.65));
      }

      .profil_info{
        h1{
            font-weight: 600;
            font-size: 32px;
            margin: 0 ;
        }

        span{
          color: $fontcolor;
          font-size: 12px;
        }

        button{

        }
      }
    }

    hr{
      border: 1px solid $hr;
      width:100%;
    }

    p{
      font-weight: 500;
      font-size: 16px;}
    }
    
    .event_list{
      flex: 1 1 auto;
      overflow-y: auto;
      min-height: 0px; 
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
</style>
