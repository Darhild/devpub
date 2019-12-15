import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Main from "@/views/Main.vue";
import Article from "@/views/Article.vue";
import Calendar from "@/views/Calendar.vue";
import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";
import LoginSignIn from "@/components/LoginSignIn.vue";
import LoginRestore from "@/components/LoginRestore.vue";
import LoginRegistration from "@/components/LoginRegistration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/post/:id",
    name: "article",
    component: Article
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    children: [
      {
        path: "",
        component: LoginSignIn
      },
      {
        path: "registration",
        component: LoginRegistration
      },
      {
        path: "restore-password",
        component: LoginRestore
      }
    ]
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  }

  /*
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" "../views/About.vue")
  }*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
