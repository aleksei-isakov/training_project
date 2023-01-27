import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref, reactive } from 'vue'
import axios from "axios";

const url =
    "https:api.themoviedb.org/3/search/movie?api_key=ea19af65e4e556fe68084f33022c5e51&query=";

export const useMovieSearchStore = defineStore('MovieSearchStore', () => {
    const loader = ref(false)
    let search = ref('')
    let foundMovies = ref({})


    const searchMovies = async() => {
        loader.value = true
        let response = await axios.get(`${url}${search.value}}`)
        foundMovies.value = response.data.results
        loader.value = false
    };

    return {
        loader,
        search,
        foundMovies,
        searchMovies,
    }

})