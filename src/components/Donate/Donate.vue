<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { NAlert } from "naive-ui";

const clickLink = (link: string, newWindow: false, title = "Believers Sword App") => {
    let params: any = { link };
    params.title = title;
    if (newWindow) params["windowed"] = true;
    ipcRenderer.send("clickExternalLink", params);
};

const props = defineProps({
    textWidth: { type: Number, default: 1000 },
});
</script>
<template>
    <div>
        <div class="w-[100%] mx-auto text-size-18px leading-normal" :style="`max-width: ${props.textWidth}px`">
            <NAlert title="THIS APP IS ABSOLUTELY FREE" type="warning">
                <span class="text-size-18px" v-html="$t('donate_alert_first_paragraph')"></span>
            </NAlert>
            <br />
            <span v-html="$t('donate_alert_paragraph_one')"></span>
        </div>

        <div class="max-w-1500px w-[100%] mx-auto flex flex-wrap justify-center mt-50px gap-30px">
            <button
                class="rounded-xl overflow-hidden opacity-75 hover:opacity-100"
                @click="clickLink('https://www.paypal.com/donate?hosted_button_id=DCZYF7KWPUVB4', false, 'Donate To BroJenuel')"
            >
                <span class="text-size-24px font-600">Debit/Credit</span>
                <img src="./../../assets/images/donate.png" alt="" width="400" />
            </button>
            <button class="rounded-xl overflow-hidden opacity-75 hover:opacity-100">
                <img
                    src="./../../assets/images/gcash.jpg"
                    @click="clickLink('https://i.ibb.co/kJGg32y/GCash-My-QR-06102021230745.png', false, 'Donate To BroJenuel')"
                    alt=""
                    width="325"
                />
            </button>
            <button class="rounded-xl overflow-hidden opacity-75 hover:opacity-100">
                <img
                    class="rounded-xl"
                    src="./../../assets/images/buymecoffee.png"
                    @click="clickLink('https://www.buymeacoffee.com/BroJenuel', false, 'Donate To BroJenuel')"
                    alt=""
                    width="325"
                />
            </button>
            <button class="rounded-xl overflow-hidden opacity-75 hover:opacity-100">
                <img class="rounded-xl" src="./../../assets/images/kofi.gif" @click="clickLink('https://ko-fi.com/brojenuel', false, 'Donate To BroJenuel')" alt="" width="325" />
            </button>
        </div>
    </div>
</template>
