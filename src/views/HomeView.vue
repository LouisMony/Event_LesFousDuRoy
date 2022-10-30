<template>
  <div class="home">
    <header>
      <img src="@/assets/img/logo.svg" alt="Logo events">
      <input type="text" placeholder="Rechercher un évenement">
    </header>
    <main>
      <ul class="filter">
        <li id="li_a" class="filter_li active" v-on:click="toogleActive('li_a')">Date</li>
        <li id="li_b" class="filter_li" v-on:click="toogleActive('li_b')">Thème</li>
        <li id="li_c" class="filter_li" v-on:click="toogleActive('li_c')">Lieu</li>
      </ul>

      <div class="event_list">
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
      </div>
    </main>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import EventItem from '@/components/EventItem.vue'

export default {
  name: 'HomeView',
  components: {
    EventItem,
  },
  data(){
    return {
      active_id : "li_a"
    }
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
    }
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.home{
  box-sizing: border-box;
  padding: 25px 25px 0 25px;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    input{
      color: $white;
      height: 55px;
      outline: none;
      border: none;
      font-family: Poppins, Helvetica, Arial, sans-serif;
      border-radius: 10px;
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
      background-color: $bg_black_light;

      &:focus{
        border: 1px solid rgb(130, 130, 130);
      }
    }
  }

  main{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 179px);

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
      }

      .active{
        color: $orange;
        font-weight: 600;

        &:before{
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 5px;
          background: $orange;
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
      gap: 25px;
    }
  }
}
</style>
