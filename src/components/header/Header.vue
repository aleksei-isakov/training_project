<template>
  <div class="header-wrapper">
    <h1>The Humble Toolbox</h1>
    <nav class="header-nav-menu">
      <li><a href="#/">Home</a></li>
      <li><a href="#/calc">Calc</a></li>
      <li>Radio</li>
      <li><a href="#/weather">Weather</a></li>
      <li>YouTube</li>
    </nav>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 120px;
  background-color: royalblue;
  width: 100%;
  padding: 25px;
  border-radius: 0 0 20px 20px;
}
.header-nav-menu {
  display: flex;
  gap: 15px;
  font-size: 20px;
}
</style>