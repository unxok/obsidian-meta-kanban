import { Plugin } from "obsidian";

import React from "react";
import { createRoot } from "react-dom/client";

import { defaultSettings, TSettings } from "@/settings";
import { MyObsidianPluginSettingsTab } from "@/settings-tab";
import { loadData } from "@/saveload";

import App from "@/components/App";

export default class MyObsidianPlugin extends Plugin {
	settings: TSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new MyObsidianPluginSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(
			"my-obsidian-plugin",
			(s, e, i) => {
				let data = loadData(s);
				e.empty();
				const root = createRoot(e);
				root.render(
					<React.StrictMode>
						<App
							data={data}
							getSectionInfo={() => i.getSectionInfo(e)}
							settings={this.settings}
							app={this.app}
						/>
					</React.StrictMode>
				);
			}
		);

		this.addCommand({
			id: `insert`,
			name: `Insert My Plugin`,
			editorCallback: (e, _) => {
				e.replaceSelection("```my-obsidian-plugin\n```\n");
			},
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
