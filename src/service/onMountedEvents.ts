import session from "@/service/session";
import { setStore } from "./onMountedEvents/SetStore";
import { getBibleVersionsResult, getBookChaptersCountResult, getBookInChapterResult, resultBibleBooks } from "./ipcRendererOn/ipcBibleOnEvents";
import { ipcRenderer } from "electron";

// eslint-disable-next-line
export const setReadBiblePage = async (store: any = null): Promise<void> => {
    setStore(store);
    const storedSelectedVersions = session.get("storedSelectedVersions");
    if (!storedSelectedVersions) {
        session.set("storedSelectedVersions", ["t_kjv", "t_asv"]);
    }

    session.set("viewChapterComponentLeftSideWidth", 1600);
    session.set("readBibleLeftSideBarWidth", 400);

    ipcRenderer.on("resultBibleBooks", (event, result) => resultBibleBooks(event, result));
    ipcRenderer.on("getBookChaptersCountResult", (event, result) => getBookChaptersCountResult(event, result));
    ipcRenderer.on("getBookInChapterResult", (event, result) => getBookInChapterResult(event, result));
    ipcRenderer.on("getBibleVersionsResult", (event, result) => getBibleVersionsResult(event, result));

    ipcRenderer.send("getBibleBooks");
    await store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });
    await store.dispatch("getBibleVersions", { getInStore: false });
};
