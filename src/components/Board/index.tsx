import React from "react";
import { ConfigSchema } from "../../utils/validateInput";
import { getDv } from "@/utils/getDv";
import { MkRenderer } from "@/components/MkRenderer";
import {
	App,
	MarkdownRenderer,
	Plugin,
	getLinkpath,
	parseLinktext,
} from "obsidian";
import { Lane } from "./Lane";

type BoardProps = {
	config: ConfigSchema;
	dv: ReturnType<typeof getDv>;
	app: App;
	plugin: Plugin;
};

export const Board = ({ config, dv, app, plugin }: BoardProps) => {
	const dvData = dv
		.pages(config.from)
		.where((p) => eval(String(config.where)))
		.map((p) =>
			config.columns.reduce((acc, col) => ({ [col]: p[col], ...acc }), {
				link: p.file.link,
			}),
		);

	console.log("heres your dv data ", dvData);

	return (
		<div className="meta-kanban" id="meta-kanban">
			<h1>{config.title}</h1>
			<div
				className="board-lane-container"
				style={{
					display: "flex",
					flexDirection:
						config.direction === "vertical" ? "column" : "row",
					gap: "5px",
					borderRadius: "10px",
				}}
			>
				{config.lanes.map((lane, i) => (
					<Lane
						app={app}
						plugin={plugin}
						lane={lane}
						key={lane.title}
						propertyName={config.property}
						columns={config.columns}
						dvData={dvData}
					/>
				))}
			</div>
		</div>
	);
};
