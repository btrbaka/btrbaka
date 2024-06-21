<script setup>
import { RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue'
</script>

<template>
    <header>
        <SideNav />
    </header>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
    min-width: 250px;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

.wrap, main {
    margin-bottom: 5.5em;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
        flex-direction: column;
        margin-top: 3rem;
        max-width: fit-content;
        align-items: start;
    }

    #sideNav {
        display: none;
    }
}
</style>
