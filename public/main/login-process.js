const electron = require('electron');
const createMainWindow = require("./main-process");
const {create} = require("electron-log");
const {globalShortcut, BrowserWindow, ipcMain} = electron;


let loginWindow = null;

const destroyLoginWindow = () => {
    if(!loginWindow) return;
    loginWindow.close();
    loginWindow = null;
}

const showLoginWindow = () => {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('CommandOrControl+D');
    loginWindow = new BrowserWindow({
        height: 500, width: 400,
        resizable: false,
        frame: false,
        backgroundColor: '#212121',
        icon: __dirname + '/sbs.ico',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    globalShortcut.register('CommandOrControl+R', () => {
        loginWindow.webContents.reload();
    });
    globalShortcut.register('CommandOrControl+D', () => {
        loginWindow.webContents.openDevTools();
    });
    loginWindow.loadFile('./public/login.html').then(()=>{
        loginWindow.show();
    }).catch((error) => {
        console.log(error);
    });
}

ipcMain.on('login-complete',()=>{
    createMainWindow();
    destroyLoginWindow();
});

module.exports = showLoginWindow;