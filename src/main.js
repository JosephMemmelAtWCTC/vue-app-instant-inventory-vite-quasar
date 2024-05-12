import './assets/main.css';
import "https://unpkg.com/html5-qrcode.js";

// import 'bootstrap/dist/css/bootstrap.min.css'
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.js'
import * as bootstrap from 'bootstrap';
// import 'bootstrap/dist/js/bootstrap.js' //with .js for after, without .js for import into compiler
import 'quasar/dist/quasar.esm.prod.js';
import '@/scss/app.scss';

// import { useQuasar } from 'quasar'
// const $q = useQuasar()

import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";
import firebase from "firebase/app";
import './models/Firebase.js';


import {createApp} from 'vue'
import App from './App.vue'
import router from "src/router";

// createApp(App).mount('#app')
// @@@
createApp(App).use(router).mount('#app')
