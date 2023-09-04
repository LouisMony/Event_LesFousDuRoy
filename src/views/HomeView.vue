<template>
  <div class="home">
    <header>
      <img src="@/assets/img/logo.svg" alt="Logo events" class="showOnMobile">
      <input type="text" placeholder="Rechercher un évenement" v-model="searchedvalue">
    </header>
    <main>
      <ul class="filter">
        <li id="li_start">Filtrer par : </li>
        <li id="li_a" class="filter_li active" v-on:click="toogleActive('li_a'); filterby('Date', 'asc')">Date</li>
        <li id="li_b" class="filter_li" v-on:click="toogleActive('li_b'); filterby('Select' , 'asc')">Thème</li>
        <li id="li_c" class="filter_li" v-on:click="toogleActive('li_c'); filterby('Nombre_inscriptions', 'asc')">Places</li>
      </ul>
      <div v-if="event === false" class="loading">
        <div class="lds-dual-ring"></div>
      </div>
      <div v-else class="event_list">
        <!-- <div v-for="(item, index) in event" :key="index">
          {{ item.fields.Name }} / {{ item.fields.Date }} / {{ item.fields.Select }} / {{ item.fields.Nombre_inscriptions }}
        </div> -->
        <EventItem class="event_list_item" v-for="(item, index) in event" :data="item" :key="index" />
        <div v-if="noresult" class="event_list_noresult">Malheuresement, aucun résultat ne correspond à votre recherche.</div>
      </div>
    </main>
  </div>
</template>

<script>

import EventItem from '@/components/EventItem.vue'
import {http} from "../assets/js/http-common.js"

export default {
  name: 'HomeView',
  components: {
    EventItem,
  },
  data(){
    return {
      active_id : "li_a",
      event: false,
      searchedvalue:'',
      noresult: false,
    }
  },

  watch: {
      searchedvalue: function(val) {
          const events = Array.from(document.querySelectorAll('.event_list_item'))
          if(val !== ''){
              val = val.toLowerCase()
              var result = false

              events.forEach(item => {
                  var name =item.querySelector('#event_name').textContent.toLowerCase();
                  if(name.includes(val)){
                      item.style.display = "flex"
                      result = true
                  }
                  else{
                      item.style.display = "none"
                  }
              })
              if(result === false){this.noresult = true}
              else if(result === true){this.noresult = false}

          }else{
              events.forEach(item => {
                  item.style.display = "flex"
              })
              this.noresult = false
          }
      }
  },

  mounted(){
    this.filterby("Date", "asc")
  },

  methods:{
    toogleActive(id){
      if(id !== this.active_id){
        this.active_id = id
        const li_list = Array.from(document.querySelectorAll('.filter_li'))
        li_list.forEach(item =>{
          if(item.id === this.active_id){
            item.classList.add('active')
          }
          else{
            item.classList.remove('active')
          }
        })
      } 
    },

    async filterby(param, sens){
      this.event = false
      //console.log(param, sens);
      await http.get('Evenements?sort%5B0%5D%5Bfield%5D='+param+'&sort%5B0%5D%5Bdirection%5D='+sens+'')
      .then((response) => {
        //console.log(response)
        this.event = response.data.records
      })
      .catch((error)=> {
        //console.log(error);
      });
    },
    
    
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.home{
  box-sizing: border-box;
  padding: 15px 15px 0 15px;
  width: 100%;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    @media only screen and (min-width: 600px) {
        justify-content: right;
    }

    input{
      color: $fontcolor;
      height: 55px;
      outline: none;
      border: none;
      font-family: Poppins, Helvetica, Arial, sans-serif;
      border-radius: 10px;
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
      background-color: $scnd_bg;

      @media only screen and (min-width: 600px) {
          width: 400px;
      }

      &:focus{
        border: 1px solid $focus;
      }
    }
  }

  main{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 155px);

    @media only screen and (min-width: 600px) {
      height: calc(100vh - 75px);
    }

    

    ul{
      margin:25px 0;
      padding: 0;
      list-style-type: none;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;


      li{
        position: relative;
        padding: 0;
        margin: 0;
        font-size: 14px;
      }

      #li_start{
        display: none;
        @media only screen and (min-width: 600px) {
          display: flex;
        }
      }

      #li_a, #li_b, #li_c{
        cursor: pointer;
      }

      .active{
        color: $rouge;
        font-weight: 600;

        &:before{
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 5px;
          background: $rouge;
          translate: transform(-50%, -50%);
          left: 50%;
          bottom: -6px;
        }
      }
    }

    .event_list{
      flex: 1 1 auto;
      overflow-y: auto;
      min-height: 0px; 
      display: flex;
      flex-direction: column;
      gap: 15px;

      .event_list_noresult{
        text-align: center;
        margin: 15px auto;
        font-size: 12px;
        @media only screen and (min-width: 600px) {
          margin: 100px auto;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
