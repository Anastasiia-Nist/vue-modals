import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Pages
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthPage,
        }
    ]
})