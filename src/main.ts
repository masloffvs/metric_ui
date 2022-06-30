import { createApp } from 'vue'
import App from './App.vue'
import LoginView from "./views/LoginView.vue"
import {createRouter, createWebHistory} from "vue-router"
import './assets/main.css'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: LoginView },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
