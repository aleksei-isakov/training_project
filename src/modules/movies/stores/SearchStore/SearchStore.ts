import { defineStore } from "pinia";
import { ref, reactive, watch } from 'vue'
import axios from "axios";

const url =
    "https:api.themoviedb.org/3/search/movie?api_key=ea19af65e4e556fe68084f33022c5e51&query=";

export const useMovieSearchStore = defineStore('MovieSearchStore', () => {
    const loader = ref(false)
    let search = ref('')
    let foundMovies = ref([])
    const isServerError = ref(false)
    let viewMode = ref(0)
    let pagination = reactive({
        maxPagesCount: null,
        totalPages: 0,
        currentPage: 1
    })

    const searchMovies = async() => {
        loader.value = true
        let response = await axios.get(`${url}${search.value}`)
            .catch(error => {
            isServerError.value = true
            loader.value = false
        })
        foundMovies.value = response.data.results
        pagination.totalPages = response.data.total_pages
        pagination.maxPagesCount = response.data.total_pages < 10 ? response.data.total_pages : 10
        pagination.currentPage = response.data.page
        loader.value = false
    };

    const onClickSetPaginationPage = async(page: number) => {
        if (page !== pagination.currentPage) {
            loader.value = true
            let response = await axios.get(`${url}${search.value}&page=${page}`)
            pagination.currentPage = page
            foundMovies.value = response.data.results
            loader.value = false
        }
    }

    const onClickListPages = async(action: string) => {
        loader.value = true
        switch (action) {
            case 'prev': pagination.currentPage -= 1;
            break;
            case 'next': pagination.currentPage += 1;
            break;
            case 'first': pagination.currentPage = 1;
            break;
            case 'last': pagination.currentPage = pagination.totalPages;
            break;
        }
        let response = await axios.get(`${url}${search.value}&page=${pagination.currentPage}`)
        foundMovies.value = response.data.results
        loader.value = false
    }

    watch(foundMovies, () => {
        const favouriteMovies = JSON.parse(localStorage.getItem("favourites"))
        if (favouriteMovies) {

            foundMovies.value.forEach(el => {
                for (let i = 0; favouriteMovies.length > i; i++) {
                    if (el.id === favouriteMovies[i].id) {
                        el.isFavourite = true
                    }
                }
            })
        }
        else {
            foundMovies.value = response.data.results

        }
    }, {deep: true})

    return {
        loader,
        search,
        foundMovies,
        searchMovies,
        onClickSetPaginationPage,
        onClickListPages,
        viewMode,
        pagination,
        isServerError
    }

})