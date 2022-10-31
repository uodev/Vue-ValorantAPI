<template>
  <div class="mt-3">
    <div v-if="this.$store.state.userLogedin.userLogin">
      <div v-if="!weaponLoaded"><h1>İçerik yükleniyor</h1></div>
      <div v-else>
        <h1>Detay - {{ weaponDetail.displayName }}</h1>
        <div class="row mt-3">
          <div class="col-6">
            <div class="card card-detail-page-img">
              <img :src="weaponDetail.displayIcon" class="card-img" alt="" />

              <div class="row justify-content-between mt-5">
                <div class="col-3 ms-5">
                  <h5 class="text-white">Satış Fiyatı:</h5>
                </div>
                <div class="col-7 me-3">
                  <h6 class="text-white">{{ weaponDetail.shopData.cost }}</h6>
                </div>
              </div>

              <div class="row justify-content-between mt-3">
                <div class="col-3 ms-5">
                  <h5 class="text-white">Kategori:</h5>
                </div>
                <div class="col-7 me-3">
                  <h6 class="text-white">
                    {{ weaponDetail.shopData.categoryText }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div
              class="card card-detail-page-weapon-details justify-content-center"
            >
              <div class="card card-bg">
                <div
                  class="row text-center d-flex justify-content-center align-items-center"
                >
                  <div class="col-3">
                    <h4>Kafaya Hasar:</h4>
                  </div>
                  <div class="col-3">
                    <h4>
                      {{ weaponDetail.weaponStats.damageRanges[0].headDamage }}
                    </h4>
                  </div>
                </div>
              </div>
              <div class="card card-bg mt-3">
                <div
                  class="row text-center d-flex justify-content-center align-items-center"
                >
                  <div class="col-3">
                    <h4>Vücuda Hasar:</h4>
                  </div>
                  <div class="col-3">
                    <h4>
                      {{ weaponDetail.weaponStats.damageRanges[0].bodyDamage }}
                    </h4>
                  </div>
                </div>
              </div>
              <div class="card card-bg mt-3">
                <div
                  class="row text-center d-flex justify-content-center align-items-center"
                >
                  <div class="col-3">
                    <h4>Bacağa Hasar:</h4>
                  </div>
                  <div class="col-3">
                    <h4>
                      {{ weaponDetail.weaponStats.damageRanges[0].legDamage }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 class="mt-4">Skinler</h3>
        <div
          id="carouselExampleControls"
          class="carousel slide mt-3"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <h5 class="text-white">{{ weaponDetail.displayName }}</h5>

              <img
                :src="
                  weaponDetail.displayIcon !== null
                    ? weaponDetail.displayIcon
                    : weaponIconNone
                "
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div
              v-for="weapon in weaponDetail.skins"
              :key="weapon"
              class="carousel-item"
            >
              <h5 class="text-white">{{ weapon.displayName }}</h5>
              <img :src="chooseImage(weapon)" class="d-block w-100" alt="..." />
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger" role="alert">
        İçeriği görmek için giriş yapın
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      weaponDetail: null,
      weaponLoaded: false,
      weaponIconNone:
        "https://media.valorant-api.com/weaponskins/f454efd1-49cb-372f-7096-d394df615308/displayicon.png",
    };
  },

  methods: {
    chooseImage(getWeapon) {
      if (getWeapon.displayName.includes("Random")) return;
      else {
        if (getWeapon.displayIcon !== null) {
          return getWeapon.displayIcon;
        } else {
          return getWeapon.chromas[0].displayIcon;
        }
      }
    },
  },

  mounted() {
    const route = useRoute();
    const id = route.params.id;
    this.$axios
      .get(`https://valorant-api.com/v1/weapons/${id}?language=tr-TR`)
      .then((res) => {
        this.weaponDetail = res.data.data;
        console.log(this.weaponDetail);
        this.weaponLoaded = true;
        console.log(this.weaponDetail.skins.length);
      })
      .catch((err) => {
        console.log(err);
        this.weaponLoaded = false;
      });
  },
};
</script>
