<template>
    <div class="data_privacy">
        <div class="back" @click="$router.go(-1)">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.76 24.0934L4.66668 16.0001L12.76 7.90672" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M27.3334 16L4.89337 16" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h1>Utilisation et protection des données personnelles</h1>
    </div>
</template>

<script>

export default {
  name: 'DataPrivacyView',
  components: {
  },
  data(){
    return {
    }
  },

  mounted(){
  },

  methods:{
    
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.data_privacy{
    box-sizing: border-box;
    padding: 15px;
    h1{
        margin: 0 auto 15px auto;
        font-weight: 600;
        font-size: 24px;
    }
}
</style>