import { MarkdownRenderer, Notice, Plugin } from "obsidian";

import React from "react";
import { createRoot } from "react-dom/client";

import { defaultSettings, TSettings } from "@/settings";
import { MyObsidianPluginSettingsTab } from "@/settings-tab";
import { loadData } from "@/saveload";

import { App } from "@/components/App";

export default class MyObsidianPlugin extends Plugin {
	settings: TSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new MyObsidianPluginSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(
			"meta-kanban",
			async (s, e, i) => {
				//let data = loadData(s);
				const dv = this.getDv();
				const metaEdit = this.getMetaEdit();
				e.empty();
				const root = createRoot(e);
				root.render(
					// strict mode doesn't play nice with Obsidian's api unfortuntately
					// <React.StrictMode>
					<App
						//data={data}
						text={s}
						// getSectionInfo={() => i.getSectionInfo(e)}
						// settings={this.settings}
						app={this.app}
						plugin={this}
						dv={dv}
						metaEdit={metaEdit}
					/>,
					// </React.StrictMode>,
				);
			},
		);

		this.addCommand({
			id: `insert meta kanban board`,
			name: `Insert Meta Kanban Board`,
			editorCallback: (e, _) => {
				// prompts/modals here...
				e.replaceSelection("```meta-kanban\n```\n");
			},
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	getDv() {
		// @ts-ignore forbidden app usage :)
		const dv = app.plugins.plugins.dataview;
		if (!dv) {
			new Notice(
				"Dataview plugin not found. Please install and enable it, then try again",
			);
			return null;
		}
		// await dv.api.index.reinitialize();
		return dv.api;
	}

	getMetaEdit() {
		// @ts-ignore forbidden app usage :)
		const metaEdit = app.plugins.plugins.metaedit;
		if (!metaEdit) {
			new Notice(
				"MetaEdit plugin not found. Please install and enable it, then try again",
			);
			return null;
		}
		return metaEdit.api;
	}
}
