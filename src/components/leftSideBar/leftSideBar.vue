<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { saveScrollTopState, setScrollTopState } from "@/service/scrollService/scrollService";
import { NInput, NIcon } from "naive-ui";
import { Close } from "@vicons/carbon";

const store = useStore();
const searchBook = ref("");
const storeBible = computed(() => {
    if (searchBook.value != "") {
        return store.state.bible.bibleBooks.filter((book: any) => book.n.toLowerCase().includes(searchBook.value.toLowerCase()));
    }
    return store.state.bible.bibleBooks;
});
const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);
const chapterSelected = computed(() => store.state.bible.chapterSelected);
const bookSelectedChapterCount = computed(() => store.state.bible.bookSelectedChapterCount);
const bookSelected = computed(() => store.state.bible.bookSelected);

watch(selectedBookmark, async () => {
    await store.dispatch("getBookChaptersCount", { bible: store.state.bible.bible, book: store.state.bible.bookSelected });
    await store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });

    setTimeout(() => {
        saveScrollTopState("selected-active", 0, "bookSelectionScrollTop");
        setScrollTopState("book-selection-overflow", "bookSelectionScrollTop");

        saveScrollTopState("selected-active", 1, "chapterSelectionScrollTop");
        setScrollTopState("chapter-selection", "chapterSelectionScrollTop");
    }, 100);
});

onMounted(() => {
    setTimeout(() => {
        setScrollTopState("book-selection-overflow", "bookSelectionScrollTop");
        setScrollTopState("chapter-selection", "chapterSelectionScrollTop");
    }, 100);
});

const selectBook = async (number: number) => {
    store.state.bible.bookSelected = number;
    store.state.bible.chapterSelected = 1;
    await store.dispatch("getBookChaptersCount", { bible: store.state.bible.bible, book: store.state.bible.bookSelected });
    await store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });

    saveScrollTopState("selected-active", 0, "bookSelectionScrollTop");
    setScrollTopState("chapter-selection", "chapterSelectionScrollTop", 1);
    store.dispatch("setToggledClipNote", { b: number, c: 1 });
};
const selectChapter = async (number: number) => {
    store.state.bible.chapterSelected = number;
    await store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });
    saveScrollTopState("selected-active", 1, "chapterSelectionScrollTop");
    store.dispatch("setToggledClipNote", { b: bookSelected.value, c: number });
};
function setBookNumber(number: any) {
    return number < 9 ? "0" + number : number + "";
}
</script>

<template>
    <div class="h-[100%] flex select-none">
        <div class="book-selection w-[100%] flex flex-col">
            <div class="pb-7px">
                <NInput type="text" v-model:value="searchBook" size="large" :placeholder="$t('search_book').toUpperCase()">
                    <template #suffix>
                        <span v-show="searchBook != ''" class="cursor-pointer" @click="searchBook = ''">
                            <NIcon>
                                <Close />
                            </NIcon>
                        </span>
                    </template>
                </NInput>
            </div>
            <div class="book-selection-overflow h-[100%] overflow-y-auto overflowing-div pr-2">
                <div
                    v-for="book in storeBible"
                    :key="book.b"
                    class="book-selection-item py-5px mb-5px"
                    :class="{ 'selected-active text-light-50': book.b == bookSelected }"
                    @click="selectBook(book.b)"
                >
                    <span class="book-selection-item-number opacity-50">{{ setBookNumber(book.b) }}.</span> <span>{{ book.n }}</span>
                </div>
            </div>
        </div>
        <div class="chapter-selection overflow-y-auto w-80px overflowing-div">
            <div
                v-for="chapter in bookSelectedChapterCount"
                :key="chapter"
                class="chapter-selection-item text-center ml-7px py-5px"
                :class="{ 'selected-active text-light-50': chapter == chapterSelected }"
                @click="selectChapter(chapter)"
            >
                {{ chapter }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.book-selection,
.chapter-selection {
    @apply h-[100%] pl-1px pr-10px flex flex-col gap-2px;

    .book-selection-item,
    .chapter-selection-item {
        @apply cursor-pointer dark:bg-gray-200 dark:bg-opacity-0 bg-gray-700 bg-opacity-0 px-5px border border-gray-100 border-opacity-0;

        &.selected-active {
            @apply dark:bg-opacity-20 bg-opacity-20 font-700 border border-[var(--primaryColor)] bg-[var(--primaryColor)] rounded-md dark:text-dark-100;

            .book-selection-item-number {
                @apply opacity-100;
            }
        }

        &:hover {
            @apply dark:bg-opacity-10 bg-opacity-30;
        }
    }
}
</style>
