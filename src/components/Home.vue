<template>
  <div class="mt-3">
    <h1>Silahlar</h1>
    <div v-if="this.$store.state.userLogedin.userLogin">
      <div v-if="!isLoaded">
        <h2 class="text-white">{{ contentText }}</h2>
      </div>
      <div v-else class="row mt-2">
        <div
          v-for="weapon in this.$store.state.weaponList"
          :key="weapon.uuid"
          class="col-4"
        >
          <div
            class="card card-home-page mt-2 mb-3"
            @click="detailsPage(weapon.uuid)"
            style="background-color: #082333b9"
          >
            <img
              :src="weapon.displayIcon"
              alt="vandal"
              class="card-img-top mt-5"
            />
            <div class="card-body">
              <h5 class="card-title text-white">{{ weapon.displayName }}</h5>
            </div>
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
export default {
  data() {
    return {
      isLoaded: false,
      contentText: "İçerik yükleniyor...",
    };
  },

  created() {
    this.$axios
      .get("https://valorant-api.com/v1/weapons?language=tr-TR")
      .then((res) => {
        console.log(res);
        // console.log(res.data.data);
        this.$store.state.weaponList = res.data.data;
        console.log(this.weaponList);
        this.isLoaded = true;
      })
      .catch((err) => {
        console.log(err);
        this.contentText = "İçerik yüklenirken bir hata oluştu";
        this.isLoaded = false;
      });
  },

  methods: {
    detailsPage(uuid) {
      this.$router.push({
        name: "DetailsPage",
        params: {
          id: uuid,
        },
      });
    },
  },
};
</script>
