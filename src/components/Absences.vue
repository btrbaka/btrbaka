<template>
    <v-container class="d-flex flex-column justify-center page-container">
        <p v-if="isRefreshing" class="opacity-50 font-italic ms-4">
            <v-progress-circular indeterminate :size="24"></v-progress-circular>
            <span class="ms-4">Refreshing login token...</span>
        </p>
        <v-alert v-if="alertVisible" :type="alertType">
            {{ alertMessage }}
        </v-alert>
        <v-data-table-virtual
            :headers="headersTotal"
            :items="itemsTotal"
            :header-props="{ class: 'bg-surface-light' }"
            disable-sort
            class="mb-4"
        ></v-data-table-virtual>
        <v-data-table-virtual
            :headers="headers"
            :items="items"
            :header-props="{ class: 'bg-surface-light' }"
            :row-props="rowStyling"
        >
        </v-data-table-virtual>
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
        headersTotal: [
            { title: "Unsolved", align: "center", key: "unsolved" },
            { title: "Ok", align: "center", key: "ok" },
            { title: "Missed", align: "center", key: "missed" },
            { title: "Late", align: "center", key: "late" },
            { title: "Soon", align: "center", key: "soon" },
            { title: "School", align: "center", key: "school" },
            { title: "Distance", align: "center", key: "distance" },
        ],
        itemsTotal: [
            {
                unsolved: 0,
                ok: 0,
                missed: 0,
                late: 0,
                soon: 0,
                school: 0,
                distance: 0,
            },
        ],
        headers: [
            { title: "Subject", align: "start", key: "subject" },
            { title: "Absence", align: "center", key: "missed" },
            { title: "Missed", align: "end", key: "percentage" },
        ],
        items: [],
    }),
    mounted() {
        this.getAbsences();
    },
    methods: {
        async getAbsences() {
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
                let response = await fetch(`${url}api/3/absence/student/`, {
                    method: "GET",
                    headers: head,
                });
                let responseJson = await response.json();
                if (response.ok == false) {
                    await refreshLogin();
                    await this.getAbsences();
                } else {
                    let response = Object.values(responseJson);
                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    // total absences per semester (?)

                    if (response[1] != null) {
                        for (let j = 0; j < response[1].length; j++) {
                            this.itemsTotal[0].unsolved +=
                                response[1][j].Unsolved;
                            this.itemsTotal[0].ok += response[1][j].Ok;
                            this.itemsTotal[0].missed += response[1][j].Missed;
                            this.itemsTotal[0].late += response[1][j].Late;
                            this.itemsTotal[0].soon += response[1][j].Soon;
                            this.itemsTotal[0].school += response[1][j].School;
                            this.itemsTotal[0].distance +=
                                response[1][j].DistanceTeaching;
                        }
                    }

                    for (let i = 0; i < response[2].length; i++) {
                        const totalMissed =
                            response[2][i].Base +
                            response[2][i].Late +
                            response[2][i].Soon +
                            response[2][i].School +
                            response[2][i].DistanceTeaching;
                        let missedPercentage = 0;
                        if (response[2][i].LessonsCount > 0) {
                            missedPercentage = parseFloat(
                                (
                                    (totalMissed /
                                        response[2][i].LessonsCount) *
                                    100
                                ).toFixed(2),
                            );
                        }

                        this.items.push({
                            subject: `${response[2][i].SubjectName}`,
                            missed: `${totalMissed} | ${response[2][i].LessonsCount}`,
                            percentage: `${missedPercentage} %`,
                        });
                    }
                }
            }
        },
        rowStyling(item) {
            // checks if absence % is >20 and makes stuff red >:3c scary!
            const percentageString = item.internalItem.columns.percentage;
            const percentageNumber = parseFloat(
                percentageString.replace("%", "").trim(),
            );
            return {
                class: percentageNumber > 20 ? "text-red-accent-3" : "",
            };
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
