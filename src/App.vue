ill <script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

let clicks = 0

function nicemusic() {
    clicks++;
    console.log(clicks);
    if (clicks == 21) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank').focus();
        return clicks = 0;
    }
}
</script>

<template>
    <header>
        <div class="sticky">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" @click="nicemusic" />

            <div class="wrapper">
                <nav>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/grades">Grades</RouterLink>
                    <RouterLink to="/schedule">Schedule</RouterLink>
                    <RouterLink to="/account">Account</RouterLink>
                </nav>
            </div>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 1rem 2rem;
    /*border-left: 1px solid var(--color-border);*/
}

nav a:first-of-type {
    border: 0;
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

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    .sticky {
        position: sticky;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;


        a {
            display: block;
        }
    }
}
</style>
