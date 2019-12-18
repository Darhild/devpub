import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Main from "@/views/Main.vue";
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
    name: "main",
    component: Main
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
