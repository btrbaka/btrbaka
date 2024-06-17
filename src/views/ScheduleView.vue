<script setup>
import Schedule from '../components/Schedule.vue'
</script>

<template>
  <div class="wrap">
    <h1>Schedule</h1>
    <Schedule />
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
