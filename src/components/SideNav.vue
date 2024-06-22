<script setup>
import { RouterLink } from 'vue-router'
import IconList from './icons/IconList.vue';

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
    <div id="sideNav" class="mobileNav">
        <img alt="btrbaka" class="logo" src="@/assets/logo.svg" width="125" height="125" @click="nicemusic" />
        <RouterLink @click="closeNav" to="/">Home</RouterLink>
        <RouterLink @click="closeNav" to="/grades">Grades</RouterLink>
        <RouterLink @click="closeNav" to="/schedule">Schedule</RouterLink>
        <RouterLink @click="closeNav" to="/account">Account</RouterLink>
        <button @click="closeNav" class="close">&times;</button>
    </div>

    <button @click="openNav" class="navButton">
        <IconList />
    </button>
</template>

<script>
export default {
    methods: {
        openNav() {
            document.getElementById("sideNav").classList.add("opened");
        },
        closeNav() {
            document.getElementById("sideNav").classList.remove("opened");
        }
    }
}
</script>

<style>
.logo {
    margin: 3em auto;
    display: block;
}

#sideNav.opened {
    width: 250px;
}

body:has(#sideNav.opened)::before {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7;
    backdrop-filter: blur(0.25em);
    -webkit-backdrop-filter: blur(0.25em);
}

.navButton {
    color: var(--color-text);
    background-color: var(--color-background-darker);
    border: 1px solid var(--color-border);
    border-radius: 100%;
    height: 64px;
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 2em;
    left: 2em;

    backdrop-filter: blur(2em);
    -webkit-backdrop-filter: blur(2em);

    z-index: 5;

    svg {
        height: 50%;
        width: 50%;
    }
}

#sideNav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: var(--color-background-darker);
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.25s;
}

#sideNav a {
    padding: 0.5em 0.5em 0.5em 1em;
    text-decoration: none;
    font-size: 150%;
    display: block;
    transition: 0.2s;
    color: var(--color-text);
    margin: 0 0.35em;
    border-radius: var(--rounded-common);
}

#sideNav a.router-link-exact-active {
    color: var(--color-heading);
}

#sideNav a.router-link-exact-active:hover {
    background-color: transparent;
}

#sideNav .close {
    position: absolute;
    bottom: 1em;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    outline: 0;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
    color: var(--color-text);
}

#sideNav .close:hover {
    color: var(--color-heading);
}

@media screen and (max-height: 450px) {
    #sideNav {
        padding-top: 15px;
    }

    #sideNav a {
        font-size: 18px;
    }
}

@media (min-width: 1024px) {
    #sideNav {
        width: 250px;
    }
    #sideNav .close {
        display: none;
    }
}
</style>