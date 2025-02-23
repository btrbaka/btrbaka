<template>
    <v-container class="d-flex flex-column justify-center page-container">
        <p v-if="isRefreshing" class="opacity-50 font-italic ms-4">
            <v-progress-circular indeterminate :size="24"></v-progress-circular>
            <span class="ms-4">Refreshing login token...</span>
        </p>
        <v-tabs v-model="tab" grow>
            <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
                {{ tab.text }}
            </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item
                v-for="tab in tabs"
                :key="tab.value"
                :value="tab.value"
            >
                <p class="ma-2 my-4">{{ tab.unreads }} unread messages</p>
                <v-alert v-if="alertVisible" :type="alertType">
                    {{ alertMessage }}
                </v-alert>
                <v-card
                    v-for="(message, index) in tab.content"
                    :key="index"
                    class="my-4"
                >
                    <v-card-item class="bg-surface-light">
                        <v-card-title>{{ message.title }}</v-card-title>
                        <v-card-subtitle>
                            From: {{ message.author }}</v-card-subtitle
                        >
                        <v-card-subtitle
                            ><v-icon>mdi-inbox</v-icon>
                            {{ message.date }}</v-card-subtitle
                        >
                    </v-card-item>

                    <v-card-text
                        v-html="unwrapSpans(message.content)"
                        class="pt-4"
                    >
                    </v-card-text>
                </v-card>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>
</template>

<script setup>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { isRefreshing } = useRefreshLogin();
</script>

<script>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { refreshLogin } = useRefreshLogin();

export default {
    data: () => ({
        alertVisible: false,
        alertMessage: "Meow",
        alertType: "info",
        tab: "received",
        tabs: [
            { value: "received", text: "Received", unreads: 0, content: [] },
            {
                value: "noticeboard",
                text: "Noticeboard",
                unreads: 0,
                content: [],
            },
        ],
    }),
    mounted() {
        this.getMessages();
    },
    methods: {
        async getMessages() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");

            if (localStorage.getItem("messagetype") == null) {
                localStorage.setItem("messagetype", "received");
            }

            if (localStorage.getItem("url") == null) {
                this.alertType = "error";
                this.alertMessage =
                    "Not logged in! Go to the Account page to log in first.";
                this.showAlert();
            } else {
                for (let j = 0; j < this.tabs.length; j++) {
                    // assigning the message type in this block
                    // using the tab's value from tabs array
                    let messagetype = this.tabs[j].value;

                    let head = {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${token}`,
                    };
                    let response = await fetch(
                        `${url}api/3/komens/messages/${messagetype}/`,
                        {
                            method: "POST",
                            headers: head,
                        },
                    );
                    let unreads = await fetch(
                        `${url}api/3/komens/messages/${messagetype}/unread/`,
                        {
                            method: "GET",
                            headers: head,
                        },
                    );
                    let unreadsNumber = await unreads.json();
                    let responseJson = await response.json();

                    if (isNaN(unreadsNumber) || unreadsNumber == 0) {
                        this.tabs[j].unreads = "No";
                    } else {
                        this.tabs[j].unreads = unreadsNumber;
                    }

                    if (response.ok == false) {
                        await refreshLogin();
                        await this.getMessages();
                    } else {
                        let response = Object.values(responseJson);

                        for (let i = response[0].length - 1; i >= 0; i--) {
                            let messageTitle = response[0][i].Title;
                            if (messageTitle == "") {
                                messageTitle = "No title";
                            }
                            let messageText = response[0][i].Text.trim();
                            let messageSender = response[0][i].RelevantName;
                            let senderType = response[0][i].RelevantPersonType;

                            let sentDateUnix = Date.parse(
                                response[0][i].SentDate,
                            );
                            var sentDate = new Date(sentDateUnix);

                            this.tabs[j].content.push({
                                title: `${messageTitle}`,
                                date: `${sentDate.toLocaleString()}`,
                                author: `${messageSender} (${senderType})`,
                                content: `${messageText}`,
                            });
                        }
                    }
                }
            }
        },
        unwrapSpans(html) {
            return html.replace(/<\/?span[^>]*>/g, "").replace(/^(<br \/>)+|(<br \/>)+$/g, "");
        },
        showAlert() {
            this.alertVisible = true;
        },
    },
};
</script>

<style scoped>
@media (min-width: 1420px) {
    #app .page-container {
        max-width: 1024px;
    }
}
</style>
