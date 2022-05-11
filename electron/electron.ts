// electron/electron.js
const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = process.env.IS_DEV == "true" ? true : false;
const { ipcMain, session } = require('electron')
const os = require('os')

function createWindow() {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: false,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.ts'),
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );

    // Open the DevTools in development mode
    if (isDev) mainWindow.webContents.openDevTools();

    // Main process
    ipcMain.handle('sample-handle', async (event, someArgument) => {
        const result = "This is the return result";
        return result
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    if (isDev) {// on macOS
        const reactDevToolsPath = path.join(
            os.homedir(),
            '/AppData/local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.21_0'
        )
        // C:\Users\Admin\AppData\Local\Google\Chrome\User Data\Default\Extensions\ljjemllljcmogpfapbkkighbhhppjdbg
        await session.defaultSession.loadExtension(reactDevToolsPath)
    }
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});