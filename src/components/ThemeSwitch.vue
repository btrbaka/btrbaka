<script setup>
const themePreference = localStorage.getItem("theme");

if (themePreference === null) {
    localStorage.setItem("theme", "system")
}

const changeTheme = (theme) => {
    const themes = ["system", "dark", "light"];
    localStorage.setItem("theme", theme);
    const otherthemes = themes.filter(a => a !== theme );
    document.body.classList.remove(...otherthemes);
    document.body.classList.add(theme);
}

const poppins = () => {
    const fontPreference = localStorage.getItem("font")
    const poppinsTextElem = document.getElementById("poppins-text");

    if (fontPreference === null) {
        localStorage.setItem("font", "poppins");
        document.body.classList.add("poppins");
        poppinsTextElem.innerHTML = `You are now Mary <strong>Poppins</strong>! Be blown away.`;
        poppinsTextElem.classList.remove("hidden");
    }
    else {
        localStorage.removeItem("font");
        document.body.classList.remove("poppins");
        poppinsTextElem.innerHTML = ``;
        poppinsTextElem.classList.add("hidden");
    }
}
</script>

<template>
    <div class="theme-group">
        <div class="theme-switch">
            <label>
                <input type="radio" name="theme" value="system" @change="changeTheme('system')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-circle-half" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                </svg>
            </label>
            <label>
                <input type="radio" name="theme" value="dark" @change="changeTheme('dark')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon"
                    viewBox="0 0 16 16">
                    <path
                        d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                </svg>
            </label>
            <label>
                <input type="radio" name="theme" value="light" @change="changeTheme('light')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun"
                    viewBox="0 0 16 16">
                    <path
                        d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
            </label>
        </div>

        <button class="poppins-switch" @click="poppins()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-umbrella"
                viewBox="0 0 16 16">
                <path
                    d="M8 0a.5.5 0 0 1 .5.5v.514C12.625 1.238 16 4.22 16 8c0 0 0 .5-.5.5-.149 0-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394A3.17 3.17 0 0 0 13 7.5c-.638 0-1.178.213-1.564.434a3.5 3.5 0 0 0-.555.394l-.025.023-.003.003s-.204.146-.353.146-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394 3.3 3.3 0 0 0-1.064-.39V13.5H8h.5v.039l-.005.083a3 3 0 0 1-.298 1.102 2.26 2.26 0 0 1-.763.88C7.06 15.851 6.587 16 6 16s-1.061-.148-1.434-.396a2.26 2.26 0 0 1-.763-.88 3 3 0 0 1-.302-1.185v-.025l-.001-.009v-.003s0-.002.5-.002h-.5V13a.5.5 0 0 1 1 0v.506l.003.044a2 2 0 0 0 .195.726c.095.191.23.367.423.495.19.127.466.229.879.229s.689-.102.879-.229c.193-.128.328-.304.424-.495a2 2 0 0 0 .197-.77V7.544a3.3 3.3 0 0 0-1.064.39 3.5 3.5 0 0 0-.58.417l-.004.004S5.65 8.5 5.5 8.5s-.352-.145-.352-.145l-.004-.004a3.5 3.5 0 0 0-.58-.417A3.17 3.17 0 0 0 3 7.5c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.58.417l-.004.004S.65 8.5.5 8.5C0 8.5 0 8 0 8c0-3.78 3.375-6.762 7.5-6.986V.5A.5.5 0 0 1 8 0M6.577 2.123c-2.833.5-4.99 2.458-5.474 4.854A4.1 4.1 0 0 1 3 6.5c.806 0 1.48.25 1.962.511a9.7 9.7 0 0 1 .344-2.358c.242-.868.64-1.765 1.271-2.53m-.615 4.93A4.16 4.16 0 0 1 8 6.5a4.16 4.16 0 0 1 2.038.553 8.7 8.7 0 0 0-.307-2.13C9.434 3.858 8.898 2.83 8 2.117c-.898.712-1.434 1.74-1.731 2.804a8.7 8.7 0 0 0-.307 2.131zm3.46-4.93c.631.765 1.03 1.662 1.272 2.53.233.833.328 1.66.344 2.358A4.14 4.14 0 0 1 13 6.5c.77 0 1.42.23 1.897.477-.484-2.396-2.641-4.355-5.474-4.854z" />
            </svg>
        </button>
    </div>
    <p id="poppins-text" class="hidden"></p>
</template>

<script>
export default {
    mounted() {
        const amongus = localStorage.getItem("theme");
        const themeRadio = document.getElementsByName("theme");
        for (let i = 0; i < themeRadio.length; i++) {
            if (themeRadio[i].value === amongus) {
                themeRadio[i].checked = true;
            }
        }
    }
}
</script>

<style>
.theme-group {
    display: flex;
    gap: 0.5em;
    margin: 1.5em 0.5em;
    user-select: none;
}

.theme-switch {
    background: var(--color-background-soft);
    border-radius: var(--rounded-rare);
    padding: 0.25rem;
    display: flex;
    align-items: center;

    label {
        transition: all 0.1s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0.5rem;
    }

    label svg {
        height: 1rem;
        width: 1rem;
    }

    label:has(input:checked) {
        background-color: var(--color-background-mute);
        border-radius: var(--rounded-rare);
    }

    input[type="radio"] {
        display: none;
    }
}

.poppins-switch {
    border: none;
    background: var(--color-background-soft);
    color: var(--color-text);
    border-radius: var(--rounded-rare);
    transition: all 0.1s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.75rem;

    &:hover {
        background: var(--color-background-mute);
    }

    &:active {
        background: color-mix(in srgb, var(--color-background-mute) 30%, var(--color-background) 90%);
    }

    svg {
        height: 1rem;
        width: 1rem;
    }
}

[id="poppins-text"] strong {
    font-weight: 900;
    background-color: var(--color-background-soft);
}
</style>