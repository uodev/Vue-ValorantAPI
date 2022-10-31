<template>
  <div class="row d-flex justify-content-center align-items-center mt-5">
    <div class="col-6">
      <div class="mb-3">
        <label for="email" class="form-label text-white">Email</label>
        <input
          type="email"
          name="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="user.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label text-white">Şifre</label>
        <input
          type="password"
          name="password"
          class="form-control"
          id="password"
          placeholder="********"
          required
          v-model="user.password"
          minlength="6"
        />
      </div>
      <button @click="loginUser" class="btn button-dark">Giriş Yap</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {
        email: "",
        password: "",
      },
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser(e) {
      e.preventDefault();

      this.$axios
        .post("http://localhost:8080/login", this.user)
        .then((res) => {
          console.log("response: ", res);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = res.data.user;

          this.$router.push({
            name: "HomePage",
          });
        })
        .catch((err) => {
          console.log("hata: ", err);
          const errors = err.response.data.errors;
          this.errors = errors;
          this.$store.state.userLogedin.userLogin = false;
          this.$store.state.userLogedin.userId = "";
        });
    },
  },
};
</script>
