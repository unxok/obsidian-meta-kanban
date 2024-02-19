import React, { useEffect } from "react";
import { App, Modal } from "obsidian";

type InfoModalProps = {
	app: App;
	title: string;
	paragraph: string;
	callback?: (contentEl: HTMLElement) => void;
	detailsHandler: React.Dispatch<React.SetStateAction<boolean>>;
};
export const InfoModal = ({
	app,
	title,
	paragraph,
	callback,
	detailsHandler,
}: InfoModalProps) => {
	class myModal extends Modal {
		constructor(app: App) {
			super(app);
			this.contentEl.createEl("h1", { text: title });
			this.contentEl.createEl("p", { text: paragraph });
			callback(this.contentEl);
		}

		onClose(): void {
			this.contentEl.empty();
			detailsHandler(false);
		}
	}

	useEffect(() => new myModal(app).open(), []);

	return <div>&nbsp;</div>;
};
