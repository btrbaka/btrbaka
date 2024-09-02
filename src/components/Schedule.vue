<script setup>
import { useRouter } from "vue-router";

import Spinner from "./Spinner.vue";

const router = useRouter();

const refreshPage = () => {
    router.go();
};
</script>

<template>
    <p id="loginstatus"></p>
    
    <Spinner />

    <div id="schedulenav" class="hidden">
        <p id="currentweek">Viewing current week</p>
        <div class="btn-container">
            <button @click="lessIForgotTheWordDate" id="previous">
                Previous
            </button>
            <button @click="currentDate" id="current" class="selected">
                Current
            </button>
            <button @click="advanceDate" id="next">Next</button>
        </div>
    </div>
    <div id="schedule"></div>
</template>

<script>
export default {
    mounted() {
        let now = new Date();
        let unix = now.getTime();
        this.getschedule(unix);
    },
    methods: {
        async getschedule(now) {
            const today = new Date(parseInt(now)).toISOString().split("T")[0];
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");
            if (localStorage.getItem("url") == null) {
                //alert("Not logged in! Go to the Account page to log in first.")
                document.getElementById("loginstatus").innerHTML =
                    "Not logged in! Go to the Account page to log in first.";
            } else {
                document
                    .getElementById("schedulenav")
                    .classList.remove("hidden");
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                var response = await fetch(
                    `${url}api/3/timetable/actual?date=${today}`,
                    {
                        method: "GET",
                        headers: head,
                    },
                );
                var responseJson = await response.json();
                if (response.ok == false) {
                    alert(
                        "Authentication failure. Go to the Home tab to refresh login.",
                    );
                } else {
                    var response = Object.values(responseJson);
                    var scheduleDiv = document.getElementById("schedule");

                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }
                    const scheduleTable = document.createElement("table");
                    scheduleTable.innerHTML = "<tr>";
                    scheduleDiv.appendChild(scheduleTable);

                    const scheduleTimeHeader = document.createElement("tr");
                    scheduleTable.appendChild(scheduleTimeHeader);

                    const scheduleEmptyCell = document.createElement("td");
                    scheduleEmptyCell.classList.add("timetable-days");
                    scheduleTimeHeader.appendChild(scheduleEmptyCell); // empty cell

                    for (let k = 0; k < response[0].length; k++) {
                        const timeCell = document.createElement("th");
                        timeCell.innerHTML =
                            k +
                            1 +
                            ".<span class='timerange'>" +
                            response[0][k].BeginTime +
                            " - " +
                            response[0][k].EndTime +
                            "</span>";
                        scheduleTimeHeader.appendChild(timeCell);
                    }

                    for (let i = 0; i < response[1].length; i++) {
                        const scheduleRow = document.createElement("tr");
                        scheduleTable.appendChild(scheduleRow);

                        const scheduleDay = document.createElement("td");
                        scheduleDay.classList.add("timetable-days");
                        const weekday = [
                            "MON",
                            "TUE",
                            "WED",
                            "THU",
                            "FRI",
                            "SAT",
                            "SUN",
                        ];
                        scheduleDay.innerHTML =
                            weekday[response[1][i].DayOfWeek - 1];
                        scheduleRow.appendChild(scheduleDay);

                        if (response[1][i].DayType == "Holiday") {
                            for (let ii = 0; ii < response[0].length; ii++) {
                                const scheduleRowItem =
                                    document.createElement("td");
                                scheduleRowItem.innerHTML =
                                    "<span class='subject'>Holiday</span>";
                                scheduleRowItem.classList.add("holiday");
                                scheduleRow.appendChild(scheduleRowItem);
                            }
                        } else {
                            for (
                                let j = 0;
                                j < response[1][i].Atoms.length;
                                j++
                            ) {
                                const scheduleRowItem =
                                    document.createElement("td");
                                let room;
                                let subject;
                                let teacher;
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
                                        scheduleRowItem.classList.add(
                                            "change-cancel",
                                        );
                                    } else {
                                        scheduleRowItem.classList.add(
                                            "change-other",
                                        );
                                    }
                                }

                                if (response[1][i].Atoms[j].SubjectId == null) {
                                    subject = "N/A";
                                } else {
                                    subject = response[4].find(
                                        (x) =>
                                            x.Id ===
                                            response[1][i].Atoms[j].SubjectId,
                                    ).Abbrev;
                                }
                                if (response[1][i].Atoms[j].TeacherId == null) {
                                    teacher = "N/A";
                                } else {
                                    teacher = response[5].find(
                                        (y) =>
                                            y.Id ===
                                            response[1][i].Atoms[j].TeacherId,
                                    ).Abbrev;
                                }
                                scheduleRowItem.innerHTML =
                                    "<span class='subject'>" +
                                    subject +
                                    "</span><br>" +
                                    teacher +
                                    "<br>" +
                                    room;
                                scheduleRow.appendChild(scheduleRowItem);
                            }
                        }
                    }
                }

                const spinner = document.getElementsByClassName("spinner");
                spinner[0].remove();
            }
        },
        async lessIForgotTheWordDate() {
            let now = new Date();
            let unix = now.getTime();
            unix = unix - 608400000;
            this.killChildren();
            this.getschedule(unix);
            document.getElementById("currentweek").innerHTML =
                "Viewing previous week";
            document.getElementById("previous").classList.add("selected");
            document.getElementById("current").classList.remove("selected");
            document.getElementById("next").classList.remove("selected");
        },
        async advanceDate() {
            let now = new Date();
            let unix = now.getTime();
            unix = unix + 608400000;
            this.killChildren();
            this.getschedule(unix);
            document.getElementById("currentweek").innerHTML =
                "Viewing next week";
            document.getElementById("previous").classList.remove("selected");
            document.getElementById("current").classList.remove("selected");
            document.getElementById("next").classList.add("selected");
        },
        async currentDate() {
            let now = new Date();
            let unix = now.getTime();
            this.killChildren();
            this.getschedule(unix);
            document.getElementById("currentweek").innerHTML =
                "Viewing current week";
            document.getElementById("previous").classList.remove("selected");
            document.getElementById("current").classList.add("selected");
            document.getElementById("next").classList.remove("selected");
        },
        async killChildren() {
            var sched = document.getElementById("schedule");
            while (sched.firstChild) sched.removeChild(sched.firstChild);
        },
    },
};
</script>

<style>
#schedulenav {
    width: 100%;
    text-align: center;
}

#schedule {
    overflow-x: scroll;
    scrollbar-width: thin;
    border-radius: var(--rounded-common);
}

.subject {
    font-size: larger;
    font-weight: bold;
}

.change-cancel {
    background-color: rgba(255, 137, 137, 0.1);
}

.change-other {
    background-color: rgba(160, 255, 160, 0.1);
}

.holiday {
    background-color: rgba(69, 196, 255, 0.1);
    text-align: center;
}

.timerange {
    font-weight: normal;
    font-size: smaller;
    display: block;
    min-width: max-content;
}

td {
    box-shadow: inset 0 0 0 1px var(--color-background-mute), 0 0 0 1px var(--color-background-mute);
}


th,
td {
    vertical-align: top;
    padding: 0.5em;
    min-width: min-content;
}

th {
    font-weight: bold;
    background-color: var(--color-background-soft);
    min-width: 7em;
}

table tr td:first-child {
    text-align: center;
    vertical-align: middle;
}

table {
    border-collapse: collapse;
}

.timetable-days {
    background-color: var(--color-background-mute);
    position: sticky;
    left: -1px;
}

.btn-container {
    display: flex;
    margin: 1em 0;
    width: 100%;
}

.btn-container button {
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--color-text);
    background-color: var(--color-background-soft);
    padding: 1.15em 1.25em;
    flex: 1 1 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    border: none;
    
}

.btn-container button:not(.selected):hover {
    box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--btr-a) 100%, #00000000 20%), 0 0 12px var(--btr-at);
}

.btn-container button:first-child {
    border-radius: var(--rounded-common) 0 0 var(--rounded-common);
}

.btn-container button:last-child {
    border-radius: 0 var(--rounded-common) var(--rounded-common) 0;
}

.btn-container .selected {
    background: color-mix(in srgb, var(--btr-ab) 45%, rgb(153, 157, 161));
    color: var(--color-background);
    font-weight: 600;
}
</style>
