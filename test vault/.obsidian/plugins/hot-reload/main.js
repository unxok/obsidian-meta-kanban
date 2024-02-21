const { Plugin, Notice } = require("obsidian");
const fs = require("fs");

const watchNeeded =
	window.process.platform !== "darwin" && window.process.platform !== "win32";

module.exports = class HotReload extends Plugin {
	statCache = new Map(); // path -> Stat

	onload() {
		this.app.workspace.onLayoutReady(this._onload.bind(this));
	}

	async _onload() {
		this.pluginReloaders = {};
		this.inProgress = null;
		await this.getPluginNames();
		this.reindexPlugins = this.debouncedMethod(500, this.getPluginNames);
		this.registerEvent(
			this.app.vault.on("raw", this.onFileChange.bind(this)),
		);
		this.watch(".obsidian/plugins");
		await this.checkVersions();
		this.addCommand({
			id: "scan-for-changes",
			name: "Check plugins for changes and reload them",
			callback: () => this.checkVersions(),
		});
	}

	watch(path) {
		if (this.app.vault.adapter.watchers.hasOwnProperty(path)) return;
		const realPath = [this.app.vault.adapter.basePath, path].join("/");
		const lstat = fs.lstatSync(realPath);
		if (
			lstat &&
			(watchNeeded || lstat.isSymbolicLink()) &&
			fs.statSync(realPath).isDirectory()
		) {
			this.app.vault.adapter.startWatchPath(path, false);
		}
	}

	async checkVersions() {
		const base = this.app.plugins.getPluginFolder();
		for (const dir of Object.keys(this.pluginNames)) {
			for (const file of [
				"manifest.json",
				"main.js",
				"styles.css",
				".hotreload",
			]) {
				const path = `${base}/${dir}/${file}`;
				const stat = await app.vault.adapter.stat(path);
				if (stat) {
					if (
						this.statCache.has(path) &&
						stat.mtime !== this.statCache.get(path).mtime
					) {
						this.onFileChange(path);
					}
					this.statCache.set(path, stat);
				}
			}
		}
	}

	async getPluginNames() {
		const plugins = {},
			enabled = new Set();
		for (const { id, dir } of Object.values(app.plugins.manifests)) {
			this.watch(dir);
			plugins[dir.split("/").pop()] = id;
			if (
				(await this.app.vault.exists(dir + "/.git")) ||
				(await this.app.vault.exists(dir + "/.hotreload"))
			)
				enabled.add(id);
		}
		this.pluginNames = plugins;
		this.enabledPlugins = enabled;
	}

	onFileChange(filename) {
		if (!filename.startsWith(this.app.plugins.getPluginFolder() + "/"))
			return;
		const path = filename.split("/");
		const base = path.pop(),
			dir = path.pop();
		if (path.length === 1 && dir === "plugins") return this.watch(filename);
		if (path.length != 2) return;
		const plugin = dir && this.pluginNames[dir];
		if (
			base === "manifest.json" ||
			base === ".hotreload" ||
			base === ".git" ||
			!plugin
		)
			return this.reindexPlugins();
		if (base !== "main.js" && base !== "styles.css") return;
		if (!this.enabledPlugins.has(plugin)) return;
		const reloader =
			this.pluginReloaders[plugin] ||
			(this.pluginReloaders[plugin] = this.debouncedMethod(
				750,
				this.requestReload,
				plugin,
			));
		reloader();
	}

	requestReload(plugin) {
		const next = (this.inProgress = this.reload(plugin, this.inProgress));
		next.finally(() => {
			if (this.inProgress === next) this.inProgress = null;
		});
	}

	async reload(plugin, previous) {
		const plugins = this.app.plugins;
		try {
			// Wait for any other queued/in-progress reloads to finish
			await previous;
			await plugins.disablePlugin(plugin);
			console.debug("disabled", plugin);
			// Ensure sourcemaps are loaded (Obsidian 14+)
			const oldDebug = localStorage.getItem("debug-plugin");
			localStorage.setItem("debug-plugin", "1");
			try {
				await plugins.enablePlugin(plugin);
			} finally {
				// Restore previous setting
				if (oldDebug === null) localStorage.removeItem("debug-plugin");
				else localStorage.setItem("debug-plugin", oldDebug);
			}
			console.debug("enabled", plugin);
			new Notice(`Plugin "${plugin}" has been reloaded`);
		} catch (e) {
			console.log("error in hot reloading: ", e);
		}
	}

	debouncedMethod(ms, func, ...args) {
		var timeout;
		return () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				func.apply(this, args);
			}, ms);
		};
	}
};
