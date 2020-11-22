import Vue from 'vue'
import VueRouter from 'vue-router'
import CryptoList from '@/components/CryptoList'
import NotFound from '@/components/NotFound'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: CryptoList },
  { path: '*', component: NotFound },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
