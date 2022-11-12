<template>
  <div class="modalprofil">
    <div class="modalprofil_bloc">
        <button>Modifier mon profil</button>
        <button @click="$router.replace({ path: '/update-pp' })">Modifier ma photo profil</button>
        <button @click="Disconnect()">Me déconnecter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalProfil',
  data(){
    return {
     
    }
  },

  methods:{
    Disconnect(){
      localStorage.clear()
      this.$router.push('/me-connecter')
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.modalprofil{
    z-index: 1000;
    top:0; 
    left: 0;
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #e9eff297;;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;

    .modalprofil_bloc{
        padding: 40px 0;
        height: fit-content;
        width: 80%;
        border-radius: 10px;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        gap: 30px;

        button{
            width: calc(100% - 100px);
            height: 45px;
            font-family: Poppins, Helvetica, Arial, sans-serif;
            background-color: transparent;
            color: $fontcolor;
            font-weight: 500;
            font-size: 16px;
            border: none;
            outline:none;
            border-radius: 10px;

            &:nth-child(3){
              color: $rouge;
            }
        }
    }
}
</style>
