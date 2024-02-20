import { Notice } from "obsidian";
import { useEffect, useState } from "react";

export const useDv = () => {
	const [dv, setDv] = useState(null);

	useEffect(() => {
		console.log("getting dv...");
		const getDv = async () => {
			try {
				// @ts-ignore
				const fetchedDv = app.plugins.plugins.dataview.api;
				console.log("got dv!");
				setDv(fetchedDv);
			} catch (e) {
				new Notice(
					"Dataview Plugin Not Found. Please install & enable and reload this plugin",
				);
				setDv(null);
			}
		};

		getDv();
	}, []);
	return dv;
};
