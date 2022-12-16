import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    increment(state, number) {
      state.count += number;
    },
  },
  actions: {
    increment({ commit }, number) {
      commit("increment", number);
    },
  },
  modules: {},
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
