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

        <div class="rgpd">
            <input type="checkbox" name="rgpd_conf" required/>
            <label for="rgpd_conf">J'accepte que les gérants des Fous du Roy traitent les données recueillies pour l’organisation des évènements. Pour en savoir plus sur la gestion de vos données personnelles et pour exercer vos droits, reportez-vous à la notice <router-link class="redirect" to="utilisation-des-donnees">ci-jointe.</router-link></label><br>
        </div>
        

        <span class="error" v-if="modal_error">{{error_content}}</span><br>

        <button class="main_button">{{button_state}}</button><br/><br/>

        <router-link class="redirect" to="me-connecter">J'ai déja un compte.</router-link>
    </form>
  </div>
</template>

<script>
import {http} from "../assets/js/http-common.js"
import bcrypt from 'bcryptjs';

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
                        //console.log(error);
                    });
                }
                else{
                    _this.error_content = "Cette adresse email est déja utilisée."
                    _this.modal_error = true
                    _this.button_state = "Créer mon compte"
                }
            })
            .catch(function (error) {
                //console.log(error);
            });
        }
        else{
            
        }
    },

    async AddUser(){
        var _this = this
        var photo = this.getRandomItem(this.images);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log("hashedPassword : ", hashedPassword);

        await http.post('Users', 
        {
            "records": [
                {
                    "fields": {
                        "Password": hashedPassword,
                        "Adresse_mail": this.mail,
                        "Username": this.username,
                        "Telephone": this.tel,
                        "Photo_Profil": photo
                    }
                }
            ]
        })
        .then(function (response) {
            //console.log(response.data)
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
            //console.log(error);
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
    width: 100%;
    @media only screen and (min-width: 600px) {
      max-width: 400px;
      margin: auto;
    }
    hr{
        border-top: 1px solid $hr ;
    }
    h1{
        margin: 0 auto 10px auto;
        font-weight: 600;
        font-size: 24px;
    }

    form{

        .rgpd{
            display: flex;
            align-items: flex-start;
            gap: 10px;
            label{
                font-size: 10px!important;
            }
            input{
                width: 70px;
            }
        }
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
