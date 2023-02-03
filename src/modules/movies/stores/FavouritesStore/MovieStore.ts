import {defineStore} from "pinia";
import { ref, reactive } from 'vue'

export const useMovieStore = defineStore("MovieStore", {
    state: () => ({

        movies: [],

    })

})
