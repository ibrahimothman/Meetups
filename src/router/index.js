/* eslint-disable arrow-parens */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Meetups from '../views/Meetup/Meetups.vue';
import Meetup from '../views/Meetup/Meetup.vue';
import CreateMeetup from '../views/Meetup/CreateMeetup.vue';
import SignIn from '../views/User/SignIn.vue';
import SignUp from '../views/User/SignUp.vue';
import Profile from '../views/User/Profile.vue';
import store from '../store';

Vue.use(VueRouter);
const isAuth = (to, from, next) => {
  const { user } = store.state.auth;
  console.log(user);
  if (user) {
    next('/');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
    meta: { requiresAuth: true },
  },
  {
    path: '/meetups/create',
    name: 'CreateMeetup',
    component: CreateMeetup,
    meta: { requiresAuth: true },
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    component: Meetup,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: isAuth,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: isAuth,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { user } = store.state.auth;
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  if (requiresAuth && !user) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
