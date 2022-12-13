<template>
  <div class="navbar">
   <ul>
      <li class="nav_li" v-bind:class="{ active: activeMain }" v-on:click="$router.push('/'); reloadNavbar()">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M4 29.3333H28" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M7.46663 11.1733H5.33333C4.6 11.1733 4 11.7733 4 12.5067V24C4 24.7333 4.6 25.3333 5.33333 25.3333H7.46663C8.19997 25.3333 8.79997 24.7333 8.79997 24V12.5067C8.79997 11.7733 8.19997 11.1733 7.46663 11.1733Z" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M17.0666 6.92001H14.9333C14.2 6.92001 13.6 7.52001 13.6 8.25335V24C13.6 24.7333 14.2 25.3333 14.9333 25.3333H17.0666C17.7999 25.3333 18.3999 24.7333 18.3999 24V8.25335C18.3999 7.52001 17.7999 6.92001 17.0666 6.92001Z" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M26.6667 2.66667H24.5334C23.8001 2.66667 23.2001 3.26667 23.2001 4.00001V24C23.2001 24.7333 23.8001 25.3333 24.5334 25.3333H26.6667C27.4 25.3333 28 24.7333 28 24V4.00001C28 3.26667 27.4 2.66667 26.6667 2.66667Z" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Events</span>
      </li>
      <li class="nav_li" v-bind:class="{ active: activeProfil }" v-on:click="$router.push('/my-profil'); reloadNavbar()">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M16 16C19.6819 16 22.6667 13.0152 22.6667 9.33334C22.6667 5.65144 19.6819 2.66667 16 2.66667C12.3181 2.66667 9.33337 5.65144 9.33337 9.33334C9.33337 13.0152 12.3181 16 16 16Z" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="svg" d="M27.4533 29.3333C27.4533 24.1733 22.32 20 16 20C9.67996 20 4.54663 24.1733 4.54663 29.3333" stroke="#1A212F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Compte</span>
      </li>
      <li class="nav_li" v-bind:class="{ active: activeOption }" v-on:click="$router.push('/options'); reloadNavbar()">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="svg" d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="svg" d="M2.66666 17.1733V14.8267C2.66666 13.44 3.8 12.2933 5.2 12.2933C7.61333 12.2933 8.6 10.5867 7.38666 8.49333C6.69333 7.29333 7.10666 5.73333 8.32 5.04L10.6267 3.72C11.68 3.09333 13.04 3.46666 13.6667 4.52L13.8133 4.77333C15.0133 6.86666 16.9867 6.86666 18.2 4.77333L18.3467 4.52C18.9733 3.46666 20.3333 3.09333 21.3867 3.72L23.6933 5.04C24.9067 5.73333 25.32 7.29333 24.6267 8.49333C23.4133 10.5867 24.4 12.2933 26.8133 12.2933C28.2 12.2933 29.3467 13.4267 29.3467 14.8267V17.1733C29.3467 18.56 28.2133 19.7067 26.8133 19.7067C24.4 19.7067 23.4133 21.4133 24.6267 23.5067C25.32 24.72 24.9067 26.2667 23.6933 26.96L21.3867 28.28C20.3333 28.9067 18.9733 28.5333 18.3467 27.48L18.2 27.2267C17 25.1333 15.0267 25.1333 13.8133 27.2267L13.6667 27.48C13.04 28.5333 11.68 28.9067 10.6267 28.28L8.32 26.96C7.10666 26.2667 6.69333 24.7067 7.38666 23.5067C8.6 21.4133 7.61333 19.7067 5.2 19.7067C3.8 19.7067 2.66666 18.56 2.66666 17.1733Z" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Options</span>
      </li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      active_id : "nav_a",
      activeMain : true,
      activeProfil : false,
      activeOption : false,
    }
  },

  mounted(){
    this.reloadNavbar()
  },
  methods:{
    reloadNavbar(){
      if(this.$router.currentRoute.path === '/'){
        this.activeMain = true
        this.activeProfil = false
        this.activeOption = false
      }
      else if(this.$router.currentRoute.path === '/my-profil'){
        this.activeMain = false
        this.activeProfil = true
        this.activeOption = false
      }
      else if(this.$router.currentRoute.path === '/options'){
        this.activeMain = false
        this.activeProfil = false
        this.activeOption = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.navbar{
  border-top: 0px solid $hr;
  //background: $bg_black;
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: px;
      transition: all 200ms linear;

      .svg{
        stroke: $fontcolor
      }
      
      span{
        display: none;
        font-size: 13px;
      }
    }

    .active{
      color: $rouge;
      
      span{
        display: block;
      }

      .svg{
        stroke: $rouge
      }

    }
  }
}
</style>
