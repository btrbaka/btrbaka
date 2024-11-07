<script setup>
import HomeNav from "@/components/HomeNav.vue";
import RandomQuote from "@/components/RandomQuote.vue";

import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { isRefreshing, refreshLogin } = useRefreshLogin();
refreshLogin();
</script>

<template>
    <v-container
        class="d-flex flex-column justify-center text-center text-lg-left mt-lg-16 page-container"
    >
        <img
            alt="btrbaka"
            class="ma-2 d-lg-none mt-8 mx-auto"
            src="@/assets/logo.svg"
            width="125"
            height="125"
            @click="nicemusic"
        />
        <div class="ma-4">
            <h1>Welcome to <b>btrbaka</b></h1>
            <p>Use the 'Account' tab to log in.</p>
            <RandomQuote />
        </div>

        <HomeNav />

        <div class="ma-4">
            <p class="mb-2">
                Like the app? Give us a ⭐ star on
                <a href="https://github.com/btrbaka/btrbaka">Github</a>
            </p>
            <p>With ❤️ from btrbaka contributors 🏳️‍⚧️🏳️‍🌈</p>
        </div>

        <p v-if="isRefreshing" class="opacity-50 font-italic">
            Refreshing login token...
        </p>
    </v-container>
</template>

<style scoped>
@media (min-width: 1420px) {
    #app .page-container {
        max-width: 1024px;
    }
}
</style>
