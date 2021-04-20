const { app, BrowserWindow, shell } = require('electron')

// setup auto updates
require('update-electron-app')()

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      devTools: true,
      contextIsolation: true,
      sandbox: true,
    }
  })

  win.loadURL("https://bitclout.com");

  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  win.webContents.on('new-window', function(e, url) {
    if (url.startsWith('https://identity.bitclout.com/')) {
      return;
    }

    e.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
