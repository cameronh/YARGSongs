const { app, BrowserWindow, ipcMain, dialog, Notification } = require('electron');
import electronDl from 'electron-dl';
import { download, CancelError } from 'electron-dl';
const axios = require('axios');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

electronDl();

let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('fetch-data', async (event, url, postData) => {
  try {
    console.log(postData);
    const response = await axios.post(url, postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('download-file', async (event, fileUrl) => {
  const url = "https://rhythmverse.co" + fileUrl;
  const win = BrowserWindow.getFocusedWindow();
  try {
    console.log(await download(win, url));
    new Notification({
      title: 'Download Complete',
      body: url,
    }).show()
  } catch (error) {
    new Notification({
      title: 'Error',
      body: error,
    }).show()
    if (error instanceof CancelError) {
      console.info('item.cancel() was called');
    } else {
      console.error(error);
    }
  }
});