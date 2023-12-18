import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import router from './routes';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

// Plugins
Vue.use(Vuelidate);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
