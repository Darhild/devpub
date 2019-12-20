import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Login from "@/views/Login.vue";
import MainPage from "@/views/MainPage.vue";
import Stat from "@/views/Stat.vue";
import Article from "@/views/Article.vue";
import Calendar from "@/views/Calendar.vue";
import EditPost from "@/views/EditPost.vue";
import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";
import Articles from "@/components/Articles.vue";
import LoginSignIn from "@/components/LoginSignIn.vue";
import LoginRestore from "@/components/LoginRestore.vue";
import LoginRegistration from "@/components/LoginRegistration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "mainPage",
    component: MainPage
  },
  {
    path: "/moderation",
    name: "moderation",
    component: Articles,
    props: {
      navItems: [
        {
          name: "Новые",
          value: "new"
        },
        {
          name: "Отклоненные",
          value: "declined"
        },
        {
          name: "Утвержденные",
          value: "accepted"
        }
      ],
      forModeration: true,
      className: "ArticlesContent Articles--noborder"
    }
  },
  {
    path: "/my",
    name: "my",
    component: Articles,
    props: {
      navItems: [
        {
          name: "Скрытые",
          value: "inactive"
        },
        {
          name: "Активные",
          value: "pending"
        },
        {
          name: "Отклонённые",
          value: "declined"
        },
        {
          name: "Опубликованные",
          value: "published"
        }
      ],
      myPosts: true,
      className: "ArticlesContent Articles--noborder"
    }
  },
  {
    path: "/stat",
    name: "stat",
    component: Stat,
    className: "ArticlesContent Articles--noborder"
  },
  {
    path: "/post/:id",
    name: "article",
    component: Article
  },
  {
    path: "/add",
    name: "add",
    component: EditPost,
    props: { editPost: false }
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditPost
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
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
