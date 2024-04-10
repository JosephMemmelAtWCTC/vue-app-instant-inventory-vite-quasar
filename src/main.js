import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js' //with .js for after, without .js for import into compiler
import 'quasar/dist/quasar.esm.prod.js';
import '@/scss/app.scss'


import {createApp} from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
