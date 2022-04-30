<script setup lang="ts">
const bodyElement: HTMLElement | null =
    document.getElementById("the-main-body");

const setTheme = async () => {
    bodyElement?.classList.toggle("dark");
    const here = await window?.electron?.doThing();

    console.log(here);
};
</script>

<template>
    <button @click="setTheme">change theme</button>

    <div class="dark:bg-dark-200 bg-gray-50 h-100px w-100px"></div>
</template>
