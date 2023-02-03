<template>
  <div class="movie-wrapper">
    <div class="movie-container">
      <div class="movie-header">
        <a  @click="SearchStore.viewMode = 0"
            :class="['movie-navigation-button', SearchStore.viewMode === 0 ? 'active-tab' : '']"
        >
          Search movies
        </a>
        <a  @click="SearchStore.viewMode = 1"
            :class="['movie-navigation-button', SearchStore.viewMode === 1 ? 'active-tab' : '']"
        >
          My favourites
        </a>
      </div>


      <div v-if="SearchStore.viewMode === 0" class="search-bar">
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
    </div>

  </div>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";
import Pagination from '../../../components/Pagination.vue'
import Loader from '../../../ui/Loader.vue'
import { onMounted } from 'vue'
import { useMovieSearchStore } from "../stores/SearchStore/SearchStore";

const SearchStore = useMovieSearchStore()

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
.active-tab {
  display: flex;
  flex-direction: column;
  &::after {
    content: "";
    border: 2px solid black;
  }
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
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
}
.searchbar {
  width: 300px;
  height: 40px;
  border-radius: 15px;
  font-size: 25px;
  padding: 0 7px;
}
</style>