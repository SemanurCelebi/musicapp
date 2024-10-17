import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Loader from './components/Loader.vue';

library.add(faMagnifyingGlass);

const app = createApp(App);
const pinia = createPinia();

app.component('Loader', Loader);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount('#app');