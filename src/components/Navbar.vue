<template>
  <div class="navbar">
   <ul>
      <li class="nav_li active" v-on:click="toogleActive('nav_a'); $router.push('/')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M4 29.3333H28" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M7.46663 11.1733H5.33333C4.6 11.1733 4 11.7733 4 12.5067V24C4 24.7333 4.6 25.3333 5.33333 25.3333H7.46663C8.19997 25.3333 8.79997 24.7333 8.79997 24V12.5067C8.79997 11.7733 8.19997 11.1733 7.46663 11.1733Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M17.0666 6.92001H14.9333C14.2 6.92001 13.6 7.52001 13.6 8.25335V24C13.6 24.7333 14.2 25.3333 14.9333 25.3333H17.0666C17.7999 25.3333 18.3999 24.7333 18.3999 24V8.25335C18.3999 7.52001 17.7999 6.92001 17.0666 6.92001Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M26.6667 2.66667H24.5334C23.8001 2.66667 23.2001 3.26667 23.2001 4.00001V24C23.2001 24.7333 23.8001 25.3333 24.5334 25.3333H26.6667C27.4 25.3333 28 24.7333 28 24V4.00001C28 3.26667 27.4 2.66667 26.6667 2.66667Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Events</span>
      </li>
      <li class="nav_li" v-on:click="toogleActive('nav_b'); $router.push('/my-profil')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M16 16C19.6819 16 22.6667 13.0152 22.6667 9.33334C22.6667 5.65144 19.6819 2.66667 16 2.66667C12.3181 2.66667 9.33337 5.65144 9.33337 9.33334C9.33337 13.0152 12.3181 16 16 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M27.4533 29.3333C27.4533 24.1733 22.32 20 16 20C9.67996 20 4.54663 24.1733 4.54663 29.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Compte</span>
      </li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      active_id : "nav_a"
    }
  },

  methods:{
    toogleActive(id){
      if(id !== this.active_id){
        const li_list = Array.from(document.querySelectorAll('.nav_li'))
        li_list.forEach(item =>{
          item.classList.toggle('active')
        })
        this.active_id = id
      } 
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.navbar{
  border-top: 2px solid $bg_black_light;
  background: $bg_black;
  height: 75px;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    li{
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 200ms linear;

      .svg{
        stroke: $scnd_text
      }
      
      span{
        display: none;
      }
    }

    .active{
      color: $orange;
      
      span{
        display: block;
      }

      .svg{
        stroke: $orange
      }

    }
  }
}
</style>
