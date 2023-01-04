<template>
  <div class="signup">
    <h1>Créer mon compte</h1>
    <hr>
    <form @submit.prevent="Verif">
        <label for="username">Nom d'utilisateur</label><br>
        <input type="text" name="username" v-model="username" required /><br>

        <label for="mail">Adresse email</label><br>
        <input type="text" name="mail" v-model="mail" required/><br>

        <label for="tel">Numéro de téléphone</label><br>
        <input type="text" name="tel" v-model="tel" required/><br>

        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" v-model="password" required/><br>

        <label for="password_conf">Confirmer le mot de passe</label><br>
        <input type="password" name="password_conf" v-model="passwordconf" required/><br>

        <span class="error" v-if="modal_error">{{error_content}}</span><br>

        <button class="main_button">{{button_state}}</button>

        <router-link class="redirect" to="me-connecter">J'ai déja un compte.</router-link>
    </form>
  </div>
</template>

<script>
import {http} from "../assets/js/http-common.js"

export default {
  name: 'Signup',
  components: {
  },
  data(){
    return {
        username:"",
        mail:"",
        tel:"",
        password:"",
        passwordconf:"",
        modal_error: false,
        error_content : "Une erreur est survenue, réessayer.",
        button_state: "Créer mon compte",
        images: [],
    }
  },
  mounted(){
    this.countFile(require.context('@/assets/img/photo_profil/', true, /\.png$/))
  },
  methods:{
    // SelectPhoto(str){
    //     const options = Array.from(document.querySelectorAll('.photo_list_item'))
    //     options.forEach(item => {
    //         if(item.id === "photo_list_item_"+str){
    //             item.classList.add('active')
    //         }
    //         else{
    //             item.classList.remove('active')
    //         }
    //     })
    // },
    countFile(r){
        var id = 0
        r.keys().forEach(key => {
            id++
            const url_pp = key.substring(1)+"";
            (this.images.push(url_pp))
        });      
    },

    getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    },

    async Verif(){
        this.button_state = "Patientez"
        var _this = this
        if(this.password === this.passwordconf){
            await http.get('Users?filterByFormula=AND(SEARCH("'+this.mail+'", {Adresse_mail}))')
            .then(function (response) {
                if(response.data.records.length === 0){
                    http.get('Users?filterByFormula=AND(SEARCH("'+_this.tel+'", {Telephone}))')
                    .then(function (response) {
                        if(response.data.records.length === 0){ 
                            _this.AddUser()
                        }
                        else{
                            _this.error_content = "Ce numéro de téléphone est déja utilisé."
                            _this.modal_error = true
                            _this.button_state = "Créer mon compte"
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else{
                    _this.error_content = "Cette adresse email est déja utilisée."
                    _this.modal_error = true
                    _this.button_state = "Créer mon compte"
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            
        }
    },

    async AddUser(){
        var _this = this
        var photo = this.getRandomItem(this.images);
        await http.post('Users', 
        {
            "records": [
                {
                    "fields": {
                        "Password": this.password,
                        "Adresse_mail": this.mail,
                        "Username": this.username,
                        "Telephone": this.tel,
                        "Photo_Profil": photo
                    }
                }
            ]
        })
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('state', 'ACTIVE')
            localStorage.setItem('username', _this.username)
            localStorage.setItem('mail', _this.mail)
            localStorage.setItem('tel', _this.tel)
            localStorage.setItem('photo', photo)
            localStorage.setItem('iduser', response.data.records[0].id)
            _this.$router.push('/')
            _this.button_state = "Créer mon compte"
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

.signup{
    box-sizing: border-box;
    padding: 15px;
    hr{
        border-top: 1px solid $hr ;
    }
    h1{
        margin: 0 auto 10px auto;
        font-weight: 600;
        font-size: 24px;
    }

    form{
        .error{
            color: $rouge;
            font-size: 12px;
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
            font-size: 12px;
            color:$fontcolor;
        }
    }
}
</style>
