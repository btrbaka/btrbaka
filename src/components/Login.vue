<template>
    <label for="url">Server URL:</label>
    <input type="text" id="url" name="url">

    <label for="usrnm">Username:</label>
    <input type="text" id="usrnm" name="usrnm">

    <label for="pswd">Password:</label>
    <input type="password" id="pswd" name="pswd">

    <label for="rfrsh">Refresh token (optional):</label>
    <input type="password" id="rfrsh" name="rfrsh">

    <p id="loginstatuselem"></p>

    <button type="button" @click="loginFunc">Login</button>

    <div>
        <input type="checkbox" id="debugmode" name="debugmode" value="debugmode">
        <label for="debugmode"> Debug mode</label>
    </div>
</template>

<script>

export default {
    mounted() {
        const urlbox = document.getElementById("url");
        urlbox.value = localStorage.getItem("url").slice(0, -1);
    },
    methods: {
        async loginFunc() {
            const urlbox = document.getElementById("url");
            const usrnmbox = document.getElementById("usrnm");
            const pswdbox = document.getElementById("pswd");
            const rfrshbox = document.getElementById("rfrsh");
            let url = urlbox.value;
            const now = new Date();
            if (url.startsWith("https") == true) {
                url = `${url}/`;
            } else {
                url = `https://${url}/`;
            }

            const usrnm = usrnmbox.value;
            const pswd = pswdbox.value;
            const rfrsh = rfrshbox.value;
            console.log(url);
            console.log(usrnm);
            console.log(pswd);

            let head = { "Content-Type": "application/x-www-form-urlencoded" }
            if (rfrsh != "") {
                body = `client_id=ANDR&grant_type=refresh_token&refresh_token=${rfrsh}`
            }
            let body = `client_id=ANDR&grant_type=password&username=${usrnm}&password=${pswd}`
            var response = await fetch(`${url}api/login/`, {
                method: "POST",
                headers: head,
                body: body
            })

            const loginstatus = document.getElementById("loginstatuselem")

            var responseJson = await response.json()
            console.log(response.ok)
            if (response.ok == false) {
                alert("Login failure. Wrong password? Try again.")
            } else {
                let token = responseJson.access_token
                let refresh = responseJson.refresh_token
                console.log(token);
                if (document.getElementById('debugmode').checked) {
                    alert(token);
                }
                if (token.startsWith("undef") == false) {
                    let expirytime = now.getTime()
                    localStorage.setItem("expirytime", expirytime)
                    localStorage.setItem("url", url)
                    localStorage.setItem("token", token)
                    localStorage.setItem("refresh", refresh)
                    alert(`Successfully logged in!`);
                }
                loginstatus.innerHTML = "Successfully logged in!"
            }
        }
    }
}

</script>

<style scoped>
button {
    margin: 1em;
    padding: 1em;
    background-color: var(--btr-ad);
    color: var(--vt-c-indigo);
    border: none;
    cursor: pointer;
    border-radius: var(--rounded-common);
    transition: all 0.1s ease-out;
}

button:hover {
    background-color: var(--btr-a);
}

[type="text"],
[type="password"] {
    margin: 1em;
    padding: 0.5em;
}
</style>