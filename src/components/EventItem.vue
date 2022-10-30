<template>
  <div class="event_item">
    <div class="event_item_left">
        <div class="image"></div>
        <p>
        <span>Draft - Edition #45</span><br>
        Magic the Gathering<br>
        6 février 2023
        </p>
    </div>
    <div class="event_item_right">
        <img src="@/assets/img/arrow_right.svg" alt="Voir les details du tournois">
        <p>12 / 16</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
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

.event_item{
    width: 100%;
    height: 100px;
    background: $bg_black_light;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    .event_item_left{
        display: flex;
        align-items: flex-start;
        gap:10px;

        .image{
          height: 80px;
          background: blue;
          aspect-ratio: 1/1; 
          border-radius: 20px; 
          background-image: url("@/assets/img/bg_tournoi.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        p{
            margin: 0;
            font-weight: 400;
            font-size: 13px;
            color: $scnd_text;

            span{
                font-weight: 600;
                font-size: 16px;
                color:$white;
            }
        }
    }

    .event_item_right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;

        img{
            width: 32px;
            float: right;
        }

        p{
            font-weight: 600;
            margin: 0;
            color: $orange;
        }
    }
}
</style>
