const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require('path');
const { channels } = require('../shared/constants')
let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  let loading = true;
  mainWindow = new BrowserWindow({
    width: "100%",
    height: "100%",
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();

  const fetchLocalHostAfter1s = () => {
    fetch("http://localhost:3000")
      .then((res) => {
        if (res.ok) {
          loading = false;
          mainWindow.loadURL("http://localhost:3000");
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const checkLoading = setInterval(() => {
    if (loading) {
      fetchLocalHostAfter1s();
    } else {
      clearInterval(checkLoading);
    }
  }, 1000);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  ipcMain.on(channels.LOGIN, (event, arg) => {
    mainWindow.setSize(width, height, true)
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

