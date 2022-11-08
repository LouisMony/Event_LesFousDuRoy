<template>
  <div class="detail">
    <div class="detail_bg" v-bind:style="{ 'background-image': 'url(' + event.fields.Illustration[0].url + ')' }" @click="$router.go(-1)">
      <img src="@/assets/img/arrow_left.svg" alt="Retourner à la page précédente">
    </div>
    <div class="detail_content">
      <div class="detail_content_top">
        <h1>{{event.fields.Name}}</h1>
        <h2>{{event.fields.Select}}</h2>
        <hr>
        <div class="detail_content_carac">
          <div class="detail_content_carac_line">
            <div>
              <img src="@/assets/img/calendar.svg" alt="icône de calendrier">
              <span>{{event.fields.Date}}</span>
            </div>
            <div>
              <img src="@/assets/img/location.svg" alt="icône de localisation">
              <span>{{event.fields.Lieu}}</span>
            </div>
          </div>
          <div class="detail_content_carac_line">
            <div>
              <img src="@/assets/img/clock.svg" alt="icône d'horloge">
              <span>{{event.fields.Heure}}</span>
            </div>
            <div>
              <img src="@/assets/img/people.svg" alt="icône de groupe">
              <span>{{event.fields.Nombre_inscriptions}}/{{event.fields.Nombre_Participants}}</span>
            </div>
          </div>
        </div>
        <p><span>Details :</span><br>Prix d'entrée : {{event.fields.Prix}} € <br>{{event.fields.Remarque}}</p>
      </div>
      <div class="detail_content_bottom">
        <button>M’inscrire à cet évènement</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import {http} from "../assets/js/http-common.js"

export default {
  name: 'EventItem',
  props: {
    data: Object,
  },
  data(){
    return {
      page_id : this.$route.params.id,
      event: []
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    async getDetail(){
      var _this = this
      var id = this.page_id
      await http.get('Evenements/'+id, {
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(function (response) {
        console.log(response.data);
        _this.event = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.detail{
  height: 100vh;
  display: flex;
  flex-direction: column;

  .detail_bg{
    box-sizing: border-box;
    padding: 25px;
    height: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .detail_content{
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .detail_content_top{
      h1{
        font-weight: 600;
        font-size: 32px;
        margin: 0;
      }
      h2{
        margin: 0 0 25px 0;
        font-weight: 500;
        font-size: 20px;
        color:$scnd_text
      }
      hr{
        border: 1px solid $bg_black_light
      }
      .detail_content_carac{
        margin: 25px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .detail_content_carac_line{
          display: flex;
          width: 100%;
          div{
            width: 50%;
            display: flex;
            align-items: center;
            gap:10px;

            img{
              height: 30px;
            }
          }
        }
      }
      p{
        margin: 0;
        color: $white;
        text-align: justify;
        span{
          color: $scnd_text;
          font-size: 14px;
        }
      }
    }
    .detail_content_bottom{
      button{
        width: 100%;
        height: 65px;
        font-family: Poppins, Helvetica, Arial, sans-serif;
        background-color: $orange;
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline:none;
        border-radius: 10px;
      }
    }
  }
}
</style>
