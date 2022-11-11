<template>
  <div class="signup">
    <h1>Créer mon compte</h1>
    <form>
        <label for="username">Nom d'utilisateur</label><br>
        <input type="text" name="username" /><br>

        <label for="mail">Adresse email</label><br>
        <input type="text" name="mail" /><br>

        <label for="tel">Numéro de téléphone</label><br>
        <input type="text" name="tel" /><br>

        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" /><br>

        <label for="password_conf">Mot de passe</label><br>
        <input type="password" name="password_conf" /><br>

        <label for="photo_profil">Photo de profil</label><br>
        <div class="photo_list">
            <div @click="SelectPhoto('1')" id="photo_list_item_1" class="photo_list_item active"></div>
            <div @click="SelectPhoto('2')" id="photo_list_item_2" class="photo_list_item"></div>
            <div @click="SelectPhoto('3')" id="photo_list_item_3" class="photo_list_item"></div>
            <div @click="SelectPhoto('4')" id="photo_list_item_4" class="photo_list_item"></div>
        </div>
        <button>Créer mon compte</button>

        <router-link class="redirect" to="me-connecter">Je n'ai pas encore de compte</router-link>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Signup',
  components: {
  },
  data(){
    return {
        images: [],
    }
  },
  mounted(){
    this.countFile(require.context('@/assets/img/photo_profil/', true, /\.png$/))
  },
  methods:{
    SelectPhoto(str){
        const options = Array.from(document.querySelectorAll('.photo_list_item'))
        options.forEach(item => {
            if(item.id === "photo_list_item_"+str){
                item.classList.add('active')
            }
            else{
                item.classList.remove('active')
            }
        })
    },

    countFile(r){
        r.keys().forEach(key => (this.images.push({ Url: key })));
        console.log(this.images)
    }
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.signup{
    box-sizing: border-box;
    padding: 15px;
    h1{
        margin: 0 auto 15px auto;
        font-weight: 600;
        font-size: 32px;
    }

    form{
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
            height: 55px;
            margin:10px 0 20px 0;
            border-radius: 5px;
            color: $fontcolor;
            padding: 0 10px;

            &:focus{
                border: 1px solid $rouge;
            }
        }

        .photo_list{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin:10px 0 20px 0;

            .photo_list_item{
                background-color: black;
                border: 1px solid $focus;
                width: 20%;
                aspect-ratio: 1/1;
                border-radius: 50%;
                transition: all 100ms linear;
                

                &:nth-child(1){
                    background: url('@/assets/img/photo_profil/Jace.png');
                    background-position-x: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                &:nth-child(2){
                    background: url('@/assets/img/photo_profil/Nissa.png');
                    background-position-x: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                &:nth-child(3){
                    background: url('@/assets/img/photo_profil/Chandra.png');
                    background-position-x: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                &:nth-child(4){
                    background: url('@/assets/img/photo_profil/Liliana.png');
                    background-position-x: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            }

            .active{
                position: relative;
                border: 1px solid #FFFFFF;
                filter: brightness(50%);

                &::before{
                    content: 'Sélectionné';
                    color: white;
                    font-size: 12px;
                    position: absolute;
                    transform: translate(-50%, -50%);
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                }
            }
        }

        button{
            width: 100%;
            height: 55px;
            font-family: Poppins, Helvetica, Arial, sans-serif;
            background-color: $rouge;
            color: white;
            font-weight: 500;
            font-size: 14px;
            border: none;
            outline:none;
            border-radius: 5px;
            margin: 25px 0 25px 0;
        }

        .redirect{
            font-size: 14px;
            color:$fontcolor;
        }
    }
}
</style>
