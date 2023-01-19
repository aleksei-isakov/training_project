import { createRouter, createWebHashHistory } from "vue-router";
import Calculator from '/src/components/calculator/Calculator.vue'
import Home from '/src/components/home/Home.vue'
import Weather from '/src/components/weather/Weather.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            alias: '/',
            path: '/',
            component: Home
        },

        {
            path: '/calc',
            component: Calculator
        },
        {
            path: '/weather',
            component: Weather
        }
    ]
})
