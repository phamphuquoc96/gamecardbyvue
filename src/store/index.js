import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {
    count: 0,
    time: 0,
    currentTime: 0,
    interval: null,
    listHightScope: [],
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count += 1;
    },
    countTime(state) {
      state.interval = setInterval(() => {
        state.time = state.time + 1;
        console.log("Count time...");
      }, 1000);
    },
    stopCountTime(state) {
      clearInterval(state.interval);
      let newVariable = state.time.valueOf();
      state.currentTime = newVariable;
      let data = {
        name: "Guset",
        time: newVariable,
        date: new Date(),
        step: state.count,
      };
      state.listHightScope.push(data);
      state.time = 0;
      state.count = 0;
    },
  },
  actions: {
    increment({ commit }) {
      commit("increment");
    },
    countTime({ commit }) {
      commit("countTime");
    },
    stopCountTime({ commit }) {
      commit("stopCountTime");
    },
  },
  modules: {},
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
