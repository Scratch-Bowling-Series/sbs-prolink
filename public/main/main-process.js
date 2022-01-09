const electron = require('electron');
const {globalShortcut, BrowserWindow} = electron;


const mainProcessUrl = 'http://localhost:3000';
let mainWindow = null;


const createMainWindow = () => {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('CommandOrControl+D');
    mainWindow = new BrowserWindow({//1. create new Window
        height: 730, width: 900,
        minHeight: 730, minWidth: 1000,
        frame: false,
        backgroundColor: '#212121',
        show: false,
        icon: __dirname + '/sbs.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundThrottling: false,
            webSecurity: false//development
        }
    });

    globalShortcut.register('CommandOrControl+R', () => {
        mainWindow.webContents.reload();
    });
    globalShortcut.register('CommandOrControl+D', () => {
        mainWindow.webContents.openDevTools();
    });
    mainWindow.center();
    mainWindow.loadURL(mainProcessUrl).then(() => {
        mainWindow.show();
    }).catch((error)=>{
        console.log(error);
    });
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}


module.exports = createMainWindow;