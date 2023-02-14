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

      <template v-if="SearchStore.viewMode === 0" >
        <Search/>
      </template>

      <template v-else>
        <Favourites/>
      </template>

    </div>
  </div>

</template>

<script setup lang="ts">
import Search from '../components/Search.vue'
import Favourites from '../components/Favourites.vue'

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

.movie-header {
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
}

</style>