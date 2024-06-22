<script setup>
import { render, h, createVNode } from 'vue';
</script>

<template>
    <p id="loginstatus"></p>
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
                document.getElementById("loginstatus").innerHTML = "Not logged in! Go to the Account page to log in first.";
            } else {
                let head = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${token}` }
                var response = await fetch(`${url}api/3/marks/`, {
                    method: "GET",
                    headers: head
                })
                var responseJson = await response.json()
                if (response.ok == false) {
                    alert("Authentication failure. Go to the Home tab to refresh login.")
                } else {
                    document.getElementById("loginstatus").innerHTML = "Tap on a subject to view grades";
                    // document.write(JSON.stringify(responseJson));
                    var response = Object.values(responseJson);
                    var listDiv = document.getElementById('marksList');
                    let iterator = response.values();
                    for (const value of iterator) {
                        console.log(value);
                    }

                    // meoowwwwww nyaaaaa
                    for (let i = 0; i < response[0].length; i++) {
                        const subjectContainer = document.createElement("details");
                        listDiv.appendChild(subjectContainer);
                        const subjectElement = document.createElement("summary");
                        subjectContainer.appendChild(subjectElement)
                        let averagegrade;
                        let temporarygrade;
                        if (response[0][i].AverageText == null || response[0][i].AverageText == " ") {
                            averagegrade = "N/A";
                        } else {
                            averagegrade = response[0][i].AverageText;
                        }
                        if (response[0][i].TemporaryMark == null || response[0][i].TemporaryMark == " ") {
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
                            "<div class='subject-details' id='subjectDetails'>" +
                            response[0][i].Marks.length +
                            " <span>&rsaquo;</span></div>";
                        const subjectGrades = document.createElement("ul")
                        subjectContainer.appendChild(subjectGrades);
                        for (let j = response[0][i].Marks.length - 1; j >= 0; j--) {
                            const subjectGradesItem = document.createElement("li");
                            subjectGradesItem.innerHTML =
                                "<span class='gradeText'>" +
                                response[0][i].Marks[j].MarkText + 
                                "</span><span class='gradeWeight'>Weight: " +
                                response[0][i].Marks[j].Weight + 
                                "</span><span class='gradeCaption'>" +
                                response[0][i].Marks[j].Caption + "</span>";

                            subjectGrades.appendChild(subjectGradesItem);
                        }
                    }
                }
            }
        }
    }
}
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

#marksList summary:hover {
    box-shadow: 0 0 2em var(--btr-at);
    cursor: pointer;
}

#marksList summary .subject-title {
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
    font-size: 160%;
    line-height: 0;
    min-width: 1.5em;
    text-align: right;

    span {
        font-size: 120%;
        line-height: 0;
    }
}

#marksList {
    min-width: 75%;
    margin-top: 1.5em;

    ul {
        padding: 0 0.75rem;
    }
}

details,
summary {
    padding: 0.5em;
    margin-bottom: 0.5em;
}

summary {
    user-select: none;
    list-style-type: none;
}

span.gradeText {
    background-color: var(--color-background-mute);
    color: var(--color-text);
    padding: 0.5em;
    width: 2em;
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
</style>