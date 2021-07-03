import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import jQuery from 'jquery';
import Swal from 'sweetalert2';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import './assets/admin.scss';
import { fb } from './firebase';
import store from './store'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')
Vue.use(VueFirestore,{
    key:'id',
    enumerable:true,
})
Vue.use(VueFirestore)
window.$ = window.jQuery = jQuery;
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast;

Vue.config.productionTip = false;
Vue.component('NavBar', require('./components/Navbar.vue').default);
Vue.component('Addtocart', require('./components/AddToCart.vue').default);
Vue.component('Products', require('./components/Products.vue').default);
Vue.component('minicart', require('./components/MiniCart.vue').default);
Vue.component('Banner', require('./components/Banner.vue').default);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

let app = '';
fb.auth().onAuthStateChanged(function () {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')
    }
})
