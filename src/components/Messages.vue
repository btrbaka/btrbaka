<script setup>
import { render, h, createVNode } from "vue";

import Spinner from "./Spinner.vue";
</script>

<template>
    <p id="unreads"></p>

    <Spinner />

    <div id="messagesDiv"></div>
</template>

<script>
export default {
    mounted() {
        this.getmessages();
    },
    methods: {
        async getmessages() {
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
                var response = await fetch(
                    `${url}api/3/komens/messages/received/`,
                    {
                        method: "POST",
                        headers: head,
                    },
                );
                var unreads = await fetch(
                    `${url}api/3/komens/messages/received/unread/`,
                    {
                        method: "GET",
                        headers: head,
                    },
                );
                var unreadsNumber = await unreads.json();
                var responseJson = await response.json();
                var messagesDiv = document.getElementById("messagesDiv");
                if (response.ok == false) {
                    alert(
                        "Authentication failure. Go to the Home tab to refresh login.",
                    );
                } else {
                    var response = Object.values(responseJson);
                    document.getElementById("unreads").innerHTML =
                        `Unread messages: ${unreadsNumber}`;

                    for (let i = 0; i < response[0].length; i++) {
                        console.log(response[0][i].Text);
                        let messageTitle = response[0][i].Title;
                        if (messageTitle == "") {
                            messageTitle = "No title";
                        }
                        let messageText = response[0][i].Text;
                        let messageSender = response[0][i].RelevantName;
                        let senderType = response[0][i].RelevantPersonType;
                        let sentDateUnix = Date.parse(response[0][i].SentDate);
                        var sentDate = new Date(sentDateUnix);
                        const messageContent =
                            document.createElement("messageContent");
                        messageContent.innerHTML = `<p>${messageTitle}</p><p>${sentDate.toLocaleString()}</p><br /><p>${messageSender} (${senderType})</p><br /><p>${messageText}</p><hr />`;
                        messagesDiv.appendChild(messageContent);
                    }
                }
            }
            const spinner = document.getElementsByClassName("spinner");
            spinner[0].classList.add("hidden");
        },
    },
};
</script>

<style></style>
