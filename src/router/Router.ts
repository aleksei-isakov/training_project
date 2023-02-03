import { createRouter, createWebHashHistory } from "vue-router";
import Calculator from '/src/modules/calculator/Calculator.vue'
import Home from '/src/modules/home/Home.vue'
import Weather from '/src/modules/weather/Weather.vue'
import Movies from '/src/modules/movies/components/Movies.vue'

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
        },
        {
            path: '/movies',
            component: Movies
        }
    ]
})
