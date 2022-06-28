<script lang="ts" setup>
import MyFeedBacks from "./MyFeedBacks.vue";
import { NButton, NModal, NCard, NInput, NForm, NFormItem, FormInst, NSelect, NTabs, NTabPane } from "naive-ui";
import RenderIcon from "./../../Icon/Icon.vue";
import { ref } from "vue";
import { addFeedback } from "./../../../service/backend/feedback";

const showModal = ref(false);
const feedbackFormRef = ref<FormInst | null>(null);
const isLoading = ref(false);
const form = ref<any>({
    title: null,
    category: null,
    description: null,
});

const formRule = {
    title: {
        required: true,
        message: "Please enter a title",
        trigger: "blur",
    },
    description: {
        required: true,
        message: "Please enter a description",
        trigger: "blur",
    },
    category: {
        required: true,
        message: "Please enter a category",
        trigger: ["blur", "change"],
    },
};

function submitFeedBack() {
    feedbackFormRef.value?.validate((errors) => {
        if (!errors) {
            isLoading.value = true;
            addFeedback(form.value).then((res) => {
                console.log(res);
                isLoading.value = false;
            });
        }
    });
}

function closeModal() {
    showModal.value = false;
    form.value.title = null;
    form.value.category = null;
    form.value.description = null;
}
</script>
<template>
    <NButton size="tiny" icon round tertiary @click="showModal = !showModal">
        <template #icon>
            <RenderIcon size="15" name="feedback" />
        </template>
        Feedback
    </NButton>
    <NModal :show="showModal">
        <NCard display-directive="show" title="Feedback" class="max-w-300px" size="small">
            <template #header-extra>
                <NButton size="tiny" icon round tertiary @click="closeModal()"> Close </NButton>
            </template>
            <NTabs>
                <NTabPane name="add feedback" tab="Add feedback">
                    <NForm ref="feedbackFormRef" size="small" :rules="formRule" :model="form">
                        <NFormItem label="Select Category" path="category">
                            <NSelect
                                v-model:value="form.category"
                                placeholder="Select Category"
                                :options="[
                                    {
                                        label: 'Bug',
                                        value: 'bug',
                                    },
                                    {
                                        label: 'Feature',
                                        value: 'feature',
                                    },
                                    {
                                        label: 'Other',
                                        value: 'other',
                                    },
                                ]"
                            />
                        </NFormItem>
                        <NFormItem label="Enter Summary of Feedback" path="title">
                            <NInput v-model:value="form.title" />
                        </NFormItem>
                        <NFormItem label="Enter more details" path="description" >
                            <NInput v-model:value="form.description" type="textarea" placeholder="Please Enter Description" />
                        </NFormItem>
                        <NButton :disabled="isLoading" :loading="isLoading" @click="submitFeedBack" type="primary" round> Submit </NButton>
                    </NForm>
                </NTabPane>
                <NTabPane name="my feedbacks" tab="My Feedbacks" display-directive="show:lazy">
                    <MyFeedBacks />
                </NTabPane>
            </NTabs>
        </NCard>
    </NModal>
</template>