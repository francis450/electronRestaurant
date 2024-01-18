const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  let loading = true;
  mainWindow = new BrowserWindow({
    width: "100%",
    height: "100%",
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const fetchLocalHostAfter1s = () => {
    fetch("http://localhost:3000")
      .then((res) => {
        if (res.ok) {
          loading = false;
          mainWindow.loadURL("http://localhost:3000");
          console.log("ok - page loaded successfully");
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
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
