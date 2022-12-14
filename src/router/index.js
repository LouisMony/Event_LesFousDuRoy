import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ProfilView from '../views/ProfilView.vue'
import Signin from '../views/SigninView.vue'
import Signup from '../views/SignupView.vue'
import UpdatephtotView from '../views/UpdatephtotView.vue'
import OptionsView from '../views/OptionsView.vue'
import UpdateProfilView from '../views/UpdateProfilView.vue'
import DataPrivacyView from '../views/DataPrivacyView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: HomeView
  },
  {
    path: '/detail/:id',
    name: 'detail',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: DetailView
  },
  {
    path: '/my-profil',
    name: 'my-profil',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: ProfilView
  },
  {
    path: '/options',
    name: 'options',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: OptionsView
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
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: UpdatephtotView
  },
  {
    path: '/update-profil',
    name: 'update-profil',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('state') === 'ACTIVE'){
        next()
      }else{
        router.push('/me-connecter')
      }
    },
    component: UpdateProfilView
  },
  {
    path: '/utilisation-des-donnees',
    name: 'utilisation-des-donnees',
    component: DataPrivacyView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
