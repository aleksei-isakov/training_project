<template>
  <div class="movie-wrapper">
    <div class="movie-container">
      <div class="movie-header">
        <a class="movie-navigation-button">List of movies</a>
        <a class="movie-navigation-button">My favourites</a>
      </div>
      <div class="search-bar">
        <form @submit.prevent="SearchStore.searchMovies">
          <input class="searchbar" type="text" v-model="SearchStore.search">
        </form>
      </div>
      <h1 v-if="SearchStore.viewMode === 0">HELLO</h1>

      <div class="all-movies-container">
        <MovieCard v-for="movie of SearchStore.foundMovies"
                   :key="movie.id"
                   :movie="movie"/>
      </div>
<!--      <div v-else class="favourites-container">-->
<!--        <MovieCard/>-->
<!--      </div>-->

    </div>
    <Pagination :pagination="SearchStore.pagination" />
  </div>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";
import Pagination from '../../components/Pagination.vue'
import { onMounted } from 'vue'
import { useMovieSearchStore } from "../../store/movieStore/SearchStore";

const SearchStore = useMovieSearchStore()

onMounted(() => {
  SearchStore.searchMovies()
})

</script>

<style scoped lang="scss">
.movie-wrapper {
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 30px;
  align-items: center;
  min-height: 810px;
  background-color: darkcyan;
}
.movie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.all-movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.movie-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  background-color: crimson;
}
.searchbar {
  width: 300px;
  height: 40px;
  border-radius: 15px;
  font-size: 25px;
  padding: 0 7px;
}
</style>