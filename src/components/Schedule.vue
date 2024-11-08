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
            <v-tabs-window-item
                v-for="tab in tabs"
                :key="tab"
                :value="tab.value"
            >
                <v-table class="rounded">
                    <thead>
                        <tr>
                            <th
                                class="position-sticky left-0 bg-surface-light"
                            ></th>
                            <th
                                v-for="slot in timeSlots"
                                :key="slot.title"
                                class="bg-surface-light"
                            >
                                <div class="text-center text-h6">
                                    {{ slot.title }}
                                </div>
                                <div
                                    class="text-no-wrap text-subtitle-2 text-center text-medium-emphasis"
                                >
                                    {{ slot.range }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(day, dayIndex) in days">
                            <td
                                class="position-sticky left-0 bg-surface-light text-center pa-2"
                            >
                                {{ day.substring(0, 3).toUpperCase() }}
                            </td>
                            <td
                                v-for="period in tab.content[dayIndex]"
                                :class="['pa-2 subject-cell', period.change]"
                            >
                                <div class="text-h6 text-bold">
                                    {{ period.className }}
                                </div>
                                <div>{{ period.teacher }}</div>
                                <div class="text-break text-medium-emphasis">
                                    {{ period.room }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
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
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timeSlots: [
            //{ title: "1", range: "6:00 - 9:00" },
        ],
        tab: "current",
        tabs: [
            { value: "previous", text: "Previous", content: [] },
            {
                value: "current",
                text: "Current",
                content: [
                    //[{className: "aaa",teacher: "NPC",teacherFull: "Bitch McFuck",room: "666",change: null,},],
                ],
            },
            { value: "next", text: "Next", content: [] },
        ],
    }),
    mounted() {
        let now = new Date();
        let unixCurrent = now.getTime();
        let unixPrevious = unixCurrent - 608400000;
        let unixNext = unixCurrent + 608400000;

        this.getSchedule(this.tabs[0].content, unixPrevious, false);
        this.getSchedule(this.tabs[1].content, unixCurrent, true);
        this.getSchedule(this.tabs[2].content, unixNext, false);
    },
    methods: {
        async getSchedule(dataArray, now, constCheck) {
            const today = new Date(parseInt(now)).toISOString().split("T")[0];
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
                let response = await fetch(
                    `${url}api/3/timetable/actual?date=${today}`,
                    {
                        method: "GET",
                        headers: head,
                    },
                );
                var responseJson = await response.json();
                if (response.ok == false) {
                    await refreshLogin();
                    await this.getSchedule(dataArray, now);
                } else {
                    let response = Object.values(responseJson);

                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    // appending time ranges
                    //
                    // response[0][k].Caption
                    // response[0][k].BeginTime
                    // response[0][k].EndTime

                    if (constCheck) {
                        for (let k = 0; k < response[0].length; k++) {
                            this.timeSlots.push({
                                title: response[0][k].Caption,
                                range:
                                    response[0][k].BeginTime +
                                    " - " +
                                    response[0][k].EndTime,
                            });
                        }
                    }

                    for (let i = 0; i < response[1].length; i++) {
                        let rowArray = [];

                        // is the day a holiday?
                        //
                        // make new design l8r: push a single cell and span it till the end of table
                        if (response[1][i].DayType == "Holiday") {
                            for (let ii = 0; ii < response[0].length; ii++) {
                                rowArray.push({
                                    className: "Holiday",
                                    classNameFull: "Holiday",
                                    teacher: "",
                                    teacherFull: "N/A",
                                    room: "", //response[1][i].DayDescription
                                    change: "holiday",
                                });
                            }
                        } else if (response[1][i].DayType == "Celebration") {
                            for (let ii = 0; ii < response[0].length; ii++) {
                                rowArray.push({
                                    className: "Celebration",
                                    classNameFull: "Celebration",
                                    teacher: "",
                                    teacherFull: "N/A",
                                    room: "",
                                    change: "holiday",
                                });
                            }
                        } else {
                            // append subjects in schedule
                            for (
                                let j = 0;
                                j < response[1][i].Atoms.length;
                                j++
                            ) {
                                // define basic variables
                                let room;
                                let subject;
                                let subjectFull;
                                let teacher;
                                let teacherFull;
                                let change = null;

                                if (response[1][i].Atoms[j].Change == null) {
                                    room = response[6].find(
                                        (z) =>
                                            z.Id ===
                                            response[1][i].Atoms[j].RoomId,
                                    ).Abbrev;
                                } else {
                                    room =
                                        response[1][i].Atoms[j].Change
                                            .Description;
                                    if (
                                        response[1][i].Atoms[j].Change
                                            .ChangeType != "Canceled"
                                    ) {
                                        change = "canceled";
                                    } else {
                                        change = "other";
                                    }
                                }

                                // do various magics and curses to check if the
                                // current time is within the time range of the period
                                // and assign an "active" change
                                const now = new Date();
                                const hours = now.getHours();
                                const minutes = String(
                                    now.getMinutes(),
                                ).padStart(2, "0");
                                const currentTime = `${hours}:${minutes}`;

                                const startTime = response[0].find(
                                    (z) =>
                                        z.Id === response[1][i].Atoms[j].HourId,
                                ).BeginTime;
                                const endTime = response[0].find(
                                    (z) =>
                                        z.Id === response[1][i].Atoms[j].HourId,
                                ).EndTime;

                                const [currentHours, currentMinutes] =
                                    currentTime.split(":").map(Number);
                                const currentTimeInMinutes =
                                    currentHours * 60 + currentMinutes;

                                const [startHours, startMinutes] = startTime
                                    .split(":")
                                    .map(Number);
                                const startTimeInMinutes =
                                    startHours * 60 + startMinutes;

                                const [endHours, endMinutes] = endTime
                                    .split(":")
                                    .map(Number);
                                const endTimeInMinutes =
                                    endHours * 60 + endMinutes;

                                const today = now.toISOString().split("T")[0];
                                const dateSchedule =
                                    response[1][i].Date.split("T")[0];

                                if (
                                    today === dateSchedule &&
                                    constCheck &&
                                    currentTimeInMinutes >=
                                        startTimeInMinutes &&
                                    currentTimeInMinutes <= endTimeInMinutes
                                ) {
                                    change += " active";
                                }

                                if (response[1][i].Atoms[j].SubjectId == null) {
                                    subject = "N/A";
                                } else {
                                    subject = response[4].find(
                                        (x) =>
                                            x.Id ===
                                            response[1][i].Atoms[j].SubjectId,
                                    ).Abbrev;
                                    subjectFull = response[4].find(
                                        (x) =>
                                            x.Id ===
                                            response[1][i].Atoms[j].SubjectId,
                                    ).Name;
                                }
                                if (response[1][i].Atoms[j].TeacherId == null) {
                                    teacher = "N/A";
                                    teacherFull = "N/A";
                                } else {
                                    teacher = response[5].find(
                                        (y) =>
                                            y.Id ===
                                            response[1][i].Atoms[j].TeacherId,
                                    ).Abbrev;
                                    teacherFull = response[5].find(
                                        (y) =>
                                            y.Id ===
                                            response[1][i].Atoms[j].TeacherId,
                                    ).Name;
                                }

                                // should there be a gap? append empty cell
                                if (j > 0) {
                                    if (
                                        response[1][i].Atoms[j - 1].HourId !=
                                        response[1][i].Atoms[j].HourId - 1
                                    ) {
                                        rowArray.push({
                                            className: "",
                                            classNameFull: "",
                                            teacher: "",
                                            teacherFull: "No information",
                                            room: "",
                                            change: "",
                                        });
                                    }
                                }

                                // append actual cell data here, BUT to its own array to use in a higher level
                                rowArray.push({
                                    className: subject,
                                    classNameFull: subjectFull,
                                    teacher: teacher,
                                    teacherFull: teacherFull,
                                    room: room,
                                    change: change,
                                });
                            }
                        }

                        //console.log(rowArray);
                        //console.log(dataArray);

                        dataArray.push(rowArray);
                    }
                }
            }
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

.subject-cell {
    vertical-align: top;
}

.subject-cell.canceled {
    background-color: #ff174416;
}
.subject-cell.other {
    background-color: #69f0ae16;
}
.subject-cell.holiday {
    background-color: #4dd0e116;
}
.subject-cell.active {
    box-shadow:
        inset 0 0 0 1px #e91e63,
        0 0 0 1px #e91e63;
}
</style>
