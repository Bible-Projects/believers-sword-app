<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst, FormItemRule } from "naive-ui";
import { h, ref } from "vue";
import { UserFollow } from "@vicons/carbon";
import dayjs from "dayjs";
import { supabase } from "@/service/SupaBase/supabase";

const loading = ref(false);
const formValue = ref<FormInst | null>(null);
const emit = defineEmits(["cancelClicked"]);
const form = ref<{
    email: string | null;
    password: string | null;
    retypePassword: string | null;
}>({
    email: null,
    password: null,
    retypePassword: null,
});

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === form.value.password;
}

function validateEmail(rule: FormItemRule, value: string) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
    );
}

const rules = {
    email: [
        {
            validator: validateEmail,
            message: "Please a valid email address.",
            trigger: ["blur", "input"],
        },
    ],
    password: [
        {
            required: true,
            message: "Password is very Required",
            trigger: ["blur", "input"],
        },
        {
            validator: (rule: FormItemRule, value: string) => {
                return `${value}`.length > 7;
            },
            message: "Password must be greater than 7 characters.",
            trigger: ["blur", "input"],
        },
    ],
    retypePassword: [
        {
            required: true,
            message: "Please Re-enter Password.",
            trigger: ["blur", "input"],
        },
        {
            validator: validatePasswordSame,
            message: "Password is not same as re-entered password!",
            trigger: ["blur", "input"],
        },
    ],
};

const register = () => {
    formValue.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true;
            const { error } = await supabase.auth.signUp({
                email: form.value.email as string,
                password: form.value.password as string,
            });

            if (error) {
                loading.value = false;
                const n = window.notification["error"]({
                    title: "Oops! Error Registering.",
                    content: error.message,
                    meta: dayjs().format("MMM DD, YYYY"),
                    duration: 4000,
                    action: () =>
                        h(
                            NButton,
                            {
                                text: true,
                                type: "primary",
                                onClick: () => {
                                    n.destroy();
                                },
                            },
                            {
                                default: () => "Mark as Read",
                            }
                        ),
                });
            }

            const n = window.notification["success"]({
                title: "Successfully Registered!",
                content: `We have send a confirmation message to your email address ${form.value.email}. This is for making sure the email your using to register is yours.`,
                meta: dayjs().format("MMM DD, YYYY"),
                duration: 10000,
                action: () =>
                    h(
                        NButton,
                        {
                            text: true,
                            type: "primary",
                            onClick: () => {
                                n.destroy();
                            },
                        },
                        {
                            default: () => "Mark as Read",
                        }
                    ),
            });

            emit("cancelClicked");
        } else {
            const n = window.notification["error"]({
                title: "Ops!",
                content: `Please Check the fields before submitting.`,
                meta: dayjs().format("MMM DD, YYYY"),
                duration: 4000,
                action: () =>
                    h(
                        NButton,
                        {
                            text: true,
                            type: "primary",
                            onClick: () => {
                                n.destroy();
                            },
                        },
                        {
                            default: () => "Mark as Read",
                        }
                    ),
            });
        }
    });
};
</script>
<template>
    <NForm ref="formValue" :rules="rules" :model="form" label-width="auto">
        <div class="font-800 text-size-25px mb-30px">{{ $t("register") }}</div>
        <NFormItem label="Email Address" path="email">
            <NInput v-model:value="form.email" :placeholder="$t('enter_email_address')" />
        </NFormItem>
        <NFormItem label="Password" path="password">
            <NInput v-model:value="form.password" type="password" :placeholder="$t('enter_password')" />
        </NFormItem>
        <NFormItem label="Retype-Password" path="retypePassword">
            <NInput v-model:value="form.retypePassword" type="password" :placeholder="$t('retype_password')" />
        </NFormItem>
        <div class="flex gap-2 mt-4">
            <NButton secondary type="primary" @click="register()" :loading="loading" :disabled="loading">
                <template #icon>
                    <NIcon>
                        <UserFollow />
                    </NIcon>
                </template>
                {{ $t("sign_up") }}
            </NButton>
            <NButton @click="emit('cancelClicked')" :disabled="loading"> {{ $t("cancel") }} </NButton>
        </div>
    </NForm>
</template>
