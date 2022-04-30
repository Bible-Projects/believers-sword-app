// import { ipcRenderer } from 'electron';
// const apiFunctions = require("./apiFunctions.ts")

// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        doThing: () => ipcRenderer.invoke('sample-handle')
    }
)