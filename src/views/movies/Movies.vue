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
      <div class="all-movies-container">
        <div class="movie-searchbar"></div>
        <MovieCard v-for="movie of SearchStore.foundMovies" :key="movie.id" :movie="movie"/>
      </div>
<!--      <div class="favourites-container">-->
<!--        <MovieCard/>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";
import { useMovieSearchStore } from "../../store/movieStore/SearchStore";
import { onMounted } from 'vue'

const SearchStore = useMovieSearchStore()

onMounted(() => {
  SearchStore.searchMovies()
})

</script>

<style scoped lang="scss">
.movie-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
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
  flex-direction: column;
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