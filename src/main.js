import Vue from 'vue';
import App from './App.vue';

import vClickOutside from 'v-click-outside';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faBolt,
  faClock,
  faCloud,
  faCloudMoon,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faFan,
  faMoon,
  faPalette,
  faPooStorm,
  faSmog,
  faSnowflake,
  faSun,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBolt,
  faClock,
  faCloud,
  faCloudMoon,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faFan,
  faMoon,
  faPalette,
  faPooStorm,
  faSmog,
  faSnowflake,
  faSun,
  faWind
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(vClickOutside);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
