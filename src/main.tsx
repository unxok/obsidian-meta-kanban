import { MarkdownRenderer, Plugin } from "obsidian";

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

		this.registerMarkdownCodeBlockProcessor("meta-kanban", (s, e, i) => {
			//let data = loadData(s);
			e.empty();
			const root = createRoot(e);
			root.render(
				// strict mode doesn't play nice with Obsidian's api unfortuntately
				// <React.StrictMode>
				<App
					//data={data}
					text={s}
					getSectionInfo={() => i.getSectionInfo(e)}
					settings={this.settings}
					app={this.app}
					plugin={this}
				/>,
				// </React.StrictMode>,
			);
		});

		this.addCommand({
			id: `insert`,
			name: `Insert My Plugin`,
			editorCallback: (e, _) => {
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

	async renderMarkdown(markdown: string) {
		// Create a temporary div to hold the rendered HTML
		const tempDiv = createDiv();
		// Use Obsidian's MarkdownRenderer to render the markdown to our div
		await MarkdownRenderer.render(this.app, markdown, tempDiv, "/", this);
		// Now, `tempDiv` contains the rendered HTML. You can insert it into the DOM or use it as needed.
		console.log(tempDiv.innerHTML);
		// Cleanup if you're done with the div
		tempDiv.remove();
	}
}
