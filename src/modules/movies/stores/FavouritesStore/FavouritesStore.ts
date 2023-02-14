import { defineStore } from "pinia";
import { ref } from 'vue'

export const useFavouritesStore = defineStore( "FavouritesStore",() => {
    const favourites = ref([])

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
        favourites.value = favourites.value.filter(el => el.id !== movie.id)
        movie.isFavourite = false
    }

    return {
        favourites,
        onClickAddToFavourites,
        onClickRemoveFromFavourites
    }
})
