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
    let viewMode = ref(0)
    let pagination = reactive({
        totalPages: 0,
        currentPage: 1
    })

    const searchMovies = async() => {
        loader.value = true
        let response = await axios.get(`${url}${search.value}`)
        foundMovies.value = response.data.results
        pagination.totalPages = response.data.total_pages
        pagination.currentPage = response.data.page
        console.log(response.data,pagination, 'это запрос')
        loader.value = false
    };

    const onClickSetPaginationPage = async(page) => {
        if (pagination.totalPages >= 1) {
            loader.value = true
            let response = await axios.get(`${url}${search.value}&page=${page}`)
            pagination.currentPage = page
            foundMovies.value = response.data.results
            loader.value = false
        }
    }
    const onClickListPages = async(action) => {
        if (action === 'prev') {
            loader.value = true
            let response = await axios.get(`${url}${search.value}&page=${pagination.currentPage - 1}`)
            pagination.currentPage -= 1
            foundMovies.value = response.data.results
            loader.value = false
        }
        if (action === 'next') {
            loader.value = true
            let response = await axios.get(`${url}${search.value}&page=${pagination.currentPage + 1}`)
            pagination.currentPage += 1
            foundMovies.value = response.data.results
            loader.value = false
        }
    }


    return {
        loader,
        search,
        foundMovies,
        searchMovies,
        onClickSetPaginationPage,
        onClickListPages,
        viewMode,
        pagination
    }

})