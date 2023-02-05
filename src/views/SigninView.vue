<template>
  <div class="signin">
    <form @submit.prevent="submitForm">
        <h1>Me connecter</h1>
        <hr>
        <label for="mail">Adresse email</label><br>
        <input type="text" name="mail" v-model="mail"/><br>

        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" v-model="password"/><br>

        <span class="error" v-if="modal_error">Adresse email ou mot de passe invalide.<br></span>

        <button class="main_button">Suivant</button>

        <router-link class="redirect" to="creer-un-compte">Je n'ai pas encore de compte</router-link>
    </form>

    <div class="anim_logo">
        <img src="@/assets/img/logo.svg" alt="Logo events">
    </div>
  </div>
</template>

<script>
import {http} from "../assets/js/http-common.js"

export default {
  name: 'Signin',
  components: {
  },
  data(){
    return {
        mail:"",
        password:"",
        modal_error: false
    }
  },
  methods:{
    async submitForm(){
        var _this = this
        await http.get('Users?filterByFormula=AND(SEARCH("'+this.mail+'", {Adresse_mail}))')
        .then(function (response) {
           if (response.data.records[0].fields.Password === _this.password){
            localStorage.setItem('state', 'ACTIVE')
            localStorage.setItem('username', response.data.records[0].fields.Username)
            localStorage.setItem('mail', response.data.records[0].fields.Adresse_mail)
            localStorage.setItem('tel', response.data.records[0].fields.Telephone)
            localStorage.setItem('photo', response.data.records[0].fields.Photo_Profil)
            localStorage.setItem('iduser', response.data.records[0].id)
            _this.$router.push('/')
           }
           else{
            console.log('not connected')
            _this.modal_error = true
            _this.mail = ""
            _this.password = ""
           }
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

.signin{
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    @media only screen and (min-width: 600px) {
      max-width: 400px;
      margin: auto;
    }
    hr{
        border-top: 1px solid $hr ;
    }
    
    .anim_logo{
        height: 100%;
        position: relative;
        display: flex;
        align-items: end;
        justify-content: center;
    }

    img{
        width: 15%;
        max-width: 50px
    }

    form{
        .error{
            color: $rouge;
            font-size: 12px;
        }

        h1{
            margin: 0 auto 10px auto;
            font-weight: 600;
            font-size: 24px;
        }
        label{
            font-weight: 400;
            font-size: 14px;
            color:$fontcolor;
            margin-bottom: 10px;
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
            
        }

        .redirect{
            color:$fontcolor;
            font-size: 12px;
        }
    }
}
</style>
