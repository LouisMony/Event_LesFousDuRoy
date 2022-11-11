<template>
  <div class="event_item" @click="$router.push('/detail/'+data.id)">
    <div class="event_item_left">
        <div class="image" v-bind:style="{ 'background-image': 'url(' + data.fields.Illustration[0].url + ')' }"></div>
        
        <p>
          <span>{{data.fields.Name}}</span><br>
          {{data.fields.Select}}<br>
          {{data.fields.Date}}
        </p>
    </div>
    <div class="event_item_right">
        <img src="@/assets/img/arrow_right.svg" alt="Voir les details du tournois">
        <p>{{data.fields.Nombre_inscriptions}} / {{data.fields.Nombre_Participants}}<br><span>Participants</span></p>
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    data: Object,
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

.event_item{
    width: 100%;
    height: 100px;
    background: $scnd_bg;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07);

    .event_item_left{
        display: flex;
        align-items: flex-start;
        gap:10px;

        .image{
          height: 80px;
          aspect-ratio: 1/1; 
          border-radius: 20px; 
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;

          mask: paint(squircle);
          --squircle-radius: 20px;
	        --squircle-smooth: 0.5;
        }

        p{
            margin: 0;
            font-weight: 400;
            font-size: 13px;
            color:$fontcolor;

            span{
                font-weight: 600;
                font-size: 16px;
            }
        }
    }

    .event_item_right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;

        img{
            width: 25px;
            float: right;
        }

        p{
            font-weight: 600;
            margin: 0;
            color: $orange;
            line-height: 1;
            text-align: right;

            span{
              font-weight: 400;
              font-size: 11px;
            }
        }
    }
}
</style>
