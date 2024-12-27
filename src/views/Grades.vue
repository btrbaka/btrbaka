<script setup>
import Grades from "../components/Grades.vue";
import AvgGrade from "../components/AvgGrade.vue";
</script>

<template>
    <v-toolbar title="Grades" class="bg-transparent"></v-toolbar>
    <AvgGrade />
    <Grades />
</template>
