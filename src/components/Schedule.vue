<template>
    <div class=“btn-container”><button id="back" v-on:click="this.lessIForgotTheWordDate()"><</button><button id="forward" v-on:click="refreshPage">Current</button><button id="forward" v-on:click="this.advanceDate()">></button></div>
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
            const today = new Date(parseInt(now)).toISOString().split('T')[0]
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");
            if (localStorage.getItem("url") == null) {
                alert("Not logged in! Go to the Account page to log in first.")
            } else {
                let head = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${token}` }
                var response = await fetch(`${url}api/3/timetable/actual?date=${today}`, {
                    method: "GET",
                    headers: head
                })
                var responseJson = await response.json()
                if (response.ok == false) {
                    alert("Authentication failure. Go to the Home tab to refresh login.")
                } else {
                    var response = Object.values(responseJson);
                    var scheduleDiv = document.getElementById('schedule');

                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }
                    const scheduleTable = document.createElement("table");
                    scheduleTable.innerHTML =
                        "<tr>";
                    scheduleDiv.appendChild(scheduleTable);

                    const scheduleTimeHeader = document.createElement("tr");
                    scheduleTable.appendChild(scheduleTimeHeader);

                    const scheduleEmptyCell = document.createElement("td");
                    scheduleEmptyCell.classList.add("timetable-days")
                    scheduleTimeHeader.appendChild(scheduleEmptyCell); // empty cell
                    for (let k = 0; k < response[0].length; k++) {
                        const timeCell = document.createElement("th");
                        timeCell.innerHTML =
                            (k + 1) + ".<span class='timerange'>" +
                            response[0][k].BeginTime + " - " +
                            response[0][k].EndTime + "</span>";
                        scheduleTimeHeader.appendChild(timeCell);
                    }

                    for (let i = 0; i < response[1].length; i++) {
                        const scheduleRow = document.createElement("tr");
                        scheduleTable.appendChild(scheduleRow);

                        const scheduleDay = document.createElement("td");
                        scheduleDay.classList.add('timetable-days');
                        const weekday = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
                        scheduleDay.innerHTML = weekday[response[1][i].DayOfWeek - 1];
                        scheduleRow.appendChild(scheduleDay);

                        for (let j = 0; j < response[1][i].Atoms.length; j++) {
                            const scheduleRowItem = document.createElement("td");
                            let room;
                            let subject;
                            let teacher;
                            if (response[1][i].Atoms[j].Change == null) {
                                room = (response[6].find(z => z.Id === response[1][i].Atoms[j].RoomId)).Abbrev;
                            } else {
                                room = response[1][i].Atoms[j].Change.Description;
                            }

                            if (response[1][i].Atoms[j].SubjectId == null) {
                                subject = "N/A"
                            } else {
                                subject = (response[4].find(x => x.Id === response[1][i].Atoms[j].SubjectId)).Abbrev
                            }
                            //const subject = response[4].find(x => x.Id === response[1][i].Atoms[j].SubjectId);
                            if (response[1][i].Atoms[j].TeacherId == null) {
                                teacher = "N/A"
                            } else {
                                teacher = (response[5].find(y => y.Id === response[1][i].Atoms[j].TeacherId)).Abbrev
                            }
                            //const teacher = response[5].find(y => y.Id === response[1][i].Atoms[j].TeacherId);
                            scheduleRowItem.innerHTML =
                                "<span class='subject'>" + subject + "</span><br>" +
                                teacher + "<br>" +
                                room;
                            scheduleRow.appendChild(scheduleRowItem);
                        }
                    }
                }
            }
        },
        async lessIForgotTheWordDate() {
            let now = new Date();
            let unix = now.getTime();
            unix = unix - 608400000
            this.killChildren();
            this.getschedule(unix);
        },
        async advanceDate() {
            let now = new Date();
            let unix = now.getTime();
            unix = unix + 608400000
            this.killChildren();
            this.getschedule(unix);
        },
        async killChildren () {
            var sched = document.getElementById('schedule');
            while (sched.firstChild) sched.removeChild(sched.firstChild);
        }
    }
}
</script>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const refreshPage = () => {
  router.go(); 
};
</script>
<style>
#schedule {
    overflow-x: scroll;
}

.subject {
    font-size: larger;
    font-weight: bold;
}

.timerange {
    font-weight: normal;
    font-size: smaller;
    display: block;
    min-width: max-content;
}

td {
    border: 2px solid var(--color-background-mute);
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
}
button {
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:white;
    border: 1px solid var(--color-border);
    border-radius: var(--rounded-common);
        width: 30%;
        height: 100%;
        background-color: var(--color-background-soft);
        border-radius: var(--rounded-common);
}

</style>