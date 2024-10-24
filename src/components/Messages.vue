<script setup>
import { render, h, createVNode } from "vue";

import Spinner from "./Spinner.vue";
</script>

<template>
    <p id="unreads"></p>

    <div id="messageselector">
        <div class="btn-container">
            <button @click="received" id="received" class="selected">
                Received
            </button>
            <button @click="noticeboard" id="noticeboard">Noticeboard</button>
        </div>
    </div>

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
            if (localStorage.getItem("messagetype") == null) {
                localStorage.setItem("messagetype", "received");
            }
            var messagetype = localStorage.getItem("messagetype");
            if (localStorage.getItem("url") == null) {
                document.getElementById("loginstatus").innerHTML =
                    "Not logged in! Go to the Account page to log in first.";
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                var response = await fetch(
                    `${url}api/3/komens/messages/${messagetype}/`,
                    {
                        method: "POST",
                        headers: head,
                    },
                );
                var unreads = await fetch(
                    `${url}api/3/komens/messages/${messagetype}/unread/`,
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

                    const unreadsElem = document.getElementById("unreads");

                    if (unreadsNumber == 0) {
                        unreadsElem.innerHTML = `No unread messages`;
                    } else {
                        unreadsElem.innerHTML = `${unreadsNumber} unread messages`;
                    }

                    for (let i = response[0].length - 1; i >= 0; i--) {
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

                        const messageContent = document.createElement("div");

                        const messageTitleElem = document.createElement("h2");
                        const messageDateElem = document.createElement("h5");
                        const messageSenderElem = document.createElement("h4");
                        const messageProseElem = document.createElement("p");

                        messageContent.classList.add("message-card");

                        messageTitleElem.innerHTML = messageTitle;
                        messageDateElem.innerHTML = sentDate.toLocaleString();
                        messageSenderElem.innerHTML =
                            messageSender + " (" + senderType + ")";
                        messageProseElem.innerHTML = messageText;

                        messageContent.appendChild(messageTitleElem);
                        messageContent.appendChild(messageDateElem);
                        messageContent.appendChild(messageSenderElem);
                        messageContent.appendChild(messageProseElem);

                        messageProseElem
                            .querySelectorAll("span")
                            .forEach((spanElem) => {
                                spanElem.outerHTML = spanElem.innerHTML;
                            });

                        messagesDiv.appendChild(messageContent);
                    }
                }
            }
            const spinner = document.getElementsByClassName("spinner");
            spinner[0].classList.add("hidden");
        },
        async killChildren() {
            var messagesDiv = document.getElementById("messagesDiv");
            while (messagesDiv.firstChild)
                messagesDiv.removeChild(messagesDiv.firstChild);
        },
        async noticeboard() {
            localStorage.setItem("messagetype", "noticeboard");
            this.killChildren();
            document.getElementById("received").classList.remove("selected");
            document.getElementById("noticeboard").classList.add("selected");
            this.getmessages();
        },
    },
};
</script>

<style>
.message-card {
    background-color: var(--color-background-soft);
    margin: 1rem 0em;
    border-radius: var(--rounded-common);
    border: 1px solid var(--color-border);
    box-shadow: 0 0.25rem 1.5rem #00000015;

    h2 {
        color: var(--color-heading);
        font-weight: bold;
        padding: 1rem 1.25rem 0em;
        background-color: var(--color-background-mute);
        border-radius: var(--rounded-common) var(--rounded-common) 0 0;
    }
    h5,
    h4 {
        padding: 0em 1.25rem;
        background-color: var(--color-background-mute);
    }
    h4 {
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.5em;
    }
    p {
        padding: 0.75rem 1.25rem 1.25rem;
    }
}
</style>
