<script setup>
import Absences from '../components/Absences.vue'
</script>

<template>
    <div class="wrap">
        <h1>Absences</h1>
        <Absences />
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