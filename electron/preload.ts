// Preload (Isolated World)
export const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        doThing: () => ipcRenderer.invoke('sample-handle')
    }
)