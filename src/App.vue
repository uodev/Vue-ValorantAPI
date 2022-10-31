<template>
  <Navbar :userLogin="this.$store.state.userLogedin.userLogin" />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import jwt from "jsonwebtoken";
import { useCookies } from "vue3-cookies";
export default {
  components: {
    Navbar,
  },
  mounted() {
    const { cookies } = useCookies();

    const token = cookies.get("jwt");
    if (token) {
      jwt.verify(token, "alfateksecret", async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(decodedToken);
          this.$store.state.userLogedin.userLogin = true;
          this.$store.state.userLogedin.userId = decodedToken.id;
        }
      });
    }
  },
};
</script>
