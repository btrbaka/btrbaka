<template>
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
            let head = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${token}` }
            var response = await fetch(`${url}api/3/marks/`, {
                method: "GET",
                headers: head
            })
            var responseJson = await response.json()
            // document.write(JSON.stringify(responseJson));
            var response = Object.values(responseJson);
            var listDiv = document.getElementById('marksList');
            let iterator = response.values();
            for (const value of iterator) {
                console.log(value);
            }

            // meoowwwwww nyaaaaa
            for (let i = 0; i < response[0].length; i++) {
                const subjectElement = document.createElement("h2");
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
                    response[0][i].Subject.Name +
                    "<br><span> Average grade: " +
                    averagegrade +
                    ", </span>" +
                    "<span> Temporary grade: " +
                    temporarygrade +
                    "</span>";
                listDiv.appendChild(subjectElement);
                const subjectGrades = document.createElement("details")
                subjectGrades.innerHTML = "<summary>Tap to see grades... (" + response[0][i].Marks.length + ")</summary>";
                listDiv.appendChild(subjectGrades);
                for (let j = response[0][i].Marks.length - 1; j >= 0; j--) {
                    const subjectGradesItem = document.createElement("li");
                    subjectGradesItem.innerHTML =
                        "<span class='gradeText'>" + 
                        response[0][i].Marks[j].MarkText + "</span> - Weight: " +
                        response[0][i].Marks[j].Weight + " - " +
                        "<span class='gradeCaption'>" + 
                        response[0][i].Marks[j].Caption + "</span>";

                    subjectGrades.appendChild(subjectGradesItem);
                }
            }
        }
    }
}
</script>

<style>
#marksList>h2>span {
    font-size: small;
    font-weight: normal;
}

#marksList>h2 {
    background-color: aliceblue;
    color: black;
    padding: 0.5em;
    font-weight: bold;
}

#marksList {
    min-width: 75%;
}

details,
summary {
    padding: 0.5em;
    margin-bottom: 0.5em;
}

summary {
    user-select: none;
}

span.gradeText {
    background-color: var(--color-background-mute);
    color: var(--color-text);
    padding: 0.5em;
}

li {
    list-style-type: none;
    margin: 1em 0;
}
</style>