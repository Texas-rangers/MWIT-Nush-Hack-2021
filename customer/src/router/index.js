import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import firebase from 'firebase'
import test from "../views/test.vue"
import Searchshop from "../views/Searchshop.vue"
import Book from "../views/Book.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path:"/test",
    name: "test",
    component: test
  },
  {
    path: "/searchshop",
    name: "Searchshop",
    component: Searchshop
  },
  {
    path: "/book",
    name: "Book",
    component: Book,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = firebase.auth().currentUser;
  if(requiresAuth && !isAuth){
    next("/");
    alert("Please login first");
  }else{
    next();
  }
})

export default router
