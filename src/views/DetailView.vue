<template>
  <div class="detail">
    <div class="detail_bg" v-bind:style="{ 'background-image': 'url(' + event.fields.Illustration[0].url + ')' }">
      <img src="@/assets/img/arrow_left.svg" alt="Retourner à la page précédente" @click="$router.go(-1)">
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
        <span v-if="full">Cet événement est actuellement complet, vous pouvez cependant vous inscrire dans la file d’attente : en cas de désistement d’un participant vous pourriez être recontacter par notre équipe pour pouvoir participer.</span>
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
  data(){
    return {
      page_id : this.$route.params.id,
      event: [],
      modal: false,
      second_class: false,
      warning_text: "Il sera toujours possible de vous désinscrire par la suite.",
      button_text: "M’inscrire à cet évènement",
      incriptionId : "",
      currentAction: "",
      full: false
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    async getDetail(){
      var _this = this
      await http.get('Evenements/'+this.page_id, {
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(function (response) {
        _this.event = response.data
        if(_this.event.fields.Nombre_inscriptions === _this.event.fields.Nombre_Participants){
          _this.full = true
        }
        _this.checkInscription()
      })
    },

    async checkInscription(){
      var _this = this
      await http.get('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions?filterByFormula=AND({Adresse_mail}="'+localStorage.getItem("mail")+'",{Events_id}="'+this.page_id+'",{Statut}="Inscrit" )',{
          headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
      })
      .then(async function (response) {      
        if (response.data.records.length === 1) {
          _this.incriptionId = response.data.records[0].id
          _this.second_class = true
          _this.warning_text = "Êtes-vous sûre ? Cette action n'est pas annulable, si cet évènement est complet, une personne de la file d’attente vous remplacera automatiquement."
          _this.button_text = "Me désinscrire de cet évènement"
          _this.currentAction = "Desinscription"
        }
        else{
          
          await http.get('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions?filterByFormula=AND({Adresse_mail}="'+localStorage.getItem("mail")+'",{Events_id}="'+_this.page_id+'",{Statut}="List")',{
              headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
          })
          .then(function (response) { 
            console.log(response.data.records.length); 
            if (response.data.records.length === 1) {
              _this.incriptionId = response.data.records[0].id
              _this.second_class = true
              _this.warning_text = "Êtes-vous sûre ? Cette action n'est pas annulable, en sortant de la file d'attente vous perdrez votre position dans cette dernière. "
              _this.button_text = "Sortir de la file d'attente"
              _this.currentAction = "Desinscription"
            }
            else{
              _this.currentAction = "Inscription"
              _this.second_class = false
              _this.warning_text = "Il sera toujours possible de vous désinscrire par la suite."
              if(_this.full === false){
                _this.button_text = "M’inscrire à cet évènement"

              }else{
                _this.button_text = "M’inscrire sur file d'attente"
              }
              
            }
          })
          
        }
      })
    },

    async Action(){
      var _this = this
      //INSCRIPTIONS
      if(this.currentAction === "Inscription" && this.full ===false){
        console.log("INSCRIPTION");
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
            _this.checkInscription()
            _this.UpdateEvent(true)
        })
        .catch(function (error) {
            console.log(error);
        });
        this.modal = false
      }

      //INSCRIPTIONS FILL D'ATTENTE
      else if(this.currentAction === "Inscription" && this.full === true){
        console.log("INSCRIPTION FILE ");
        await http.post('Inscriptions', 
        {
            "records": [
                {
                    "fields": {
                        "Events_name": this.event.fields.Name,
                        "Adresse_mail": localStorage.getItem('mail'),
                        "Username": localStorage.getItem('username'),
                        "Telephone": localStorage.getItem('tel'),
                        "Statut": "List",
                        "Events_id" : this.$route.params.id,
                    }
                }
            ]
        }, {headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'}})
        .then(function (response) {
            _this.checkInscription()
            //_this.UpdateEvent(true)
        })
        this.modal = false
      }

      //DESINSCRIPTIONS
      else if(this.currentAction === "Desinscription"){
        console.log("DESINSCRIPTION");
        await http.delete('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions/'+this.incriptionId+'',{
            headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'},
        })
        .then(function (response) {
           _this.checkInscription()
           if(_this.full === false){
              _this.UpdateEvent(false)
           }
        })
        this.modal = false
      }
      
    },

    async UpdateEvent(action){
      var _this = this
      if(action === true){var new_number = this.event.fields.Nombre_inscriptions + 1}
      else{var new_number = this.event.fields.Nombre_inscriptions - 1}

      await http.patch('Evenements', 
      {
          "records": [
              {
                  "id": this.page_id,
                  "fields": {
                      "Nombre_inscriptions": new_number,
                  }
              }
          ]
      }, {headers: {'Authorization': 'Bearer key1knTuZ7MwzCLsY'}})
      .then(function (response) {
        console.log(response.data);
        _this.event.fields.Nombre_inscriptions = new_number
      })      
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
      span{
        font-weight: 400;
        font-size: 12px;
        text-align: justify;
        color: $rouge;
      }
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
