/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.use(require('vue-resource'));

import moment from 'moment';


import Vue from 'vue'
import VueRouter from 'vue-router'
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;

import swal from 'sweetalert2';
window.swal = swal;
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.toast = Toast;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueRouter)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})


let routes = [
    { path: '/dashboard', component: require('./components/DashboardComponent.vue').default },
    { path: '/developer', component: require('./components/DeveloperComponent.vue').default },
    { path: '/profile', component: require('./components/ProfileComponent.vue').default },
    { path: '/categories', component: require('./components/CategoriesComponent.vue').default },
    { path: '/pagination', component: require('laravel-vue-pagination').default },
    { path: '/users', component: require('./components/UsersComponent.vue').default },
    {
        path: '/user/:id',
        component: require('./components/UsersComponent.vue').default,
        children: [
            //if no route matches then this route will be called
            { path: '', component: require('./components/DashboardComponent.vue').default },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                //numbers(12...) will not work in the path URL string
                path: 'profilee',
                component: require('./components/UsersComponent.vue').default
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'posts',
                component: require('./components/UsersComponent.vue').default
            }
        ]
    }
]

// mode:history is added to display proper url like /profile instead of /home/profile
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

//user defined global function to upper case the text in the app anywhere 
Vue.filter('upText', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM DD YYYY');
});

//to call any event in the app
let Fire = new Vue();
window.Fire = Fire;

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});