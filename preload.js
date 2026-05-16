const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	getLocalStorage: (key) => ipcRenderer.invoke("get-local-storage", key),
	setLocalStorage: (key, value) =>
		ipcRenderer.send("set-local-storage", key, value),
	onNotificationClick: (callback) => {
		window.addEventListener("message", (event) => {
			if (event.data.type === "NOTIFICATION_CLICK") {
				callback();
			}
		});
	},
});