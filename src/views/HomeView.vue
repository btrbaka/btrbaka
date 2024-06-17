<script setup>
import RefreshLogin from '../components/RefreshLogin.vue'
</script>

<template>
    <main>
        <div>
            <div>
                <h1>Welcome to <b>btrbaka</b></h1>
                <p>Use the 'Account' tab to log in.</p>
                <p>Navigate to 'Home' to refresh your login token.</p>
            </div>
            <div class="repo-notice">
                <p>Like the app? Give us a ⭐ star on <a href="https://github.com/btrbaka/btrbaka">Github</a></p>
                <p>With ❤️ from btrbaka contributors 🏳️‍⚧️🏳️‍🌈</p>
            </div>
            <RefreshLogin />
        </div>
    </main>
</template>

<style>
@media (min-width: 1024px) {
    main {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

.repo-notice {
    margin-top: 10em;
}
</style>