'use strict'

import { app, clipboard, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import fs from 'fs'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const acfunWindowCss = `
* {
  pointer-events: none !important;
}
body {
  width: 840px !important;
  overflow: hidden !important;
}
#main .wp {
  width:800px !important;
}
#pagelet_header, #main>section>.clearfix.wp.area.head, #main .fr, #pagelet_toolbar {
  display: none !important;
}
`;

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 860,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      devTools: isDevelopment,
    },
    resizable: false
  })
    // winSc.hide();
  let winSc = null;
  ipcMain.on('load-acfun', (event, url) => {
    winSc = new BrowserWindow({
      width: 840,
      height: 376,
      webPreferences: {
        preload: path.join(__dirname, 'acfun-preload.js'),
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        devTools: isDevelopment,
      },
      resizable: false
    })
    winSc.loadURL(url);
    winSc.setEnabled(false);
    winSc.webContents.on('did-finish-load', ()=>{
      winSc.webContents.executeJavaScript('window.electronAPI.onLoadAcfun();');
    });
    winSc.webContents.insertCSS(acfunWindowCss);
  });
  
  win.webContents.send('multiev');
  ipcMain.on('load-acfun-finish', async () => {
    try {
      await new Promise(res=>setTimeout(res,200));
      const nativeImage = await winSc.webContents.capturePage();
      const buffer = nativeImage.toPNG();
      await new Promise(res=>setTimeout(res,200));
      winSc.close();
      win.webContents.send('load-acfun-callback', {success: true, data: buffer.toString('base64')});
    } catch (e) {
      win.webContents.send('load-acfun-callback', {success: false, data: e.message});
    }
  });

  ipcMain.on('down-agn-image', async () => {
    await new Promise(res=>setTimeout(res,200));
    const nativeImage = await win.capturePage({x: 0, y:0, width: 840, height: 376});
    const buffer = nativeImage.toPNG();
    
    const downloadsPath = path.join(app.getPath('downloads'), `agn-${Date.now()}.png`);
    const file = await dialog.showSaveDialog(win, {
      title: "保存图片",
      defaultPath : downloadsPath,
      buttonLabel : "保存",
      filters :[
       {name: '图片', extensions: ['png']},
       {name: '所有文件', extensions: ['*']}
      ]
     })

     const filepath = file.filePath.toString();
     fs.writeFile(filepath, buffer, 'binary', (err)=>{
      win.webContents.send('down-agn-image-callback', {success: !err, data: filepath});
     });
  });

  ipcMain.on('copy-agn-image', async () => {
    await new Promise(res=>setTimeout(res,500));
    const nativeImage = await win.capturePage({x: 0, y:0, width: 840, height: 376});
    clipboard.writeImage(nativeImage);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
