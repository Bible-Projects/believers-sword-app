<template>
    <h1 class="text-size-20px font-700">Clip Note For {{ `${selectedVerse.bookName} ${selectedVerse.c}:${selectedVerse.v}` }}</h1>
    <small>Clip notes, are small notes only for the verse. So that you can emphasize something in the verse.</small>
    <div class="pt-10px mb-15px">
        <h1 class="font-700">Select Clip Color</h1>
        <small>This will be the color of the paper to be clipped in selected verse.</small>
        <div class="pl-20px">
            <NRadioGroup v-model:value="clipColorSelected" size="medium" :on-update:value="onSelectClipColor">
                <NSpace>
                    <NRadio value="default" size="large">
                        <span class="flex items-center">
                            <span class="text-size-20px w-15px h-20px rounded-tl-md rounded-bl-md border border-gray-900" :style="`background-color: white`"></span>
                            <span class="text-size-20px w-15px h-20px rounded-tr-md rounded-br-md border border-gray-900 bg-dark-900"></span>
                        </span>
                    </NRadio>
                    <NRadio v-for="theme in clipColorOptions" :key="theme.key" :value="theme.value" size="large">
                        <span class="flex items-center gap-7px">
                            <span class="text-size-20px w-30px h-20px rounded-md" :style="`background-color: ${theme.color}`"></span>
                        </span>
                    </NRadio>
                </NSpace>
            </NRadioGroup>
        </div>
    </div>
    <div>
        <h1 class="font-700">Clip Note</h1>
        <NAlert v-show="alertShow" size="small" :title="alertText" type="error" />
        <small>This will be the note that will be written on the paper to be clipped on selected verse.</small>
        <div class="bg-black bg-opacity-20 h-[200px] pl-20ox">
            <div v-if="editor" class="note-format-buttons flex flex-row items-center justify-between text-size-18px py-5px px-5px dark:bg-black dark:bg-opacity-10">
                <div class="flex flex-row items-center">
                    <div>
                        <NPopover placement="bottom" trigger="hover">
                            <template #trigger>
                                <button
                                    class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer flex items-center"
                                    title="Headings"
                                    :class="{
                                        'is-active':
                                            editor.isActive('heading', { level: 1 }) ||
                                            editor.isActive('heading', { level: 2 }) ||
                                            editor.isActive('heading', { level: 3 }) ||
                                            editor.isActive('heading', { level: 4 }) ||
                                            editor.isActive('heading', { level: 5 }) ||
                                            editor.isActive('heading', { level: 6 })
                                    }"
                                >
                                    <i class="bx bx-heading -mr-5px"></i>
                                    <i class="bx bx-expand-alt rotate-135 transform !text-size-15px"></i>
                                </button>
                            </template>
                            <span class="outside-external-note-button flex flex-col whitespace-nowrap text-size-18px">
                                <button
                                    class="text-size-32px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 1 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                                >
                                    <i class="bx bx-heading"></i>1
                                </button>
                                <button
                                    class="text-size-28px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 2 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                                >
                                    <i class="bx bx-heading"></i>2
                                </button>
                                <button
                                    class="text-size-25px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 3 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                                >
                                    <i class="bx bx-heading"></i>3
                                </button>
                                <button
                                    class="text-size-20px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 4 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                                >
                                    <i class="bx bx-heading"></i>4
                                </button>
                                <button
                                    class="text-size-18px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 5 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
                                >
                                    <i class="bx bx-heading"></i>5
                                </button>
                                <button
                                    class="text-size-16px"
                                    @click="
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 6 })
                                            .run()
                                    "
                                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
                                >
                                    <i class="bx bx-heading"></i>6
                                </button>
                            </span>
                        </NPopover>
                    </div>
                    <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                    <div class="flex flex-row">
                        <button
                            title="Normal Text"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .setParagraph()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('paragraph') }"
                        >
                            <i class="bx bx-text"></i>
                        </button>
                        <button
                            title="Bold"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBold()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('bold') }"
                        >
                            <i class="bx bx-bold"></i>
                        </button>
                        <button
                            title="Italic"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleItalic()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('italic') }"
                        >
                            <i class="bx bx-italic"></i>
                        </button>
                        <button
                            title="Underline"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleUnderline()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('underline') }"
                        >
                            <i class="bx bx-underline"></i>
                        </button>
                        <button
                            title="Strike Through"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleStrike()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('strike') }"
                        >
                            <i class="bx bx-strikethrough"></i>
                        </button>
                    </div>
                    <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                    <div>
                        <button
                            title="Code Text"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleCode()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('code') }"
                        >
                            <i class="bx bx-code"></i>
                        </button>
                        <button
                            title="Code Block"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleCodeBlock()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('codeBlock') }"
                        >
                            <i class="bx bx-code-block"></i>
                        </button>
                    </div>
                    <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>

                    <div>
                        <button
                            title="Unordered List"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBulletList()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('bulletList') }"
                        >
                            <i class="bx bx-list-ul"></i>
                        </button>
                        <button
                            title="Ordered List"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleOrderedList()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('orderedList') }"
                        >
                            <i class="bx bx-list-ol"></i>
                        </button>

                        <button
                            title="Quote"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBlockquote()
                                    .run()
                            "
                            :class="{ 'is-active': editor.isActive('blockquote') }"
                        >
                            <i class="bx bxs-quote-left"></i>
                        </button>
                    </div>
                    <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                    <div>
                        <button
                            title="Undo"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .undo()
                                    .run()
                            "
                        >
                            <i class="bx bx-undo"></i>
                        </button>
                        <button
                            title="Redo"
                            @click="
                                editor
                                    .chain()
                                    .focus()
                                    .redo()
                                    .run()
                            "
                        >
                            <i class="bx bx-redo"></i>
                        </button>
                    </div>
                </div>
            </div>
            <EditorContent ref="note-editor" class="mx-10px h-[100%] overflow-auto overflowing-div" :editor="editor" />
        </div>
    </div>
    <div class="pt-15px">
        <NSpace justify="end">
            <NButton size="small" @click="closeModal()">
                Cancel
            </NButton>
            <NButton type="primary" size="small" @click="saveClipNote()">
                Add Clip Note
            </NButton>
        </NSpace>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { NRadioGroup, NSpace, NRadio, NButton, NAlert, NPopover } from "naive-ui";
import { useStore } from "vuex";
import { ipcRenderer } from "electron";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default defineComponent({
    components: {
        EditorContent,
        NRadioGroup,
        NSpace,
        NRadio,
        NButton,
        NAlert,
        NPopover
    },
    setup() {
        const store = useStore();
        const selectedVerse = computed(() => store.state.clipNotes.selectedVerse);
        const clipColorSelected = ref("default");
        const clipNoteInput = ref("");
        const alertShow = ref(false);
        const alertText = ref("");
        const editor = useEditor({
            content: "",
            extensions: [StarterKit, Underline, Placeholder],
            onUpdate: ({ editor }) => {
                const content = editor.getHTML();
                clipNoteInput.value = content;
                console.log(clipNoteInput.value);
            }
        });
        const clipColorOptions = [
            {
                value: "#3cb1ff",
                key: "blue",
                label: "Default",
                color: "#3cb1ff"
            },
            {
                value: "#ffb300",
                key: "orange",
                label: "Orange",
                color: "#ffb300"
            },
            {
                value: "#e57373",
                key: "red",
                label: "Red",
                color: "#e57373"
            },
            {
                value: "#63ff63",
                key: "green",
                color: "#63ff63"
            }
        ];

        const closeModal = () => {
            store.state.clipNotes.createClipNote = false;
        };

        const setAlert = (show: boolean, message: string): void => {
            alertShow.value = show;
            alertText.value = message;
        };

        onMounted(() => {
            if (selectedVerse.value.note) {
                editor.value?.commands.setContent(selectedVerse.value.note);
            }
        });

        return {
            editor,
            alertShow,
            alertText,
            clipNoteInput,
            selectedVerse,
            clipColorOptions,
            clipColorSelected,
            onSelectClipColor: (e: string) => {
                clipColorSelected.value = e;
            },
            closeModal,
            saveClipNote: () => {
                alertShow.value = false;
                if (clipNoteInput.value.replace(/<\/?[^>]+(>|$)/g, "") === "") {
                    setAlert(true, "It Seems that The note field is empty.");
                    return;
                }
                if (clipNoteInput.value === "" && clipNoteInput.value.replace(" ", "") === "") {
                    setAlert(true, "It Seems that The note field is empty.");
                    return;
                }

                const dataToAdd = {
                    color: clipColorSelected.value,
                    ...store.state.clipNotes.selectedVerse,
                    note: clipNoteInput.value
                };

                ipcRenderer
                    .invoke("addClipNote", dataToAdd)
                    .then(() => {
                        store.state.clipNotes.clipNotesInChapter[`${dataToAdd.b}_${dataToAdd.c}_${dataToAdd.v}`] = dataToAdd;
                        store.state.clipNotes.addedClipNote = dataToAdd;
                        closeModal();
                    })
                    .catch((e: Error) => console.log(e.message));
            }
        };
    }
});
</script>
<style lang="scss">
.asdf {
    color: #1d1d1d;
}
</style>