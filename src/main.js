import { createApp } from 'vue';
// eslint-disable-next-line
import { app as firebaseApp } from '../firebase';
import App from './App.vue';
import router from '../router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
