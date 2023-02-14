<template>
  <div class="movie-card-wrapper">
    <div class="movie-poster">
      <img
              :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
              :alt="movie.original_title"
              class="movie-img" />
    </div>

    <div class="movie-data">

      <div class="movie-title-container">
        <h2>{{movie.title}} {{releaseDate}} {{rating}}</h2>
      </div>

      <div class="movie-description-container">
        <p class="movie-description">{{movie.overview}}</p>
      </div>

      <div class="movie-favourite-button-container">
        <button
            v-if="!movie.isFavourite"
            @click="FavouritesStore.onClickAddToFavourites(movie)"
            class="movie-favourite-button">To watchlist
        </button>
        <button
            v-if="movie.isFavourite"
            @click="FavouritesStore.onClickRemoveFromFavourites(movie)"
            :disabled="SearchStore.viewMode === 0"
            class="movie-favourite-button">
          {{SearchStore.viewMode === 0 ? 'In list' : "Remove"}}
        </button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { useFavouritesStore } from "../stores/FavouritesStore/FavouritesStore";
import { useMovieSearchStore } from "../stores/SearchStore/SearchStore";
import { computed } from 'vue'

const FavouritesStore = useFavouritesStore()
const SearchStore = useMovieSearchStore()

const props = defineProps({
  movie: {
    type: Object,
    required: false,
    default: () => {}
  },
  favourites: {
    type: Array,
    required: false,
    default: () => []
  }
})

const releaseDate = computed(() => {
  if (props.movie.release_date) {
    return `(${props.movie.release_date.substring(0,4)})`
  }
})

const rating = computed(() => {
  if (props.movie.vote_average) {
    return props.movie.vote_average.toFixed(1)
  }
})


</script>

<style scoped lang="scss">

.movie-card-wrapper {
  display: flex;
  border: 1px solid red;
  height: 310px;
  width: 450px;
  padding: 10px;
  overflow: hidden;
  &:hover{
    cursor: pointer;
  }
}
.movie-poster {
  width: 310px;
}
.movie-img {
  height: 100%;
}
.movie-data {
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 20px;
}
.movie-favourite-button-container {
  display: flex;
  align-self: end;
  margin: auto 0 0;
}
.movie-favourite-button {
  height: 25px;
  width: 75px;
}
.movie-description-container {
  height: 68%;
  text-overflow: clip;
  overflow: hidden;
}
.movie-description {
  height: -webkit-fill-available;
}

</style>