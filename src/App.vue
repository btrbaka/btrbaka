<script setup>
import { RouterView } from "vue-router";
import SideNav from "./components/SideNav.vue";

import "@fontsource/inter";
import "@fontsource/poppins";

const themePreference = localStorage.getItem("theme");
const fontPreference = localStorage.getItem("font");

document.body.classList.add(themePreference);

if (fontPreference === "poppins") {
    document.body.classList.add("poppins");
}
</script>

<template>
    <header>
        <SideNav />
    </header>

    <RouterView />
</template>

<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, Inter, system-ui;
}

body.poppins {
    font-family: Poppins, system-ui;
}

input,
textarea,
button {
    font-family: inherit;
}
</style>

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

@media (max-width: 1024px) {
    .wrap,
    main {
        margin-bottom: 5.5em;
    }
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

    .wrap {
        margin-bottom: 2.5em;
    }
}
</style>
