<template>
  <div class="search-bar">
    <form @submit.prevent="SearchStore.searchMovies">
      <input class="searchbar" type="text" v-model="SearchStore.search">
    </form>
  </div>

  <div v-if="SearchStore.isServerError">
    An error occurred fetching data. Please try again later or use VPN
  </div>

  <div v-else>
    <Loader v-if="SearchStore.loader"/>

    <div v-else class="all-movies-container">
      <MovieCard
          v-for="movie of SearchStore.foundMovies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

    <div/>


  </div>

  <Pagination
      v-if="SearchStore.pagination.totalPages"
      :pagination="SearchStore.pagination"
  />

</template>

<script setup lang="ts">
import { useMovieSearchStore } from "../stores/SearchStore/SearchStore";
import { useFavouritesStore } from "../stores/FavouritesStore/FavouritesStore";
import MovieCard from "../components/MovieCard.vue";
import Loader from '../../../ui/Loader.vue'
import Pagination from '../../../components/Pagination.vue'

const SearchStore = useMovieSearchStore()
const FavouritesStore = useFavouritesStore()

</script>

<style scoped lang="scss">
.searchbar {
  width: 300px;
  height: 40px;
  border-radius: 15px;
  font-size: 25px;
  padding: 0 7px;
}
.all-movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>