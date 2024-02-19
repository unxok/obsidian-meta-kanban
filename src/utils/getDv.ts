import { Notice } from "obsidian";

export const getDv = () => {
	try {
		// @ts-ignore
		const dv = app.plugins.plugins.dataview.api;
		return dv;
	} catch (e) {
		new Notice(
			"Dataview Plugin Not Found. Please install & enable and reload this plugin",
		);
		return null;
	}
};
