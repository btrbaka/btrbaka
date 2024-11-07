<template>
    <blockquote class="opacity-70 ma-4">"{{ quote }}"</blockquote>
</template>

<script>
export default {
    data: () => ({
        quote: "",
    }),
    mounted() {
        this.pickQuote();
    },
    methods: {
        async pickQuote() {
            const quotes = [
                `Real women test in production`,
                `Better than the official app, trust me`,
                `Made by egirls, for egirls`,
                `Trump should've caught the bullet`,
                `Stay safe out there`,
            ];
            this.quote = quotes[Math.floor(Math.random() * quotes.length)];
        },
    },
};
</script>
