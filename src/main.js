// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// import Vue from 'vue';
// import App from './App.vue';
// import router from '../router/index';

// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
//   router,
// }).$mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from '../router/index'; // make sure this path is correct

const app = createApp(App);
app.use(router);
app.mount('#app');
