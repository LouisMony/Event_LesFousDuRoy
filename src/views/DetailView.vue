<template>
  <div class="detail">
    <div class="detail_bg" v-bind:style="{ 'background-image': 'url(' + event.fields.Illustration[0].url + ')' }">
      <div class="back"><img src="@/assets/img/arrow_left.svg" alt="Retourner à la page précédente" @click="$router.go(-1)"></div>
    </div>
    <div class="detail_content">
      <div class="detail_content_top">
        <h1>{{event.fields.Name}}</h1>
        <h2>{{event.fields.Select}}</h2>
        <div class="line"></div>
        <div class="detail_content_carac">
          <div class="detail_content_carac_line">
            <div>
              <img src="@/assets/img/calendar.svg" alt="icône de calendrier">
              <span>{{date_event}}</span>
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
        <p v-if="full">
          Cet événement est actuellement complet, vous pouvez cependant vous inscrire dans la file d'attente : en cas de désistement d'un participant vous pourriez être recontacter par notre équipe pour pouvoir participer.
          </p>
        <button v-bind:class="{ scnd_state: second_class }" class="main_button" @click="modal=true">{{button_text}}</button>
      </div>

      <div v-if="modal" class="detail_modal">
        <div class="detail_modal_box">
          <span>ATTENTION</span>
          <p>{{warning_text}}</p>
          <button class="main_button" @click="modal=false" id="first">Retour</button>
          <button class="main_button" @click="Action()">{{button_text_2}}</button>
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
      button_text: "Chargement ...",
      incriptionId : "",
      currentAction: "",
      full: false,
      date_event:"", 
      allreadyclick: false,
      button_text_2:"Confirmer"
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    async getDetail(){
      var _this = this
      await http.get('Evenements/'+this.page_id)
      .then(function (response) {
        _this.event = response.data
        if(_this.event.fields.Nombre_inscriptions === _this.event.fields.Nombre_Participants){
          _this.full = true
        }
        _this.RewriteDate()
        _this.checkInscription()
      })
    },

    RewriteDate(){
      var date = new Date(this.event.fields.Date)
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
      this.event.fields.Date = date.getDate()+" "+month_final+" "+date.getFullYear()
      this.date_event = date.getDate()+" "+month_final+" "+date.getFullYear()
    },

    async checkInscription(){
      var _this = this
      await http.get('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions?filterByFormula=AND({Adresse_mail}="'+localStorage.getItem("mail")+'",{Events_id}="'+this.page_id+'",{Statut}="Inscrit" )')
      .then(async function (response) {      
        if (response.data.records.length === 1) {
          _this.incriptionId = response.data.records[0].id
          _this.second_class = true
          _this.warning_text = "Êtes-vous sûre ? Cette action n'est pas annulable, si cet évènement est complet, une personne de la file d’attente vous remplacera automatiquement."
          _this.button_text = "Me désinscrire de cet évènement"
          _this.currentAction = "Desinscription"
        }
        else{
          
          await http.get('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions?filterByFormula=AND({Adresse_mail}="'+localStorage.getItem("mail")+'",{Events_id}="'+_this.page_id+'",{Statut}="List")')
          .then(function (response) { 
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
      if(this.allreadyclick === false){
        this.allreadyclick = true
        this.button_text_2 = "Patientez ..."

        var _this = this
        //INSCRIPTIONS
        if(this.currentAction === "Inscription" && this.full ===false){
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
                          "User_id": localStorage.getItem('iduser'),
                      }
                  }
              ]
          })
          .then(function (response) {
              _this.checkInscription()
              _this.UpdateEvent(true)
          })
          
        }

        //INSCRIPTIONS FILL D'ATTENTE
        else if(this.currentAction === "Inscription" && this.full === true){
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
                          "List_number": this.event.fields.Attente + 1,
                          "Events_id" : this.$route.params.id,
                          "User_id": localStorage.getItem('iduser'),
                      }
                  }
              ]
          })
          .then(function (response) {
              _this.checkInscription()
              _this.UpdateEvent(true)
          })
        }

        //DESINSCRIPTIONS
        else if(this.currentAction === "Desinscription"){
          await http.delete('https://api.airtable.com/v0/appIikQa2F0vLZo8R/Inscriptions/'+this.incriptionId+'')
          .then(function (response) {
            _this.checkInscription()
            _this.UpdateEvent(false)
          })
        }
      }
    },

    async UpdateEvent(action){
      var _this = this
      if(action === true && this.full === false){var new_number = this.event.fields.Nombre_inscriptions + 1}
      else if(action === true && this.full === true){var new_number = this.event.fields.Attente + 1}
      else if(action === false && this.full === false){var new_number = this.event.fields.Nombre_inscriptions - 1}
      else if(action === false && this.full === true){var new_number = this.event.fields.Attente - 1}

      if(this.full === false){
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
        })
        .then(function (response) {
          _this.event.fields.Nombre_inscriptions = new_number
        })   
      }
      
      else if(this.full === true){
        await http.patch('Evenements', 
        {
            "records": [
                {
                    "id": this.page_id,
                    "fields": {
                        "Attente": new_number,
                    }
                }
            ]
        })
        .then(function (response) {
          _this.event.fields.Attente = new_number
        }) 
      }
      this.modal = false
      this.allreadyclick = false
      this.button_text_2 = "Confirmer"
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
  width: 100%;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }

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

      @media only screen and (min-width: 600px) {
        width: 400px;
      }

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

    img{
      background: rgba(0, 0, 0, 0.275);
      border-radius: 50%;
      padding: 3px;
      backdrop-filter: blur(10px);
    }

    @media only screen and (min-width: 600px) {
      height: 100%;
      width: 50%;
    }
  }

  .detail_content{
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (min-width: 600px) {
      //justify-content: flex-start;
      //gap: 50px;
    }

    .detail_content_top{
      h1{
        font-weight: 600;
        font-size: 32px;
        margin: 0;
        color: $fontcolor;
      }
      h2{
        margin: 0 0 10px 0;
        font-weight: 500;
        font-size: 20px;
        color:$fontcolor
      }
      .line{
        border-top: 1px solid $hr ;
       
      }

      .detail_content_carac{
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        @media only screen and (min-width: 600px) {
          flex-direction: row;
        }
        gap: 10px;

        .detail_content_carac_line{
          display: flex;
          width: 100%;
          @media only screen and (min-width: 600px) {
            width: 50%;
          }

          div{
            width: 50%;
            display: flex;
            align-items: center;
            gap:10px;
            font-size: 14px;
            

            img{
              height: 20px;
              background: #ffdfdf;;
              padding: 3px;
              border-radius: 50%;
              @media only screen and (min-width: 600px) {
                height: 30px;
                opacity: 80%;
              }
            }
          }
        }
      }
      p{
        margin: 0;
        color: $fontcolor;
        text-align: justify;
        font-size: 14px;

        span{
          font-weight: 600;
        }
      }
    }
    .detail_content_bottom{
      p{
        font-weight: 400;
        margin-bottom: 10px;
        font-size: 12px;
        text-align: justify;
        color: $rouge;
      }
      button{
        width: 100%;
        height: 65px;
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
