<template>
  <div class="signin">
    <form>
        <h1>Me connecter</h1>
        <label for="mail">Adresse email</label><br>
        <input type="text" name="mail" /><br>

        <label for="password">Mot de passe</label><br>
        <input type="password" name="password" /><br>

        <button>Suivant</button>

        <router-link class="redirect" to="creer-un-compte">Je n'ai pas encore de compte</router-link>
    </form>

    <div class="anim_logo">
        <img src="@/assets/img/logo.svg" alt="Logo events">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signin',
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

.signin{
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    

    .anim_logo{
        height: 100%;
        position: relative;
        display: flex;
        align-items: end;
        justify-content: center;
    }

    img{
        width: 15%;
        transform: rotate(0deg) translate(-50%, -50%);
        animation: rotating 10s linear infinite;
    }

    @keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    form{
        h1{
            margin: 0 auto 15px auto;
            font-weight: 600;
            font-size: 32px;
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
            height: 55px;
            margin:10px 0 20px 0;
            border-radius: 5px;
            color: $fontcolor;
            padding: 0 10px;

            &:focus{
                border: 1px solid $rouge;
            }
        }

        button{
            width: 100%;
            height: 55px;
            font-family: Poppins, Helvetica, Arial, sans-serif;
            background-color: $orange;
            color: white;
            font-weight: 500;
            font-size: 16px;
            border: none;
            outline:none;
            border-radius: 5px;
            margin: 25px 0 25px 0;
        }

        .redirect{
            color:$fontcolor;
            font-size: 14px;
        }
    }
}
</style>
