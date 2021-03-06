import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

/*
  recupero info autenticazione :
  tutte le route che hanno ifNotAuth se beccano
  un utente autenticato lo buttano su charts
  tutte quelle che hanno ifAuth se beccano un 
  utente non autenticato lo buttano su login 
*/
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/charts");
};
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  /* Path buoni */
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/oauth",
    name: "OAuth",
    component: () => import("../views/OAuth.vue")
  },
  {
    path: "/charts",
    name: "Charts",
    component: () => import("../views/Charts.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/forms",
    name: "Forms",
    component: () => import("../views/Forms.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/tables",
    name: "Tables",
    component: () => import("../views/Tables.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/developer",
    name: "Developer",
    component: () => import("../views/Developer.vue"),
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
