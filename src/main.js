// import "overlayscrollbars/css/OverlayScrollbars.css";
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
// import OverlayScrollbars from 'overlayscrollbars';
// import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

// Vue.use(OverlayScrollbarsPlugin)

// OverlayScrollbars(document.body, {
//   nativeScrollbarsOverlaid: {
//       initialize: false
//   }
// });