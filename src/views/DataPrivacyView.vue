<template>
    <div class="data_privacy">
        <div class="back" @click="$router.go(-1)">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.76 24.0934L4.66668 16.0001L12.76 7.90672" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M27.3334 16L4.89337 16" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
       
        <h1>Utilisation et protection des données personnelles</h1>
        <hr>
        <p>Les informations recueillies dans le questionnaire sont enregistrées dans un fichier informatisé par <strong>le gérants des Fous du Roy</strong>. La base légale du traitement est le contrat. <br/><br/>

        Les données marquées par un astérisque dans le questionnaire doivent obligatoirement être fournies. Dans le cas contraire, nous ne pouvons pas vous compter parmi les participants à nos évènements.<br/><br/>

        Les données collectées seront communiquées aux seuls destinataires suivants : <strong>Les Fous du Roy.</strong><br/><br/>

        Elles sont conservées pendant<strong> 5 ans.</strong><br/><br/>

        Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données. (en fonction de la base légale du traitement, mentionner également : Vous pouvez retirer à tout moment votre consentement au traitement de vos données ; Vous pouvez également vous opposer au traitement de vos données ; Vous pouvez également exercer votre droit à la portabilité de vos données)<br/><br/>

        Consultez le site cnil.fr pour plus d’informations sur vos droits.<br/><br/>

        Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter (le cas échéant, notre délégué à la protection des données ou le service chargé de l’exercice de ces droits) : <strong>contact@lesfousduroy.fr.</strong> <br/><br/>

        Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne
        sont pas respectés, vous pouvez adresser une réclamation à la CNIL.</p>
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