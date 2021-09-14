import { HighlightMarkerEvent } from "./ipcRendererEvents/HighlightMarkerEvents";
import { getVersesInBookmarkResult } from "./ipcRendererEvents/ipcRendererBookmarkEvents";
import session from "@/service/session/session";
import { getBibleVersionsResult, getBookChaptersCountResult, getBookInChapterResult, resultBibleBooks } from "./ipcRendererEvents/ipcBibleOnEvents";
import { ipcRenderer } from "electron";
import { localStorageThemeKey } from "./ThemeChangeService";

export const onMountedRendererEvents = async (store: any = null): Promise<void> => {
    if (session.get(localStorageThemeKey)) store.state.dark = session.get(localStorageThemeKey) === "light" ? false : true;
    if (session.get("bookSelected")) store.state.bible.bookSelected = session.get("bookSelected");
    if (session.get("chapterSelected")) store.state.bible.chapterSelected = session.get("chapterSelected");

    const storedSelectedVersions = session.get("storedSelectedVersions");
    if (!storedSelectedVersions) {
        session.set("storedSelectedVersions", ["t_kjv", "t_asv"]);
    }

    if (!session.get("webFrameZoom")) {
        session.set("webFrameZoom", 0.95);
    }

    // ON EVENTS
    ipcRenderer.on("resultBibleBooks", (event, result) => resultBibleBooks(event, result));
    ipcRenderer.on("getBookChaptersCountResult", (event, result) => getBookChaptersCountResult(event, result));
    ipcRenderer.on("getBookInChapterResult", (event, result) => getBookInChapterResult(event, result));
    ipcRenderer.on("getBibleVersionsResult", (event, result) => getBibleVersionsResult(event, result));
    ipcRenderer.on("getVersesInBookmarkResult", (event, result) => getVersesInBookmarkResult(event, result));
    HighlightMarkerEvent();

    // SEND EVENTS
    ipcRenderer.send("getBibleBooks");

    // DISPATCH EVENTS
    await store.dispatch("getBookChaptersCount", { bible: store.state.bible.bible, book: store.state.bible.bookSelected });
    await store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });
    await store.dispatch("getBibleVersions", { getInStore: false });
};