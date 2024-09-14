<script setup>
import { render, h, createVNode } from "vue";

import Spinner from "./Spinner.vue";
</script>

<template>
    <p id="loginstatus"></p>

    <Spinner />

    <div id="recentList"></div>
    <div id="marksList"></div>
</template>

<script>
export default {
    mounted() {
        this.getgrades();
    },
    methods: {
        async getgrades() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");
            if (localStorage.getItem("url") == null) {
                //alert("Not logged in! Go to the Account page to log in first.")
                document.getElementById("loginstatus").innerHTML =
                    "Not logged in! Go to the Account page to log in first.";
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                var response = await fetch(`${url}api/3/marks/`, {
                    method: "GET",
                    headers: head,
                });
                var responseJson = await response.json();
                if (response.ok == false) {
                    alert(
                        "Authentication failure. Go to the Home tab to refresh login.",
                    );
                } else {
                    document.getElementById("loginstatus").innerHTML =
                        "Tap on a subject to view grades";
                    // document.write(JSON.stringify(responseJson));
                    var response = Object.values(responseJson);
                    var listDiv = document.getElementById("marksList");
                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    let allgrades = [];

                    // meoowwwwww nyaaaaa
                    for (let i = 0; i < response[0].length; i++) {
                        allgrades = allgrades.concat(response[0][i].Marks);

                        const subjectContainer =
                            document.createElement("details");
                        listDiv.appendChild(subjectContainer);
                        const subjectElement =
                            document.createElement("summary");
                        subjectContainer.appendChild(subjectElement);
                        let averagegrade;
                        let temporarygrade;
                        if (
                            response[0][i].AverageText == null ||
                            response[0][i].AverageText == " "
                        ) {
                            averagegrade = "N/A";
                        } else {
                            averagegrade = response[0][i].AverageText;
                        }
                        if (
                            response[0][i].TemporaryMark == null ||
                            response[0][i].TemporaryMark == " "
                        ) {
                            temporarygrade = "N/A";
                        } else {
                            temporarygrade = response[0][i].TemporaryMark;
                        }
                        subjectElement.innerHTML =
                            "<div class='subject-title'>" +
                            response[0][i].Subject.Name +
                            "<br><span> Average grade: " +
                            averagegrade +
                            "</span>" +
                            "<span> Temporary grade: " +
                            temporarygrade +
                            "</span>" +
                            "</div>" +
                            "<div class='subject-details' id='subjectDetails'><span class='grades-amount'>" +
                            response[0][i].Marks.length +
                            "</span><span class='chevron'>&rsaquo;</span></div>";
                        const subjectGrades = document.createElement("ul");
                        subjectContainer.appendChild(subjectGrades);
                        for (
                            let j = response[0][i].Marks.length - 1;
                            j >= 0;
                            j--
                        ) {
                            const subjectGradesItem =
                                document.createElement("li");
                            subjectGradesItem.innerHTML =
                                "<span class='gradeText'>" +
                                response[0][i].Marks[j].MarkText +
                                "</span><span class='gradeWeight'>Weight: " +
                                response[0][i].Marks[j].Weight +
                                "</span><span class='gradeCaption'>" +
                                response[0][i].Marks[j].Caption +
                                "</span>";

                            subjectGrades.appendChild(subjectGradesItem);
                        }
                    }

                    let recentno = parseInt(
                        localStorage.getItem("recentGradesAmount"),
                    );
                    if (recentno < 5) {
                        recentno = 10;
                    }
                    let recentgrades = allgrades
                        .sort(function (a, b) {
                            var c = new Date(a.MarkDate);
                            var d = new Date(b.MarkDate);
                            return c - d;
                        })
                        .reverse()
                        .slice(0, recentno);
                    console.log(recentgrades);

                    let subject;

                    var recentListDiv = document.getElementById("recentList");

                    const recentContainer = document.createElement("details");
                    recentContainer.classList.add("recentdetails");
                    recentListDiv.appendChild(recentContainer);
                    const recentElement = document.createElement("summary");
                    recentElement.innerHTML =
                        "<div class='subject-title'>Recent Grades</div><select name='amount' id='amountbox'><option value='5'>5</option><option value='10'>10</option><option value='15'>15</option><option value='20'>20</option></select><div class='subject-details' id='subjectDetails'><span class='chevron'>&rsaquo;</span></div>";
                    recentContainer.appendChild(recentElement);
                    document.getElementById("amountbox").value =
                        localStorage.getItem("recentGradesAmount");
                    var mySelect = document.getElementById("amountbox");
                    mySelect.onchange = (event) => {
                        localStorage.setItem(
                            "recentGradesAmount",
                            amountbox.value,
                        );
                        location.reload();
                    };

                    const recentGradesElem = document.createElement("ul");
                    recentContainer.appendChild(recentGradesElem);
                    for (let l = 0; l < recentgrades.length; l++) {
                        subject = response[0].find(
                            (x) => x.Subject.Id === recentgrades[l].SubjectId,
                        ).Subject.Abbrev;
                        const recentGradesItem = document.createElement("li");
                        recentGradesItem.innerHTML =
                            "<span class='gradeSubject'>" +
                            subject +
                            "</span><span class='gradeText'>" +
                            recentgrades[l].MarkText +
                            "</span><span class='gradeWeight'>Weight: " +
                            recentgrades[l].Weight +
                            "</span><span class='gradeCaption'>" +
                            recentgrades[l].Caption +
                            "</span>";

                        recentGradesElem.appendChild(recentGradesItem);
                    }

                    var localStorageKeyR = "disclosed_recent";
                    var detailsR = document.querySelector(".recentdetails");
                    detailsR.addEventListener("toggle", (event) => {
                        if (detailsR.open) {
                            localStorage.setItem(localStorageKeyR, true);
                        } else {
                            localStorage.removeItem(localStorageKeyR);
                        }
                    });
                    if (localStorage.getItem(localStorageKeyR)) {
                        detailsR.open = true;
                    }
                }

                const chevron = document.getElementsByClassName("chevron");
                for (let asdf = 0; asdf < chevron.length; asdf++) {
                    chevron[asdf].innerHTML =
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>`;
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
#marksList summary {
    display: flex;
    background: aliceblue;
    background: var(--btr-gradient);
    color: var(--vt-c-indigo);
    padding: 0.5em 1em;
    font-size: 150%;
    border-radius: var(--rounded-common);
    align-items: center;
    transition: all 0.1s ease-out;
}

#marksList [open] summary,
#recentList [open] summary {
    filter: saturate(200%) contrast(120%) hue-rotate(20deg);
}

[open] {
    background-color: var(--color-background-darker);
    border-radius: var(--rounded-common);
}

#recentList summary {
    display: flex;
    background: aliceblue;
    background: color-mix(in srgb, var(--btr-ab) 65%, aliceblue);
    color: var(--vt-c-indigo);
    padding: 0.5em 1em;
    font-size: 150%;
    border-radius: var(--rounded-common);
    align-items: center;
    transition: all 0.1s ease-out;
}

#marksList summary:hover,
#recentList summary:hover {
    box-shadow: 0 0 0em 0.2em color-mix(in srgb, var(--btr-ab) 30%, #ffffff50);
    cursor: pointer;
}

#marksList summary .subject-title,
#recentList summary .subject-title {
    font-weight: bold;
    max-width: fit-content;

    span {
        font-size: small;
        font-weight: normal;
        display: block;
    }
}

#marksList summary .subject-details {
    margin-left: auto;
    line-height: 1;
    min-width: 1.5em;
    text-align: right;
    display: flex;
    align-items: center;
}

#marksList,
#recentList {
    min-width: 75%;

    ul {
        padding: 0 1.25rem;
    }
    li span:first-child {
        border-radius: var(--rounded-uncommon) 0 0 var(--rounded-uncommon);
    }
    li {
        border-radius: var(--rounded-uncommon);
    }
}

#recentList select {
    background-color: var(--color-background);
    color: var(--color-text);
    border: none;
    border-radius: 5rem;
    padding: 0.25rem 0.1rem 0.25rem 0.75rem;
    margin: 0 0.5rem 0 auto;
    font-size: 12pt;
}

#recentList summary .subject-details {
    margin-left: 0.1rem;
    line-height: 1;
    text-align: right;
    display: flex;
    align-items: center;
}

details,
summary {
    margin: 0.5em 0 0.5em 0;
    padding-bottom: 0.5em;
}

details summary {
    cursor: pointer;
    transition: margin 0.1s ease-out;
}

details[open] summary {
    margin-bottom: 1.25em;
}

summary {
    user-select: none;
    list-style-type: none;
}

span.gradeText {
    background-color: var(--color-background-mute);
    color: var(--color-text);
    padding: 0.5em;
    min-width: 2em;
    text-align: center;
    align-self: stretch;
    align-content: center;
}

span.gradeWeight {
    min-width: fit-content;
    background-color: var(--color-background-soft);
    align-self: stretch;
    align-content: center;
}

span.gradeSubject {
    color: var(--color-text);
    padding: 0.5em;
    min-width: 3.25em;
    text-align: center;
    align-self: stretch;
    align-content: center;
}

span.grades-amount {
    margin: 0 0.25em;
    font-size: 150%;
}

.chevron {
    path {
        stroke: currentColor;
        stroke-width: 1.5px;
        stroke-linejoin: round;
    }
}

li {
    list-style-type: none;
    margin: 0.75rem 0;
    display: flex;
    background-color: rgba(0, 0, 0, 0.1);
    align-items: center;

    span {
        padding: 0.5em;
    }
}

#loginstatus {
    margin-bottom: 2rem;
}
</style>
