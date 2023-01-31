<template>
  <div class="pagination-wrapper">
    <button
        class="pagination-button previous-page"
        @click="SearchStore.onClickListPages('prev')"
        :disabled="SearchStore.pagination.currentPage === 1"
    >
      &laquo
    </button>

    <button
        v-for="page of pagination.totalPages"
        :key="page"
        :class="['pagination-button', SearchStore.pagination.currentPage === page ? 'activePage'
        : '']"
        @click="SearchStore.onClickSetPaginationPage(page)"
    >{{page}}
    </button>

    <button
        class="pagination-button next-page"
        @click="SearchStore.onClickListPages('next')"
        :disabled="SearchStore.pagination.currentPage === SearchStore.pagination.totalPages"
    >
      &raquo
    </button>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMovieSearchStore } from "../store/movieStore/SearchStore";

const SearchStore = useMovieSearchStore()


const pagesCount = computed(() => {

})
const props = defineProps({
  pagination: {
    type: Object,
    required: false,
    default: 1
  }
})
</script>

<style scoped lang="scss">
.pagination-wrapper {
  width: 70%;
  justify-content: center;
  display: flex;
  gap: 10px;
}
.pagination-button {
  display: flex;
  height: 30px;
  width: 30px;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  border: 1px solid brown;
  background-color: darkgoldenrod;
}
.activePage {
  background-color: saddlebrown;
}
</style>