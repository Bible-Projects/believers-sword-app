<script setup lang="ts">
import Split from "split.js";
import { computed, watch, onMounted } from "vue";
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import SearchTab from "./Search/Search.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue";
import { useStore } from "vuex";
import RightSideMenuBar from "@/components/ReadBiblePageComponents/RightSide/rightSideMenuBar/rightSideMenuBar.vue";
import MarkedHighlights from "./MarkedHighlights/MarkedHighlights.vue";
import ShowClipNotes from "./showClipNotes/showClipNotes.vue";
import Dictionary from "./Dictionary/Dictionary.vue";
import { useRightSideMenuTabs } from "@/store/ReadBibleRightSideStates";
import { storeToRefs } from "pinia";

const rightSideMenuTabStore = useRightSideMenuTabs();
const { rightSideBottomSelectedTab, toggleDictionaryBoxRightSide } = storeToRefs(rightSideMenuTabStore);
const store = useStore();
const tabValue = computed(() => store.state.rightMenuTab);

onMounted(() => {
    /** START :::: splitter on the right side */
    const rightSideColumnSplitSizes = localStorage.getItem("right-side-column-split-sizes");
    let initialSizeForRightSideSplit = [100, 0];

    if ((rightSideColumnSplitSizes && rightSideColumnSplitSizes == null) || !rightSideColumnSplitSizes) {
        localStorage.setItem("right-side-column-split-sizes", JSON.stringify([100, 0]));
        initialSizeForRightSideSplit = [100, 0];
    }

    if (rightSideColumnSplitSizes && JSON.parse(rightSideColumnSplitSizes) && JSON.parse(rightSideColumnSplitSizes)[1] > 0) {
        toggleDictionaryBoxRightSide.value = true;
        initialSizeForRightSideSplit = JSON.parse(rightSideColumnSplitSizes);
    }

    let rightSideSplitDiv = Split(["#right-side-top-split-div", "#right-side-bottom-split-div"], {
        direction: "vertical",
        minSize: [200, 20],
        sizes: initialSizeForRightSideSplit,
        snapOffset: 20,
        gutterStyle: () => {
            return {
                height: `0px`,
            };
        },
        onDrag: (sizes) => {
            if (sizes[1] < 5) {
                toggleDictionaryBoxRightSide.value = false;
            } else {
                toggleDictionaryBoxRightSide.value = true;
            }
        },
        elementStyle: (dimension, size) => {
            return {
                height: `${size}%`,
            };
        },
        onDragEnd: (sizes) => {
            localStorage.setItem("right-side-column-split-sizes", JSON.stringify(sizes));
            localStorage.setItem("right-side-split-sizes-vertical-open-sizes", JSON.stringify(sizes));
        },
    });

    document.getElementById("right-side-dictionary-click-to-expand")?.addEventListener("click", () => {
        if (toggleDictionaryBoxRightSide.value) {
            toggleDictionaryBoxRightSide.value = false;

            rightSideSplitDiv.setSizes([100, 0]);
            localStorage.setItem("right-side-column-split-sizes", JSON.stringify([100, 0]));
        } else {
            toggleDictionaryBoxRightSide.value = true;
            const vertical: any = localStorage.getItem("right-side-split-sizes-vertical-open-sizes");
            if (vertical && JSON.parse(vertical)[1] < 10) {
                rightSideSplitDiv.setSizes([50, 50]);
                localStorage.setItem("right-side-column-split-sizes", JSON.stringify([50, 50]));
                return;
            }
            rightSideSplitDiv.setSizes(vertical ? JSON.parse(vertical) : [50, 50]);
            localStorage.setItem("right-side-column-split-sizes", vertical);
        }
    });

    window.addEventListener("resize", () => {
        if (rightSideSplitDiv.getSizes()[1] < 10) {
            rightSideSplitDiv.collapse(1);
        }
    });

    /** END :::: splitter on the right side */
});

watch(rightSideBottomSelectedTab, () => {
    document.getElementById("right-side-dictionary-click-to-expand")?.click();
});
</script>
<template>
    <div id="right-side-bar" class="h-[100%] w-[100%] dark:bg-black dark:bg-opacity-20 bg-gray-200">
        <RightSideMenuBar />
        <div class="h-[100%] w-[100%] split !flex !flex-col relative">
            <div id="right-side-top-split-div" class="h-[100%] pb-10px">
                <SearchTab v-if="tabValue === 'searchTab'" />
                <SelectBibleVersions v-if="tabValue === 'versionsTab'" />
                <Bookmarks v-show="tabValue === 'bookmarksTab'" />
                <MarkedHighlights v-show="tabValue === 'MarkedHighlights'" />
                <ShowClipNotes v-show="tabValue === 'MyNotes'" />
            </div>

            <div id="right-side-bottom-split-div" class="h-[100%]">
                <div id="right-side-dictionary-click-to-expand"
                    class="p-2px cursor-pointer w-[100%] dark:bg-gray-700 bg-gray-400 bg-opacity-30 flex justify-center items-center flex items-center duration-200 active:bg-[var(--primaryColor)] dark:hover:bg-gray-600 hover:bg-gray-300 h-25px">
                    {{ $t("dictionary") }}
                </div>
                <Dictionary />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#right-side-bar {
    --right-side-tab-height: 40px;
}
</style>
