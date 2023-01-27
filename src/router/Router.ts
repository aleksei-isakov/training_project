import { createRouter, createWebHashHistory } from "vue-router";
import Calculator from '/src/views/calculator/Calculator.vue'
import Home from '/src/views/home/Home.vue'
import Weather from '/src/views/weather/Weather.vue'
import Movies from '/src/views/movies/Movies.vue'

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
