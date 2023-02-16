import { defineStore } from "pinia";
import { ref, watch } from 'vue'

export const useFavouritesStore = defineStore( "FavouritesStore",() => {
    const favourites = ref([])
    const favouritesInLocalStorage = localStorage.getItem("favourites")

    if (favouritesInLocalStorage) {
        favourites.value = JSON.parse(favouritesInLocalStorage)
    }

    const onClickAddToFavourites = (movie) => {
        if (!favourites.value.length) {
            favourites.value.push(movie)
            movie.isFavourite = true
        }
        else {
            if ((favourites.value.find(el => el.id === movie.id)) === undefined) {
                favourites.value.push(movie)
                movie.isFavourite = true
            }
        }
    }
    const onClickRemoveFromFavourites = (movie) => {
        movie.isFavourite = false
        favourites.value = favourites.value.filter(el => el.id !== movie.id)
    }

    watch(favourites.value, () => {
        localStorage.setItem("favourites", JSON.stringify(favourites.value))
    }, {deep: true})

    return {
        favourites,
        onClickAddToFavourites,
        onClickRemoveFromFavourites
    }
})
