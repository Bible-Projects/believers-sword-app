<script setup lang="ts">
import Axios from "@/service/Axios/Axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import sanitizeHtml from "sanitize-html";
import { generateHTML } from "@tiptap/core";
import { extensionsUsed } from "@/components/Editor/editor-options";
import { NSkeleton, NCard, NButton, NTag, NIcon } from "naive-ui";
import { ChatMultiple16Regular, Door20Regular } from "@vicons/fluent";
import { isUserLogged } from "@/service/backend/User";
const router = useRouter();
const route = useRoute();
const post = ref<{ title: string; content: any; category: string } | null>(null);
const isLoading = ref(false);
const isLogged = ref(false);

function getPost() {
    if (isUserLogged())
        Axios.get(`/api/v1/post/show/${route.params.id}`).then(({ data }) => {
            if (data) {
                post.value = data;
            }
            isLoading.value = false;
        });
}

onMounted(() => {
    isLogged.value = isUserLogged();
    getPost();
});
</script>
<template>
    <div class="post-top-bar mb-5 top-0 sticky">
        <NButton round tertiary @click="router.go(-1)"> Go Back</NButton>
    </div>
    <NCard>
        <div v-if="isLogged" class="post-header pb-10">
            <div v-if="post && !isLoading" class="flex justify-between">
                <div class="text-size-35px font-800">{{ post.title }}</div>
                <NTag round type="info">
                    {{ post.category }}
                    <template #icon>
                        <NIcon :component="ChatMultiple16Regular" />
                    </template>
                </NTag>
            </div>
            <NSkeleton height="40px" v-else />
        </div>
        <div
            v-if="post && !isLoading"
            class="post-content"
            v-html="sanitizeHtml(generateHTML(post.content, extensionsUsed).trim())"
        ></div>
        <div v-else-if="isLogged == false" class="flex flex-col gap-2 text-center">
            You Must Be Logged to View Discussion.
            <div>
                <NButton type="primary" @click="router.push({ name: 'AccountPage' })">
                    <template #icon>
                        <NIcon :component="Door20Regular" />
                    </template>
                    Login
                </NButton>
            </div>
        </div>
        <div v-else class="flex flex-col gap-2">
            <span class="text-right -mb-1">
                <NSkeleton text style="width: 90%" />
            </span>
            <NSkeleton text :repeat="17" />
            <NSkeleton text style="width: 60%" />
        </div>
    </NCard>
</template>
