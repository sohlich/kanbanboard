// ./main.js
const { app, BrowserWindow } = require('electron');

let win = null;

app.on('ready', function() {

    var path = require('path');
    var url = require('url');


    // Specify entry point
    var openWindow = function() {
        mainWindow = new BrowserWindow({ width: 1280, height: 960 });
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));

        mainWindow.webContents.openDevTools();
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    };

    var startUp = function() {
        console.log('server started!');
        openWindow();
    };

    // fire!
    startUp();
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});