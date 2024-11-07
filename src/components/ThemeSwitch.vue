<template>
    <div class="d-flex flex-column mt-6 ms-6 me-6">
        <div class="d-flex justify-center mt-6">
            <v-btn-toggle v-model="theme" divided shaped mandatory rounded="xl">
                <v-btn
                    v-for="theme in themes"
                    :key="theme.value"
                    :value="theme.value"
                    :icon="theme.icon"
                ></v-btn>
            </v-btn-toggle>
        </div>
    </div>
</template>

<script setup></script>

<script>
import { ref, watch, onMounted } from "vue";
import { useTheme } from "vuetify";

export default {
    setup() {
        const theme = ref("device");
        const themes = [
            { value: "device", icon: "mdi-circle-half-full" },
            { value: "dark", icon: "mdi-weather-night" },
            { value: "light", icon: "mdi-weather-sunny" },
        ];

        const { global } = useTheme();

        const toggleTheme = (themePar) => {
            if (themePar === "device") {
                const prefersDark = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches;

                const currentTheme = prefersDark ? "dark" : "light";

                global.name.value = currentTheme;
            } else {
                global.name.value = themePar;
            }
        };

        onMounted(() => {
            if (localStorage.theme) {
                theme.value = localStorage.theme;
                toggleTheme(theme.value);
            }
        });

        watch(theme, (newTheme) => {
            localStorage.theme = newTheme;
            toggleTheme(newTheme);
        });

        return {
            theme,
            themes,
        };
    },
};
</script>
