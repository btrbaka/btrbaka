<template>
    <v-container class="d-flex flex-column justify-center page-container">
        <v-text-field
            :rules="rules"
            hide-details="auto"
            v-model="url"
            label="School URL"
            type="text"
            class="ma-2"
        ></v-text-field>

        <v-text-field
            :rules="rules"
            hide-details="auto"
            v-model="username"
            label="Username"
            type="text"
            class="ma-2"
        ></v-text-field>

        <v-text-field
            :rules="rules"
            v-model="password"
            hide-details="auto"
            label="Password"
            type="password"
            class="ma-2"
        ></v-text-field>

        <v-text-field
            label="Refresh token (Optional)"
            v-model="refreshtoken"
            type="password"
            :class="['ma-2', { 'd-none': !debugmodecheck }]"
        ></v-text-field>

        <p class="login-status-notice ma-2"></p>

        <v-btn
            @click="logOut"
            size="large"
            class="ma-2"
            rounded="pill"
            color="error"
            v-if="
                this.url &&
                this.username &&
                this.stored_url &&
                this.stored_username
            "
        >
            Clear & Log out
        </v-btn>

        <v-btn @click="loginFunc" size="large" class="ma-2" rounded="pill"
            >Login</v-btn
        >

        <v-checkbox label="Debug mode" v-model="debugmodecheck"></v-checkbox>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        rules: [(value) => !!value || "Required."],
        url: "",
        username: "",
        password: "",
        refreshtoken: "",
        debugmodecheck: false,
        stored_url: false,
        stored_username: false,
    }),
    mounted() {
        // plop url and username in input boxes if saved in localstorage
        const storedUrl = localStorage.getItem("url");
        const storedUsername = localStorage.getItem("usrnm");

        if (storedUrl) {
            this.url = storedUrl.slice(0, -1);
            this.stored_url = true;
        }
        if (storedUsername) {
            this.username = storedUsername;
            this.stored_username = true;
        }
    },
    methods: {
        async loginFunc() {
            let urlVal = this.url;
            const now = new Date();

            if (urlVal.startsWith("https") == true) {
                urlVal = `${urlVal}/`;
            } else {
                urlVal = `https://${urlVal}/`;
            }

            const usernameVal = this.username;
            const passwordVal = this.password;
            const refreshTokenVal = this.refreshtoken;
            console.log(urlVal);
            console.log(usernameVal);
            console.log(passwordVal);

            let head = { "Content-Type": "application/x-www-form-urlencoded" };
            if (refreshTokenVal != "") {
                body = `client_id=ANDR&grant_type=refresh_token&refresh_token=${refreshTokenVal}`;
            }
            let body = `client_id=ANDR&grant_type=password&username=${usernameVal}&password=${passwordVal}`;
            var response = await fetch(`${urlVal}api/login/`, {
                method: "POST",
                headers: head,
                body: body,
            });

            const loginstatus = document.querySelector("p.login-status-notice");

            var responseJson = await response.json();
            console.log(response.ok);

            if (response.ok == false) {
                alert("Login failure. Wrong password? Try again.");
            } else {
                let token = responseJson.access_token;
                let refresh = responseJson.refresh_token;
                console.log(token);

                if (this.debugmodecheck) {
                    alert(token);
                }
                if (token.startsWith("undef") == false) {
                    let expirytime = now.getTime();
                    localStorage.setItem("expirytime", expirytime);
                    localStorage.setItem("url", urlVal);
                    localStorage.setItem("usrnm", usernameVal);
                    localStorage.setItem("token", token);
                    localStorage.setItem("refresh", refresh);
                }
                loginstatus.innerHTML = "Successfully logged in!";
            }
        },
        logOut() {
            localStorage.removeItem("url");
            localStorage.removeItem("usrnm");

            this.url = null;
            this.username = null;
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
