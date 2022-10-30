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
    }
  },
  methods:{
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.signup{
    box-sizing: border-box;
    padding: 25px;

    h1{
        margin: 0 auto 25px auto;
        font-weight: 600;
        font-size: 32px;
    }

    form{
        label{
            font-weight: 400;
            font-size: 16px;
            color:$scnd_text;
            margin-bottom: 10px;
        }

        input{
            box-sizing: border-box;
            font-family: Poppins, Helvetica, Arial, sans-serif;
            background-color: $bg_black_light;
            outline: none;
            border: 1px solid #393939;
            width: 100%;
            height: 65px;
            margin:10px 0 25px 0;
            border-radius: 10px;
            color: $white;
            padding: 0 10px;

            &:focus{
                border: 1px solid $light_grey;
            }
        }

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
            margin: 25px 0 25px 0;
        }

        .redirect{
            color: $orange;
        }
    }
}
</style>
