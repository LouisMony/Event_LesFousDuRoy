import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ProfilView from '../views/ProfilView.vue'
import Signin from '../views/SigninView.vue'
import Signup from '../views/SignupView.vue'
import UpdatephtotView from '../views/UpdatephtotView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailView
  },
  {
    path: '/my-profil',
    name: 'my-profil',
    component: ProfilView
  },
  {
    path: '/me-connecter',
    name: 'me-connecter',
    component: Signin
  },
  {
    path: '/creer-un-compte',
    name: 'creer-un-compte',
    component: Signup
  },
  {
    path: '/update-pp',
    name: 'update-pp',
    component: UpdatephtotView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
