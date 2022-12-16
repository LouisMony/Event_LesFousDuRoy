<template>
  <div class="event_item" @click="$router.push('/detail/'+data.id)" v-if="data.fields.Visibility === 'True'">
    <div class="event_item_left">
        <div class="image" v-bind:style="{ 'background-image': 'url(' + data.fields.Illustration[0].url + ')' }"></div>
        
        <p>
          <span id="event_name">{{data.fields.Name}}</span><br>
          {{data.fields.Select}}<br>
          {{data.fields.Date}}
        </p>
    </div>
    <div class="event_item_right">
        <img src="@/assets/img/arrow_right.svg" alt="Voir les details du tournois">
        <p v-if="data.fields.Nombre_inscriptions<data.fields.Nombre_Participants">{{data.fields.Nombre_inscriptions}} / {{data.fields.Nombre_Participants}}<br><span>Participants</span></p>
        <p v-else id="full">Fil d'attente</p>
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
  mounted(){

    var date = new Date(this.data.fields.Date)
    var mont = date.getMonth();
    var month_final = ""
    if(mont === 0){month_final = "Janvier"}
    else if(mont === 1){month_final = "Février"}
    else if(mont === 2){month_final = "Mars"}
    else if(mont === 3){month_final = "Avril"}
    else if(mont === 4){month_final = "Mai"}
    else if(mont === 5){month_final = "Juin"}
    else if(mont === 6){month_final = "Juillet"}
    else if(mont === 7){month_final = "Aout"}
    else if(mont === 8){month_final = "Septembre"}
    else if(mont === 9){month_final = "Octobre"}
    else if(mont === 10){month_final = "Novembre"}
    else if(mont === 11){month_final = "Décembre"}
    this.data.fields.Date = date.getDate()+" "+month_final+" "+date.getFullYear()
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
            opacity: 0;
        }

        p{
            font-weight: 600;
            margin: 0;
            color: $fontcolor;
            line-height: 1;
            text-align: right;

            span{
              font-weight: 400;
              font-size: 11px;
            }
        }
        #full{
          color: $rouge;
          font-style: italic;
          font-weight: 400;
          font-size: 11px;
        }
    }
}
</style>
