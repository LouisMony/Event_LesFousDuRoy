<template>
  <div class="profil">
    <div>
        <div class="photo_profil"></div>
        <h1>Username</h1>
        <hr>
        <p>Mes prochains évènements :</p>
    </div>
    
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

export default {
  name: 'ProfilView',
  components: {
    EventItem
  },
  data(){
    return {
    }
  },
  methods:{
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.profil{
    box-sizing: border-box;
    padding: 25px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 97px);

    .photo_profil{
        width: 40%;
        aspect-ratio: 1/1;
        margin: 45px auto 25px;
        border-radius: 30px;
        background-image: url("@/assets/img/bg_username.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.65));
    }
    h1{
        font-weight: 600;
        font-size: 32px;
        margin: 0 0 25px 0;
        text-align: center;
    }
    hr{
        border: 1px solid $bg_black_light
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
