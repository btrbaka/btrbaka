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

                    // total absences per semester (?)

                    if (response[1] != null) {
                        const absencesTotalDetails =
                            document.createElement("details");
                        absencesTotalDetails.classList.add(
                            "absences-total-details",
                        );
                        absencesTotalDiv.appendChild(absencesTotalDetails);

                        const absencesTotalSummary =
                            document.createElement("summary");
                        absencesTotalDetails.appendChild(absencesTotalSummary);

                        const absencesTotalTable =
                            document.createElement("table");
                        absencesTotalSummary.appendChild(absencesTotalTable);

                        const absencesTotalLegend =
                            document.createElement("ul");
                        absencesTotalLegend.innerHTML = `
                          <li><span class='blue'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0"/>
                          </svg></span> - Unsolved</li>
                          <li><span class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                          </svg></span> - Ok</li>
                          <li><span class='danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                          </svg></span> - Missed</li>
                          <li><span class='yellow'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-p-square" viewBox="0 0 16 16">
                            <path d="M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                          </svg></span> - Late</li>
                          <li><span class='orange'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-0-square" viewBox="0 0 16 16">
                            <path d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                          </svg></span> - Soon</li>
                          <li><span class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                          </svg></span> - School</li>
                          <li><span class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082"/>
                          </svg></span> - Distance learning</li>
                          `;
                        absencesTotalDetails.appendChild(absencesTotalLegend);

                        const absencesTotalRowLabels =
                            document.createElement("tr");
                        absencesTotalRowLabels.innerHTML = `<th></th>
                          <th class='blue'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0"/>
                          </svg></th>
                          <th class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                          </svg></th>
                          <th class='danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                          </svg></th>
                          <th class='yellow'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-p-square" viewBox="0 0 16 16">
                            <path d="M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                          </svg></th>
                          <th class='orange'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-0-square" viewBox="0 0 16 16">
                            <path d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895"/>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                          </svg></th>
                          <th class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                          </svg></th>
                          <th class='green'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082"/>
                          </svg></th>`;
                        absencesTotalTable.appendChild(absencesTotalRowLabels);

                        const absencesTotalRow = document.createElement("tr");
                        absencesTotalRow.innerHTML = `<th class='bold'>TOTAL</th>`;

                        let unsolvedNum = 0;
                        let okNum = 0;
                        let missedNum = 0;
                        let lateNum = 0;
                        let soonNum = 0;
                        let schoolNum = 0;
                        let distanceNum = 0;

                        for (let j = 0; j < response[1].length; j++) {
                            unsolvedNum = unsolvedNum + response[1][j].Unsolved;
                            okNum = okNum + response[1][j].Ok;
                            missedNum = missedNum + response[1][j].Missed;
                            lateNum = lateNum + response[1][j].Late;
                            soonNum = soonNum + response[1][j].Soon;
                            schoolNum = schoolNum + response[1][j].School;
                            distanceNum =
                                distanceNum + response[1][j].DistanceTeaching;
                        }

                        absencesTotalRow.innerHTML += `<td>${unsolvedNum}</td><td>${okNum}</td><td>${missedNum}</td><td>${lateNum}</td><td>${soonNum}</td><td>${schoolNum}</td><td>${distanceNum}</td>`;

                        absencesTotalTable.appendChild(absencesTotalRow);
                    }

                    // subject absences list
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

                        const missedLessonsElem = document.createElement("td");
                        const missedLessonsNumberElem =
                            document.createElement("span");
                        const missedPercentageElem =
                            document.createElement("td");

                        absencesRow.innerHTML = `<td class="absence-subject">${response[2][i].SubjectName}</td>`;

                        missedLessonsNumberElem.innerHTML = totalMissed;

                        if (missedPercentage > 20) {
                            // if there are absences, make numbers red >:3
                            missedPercentageElem.classList.add("danger");
                            missedLessonsNumberElem.classList.add("danger");
                        }

                        missedLessonsElem.appendChild(missedLessonsNumberElem);

                        missedLessonsElem.innerHTML +=
                            " | " + response[2][i].LessonsCount;
                        absencesRow.appendChild(missedLessonsElem);

                        missedPercentageElem.innerHTML =
                            missedPercentage + " %";

                        absencesRow.appendChild(missedPercentageElem);

                        absencesTable.appendChild(absencesRow);
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
#absenceslist,
#absencestotal {
    margin: 0rem auto;

    table {
        margin: auto;
        border-collapse: collapse;
    }

    td,
    th {
        vertical-align: top;
        padding: 0.25em 0.5em;
        min-width: min-content;
    }
}

#absenceslist {
    border: 1px solid var(--color-background-mute);
    border-radius: var(--rounded-common);
    width: 80%;

    tr td:first-child {
        width: 100%;
    }

    tr td:last-child {
        white-space: nowrap;
    }

    td,
    th {
        padding: 0.75em;
    }
}

@media (max-width: 1024px) {
    #absencestotal table tr th:first-child {
        display: none;
    }

    #absenceslist,
    #absencestotal {
        overflow-x: scroll;
        width: 100%;
    }

    #absenceslist {
        width: 100%;
    }
}

#absenceslist tr:nth-child(even) {
    background-color: color-mix(
        in srgb,
        var(--color-background-soft) 100%,
        transparent 75%
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

.absences-total-details {
    padding: 1rem;

    ul {
        padding: 0 1rem;
    }
    li {
        margin: 0.25rem 0;
        background: none;

        span {
            padding: 0.25rem 0.25rem 0 0;
        }
    }
}
</style>
