import { createApp } from 'vue'
import './style.css'
import { createPinia } from "pinia";
import App from './App.vue'
import router from "./router/Router.ts";
import Paginate from 'vuejs-paginate-next'

createApp(App).component('Paginate', Paginate).use(router).use(createPinia()).mount('#app')
