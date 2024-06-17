<template>
    <div v-show="spinstate" class="spinner spinner-large">
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            spinstate: true
        }
    }
};
</script>

<style scoped>
.spinner {
    position: relative;
    width: 20px;
    height: 20px;
}

.spinner .spinner-blade {
    position: absolute;
    top: 6.5px;
    left: 8.5px;
    width: 2.5px;
    height: 6.5px;
    background-color: #8e8e93;
    border-radius: 1.25px;
    animation: spinnerBlade 1s linear infinite;
    will-change: opacity;
}

.spinner .spinner-blade:nth-child(1) {
    transform: rotate(45deg) translateY(-6.5px);
    animation-delay: -1.625s;
}

.spinner .spinner-blade:nth-child(2) {
    transform: rotate(90deg) translateY(-6.5px);
    animation-delay: -1.5s;
}

.spinner .spinner-blade:nth-child(3) {
    transform: rotate(135deg) translateY(-6.5px);
    animation-delay: -1.375s;
}

.spinner .spinner-blade:nth-child(4) {
    transform: rotate(180deg) translateY(-6.5px);
    animation-delay: -1.25s;
}

.spinner .spinner-blade:nth-child(5) {
    transform: rotate(225deg) translateY(-6.5px);
    animation-delay: -1.125s;
}

.spinner .spinner-blade:nth-child(6) {
    transform: rotate(270deg) translateY(-6.5px);
    animation-delay: -1s;
}

.spinner .spinner-blade:nth-child(7) {
    transform: rotate(315deg) translateY(-6.5px);
    animation-delay: -0.875s;
}

.spinner .spinner-blade:nth-child(8) {
    transform: rotate(360deg) translateY(-6.5px);
    animation-delay: -0.75s;
}

.spinner.spinner-large {
    width: 35px;
    height: 35px;
}

.spinner.spinner-large .spinner-blade {
    top: 11.5px;
    left: 15px;
    width: 5px;
    height: 12px;
    border-radius: 2.5px;
}

.spinner.spinner-large .spinner-blade:nth-child(1) {
    transform: rotate(45deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(2) {
    transform: rotate(90deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(3) {
    transform: rotate(135deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(4) {
    transform: rotate(180deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(5) {
    transform: rotate(225deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(6) {
    transform: rotate(270deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(7) {
    transform: rotate(315deg) translateY(-11.5px);
}

.spinner.spinner-large .spinner-blade:nth-child(8) {
    transform: rotate(360deg) translateY(-11.5px);
}

@keyframes spinnerBlade {
    0% {
        opacity: 0.85;
    }

    50% {
        opacity: 0.25;
    }

    100% {
        opacity: 0.25;
    }
}
</style>