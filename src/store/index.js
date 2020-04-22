import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

if (window.matchMedia("(perfers-color-scheme: dark)").match) {
  window.localStorage.setItem("isDarkMode", "true");
}
const userSelectDarkMode = window.localStorage.getItem("isDarkMode") === "true";
// Init state
const state = {
  isDarkMode: userSelectDarkMode
}

// Getters
const getters = {
  isDarkMode() {
    return state.isDarkMode
  }
}

// Mutations
const mutations = {
  toggleDarkMode(state) {
    if (state.isDarkMode === true) {
      state.isDarkMode = false
      document.body.style.background = "#f0f3f5"
      window.localStorage.setItem("isDarkMode", "false")
    }
    else {
      state.isDarkMode = true
      document.body.style.background = "#212c4f"
      window.localStorage.setItem("isDarkMode", "true")
    }
  }
}

// Actions
const actions = {
  toggleDarkMode(context) {
    context.comit("toggleDarkMode")
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
});
