import Vue from 'vue';
import Vuex from 'vuex';
import meetups from './meetups';
import auth from './auth';
import register from './register';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetups,
    auth,
    register,
  },
});
