<script setup>
import { render, h, createVNode } from "vue";

import Spinner from "./Spinner.vue";
</script>

<template>
    <p id="loginstatus"></p>

    <Spinner />

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
                var absencesDiv = document.getElementById("absenceslist");
                absencesDiv.innerHTML = "";
                absencesDiv.innerHTML += ('<table id="absencestable">');
                var absencesTable = document.getElementById("absencestable");
                absencesTable.innerHTML += ('<tr><td>Subject name</td><td>Lessons count</td><td>Missed</td><td>Late</td><td>Soon</td><td>School</td><td>Distance</td></tr>');
                
                for (let i = 0; i < response[2].length; i++) {
                    absencesTable.innerHTML += (`<tr><th scope="row">${response[2][i].SubjectName}</th> <td>${response[2][i].LessonsCount}</td> <td>${response[2][i].Base}</td> <td>${response[2][i].Late}</td> <td>${response[2][i].Soon}</td> <td>${response[2][i].School}</td> <td>${response[2][i].DistanceTeaching}</td></tr>`);
                }
                absencesDiv.innerHTML += ("</table>");
                document.getElementById("loginstatus").innerHTML =
                "";
                }

                const spinner = document.getElementsByClassName("spinner");
                spinner[0].classList.add("hidden");
            }
        }
    }

}
</script>
