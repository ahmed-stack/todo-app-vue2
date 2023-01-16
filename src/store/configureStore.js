import Vue from "vue";
import Vuex from 'vuex';

// MODULES
import todo from "./modules/todo";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      todo
    }
  });



