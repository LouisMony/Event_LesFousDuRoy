<template>
  <div class="signup">
    <div class="back" @click="$router.push('/options')">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.76 24.0934L4.66668 16.0001L12.76 7.90672" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M27.3334 16L4.89337 16" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h1>Modifier mon profil</h1>
    <hr>
    <form @submit.prevent="Verif">
        <label for="username">Nom d'utilisateur</label><br>
        <input type="text" name="username" v-model="username" required /><br>

        <label for="mail">Adresse email</label><br>
        <input type="text" name="mail" v-model="mail" required/><br>

        <label for="tel">Numéro de téléphone</label><br>
        <input type="text" name="tel" v-model="tel" required/><br>
        
        <span class="error" v-if="modal_error">{{error_content}}</span><br>

        <button class="main_button">{{button_state}}</button>
    </form>
  </div>
</template>

<script>
import {http} from "../assets/js/http-common.js"

export default {
  name: 'UpdateProfilView',
  components: {
  },
  data(){
    return {
        images: [],
        username: localStorage.getItem('username'),
        mail: localStorage.getItem('mail'),
        tel: localStorage.getItem('tel'),
        password:"",
        passwordconf:"",
        modal_error: false,
        error_content : "Une erreur est survenue, réessayer.",
        button_state: "Modifier mon compte"
    }
  },

  mounted(){
  },

  methods:{
    async Verif(){
        this.button_state = "Patientez..."
        var _this = this
        await http.get('Users?filterByFormula=AND(SEARCH("'+this.mail+'", {Adresse_mail}))')
        .then(function (response) {
            if(response.data.records.length === 0 || ( response.data.records.length === 1 && response.data.records[0].id === localStorage.getItem('iduser')) ){
                http.get('Users?filterByFormula=AND(SEARCH("'+_this.tel+'", {Telephone}))')
                .then(function (response) {
                    if(response.data.records.length === 0 || ( response.data.records.length === 1 && response.data.records[0].id === localStorage.getItem('iduser'))){ 
                        _this.UpdateUser()
                    }
                    else{
                        _this.error_content = "Ce numéro de téléphone est déja utilisé."
                        _this.modal_error = true
                        _this.button_state = "Modifier mon profil"
                    }
                })
                .catch(function (error) {
                    //console.log(error);
                });
            }
            else{
                _this.error_content = "Cette adresse email est déja utilisée."
                _this.modal_error = true
                _this.button_state = "Modifier mon profil"
            }
        })
        .catch(function (error) {
            //console.log(error);
        }); 
    },
    async UpdateUser(){
      var _this = this
      //console.log('user');
      await http.patch('Users', 
        {
            "records": [
                {
                    "id": localStorage.getItem('iduser'),
                    "fields": {
                        "Adresse_mail": this.mail,
                        "Username": this.username,
                        "Telephone": this.tel
                    }
                }
            ]
        })
        .then(function (response) {
          //console.log(response.data)
          localStorage.setItem('username', _this.username)
          localStorage.setItem('mail', _this.mail)
          localStorage.setItem('tel', _this.tel)
          _this.$router.push('/options')
          _this.button_state = "Modifier mon profil"
        })   
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.signup{
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    @media only screen and (min-width: 600px) {
      max-width: 400px;
      margin: auto;
    }

    hr{
        border-top: 1px solid $hr ;
    }
    h1{
        margin: 10px auto 10px auto;
        font-weight: 600;
        font-size: 24px;
    }

    form{
        margin-top: 15px;
        .error{
            color: $rouge;
            font-size: 12px;
        }

        label{
            font-weight: 400;
            font-size: 14px;
            color:$fontcolor;
            margin-bottom: 15px;
        }

        input{
            box-sizing: border-box;
            font-family: Poppins, Helvetica, Arial, sans-serif;
            background-color: $scnd_bg;
            outline: none;
            border: 1px solid $focus;
            width: 100%;
            height: 40px;
            margin:0px 0 20px 0;
            border-radius: 5px;
            color: $fontcolor;
            padding: 0 10px;

            &:focus{
                border: 1px solid $rouge;
            }
        }

        button{
            width: 100%;
            height: 50px;
            margin: 0px 0 25px 0;
        }

        .redirect{
            font-size: 14px;
            color:$fontcolor;
        }
    }
}
</style>