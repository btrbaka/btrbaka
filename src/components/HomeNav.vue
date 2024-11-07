<template>
    <v-container
        class="d-flex ga-4 justify-center justify-lg-start flex-column flex-lg-row"
    >
        <router-link to="/grades">
            <v-btn
                link
                title="Grades"
                prepend-icon="mdi-numeric"
                stacked
                class="w-100 pa-lg-8"
                >Grades</v-btn
            >
        </router-link>
        <router-link to="/schedule">
            <v-btn
                link
                title="Schedule"
                prepend-icon="mdi-calendar-arrow-right"
                stacked
                class="w-100 pa-lg-8"
                >Schedule</v-btn
            >
        </router-link>
        <router-link to="/absences">
            <v-btn
                link
                title="Absences"
                prepend-icon="mdi-account-alert"
                stacked
                class="w-100 pa-lg-8"
                >Absences</v-btn
            >
        </router-link>
        <router-link to="/messages">
            <v-btn
                link
                title="Messages"
                prepend-icon="mdi-message-draw"
                stacked
                class="w-100 pa-lg-8"
                >Messages</v-btn
            >
        </router-link>
    </v-container>
</template>

<script setup></script>

<style scoped>
.v-theme--dark {
    a {
        color: #f8bbd0;
    }
}

.v-theme--light {
    a {
        color: #880e4f;
    }
}
</style>
