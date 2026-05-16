const {
	app,
	BrowserWindow,
	Tray,
	Menu,
	globalShortcut,
	screen,
	ipcMain,
	shell,
	nativeTheme,
} = require("electron");
const path = require("path");
const Store = require("electron-store");



const store = new Store();
let tray, mainWindow;
const iconPath = path.join(__dirname, "icon.png");
const appName = "Google Messages for Linux";

function exec(code) {
	return mainWindow.webContents.executeJavaScript(code).catch(console.error);
}

function createWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const winWidth = store.get(
		"windowWidth",
		800,
	);
	const winHeight = store.get(
		"windowHeight",
		60,
	);

	mainWindow = new BrowserWindow({
		width: winWidth,
		height: winHeight,
		x: store.get("windowX"),
		y: store.get("windowY"),
		backgroundColor: (nativeTheme.shouldUseDarkColors ? "#1c1c1c" : "#ffffff"),
		frame: true,
		icon: iconPath,
		menuBarVisibile: false,
		resizable: true,
		show: false,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
		},
	});

	mainWindow.loadURL("https://messages.google.com/web/conversations");

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

	mainWindow.on("close", (event) => {
		if (!app.isQuitting) {
			event.preventDefault();
			mainWindow.hide();
		}
	});

	mainWindow.on("resize", () => {
		const [width, height] = mainWindow.getSize();
		store.set("windowWidth", width);
		store.set("windowHeight", height);
	});

	mainWindow.on("move", () => {
		const [x, y] = mainWindow.getPosition();
		store.set("windowX", x);
		store.set("windowY", y);
	});

	setupNotifications();
}

function setupNotifications() {
	exec(`
		const originalNotification = Notification;
		Notification = function(title, options) {
			const notification = new originalNotification(title, options);
			notification.addEventListener('click', () => {
				window.postMessage({ type: 'NOTIFICATION_CLICK' }, '*');
			});
			return notification;
		};
		Notification.requestPermission = originalNotification.requestPermission;
		Notification.permission = originalNotification.permission;
	`);

	mainWindow.webContents.on("ipc-message", (event, channel) => {
		if (channel === "NOTIFICATION_CLICK") {
			mainWindow.show();
			mainWindow.focus();
		}
	});
}

function toggleWindow() {
	if (mainWindow.isVisible()) mainWindow.hide();
	else {
		mainWindow.show();
		mainWindow.focus();
	}
}

function createTray() {
	tray = new Tray(iconPath);
	const contextMenu = Menu.buildFromTemplate([
		{ role: "about" },
		{ label: "Check for Updates", click: checkForUpdates },
		{ type: "separator" },
		{ label: "Show/Hide Window", click: toggleWindow },
		{ type: "separator" },
		{ role: "reload" },
		{ role: "forceReload" },
		{ role: "toggleDevTools" },
		{ type: "separator" },
		{
			label: "Quit",
			click: () => {
				app.isQuitting = true;
				app.quit();
			},
		},
	]);
	tray.setToolTip(appName);
	tray.setContextMenu(contextMenu);
	tray.on("click", toggleWindow);
}

function setupShortcuts() {
	globalShortcut.register("CommandOrControl+Shift+M", toggleWindow);
}
function checkForUpdates() {
	shell.openExternal("https://github.com/aaronfury/google-messages-app-for-linux/releases");
}

app.whenReady().then(() => {
	createWindow();
	createTray();
	setupShortcuts();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
		else mainWindow.show();
	});

});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
	app.isQuitting = true;
});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

nativeTheme.on("updated", () => {
	mainWindow.setBackgroundColor(
		nativeTheme.shouldUseDarkColors ? "#1c1c1c" : "#ffffff",
	);
});

ipcMain.handle("get-local-storage", (event, key) => {
	return store.get(key);
});

ipcMain.on("set-local-storage", (event, key, value) => {
	store.set(key, value);
});


app.setAboutPanelOptions({
	applicationName: appName,
	applicationVersion: app.getVersion(),
	copyright: "No copyright. This is free under CC0.",
	credits: "Created by markeglseder, tweaked by aaronfury",
	iconPath: iconPath,
});