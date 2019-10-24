import Vue from 'vue'
import ElementUI from 'element-ui'; // import element-ui
import 'element-ui/lib/theme-chalk/index.css'; // import element-ui (CSS)

import router from './router/index'
import {store} from './store/index'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(ElementUI); // Element UI 전역 등록

export const baseURL_user = "http://localhost:3000/users"; // for retrieving the baseurl of each user
export const baseURL_feed = "http://localhost:3000/feeds"; // for retrieving the baseurl of each feed

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

