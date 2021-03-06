import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserResults from '../views/UserResults.vue'
import TopicResults from '../views/TopicResults.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-results',
    name: 'User Results',
    component: UserResults
  },
  {
    path: '/topic-results',
    name: 'Topic Results',
    component: TopicResults
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
