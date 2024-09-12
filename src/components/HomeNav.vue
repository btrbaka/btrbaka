<script setup>
import { RouterLink } from "vue-router";

import Icon123 from "./icons/Icon123.vue";
import IconTable from "./icons/IconTable.vue";
import IconAbsence from "./icons/IconAbsence.vue";
</script>

<template>
    <div class="homeNav">
        <div class="homeItem">
            <RouterLink to="/grades">
                <i>
                    <Icon123 />
                </i>
                <h3>Grades</h3>
            </RouterLink>
        </div>
        <div class="homeItem">
            <RouterLink to="/schedule">
                <i>
                    <IconTable />
                </i>
                <h3>Schedule</h3>
            </RouterLink>
        </div>
        <div class="homeItem">
            <RouterLink to="/absences">
                <i>
                    <IconAbsence />
                </i>
                <h3>Absences</h3>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.homeNav {
    margin: 1em 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    user-select: none;
}

@media (max-width: 1024px) {
    .homeNav {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (max-width: 724px) {
    .homeNav {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 364px) {
    .homeNav {
        grid-template-columns: 1fr;
    }
}

.homeItem {
    margin: 0.5em;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: var(--rounded-common);

    a {
        width: 100%;
        height: 100%;
        background-color: var(--color-background-soft);
        border-radius: var(--rounded-common);
        padding: 0 1.25em;
    }
    a:hover {
        background-color: var(--btr-at);
    }
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    height: 5em;

    color: var(--color-text);

    svg {
        height: 60%;
        width: auto;
    }
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}
</style>
