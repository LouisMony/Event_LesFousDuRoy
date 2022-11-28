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
        <button v-bind:class="{ scnd_state: second_class }" @click="modal=true">{{button_text}}</button>
      </div>

      <div v-if="modal" class="detail_modal">
        <div class="detail_modal_box">
          <span>ATTENTION</span>
          <p>{{warning_text}}</p>
          <button @click="modal=false" id="first">Retour</button>
          <button @click="Action()">Confirmer</button>
        </div>
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
      event: [],
      modal: false,
      second_class: false,
      warning_text: "Il sera toujours possible de vous désinscrire par la suite.",
      button_text: "M’inscrire à cet évènement",
      incriptionId : "",
      currentAction: "Inscription"
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
        _this.event = response.data
        _this.checkInscription()
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    async checkInscription(){
      var _this = this
      await http.get('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions?filterByFormula=AND({Adresse_mail}="'+localStorage.getItem("mail")+'",{Events_id}="'+this.$route.params.id+'")',{
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(function (response) {
        if(response.data.records[0].id){_this.incriptionId = response.data.records[0].id}
        if (response.data.records.length === 1) {
          _this.second_class = true
          _this.warning_text = "Êtes-vous sûre ? Si cet évènement est complet, une personne de la file d’attente vous remplacera automatiquement."
          _this.button_text = "Me désinscrire de cet évènement"
        }
        else{
          _this.second_class = false
          _this.warning_text = "Il sera toujours possible de vous désinscrire par la suite."
          _this.button_text = "M’inscrire à cet évènement"
        }
      })
    },

    async Action(){
      var _this = this

      //INSCRIPTIONS
      if(this.currentAction === "Inscription"){
        await http.post('Inscriptions', 
        {
            "records": [
                {
                    "fields": {
                        "Events_name": this.event.fields.Name,
                        "Adresse_mail": localStorage.getItem('mail'),
                        "Username": localStorage.getItem('username'),
                        "Telephone": localStorage.getItem('tel'),
                        "Statut": "Inscrit",
                        "Events_id" : this.$route.params.id,
                    }
                }
            ]
        }, {headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'}})
        .then(function (response) {
            console.log(response.data)
            _this.checkInscription()
            _this.UpdateEvent()
        })
        .catch(function (error) {
            console.log(error);
        });
        this.modal = false
        this.currentAction = "Desinscription"
      }

      //DESINSCRIPTIONS
      else if(this.currentAction === "Desinscription"){
        console.log('supprimer');
        await http.delete('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions/'+this.incriptionId+'',{
            headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
        })
        .then(function (response) {
          console.log(response);
          _this.second_class = false
          _this.warning_text = "Il sera toujours possible de vous désinscrire par la suite."
          _this.button_text = "M’inscrire à cet évènement"
        })
        this.modal = false
        this.currentAction = "Inscription"
      }
      
    },

    async UpdateEvent(action){
      //console.log('start');
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

  .detail_modal{
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(233, 239, 242, 0.8);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .detail_modal_box{
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      background-color: $scnd_bg;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 20px;
      gap: 20px;

      span{
        color: $rouge;
        font-weight: 600;
        font-size: 20px;
      }

      p{
        font-weight: 400;
        font-size: 14px;
        color: $fontcolor;
        margin: 0;
      }

      button{
        width: 100%;
        height: 60px;
        font-family: Poppins, Helvetica, Arial, sans-serif;
        background-color: $rouge;
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline:none;
        border-radius: 10px;
      }

      #first{
        background-color: $fontcolor;
      }
    }
  }

  .detail_bg{
    box-sizing: border-box;
    padding: 15px;
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
        color: $fontcolor;
      }
      h2{
        margin: 0 0 15px 0;
        font-weight: 500;
        font-size: 20px;
        color:$fontcolor
      }
      hr{
        border: 0.5px solid $hr
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
        color: $fontcolor;
        text-align: justify;
        span{
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
    .detail_content_bottom{
      button{
        width: 100%;
        height: 65px;
        font-family: Poppins, Helvetica, Arial, sans-serif;
        background-color: $rouge;
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline:none;
        border-radius: 10px;
      }

      .scnd_state{
        background: rgba(255, 58, 58, 0.15);
        border: 1px solid $rouge;
        color: $rouge;
      }
    }
  }
}
</style>
