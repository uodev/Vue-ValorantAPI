<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #082333b9">
    <div class="container-fluid">
      <a class="navbar-brand text-white">Valorant API</a>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-white" aria-current="page" href="#"
              >Anasayfa</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex justfiy-content-center align-items-center">
        <button
          v-show="!userLogin"
          @click="loginPage"
          class="btn button-dark me-3"
        >
          Giriş Yap
        </button>
        <button
          v-show="!userLogin"
          @click="registerPage"
          class="btn btn-danger me-3"
        >
          Kayıt Ol
        </button>
        <button v-show="userLogin" @click="logout" class="btn button-dark me-3">
          Çıkış Yap
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  props: ["userLogin"],
  methods: {
    loginPage() {
      this.$router.push("/login");
    },

    registerPage() {
      this.$router.push("/signup");
    },

    logout() {
      const { cookies } = useCookies();
      let token = cookies.get("jwt");
      if (token) {
        cookies.remove("jwt");
        token = null;
        this.$store.state.userLogedin.userLogin = false;
        this.$store.state.userLogedin.userId = null;
        this.$router.push("/login");
      }
    },
  },
};
</script>
