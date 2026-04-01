const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess;
let mainWindow;
let splash;

try {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
} catch (e) {}

function createSplash() {
  splash = new BrowserWindow({
    width: 420,
    height: 320,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    icon: path.join(__dirname, 'favicon.ico')
  });
  splash.loadFile(path.join(__dirname, 'splash.html'));
}

function createMainWindow() {
  if (mainWindow) return;
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    icon: path.join(__dirname, 'favicon.ico'),
    show: true
  });
  mainWindow.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
  if (splash) splash.close();
}

app.whenReady().then(() => {
  createSplash();
  const backendPath = path.join(__dirname, 'backend', 'server.js');
  backendProcess = spawn(process.execPath, [backendPath]);
  backendProcess.stdout.on('data', (data) => {
    const msg = data.toString();
    if (msg.includes('Server running')) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
