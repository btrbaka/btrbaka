<template>
    <div id="quotediv"></div>
</template>

<script>
export default {
    mounted() {
        this.pickquote();
    },
    methods: {
        async pickquote() {
            const quotes = [`Real women test in production`, `Komens coming soon, maybe`, `Better than the official app, trust me`];
            const quotediv = document.getElementById("quotediv");
            var currentquote = quotes[this.randomint(0, quotes.length)];
            quotediv.innerHTML = `<blockquote>"${currentquote}"</blockquote>`
        },
        randomint(min, max) {
            const mincieled = Math.ceil(min);
            const maxfloored = Math.floor(max);
            return Math.floor(Math.random() * (maxfloored - mincieled) + mincieled);
        }

    }
};
</script>