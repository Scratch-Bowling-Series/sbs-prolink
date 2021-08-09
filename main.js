const electron = require('electron');
const url = require('url');
const path = require('path');
const {globalShortcut} = require("electron");

const { app, BrowserWindow } = electron;

let loginWindow;
let { ipcMain } = electron;
let mainWindow, loadWindow = null;

let localUrl = 'http://127.0.0.1:8000';
let publicUrl = 'http://68.43.62.199:8000';


function getUrl()
{
	return 'http://scratchbowling.pythonanywhere.com'
}



app.on('ready', function () {
	loginWindow = new BrowserWindow({
		height: 500, width: 400,
		resizable: false,
		frame: false,
		backgroundColor: '#68b7ad',
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
	globalShortcut.register('CommandOrControl+E', () => {
		console.log('Electron loves global shortcuts!');
	});
	loginWindow.loadURL(getUrl() + '/prolink/updater/');
	loginWindow.once('ready-to-show', () => {
		loginWindow.show()
	})
});

ipcMain.on('resize', function (e, x, y) {
	loginWindow.setSize(x, y);
});

ipcMain.on('loadWindow', function (e) {

	if(loadWindow){
		loadWindow.focus(); //focus to new window
		return;
	}

	loadWindow = new BrowserWindow({//1. create new Window
		height: 200, width: 400,
		resizeable: false,
		frame: false,
		show: false,
		icon: __dirname + '/sbs.ico',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		}
	});
	globalShortcut.unregister('CommandOrControl+R');
	globalShortcut.unregister('CommandOrControl+D');
	globalShortcut.unregister('CommandOrControl+E');

	globalShortcut.register('CommandOrControl+R', () => {
		loadWindow.webContents.reload();
	});
	globalShortcut.register('CommandOrControl+D', () => {
		loadWindow.webContents.openDevTools();
	});
	globalShortcut.register('CommandOrControl+E', () => {
		console.log('Electron loves global shortcuts!');
	});
	loadWindow.center();
	loadWindow.loadURL(getUrl() + '/prolink/load/');

	loadWindow.once('ready-to-show', () => { //when the new window is ready, show it up
		loadWindow.show()
	})

	loadWindow.on('closed', function() { //set new window to null when we're done
		loadWindow = null
	})

	loginWindow.close(); //close the login window(the first window)
});

ipcMain.on('mainWindow', function (e) {

	if(mainWindow){
		console.log('Main window open');
		if(loadWindow)
		{
			loadWindow.close();
		}
		mainWindow.focus(); //focus to new window
		return;
	}

	mainWindow = new BrowserWindow({//1. create new Window
		height: 730, width: 900,
		minHeight: 730, minWidth: 1000,
		frame: false,
		show: false,
		icon: __dirname + '/sbs.ico',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			backgroundThrottling: false,
		}
	});
	globalShortcut.unregister('CommandOrControl+R');
	globalShortcut.unregister('CommandOrControl+D');
	globalShortcut.unregister('CommandOrControl+E');

	globalShortcut.register('CommandOrControl+R', () => {
		mainWindow.webContents.reload();
	});
	globalShortcut.register('CommandOrControl+D', () => {
		mainWindow.webContents.openDevTools();
	});
	globalShortcut.register('CommandOrControl+E', () => {
		console.log('Electron loves global shortcuts!');
	});
	mainWindow.center();
	mainWindow.loadURL(getUrl() + '/prolink/');

	mainWindow.once('ready-to-show', () => { //when the new window is ready, show it up
		mainWindow.show()
	})

	mainWindow.on('closed', function() { //set new window to null when we're done
		mainWindow = null
	})

	loadWindow.close(); //close the login window(the first window)
});

app.on('closed', function () {
	loginWindow = null;
	loadWindow = null;
});

app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (loginWindow === null) {
		createLoginWindow()
	}
})

ipcMain.on('loadMin', function (e) {
	if(loadWindow){
		loadWindow.focus(); //focus to new window
		return;
	}
	loadWindow = new BrowserWindow({//1. create new Window
		height: 200, width: 400,
		resizeable: false,
		frame: false,
		show: false,
		icon: __dirname + '/sbs.ico',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			backgroundThrottling: false,
		}
	});
	loadWindow.center();
	loadWindow.loadURL(getUrl() + '/prolink/load/background');
	loadWindow.on('closed', function() { //set new window to null when we're done
		loadWindow = null
	})
});

ipcMain.on('syncDone', function (e) {
	mainWindow.webContents.send('syncDone', true);
});

ipcMain.on('syncError', function (e) {
	mainWindow.webContents.send('syncError', true);
});





const {autoUpdater } = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
app.on('ready', function()  {
	autoUpdater.checkForUpdates();
});
autoUpdater.on('update-available', (info) => {
	loginWindow.webContents.send('UpdateFound', true);
});
autoUpdater.on('update-not-available', (info) => {
	loginWindow.webContents.send('NoUpdate', true);
});
autoUpdater.on('error', (err) => {
	loginWindow.webContents.send('Error', true);
});
autoUpdater.on('update-downloaded', (info) => {
	loginWindow.webContents.send('Downloaded', true);
});

ipcMain.on('QuitInstallUpdate', function (e) {
	autoUpdater.quitAndInstall();
});