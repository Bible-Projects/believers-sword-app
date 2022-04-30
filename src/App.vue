<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

// const theme = ref<string | null>("dark");

const bodyElement: HTMLElement | null =
    document.getElementById("the-main-body");

const setTheme = () => {
    bodyElement?.classList.toggle("dark");
};
</script>

<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

    <button @click="setTheme">change theme</button>

    <div class="dark:bg-dark-200 bg-gray-50 h-100px w-100px"></div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
