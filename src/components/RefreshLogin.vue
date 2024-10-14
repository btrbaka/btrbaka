<template>
    <p id="refreshText">Refreshing login token...</p>
</template>

<script>
export default {
    mounted() {
        this.refreshlogin();
    },
    methods: {
        async refreshlogin() {
            const now = new Date();
            const currenttime = now.getTime();
            let expirytime = localStorage.getItem("expirytime");
            if (currenttime > expirytime) {
                let refresh = localStorage.getItem("refresh");
                let url = localStorage.getItem("url");
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                };
                let body = `client_id=ANDR&grant_type=refresh_token&refresh_token=${refresh}`;
                var response = await fetch(`${url}api/login/`, {
                    method: "POST",
                    headers: head,
                    body: body,
                });
                var responseJson = await response.json();
                console.log(response.ok);
                if (response.ok == false) {
                    alert(
                        "Login failure. Refresh token expired? Go to the Account page to refresh your login.",
                    );
                } else {
                    let token = responseJson.access_token;
                    refresh = responseJson.refresh_token;
                    console.log(token);
                    expirytime = now.getTime();
                    if (token.startsWith("undef") == false) {
                        localStorage.setItem("expirytime", expirytime);
                        localStorage.setItem("token", token);
                        localStorage.setItem("refresh", refresh);
                    }
                }
            }
            document.getElementById("refreshText").style.display = "none";
        },
    },
};
</script>
