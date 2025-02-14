<template>
    <v-app>
        <v-navigation-drawer v-model="drawer">
            <div class="d-flex justify-center my-8">
                <img
                    alt="btrbaka"
                    class="w-50"
                    src="@/assets/logo.svg"
                    @click="nicemusic"
                />
            </div>
            <v-divider></v-divider>

            <div class="sidebar-links">
                <router-link to="/" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Home</v-list-item
                    >
                </router-link>
                <router-link to="/grades" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Grades</v-list-item
                    >
                </router-link>
                <router-link to="/schedule" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Schedule</v-list-item
                    >
                </router-link>
                <router-link to="/absences" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Absences</v-list-item
                    >
                </router-link>
                <router-link to="/messages" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Messages</v-list-item
                    >
                </router-link>
                <router-link to="/account" class="text-decoration-none">
                    <v-list-item link class="pa-4 px-8 text-h5"
                        >Account</v-list-item
                    >
                </router-link>
            </div>

            <v-divider></v-divider>

            <ThemeSwitch />
        </v-navigation-drawer>

        <v-main class="mb-16">
            <router-view />
        </v-main>

        <v-fab
            icon="mdi-menu"
            size="x-large"
            @click="drawer = !drawer"
            location="bottom start"
            fixed
            app
            appear
            class="nav-button ma-2"
            elevation="12"
        ></v-fab>
    </v-app>
</template>

<script setup>
import { ref } from "vue";

import ThemeSwitch from "./components/ThemeSwitch.vue";

const drawer = ref(null);

let clicks = 0;

function nicemusic() {
    clicks++;
    console.log(clicks);
    if (clicks == 21) {
        window
            .open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
            .focus();
        return (clicks = 0);
    }
}
</script>

<script>
export default {
    data: () => ({ drawer: null }),
};
</script>

<style>
.v-theme--dark .sidebar-links {
    a {
        color: #cccccc;
    }

    .router-link-active {
        color: white;
    }
}

.v-theme--light .sidebar-links {
    a {
        color: #444444;
    }

    .router-link-active {
        color: black;
    }
}

.backdrop-blur {
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
}
</style>
