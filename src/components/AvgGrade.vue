<template>
    <v-container class="d-flex justify-center">
        <v-chip color="bg-surface-light" text-color="white"
            >Average grade: {{ avgGrade }}</v-chip
        >
    </v-container>
</template>

<script>
export default {
    data: () => ({
        avgGrade: 0,
    }),
    mounted() {
        this.getAvgGrades();
    },
    methods: {
        async getAvgGrades() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");

            if (localStorage.getItem("url") == null) {
                this.alertType = "error";
                this.alertMessage =
                    "Not logged in! Go to the Account page to log in first.";
                this.showAlert();
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                let response = await fetch(`${url}api/3/marks/`, {
                    method: "GET",
                    headers: head,
                });
                let responseJson = await response.json();
                if (response.ok == false) {
                    await refreshLogin();
                    await this.getGrades();
                } else {
                    let response = Object.values(responseJson);
                    console.log(response[0]);

                    let sum = 0;
                    let count = 0;
                    for (const item of response[0]) {
                        const value = parseFloat(item.AverageText);
                        sum += value;
                        count++;
                    }
                    console.log("Sum:", sum);
                    console.log("Count:", count);
                    this.avgGrade = Math.floor((sum / count) * 100) / 100;
                }
            }
        },
    },
};
</script>
