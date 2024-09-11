<script setup>
import RefreshLogin from "../components/RefreshLogin.vue";
import HomeNav from "../components/HomeNav.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
</script>

<template>
    <main>
        <div>
            <img
                alt="btrbaka"
                class="logo"
                src="@/assets/logo.svg"
                width="125"
                height="125"
                @click="nicemusic"
            />
            <div>
                <h1>Welcome to <b>btrbaka</b></h1>
                <p>Use the 'Account' tab to log in.</p>
                <p>Navigate to 'Home' to refresh your login token.</p>
                <blockquote>"Real women test in production"</blockquote>
            </div>
            <HomeNav />
            <div class="repo-notice">
                <p>
                    Like the app? Give us a ⭐ star on
                    <a href="https://github.com/btrbaka/btrbaka">Github</a>
                </p>
                <p>With ❤️ from btrbaka contributors 🏳️‍⚧️🏳️‍🌈</p>
            </div>
            <RefreshLogin />
            <ThemeSwitch />
        </div>
    </main>
</template>

<style>
main {
    text-align: center;
}

main .logo {
    display: block;
}

.theme-group {
    justify-content: center;
}

@media (min-width: 1024px) {
    main {
        min-height: 100vh;
        display: flex;
        align-items: center;
        text-align: left;
    }

    main .logo {
        display: none;
    }

    .theme-group {
        justify-content: left;
    }
}

.repo-notice {
    margin-top: 5em;
}

blockquote {
    margin: 1em;
    font-style: italic;
    opacity: 0.75;
}
</style>
