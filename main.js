const electron = require('electron');
const { app, ipcMain } = electron;
const createUpdateWindow = require('./main/update-process');
const createMainWindow = require('./main/main-process');
const log = require("electron-log");
require('dotenv').config();


log.info('App starting...');
app.on('ready', ()=>{
	log.info('Starting Updater Process');
	createUpdateWindow();
})
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});
