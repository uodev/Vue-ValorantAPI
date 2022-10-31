<template>
  <div class="row d-flex justify-content-center align-items-center mt-5">
    <div class="col-6">
      <div class="mb-3">
        <label for="fullname" class="form-label text-white">Ad Soyad</label>
        <input
          type="text"
          name="fullname"
          class="form-control"
          id="fullname"
          placeholder="John Doe"
          v-model="user.fullname"
          required
        />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label text-white"
          >Kullanıcı Adı</label
        >
        <input
          type="text"
          name="username"
          class="form-control"
          id="username"
          v-model="user.username"
          placeholder="holymoly"
          required
        />
      </div>
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
          v-model="user.password"
          required
          minlength="6"
        />
      </div>
      <button @click="signupUser" class="btn btn-danger">Kayıt Ol</button>
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
        fullname: "",
        username: "",
      },
    };
  },
  methods: {
    signupUser(e) {
      e.preventDefault();

      this.$axios
        .post("http://localhost:8080/signup", this.user)
        .then((res) => {
          console.log("response: ", res);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = res.data.user;

          this.$router.push({
            name: "HomePage",
          });
        })
        .catch((err) => {
          console.log("hata: ", err.response.data.errors);
          const errors = err.response.data.errors;
          this.errors = errors;
        });
    },
  },
};
</script>
