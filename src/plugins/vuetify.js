import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    primary: colors.red,
  },
});

export default vuetify;
