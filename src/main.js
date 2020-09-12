import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import FilterDate from './Filter/Date';

Vue.config.productionTip = false;
Vue.filter('filterDate', FilterDate);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
