<script setup>
import { render, h, createVNode } from "vue";

import Spinner from "./Spinner.vue";
</script>

<template>
    <p id="loginstatus"></p>

    <Spinner />

    <div id="absencestotal"></div>
    <div id="absenceslist"></div>
</template>

<script>
export default {
    mounted() {
        this.getabsences();
    },
    methods: {
        async getabsences() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");

            if (localStorage.getItem("url") == null) {
                document.getElementById("loginstatus").innerHTML =
                    "Not logged in! Go to the Account page to log in first.";
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                var response = await fetch(`${url}api/3/absence/student/`, {
                    method: "GET",
                    headers: head,
                });
                var responseJson = await response.json();
                if (response.ok == false) {
                    alert(
                        "Authentication failure. Go to the Home tab to refresh login.",
                    );
                } else {
                    //alert("skibidi");
                    var response = Object.values(responseJson);
                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    var absencesTotalDiv =
                        document.getElementById("absencestotal");
                    var absencesListDiv =
                        document.getElementById("absenceslist");

                    const absencesTotalTable = document.createElement("table");
                    absencesTotalDiv.appendChild(absencesTotalTable);

                    const absencesTable = document.createElement("table");
                    absencesListDiv.appendChild(absencesTable);

                    const absencesTableHeader = document.createElement("tr");
                    absencesTableHeader.innerHTML =
                        "<th>Subject</th><th>Absence</th><th>%</th>";
                    absencesTable.appendChild(absencesTableHeader);

                    // write a row for each subject
                    for (let i = 0; i < response[2].length; i++) {
                        const absencesRow = document.createElement("tr");
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
                        absencesRow.innerHTML = `<td class="absence-subject">${response[2][i].SubjectName}</td> <td><span id="missed-number">${totalMissed}</span> | ${response[2][i].LessonsCount}</td> <td id="missed-percentage">${missedPercentage} %</td>`;
                        absencesTable.appendChild(absencesRow);

                        // if there are absences, make numbers red >:3
                        if (missedPercentage > 20) {
                            document
                                .getElementById("missed-percentage")
                                .classList.add("danger");
                        }
                        if (totalMissed > 0) {
                            document
                                .getElementById("missed-number")
                                .classList.add("danger");
                        }
                    }
                }

                // hide spinner after content is loaded
                const spinner = document.getElementsByClassName("spinner");
                spinner[0].classList.add("hidden");
            }
        },
    },
};
</script>

<style>
#absenceslist {
    margin: 0rem auto;
}
#absenceslist tr:nth-child(even) {
    background-color: color-mix(
        in srgb,
        var(--color-background-soft) 100%,
        #00000000 75%
    );
}
#absenceslist td {
    text-align: center;
    box-shadow: none;
    vertical-align: middle;
}
#absenceslist th {
    border-bottom: 2px solid var(--color-background-mute);
    padding: 0.25em 1em;
    font-weight: bold;
}
#absenceslist td.absence-subject {
    text-align: left;
    border-right: 2px solid var(--color-background-mute);
    padding-right: 1em;
}
</style>
