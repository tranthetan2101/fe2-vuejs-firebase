
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/client/Home";
import Admin from "@/views/admin/Admin";
import Overview from "@/views/admin/Overview";
import Products from "@/views/admin/Products";
import Profile from "@/views/admin/Profile.vue";
import Orders from "@/views/admin/Orders";
import Shop from "@/views/client/Shop";
import Checkout from "@/views/client/Checkout";
import DetailProduct from "@/views/client/DetailProduct";
import { fb } from '../firebase';
Vue.use(Router);
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "overview",
                    name: "overview",
                    component: Overview,
                },
                {
                    path: "products",
                    name: "products",
                    component: Products,
                },
                {
                    path: "orders",
                    name: "orders",
                    component: Orders,
                },
                {
                    path: "profile",
                    name: "profile",
                    component: Profile,
                },
                {
                    path: '/show/:id',
                    name: 'DetailProduct',
                    component: DetailProduct
                }
            ]
        },
        {
            path: "/checkout",
            name: "Checkout",
            component: Checkout,
        },
        {
            path: "/shop",
            name: "shop",
            component: Shop,
        },
    ]
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/');
    } else if (requiresAuth && currentUser) {
        next()
    }
    else {
        next()
    }
})
export default router;
