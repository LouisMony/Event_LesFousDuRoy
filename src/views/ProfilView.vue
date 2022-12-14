<template>
  <div class="profil">
    <div class="profil_top">
        <div class="photo_profil"></div>
        <div class="profil_info">
          <h1>{{username}}</h1>
          <span class="mail">{{mail}}</span><br>
          
        </div>
    </div>
    <hr>
    <p>Mes prochains évènements :</p>
    <div class="event_list" v-if="display">
      <EventItem v-for="(item, index) in event" :data="item" :key="index" />
    </div>
  </div>
</template>

<script>

import EventItem from '@/components/EventItem.vue'
import {http} from "../assets/js/http-common.js"

export default {
  name: 'ProfilView',
  components: {
    EventItem,
  },
  data(){
    return {
      activemodal: false,
      username: localStorage.getItem('username'),
      mail: localStorage.getItem('mail'),
      event:"",
      inscription_arr:"", 
      display: false
    }
  },

  mounted(){
    this.display = false
    this.GetEvents()
  },

  methods:{
    async GetEvents(){
      var _this = this
      await http.get('Evenements', {
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(function (response) {
        _this.event = response.data.records
        _this.getInscription()
      })
    },

    async getInscription(){
      
      var _this = this
      await http.get('Inscriptions?filterByFormula=AND(SEARCH("'+this.mail+'", {Adresse_mail}))', {
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(function (response) {
        _this.inscription_arr = response.data.records;
        _this.filterInscriptions()
      })
    },

    async filterInscriptions(){
      console.log('coucou');
      this.event = this.event.filter(({id}) =>
        this.inscription_arr.some(exclude => exclude.fields.Events_id === id)
      );
      this.display = true
    }
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
    height: calc(100vh - 70px);

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
