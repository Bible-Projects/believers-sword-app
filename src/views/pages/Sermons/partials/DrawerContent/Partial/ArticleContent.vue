<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedSermonContent = computed(() => store.state.sermonState.selected_sermon);
const content = ref(null);

watch(selectedSermonContent, (sermon) => {
    if (sermon) {
        content.value = sermon.content;
    }
});

onMounted(() => {
    if (selectedSermonContent.value) {
        content.value = selectedSermonContent.value.content;
    }
});
</script>
<template>
    <div class="text-content-sermon" v-html="content ? content : ''"></div>
</template>
<style lang="scss">
.text-content-sermon {
    max-width: 800px;
    margin: 0 auto;

    h1 {
        font-size: 3rem;
    }
    h2 {
        font-size: 2.5rem;
    }
    h3 {
        font-size: 2rem;
    }
    h4 {
        font-size: 1.5rem;
    }
    h5 {
        font-size: 1rem;
    }

    p {
        font-size: 1.3rem;
        margin-bottom: 30px;
    }
}
</style>
