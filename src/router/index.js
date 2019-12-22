import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
const MainPage = () =>
  import(/* webpackChunkName: "mainPage" */ "@/views/MainPage.vue");
const Login = () => import(/* webpackChunkName: "login" */ "@/views/Login.vue");
const Stat = () => import(/* webpackChunkName: "stat" */ "@/views/Stat.vue");
const Article = () =>
  import(/* webpackChunkName: "article" */ "@/views/Article.vue");
const Calendar = () =>
  import(/* webpackChunkName: "calendar" */ "@/views/Calendar.vue");
const EditPost = () =>
  import(/* webpackChunkName: "editPost" */ "@/views/EditPost.vue");
const Settings = () =>
  import(/* webpackChunkName: "settings" */ "@/views/Settings.vue");
const Profile = () =>
  import(/* webpackChunkName: "profile" */ "@/views/Profile.vue");
const Articles = () =>
  import(/* webpackChunkName: "articles" */ "@/components/Articles.vue");
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
    props: { editPost: false },
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
    name: "calendar",
    component: Calendar
  },
  {
    path: "/calendar/:date",
    name: "mainPage",
    component: MainPage
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
      },
      {
        path: "change-password",
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
