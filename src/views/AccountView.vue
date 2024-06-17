<script setup>
import Login from '../components/Login.vue'
</script>

<template>
    <div class="wrap">
        <h1>Account</h1>
        <Login />
    </div>
</template>

<style>
.wrap {
    justify-content: center;
    flex-direction: column;
    display: flex;
}
@media (min-width: 1024px) {
    .wrap {
        min-height: 100vh;
        display: flex;
        align-items: center;
        width: 100%;
    }
}
</style>
