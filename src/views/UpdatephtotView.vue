<template>
  <div class="updatephoto">
    <div class="back" @click="$router.push('/options')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.76 24.0934L4.66668 16.0001L12.76 7.90672" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.3334 16L4.89337 16" stroke="#222222" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <h1>Modifier ma photo de profil</h1>
    <hr>
    <div class="updtatephoto__main">
        <div class="photo_list">
            <div v-for="(item, index) in images" v-bind:id="item.id" class="photo_list_item" :key="index" v-on:click="selectPhoto(item.Url, item.id)">
                <img :src="item.Url" alt="Image de profil">
            </div>
        </div>
        
        <button v-if="!disableButton" class="main_button" v-on:click="updatePhoto()">{{text_button}}</button>
        <button v-else class="main_button button_disabled" >Selectionner une photo</button>
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
        images: [],
        selectedphoto: localStorage.getItem('photo'),
        text_button: "Sauvegarder",
        disableButton: true
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
            const url_pp = "img/photo_profil"+key.substring(1)+"";
            const id_name = "photo_list_item_"+id.toString();
            (this.images.push({ Url: url_pp, id : id_name}))
        });      
    },

    selectPhoto(url, id_div){
        this.disableButton = false
        this.selectedphoto = url.slice(16)

        const options = Array.from(document.querySelectorAll('.photo_list_item'))
        options.forEach(item => {
            if(item.id === id_div){
                item.classList.add('active')
            }
            else{
                item.classList.remove('active')
            }
        })
    },

    async updatePhoto(){
        this.text_button = "Patientez..."
        var _this = this
        await http.patch('Users', 
        {
            "records": [
                {
                    "id": localStorage.getItem('iduser'),
                    "fields": {
                        "Photo_Profil": this.selectedphoto,
                    }
                }
            ]
        })
        .then(function (response) {
            //console.log(response.data)
            localStorage.setItem('photo', _this.selectedphoto)
            _this.$router.push('/options')
        })   

    }
  } 
}
</script>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.updatephoto{
    box-sizing: border-box;
    padding: 15px;
    
    hr{
        border-top: 1px solid $hr ;
    }
    h1{
        margin: 10px auto 10px auto;
        font-weight: 600;
        font-size: 24px;
    }

    .updtatephoto__main{
        height: calc(100vh - 135px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        .photo_list{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
            margin:10px 0 20px 0;

            @media only screen and (min-width: 600px) {
                justify-content: left;
            }

            .photo_list_item{
                flex: 1 0 21%;
                margin-bottom: 15px;
                width: 20%;
                max-width: 24%;
                aspect-ratio: 1/1;
                border-radius: 50%;
                transition: all 100ms linear;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                @media only screen and (min-width: 600px) {
                    max-width: 100px;
                }

                img{
                    height: 100%;
                    cursor: pointer;
                }
            }

            .active{
                position: relative;
                
                img{
                    filter: brightness(50%);
                    z-index: 1;
                }
                
                &::after{
                    content: 'Sélectionné';
                    font-size: 12px;
                    color: white;
                    position: absolute;
                    transform: translate(-50%, -50%);
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    z-index: 2;
                }
            }
        }

        button{
            width: 100%;
            height: 55px;
            margin: 25px 0 0px 0;
        }

        .button_disabled{
            filter: brightness(70%);
            cursor: default;
        }
    }
}
</style>
