import { createApp } from 'vue'
import './css/index.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/Index.vue'
import ShuffleTest from './components/ShuffleTest.vue'
import DeepStateUpdatesTest from './components/DeepStateUpdatesTest.vue'
import MapUpdatesTest from './components/MapUpdatesTest.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/shuffle', component: ShuffleTest },
  { path: '/deep-state-updates', component: DeepStateUpdatesTest },
  { path: '/map-updates', component: MapUpdatesTest },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
