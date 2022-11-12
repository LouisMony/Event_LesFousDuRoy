<template>
  <div class="updatephoto">
    <h1>Modifier ma photo de profil</h1>

    <div class="updtatephoto__main">
        <div class="photo_list">
            <div v-for="(item, index) in images" v-bind:id="item.id" class="photo_list_item" :data-bg="item.Url" :key="index">
            </div>
        </div>
        
        <button>Sauvegarder</button>
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
            const url_pp = "@/assets/img/photo_profil"+key.substring(1)+"";
            const id_name = "photo_list_item_"+id.toString();
            (this.images.push({ Url: url_pp, id : id_name}))
        });
        this.Addbg()        
    },

    Addbg(){
        var list = document.getElementsByClassName('photo_list_item');
        console.log(list.length);
    
        for (var i = 0; i < list.length; i++) {
            console.log('ts')
            //console.log(list[i])
            //list[i].style.backgroundImage="url('" + src + "')";
        }
    }
  } 
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.updatephoto{
    box-sizing: border-box;
    padding: 15px;
    height: 100vh;

    h1{
        margin: 0 auto 25px auto;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
    }

    .updtatephoto__main{
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

            .photo_list_item{
                flex: 1 0 21%;
                margin-bottom: 15px;
                //background-color: $bg_black_light;
                border: 1px solid #393939;
                width: 20%;
                aspect-ratio: 1/1;
                border-radius: 50%;
                transition: all 100ms linear;
                background-position-x: center;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .active{
                position: relative;
                border: 1px solid #FFFFFF;
                filter: brightness(50%);

                &::before{
                    content: 'Sélectionné';
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
            font-size: 16px;
            border: none;
            outline:none;
            border-radius: 5px;
            margin: 25px 0 25px 0;
        }
    }
}
</style>
