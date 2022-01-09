const electron = require('electron');
const {globalShortcut, BrowserWindow} = electron;
const createLoginWindow = require('./login-process');
const createMainWindow = require('./main-process')
const authService = require('../services/auth-services');
const {autoUpdater} = require("electron-updater");
const log = require("electron-log");

let updaterWindow = null;


const validateUserToken = async () =>{
    try{
        log.info('Validating User Token');
        await authService.validateUserToken();
        return createMainWindow();
    }catch (error){
        log.info('Starting Login Process');
        createLoginWindow();
    }
}

const destroyUpdaterWindow = () => {
    if(!updaterWindow) return;
    updaterWindow.close();
    updaterWindow = null;
}

const showUpdaterWindow = () => {
    // configure the auto updater
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';

    // create updater browser window
    updaterWindow = new BrowserWindow({
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

    // set global shortcuts to updater window
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('CommandOrControl+D');
    globalShortcut.register('CommandOrControl+R', () => {
        updaterWindow.webContents.reload();
    });
    globalShortcut.register('CommandOrControl+D', () => {
        updaterWindow.webContents.openDevTools();
    });
    //load updater window
    updaterWindow.loadFile('./public/updater.html').then(() => {
        updaterWindow.show();
        autoUpdater.checkForUpdates();
    }).catch((error) => {
        console.log(error);
    });

    //auto updater events
    autoUpdater.on('update-available', (info) => {
        updaterWindow.webContents.send('UpdateFound', true);
    });
    autoUpdater.on('update-not-available', (info) => {
        updaterWindow.webContents.send('NoUpdate', true);
        setTimeout(()=>{
            validateUserToken().then(()=>{
                destroyUpdaterWindow();
            });
        }, 2000);
    });
    autoUpdater.on('error', (err) => {
        updaterWindow.webContents.send('Error', true);
        setTimeout(()=>{
            validateUserToken().then(()=>{
                destroyUpdaterWindow();
            });
        }, 2000);
    });
    autoUpdater.on('update-downloaded', (info) => {
        updaterWindow.webContents.send('Downloaded', true);
        setTimeout(() => {
            autoUpdater.quitAndInstall();
        }, 2000);
    });

    //updater window events
    updaterWindow.on('closed', function() {
        updaterWindow = null
    });
}


module.exports = showUpdaterWindow;