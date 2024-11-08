<template>
    <v-container class="d-flex flex-column justify-center page-container">
        <p v-if="isRefreshing" class="opacity-50 font-italic ms-4">
            <v-progress-circular indeterminate :size="24"></v-progress-circular>
            <span class="ms-4">Refreshing login token...</span>
        </p>
        <v-tabs v-model="tab" grow class="mb-4">
            <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
                {{ tab.text }}
            </v-tab>
        </v-tabs>
        <v-alert v-if="alertVisible" :type="alertType">
            {{ alertMessage }}
        </v-alert>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item key="recent" value="recent">
                <v-list lines="two" rounded>
                    <v-list-item v-for="grade in gradesAll" :key="grade">
                        <v-row class="align-center mb-2 flex-nowrap">
                            <v-col cols="2" sm="1" class="ms-2 text-center">
                                <v-list-item-title class="text-h5">{{
                                    grade.grade
                                }}</v-list-item-title>
                            </v-col>
                            <v-col class="flex-fill">
                                <p class="font-weight-bold">
                                    {{ grade.subject }}
                                </p>
                                <v-list-item-subtitle>{{
                                    grade.description
                                }}</v-list-item-subtitle>
                            </v-col>
                            <v-col
                                cols="4"
                                class="d-flex bg-surface align-end align-lg-center ga-lg-2 flex-lg-row-reverse flex-column mb-lg-2"
                            >
                                <v-chip
                                    class="mb-2 mb-lg-0"
                                    color="light-blue"
                                    prepend-icon="mdi-weight"
                                >
                                    {{ grade.weight }}
                                </v-chip>
                                <v-list-item-subtitle class="mb-2 mb-lg-0"
                                    >{{ grade.date }}
                                </v-list-item-subtitle>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
            </v-tabs-window-item>
            <v-tabs-window-item key="subjects" value="subjects">
                <v-expansion-panels multiple v-model="activePanels">
                    <v-expansion-panel
                        v-for="(subject, index) in gradesSubjects"
                        :key="subject"
                    >
                        <v-expansion-panel-title
                            :color="
                                activePanels.includes(index)
                                    ? 'surface-light'
                                    : ''
                            "
                        >
                            <v-col no-gutters>
                                <v-row class="text-h5 mb-2">{{
                                    subject.title
                                }}</v-row>
                                <v-row class="text-caption"
                                    >Average grade: {{ subject.average }}</v-row
                                >
                                <v-row class="text-caption"
                                    >Temporary grade:
                                    {{ subject.temporary }}</v-row
                                >
                            </v-col>
                            <v-col class="text-right text-h6">{{
                                subject.content.length
                            }}</v-col>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text class="subject-panel">
                            <v-list lines="two">
                                <v-list-item
                                    v-for="grade in subject.content"
                                    :key="grade"
                                >
                                    <v-row
                                        class="align-center mb-1 flex-nowrap"
                                    >
                                        <v-col
                                            cols="2"
                                            sm="1"
                                            class="ms-2 text-center"
                                        >
                                            <v-list-item-title
                                                class="text-h6"
                                                >{{
                                                    grade.grade
                                                }}</v-list-item-title
                                            >
                                        </v-col>
                                        <v-col class="flex-fill">
                                            <v-list-item-subtitle>{{
                                                grade.description
                                            }}</v-list-item-subtitle>
                                        </v-col>
                                        <v-col
                                            cols="4"
                                            class="d-flex align-end align-lg-center ga-lg-2 flex-lg-row-reverse flex-column mb-lg-2"
                                        >
                                            <v-chip
                                                class="mb-2 mb-lg-0"
                                                color="light-blue"
                                                prepend-icon="mdi-weight"
                                            >
                                                {{ grade.weight }}
                                            </v-chip>
                                            <v-list-item-subtitle
                                                class="mb-2 mb-lg-0"
                                                >{{ grade.date }}
                                            </v-list-item-subtitle>
                                        </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>
</template>

<script setup>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { isRefreshing } = useRefreshLogin();
</script>

<script>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { refreshLogin } = useRefreshLogin();

export default {
    data: () => ({
        alertVisible: false,
        alertMessage: "Meow",
        alertType: "info",
        tab: "recent",
        tabs: [
            { value: "recent", text: "Recent", content: [] },
            {
                value: "subjects",
                text: "By Subject",
                content: [],
            },
        ],
        activePanels: [],
        gradesSubjects: [],
        gradesAll: [],
    }),
    mounted() {
        this.getGrades();
    },
    methods: {
        async getGrades() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");

            if (localStorage.getItem("url") == null) {
                this.alertType = "error";
                this.alertMessage =
                    "Not logged in! Go to the Account page to log in first.";
                this.showAlert();
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                let response = await fetch(`${url}api/3/marks/`, {
                    method: "GET",
                    headers: head,
                });
                let responseJson = await response.json();
                if (response.ok == false) {
                    await refreshLogin();
                    await this.getGrades();
                } else {
                    let response = Object.values(responseJson);

                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    let allgrades = [];

                    // for loop for each subject definition
                    for (let i = 0; i < response[0].length; i++) {
                        // pushing all grades from each subject
                        // into an array to use later
                        allgrades.push(...response[0][i].Marks);

                        // definition of subject's average and temporary grade
                        let averagegrade =
                            response[0][i].AverageText == null ||
                            response[0][i].AverageText.trim() === ""
                                ? "N/A"
                                : response[0][i].AverageText;

                        let temporarygrade =
                            response[0][i].TemporaryMark == null ||
                            response[0][i].TemporaryMark.trim() === ""
                                ? "N/A"
                                : response[0][i].TemporaryMark;

                        // pushing grades into an array for a subject
                        let subjectGrades = [];

                        for (
                            let j = response[0][i].Marks.length - 1;
                            j >= 0;
                            j--
                        ) {
                            let unixDate = Date.parse(
                                response[0][i].Marks[j].MarkDate,
                            );
                            let date = new Date(unixDate);

                            subjectGrades.push({
                                grade: response[0][i].Marks[j].MarkText,
                                weight: response[0][i].Marks[j].Weight,
                                description: response[0][i].Marks[j].Caption,
                                date: date.toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                }),
                            });
                        }

                        // pushing a subject item into "by subject" grades
                        this.gradesSubjects.push({
                            title: response[0][i].Subject.Name,
                            average: averagegrade,
                            temporary: temporarygrade,
                            content: subjectGrades,
                        });
                    }

                    // recent grades definition
                    let recentgrades = allgrades
                        .sort(function (a, b) {
                            var c = new Date(a.MarkDate);
                            var d = new Date(b.MarkDate);
                            return c - d;
                        })
                        .reverse();
                    console.log(recentgrades);

                    let subject;

                    // pushing recent grades
                    for (let l = 0; l < recentgrades.length; l++) {
                        subject = response[0].find(
                            (x) => x.Subject.Id === recentgrades[l].SubjectId,
                        ).Subject.Name;

                        let unixDate = Date.parse(recentgrades[l].MarkDate);
                        let date = new Date(unixDate);

                        this.gradesAll.push({
                            grade: recentgrades[l].MarkText,
                            weight: recentgrades[l].Weight,
                            description: recentgrades[l].Caption,
                            subject: subject,
                            date: date.toLocaleString(undefined, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            }),
                        });
                    }
                }
            }
        },
        showAlert() {
            this.alertVisible = true;
        },
    },
};
</script>

<style scoped>
@media (min-width: 1420px) {
    #app .page-container {
        max-width: 1024px;
    }
}
</style>

<style>
#app .subject-panel .v-expansion-panel-text__wrapper {
    padding: 0.5rem;
}
</style>
