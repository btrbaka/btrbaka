<script setup>
import Grades from '../components/Grades.vue'
</script>

<template>
  <div class="wrap">
    <h1>Grades</h1>
    <Grades />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
