<template>
  <div class="all-movies-container">
    <MovieCard
        v-for="movie of FavouritesStore.favourites"
        :key="movie.id"
        :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue'
import { useFavouritesStore } from "../stores/FavouritesStore/FavouritesStore";

const FavouritesStore = useFavouritesStore()

</script>

<style scoped lang="scss">
.all-movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>