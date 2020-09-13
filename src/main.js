import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import FilterDate from './Filter/Date';
import firebase from './firebase';
import Error from './components/Alert/Error.vue';

Vue.config.productionTip = false;
Vue.filter('filterDate', FilterDate);
Vue.component('error', Error);

let app;
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in.
    store.commit('auth/setUser', { id: user.uid });
  } else {
    store.commit('auth/setUser', null);
    router.push('/signin');
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
