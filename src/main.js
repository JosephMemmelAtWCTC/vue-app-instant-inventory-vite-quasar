import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.js'
import * as bootstrap from 'bootstrap';
// import 'bootstrap/dist/js/bootstrap.js' //with .js for after, without .js for import into compiler
import 'quasar/dist/quasar.esm.prod.js';
import '@/scss/app.scss'

import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import firebase from "firebase/app";
import './firebase.js'


import {createApp} from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
// @@@
// createApp(App).use(router).mount('#app')
