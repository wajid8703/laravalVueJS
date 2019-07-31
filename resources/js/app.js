/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component: require('./components/DashboardComponent.vue').default },
    { path: '/users', component: require('./components/UsersComponent.vue').default },
    { path: '/profile', component: require('./components/ProfileComponent.vue').default },
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