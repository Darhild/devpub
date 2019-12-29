import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
const error404 = () =>
  import(/* webpackChunkName: "404" */ "@/components/404.vue");
const MainPage = () =>
  import(/* webpackChunkName: "mainPage" */ "@/pages/MainPage.vue");
const Login = () => import(/* webpackChunkName: "login" */ "@/pages/Login.vue");
const Stat = () => import(/* webpackChunkName: "stat" */ "@/pages/Stat.vue");
const Article = () =>
  import(/* webpackChunkName: "article" */ "@/pages/Article.vue");
const Calendar = () =>
  import(/* webpackChunkName: "calendar" */ "@/pages/Calendar.vue");
const EditPost = () =>
  import(/* webpackChunkName: "editPost" */ "@/pages/EditPost.vue");
const Settings = () =>
  import(/* webpackChunkName: "settings" */ "@/pages/Settings.vue");
const Profile = () =>
  import(/* webpackChunkName: "profile" */ "@/pages/Profile.vue");
const Articles = () =>
  import(/* webpackChunkName: "articles" */ "@/components/TheArticles.vue");
const LoginSignIn = () =>
  import(/* webpackChunkName: "loginSignIn" */ "@/components/LoginSignIn.vue");
const LoginRestore = () =>
  import(
    /* webpackChunkName: "loginRestore" */ "@/components/LoginRestore.vue"
  );
const LoginChange = () =>
  import(/* webpackChunkName: "loginChange" */ "@/components/LoginChange.vue");
const LoginRegistration = () =>
  import(
    /* webpackChunkName: "loginRegistration" */ "@/components/LoginRegistration.vue"
  );

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/posts/recent"
  },
  {
    path: "/posts/*",
    name: "posts",
    component: MainPage
  },
  {
    path: "/moderation",
    redirect: "/moderation/new"
  },
  {
    path: "/moderation/*",
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
    },
    meta: {
      requiresAuth: true,
      moderation: true
    }
  },
  {
    path: "/my",
    redirect: "/my/inactive"
  },
  {
    path: "/my/*",
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
      className: "ArticlesContent Articles--noborder",
      meta: {
        requiresAuth: true
      }
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
    props: { isEditPost: false },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/calendar",
    redirect: `/calendar/${new Date().getFullYear()}`
  },
  {
    path: "/calendar/:year",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/calendar/:year/:date",
    name: "postsByDate",
    component: MainPage
  },
  {
    path: "/login",
    component: Login,
    children: [
      {
        path: "/",
        name: "signIn",
        component: LoginSignIn
      },
      {
        path: "registration",
        name: "registration",
        component: LoginRegistration
      },
      {
        path: "restore-password",
        name: "restorePassword",
        component: LoginRestore
      },
      {
        path: "change-password/:hash?",
        name: "changePassword",
        component: LoginChange
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
  },
  {
    path: "*",
    name: "404",
    component: error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch("getUser").then(() => {
      if (store.getters.isAuth) {
        next();
        return;
      }
      next("/");
    });
  } else {
    next();
  }
});

export default router;
