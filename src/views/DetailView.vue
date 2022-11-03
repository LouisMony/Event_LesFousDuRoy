<template>
  <div class="detail">
    <div class="detail_bg" @click="$router.go(-1)">
      <img src="@/assets/img/arrow_left.svg" alt="Retourner à la page précédente">
    </div>
    <div class="detail_content">
      <div class="detail_content_top">
        <h1>Draft - Edition #45</h1>
        <h2>Magic the Gathering</h2>
        <hr>
        <div class="detail_content_carac">
          <div class="detail_content_carac_line">
            <div>
              <img src="@/assets/img/calendar.svg" alt="icône de calendrier">
              <span>06 / 02 / 2023</span>
            </div>
            <div>
              <img src="@/assets/img/location.svg" alt="icône de localisation">
              <span>En boutique</span>
            </div>
          </div>
          <div class="detail_content_carac_line">
            <div>
              <img src="@/assets/img/clock.svg" alt="icône d'horloge">
              <span>21:00 - 00:00</span>
            </div>
            <div>
              <img src="@/assets/img/people.svg" alt="icône de groupe">
              <span>12/16</span>
            </div>
          </div>
        </div>
        <p><span>Details :</span><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="detail_content_bottom">
        <button>M’inscrire à cet évènement</button>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "@/assets/style/_variables.scss";

.detail{
  height: 100vh;
  display: flex;
  flex-direction: column;

  .detail_bg{
    box-sizing: border-box;
    padding: 25px;
    height: 50%;
    background-image: url("@/assets/img/bg_tournoi.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .detail_content{
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .detail_content_top{
      h1{
        font-weight: 600;
        font-size: 32px;
        margin: 0;
      }
      h2{
        margin: 0 0 25px 0;
        font-weight: 500;
        font-size: 20px;
        color:$scnd_text
      }
      hr{
        border: 1px solid $bg_black_light
      }
      .detail_content_carac{
        margin: 25px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .detail_content_carac_line{
          display: flex;
          width: 100%;
          div{
            width: 50%;
            display: flex;
            align-items: center;
            gap:10px;

            img{
              height: 30px;
            }
          }
        }
      }
      p{
        margin: 0;
        color: $white;
        text-align: justify;
        span{
          color: $scnd_text;
          font-size: 14px;
        }
      }
    }
    .detail_content_bottom{
      button{
        mask: paint(squircle);
        --squircle-radius: 20px;
	      --squircle-smooth: 0.5;
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
      }
    }
  }
}
</style>
