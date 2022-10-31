import { createStore } from "vuex";

const store = createStore({
  state: {
    weaponList: null,
    userLogedin: {
      userLogin: false,
      userId: "",
    },
    token: "",
  },
});

export default store;
