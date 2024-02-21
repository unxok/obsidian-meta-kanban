import React, { useEffect, useState } from "react";
// import { ConfigSchema } from "../../utils/validateInput";
import { getDv } from "@/utils/getDv";
// import { MkRenderer } from "@/components/MkRenderer";
import { App, Plugin } from "obsidian";
import { Lane } from "./Lane";
import { ConfigSchema } from "../App";

type BoardProps = {
	config: ConfigSchema;
	dv: ReturnType<typeof getDv>;
	app: App;
	plugin: Plugin;
	metaEdit: any;
};

export const Board = ({ config, dv, app, plugin, metaEdit }: BoardProps) => {
	const dvData = dv
		.pages(config.from)
		.where((p) => eval(String(config.where)))
		.map((p) =>
			config.columns.reduce((acc, col) => ({ [col]: p[col], ...acc }), {
				link: p.file.link,
			}),
		);
	const [cards, setCards] = useState(dvData);

	return (
		<div className="meta-kanban" id="meta-kanban">
			<h1>{config.title}</h1>
			<div
				className="board-lane-container bg-green-400"
				// style={{
				// 	display: "flex",
				// 	flexDirection:
				// 		config.direction === "vertical" ? "column" : "row",
				// 	gap: "5px",
				// 	borderRadius: "10px",
				// }}
			>
				{config.lanes.map((lane, i) => (
					<Lane
						app={app}
						plugin={plugin}
						lane={lane}
						key={lane.title}
						propertyName={config.property}
						columns={config.columns}
						allCards={cards}
						setCards={setCards}
						metaEdit={metaEdit}
					/>
				))}
			</div>
		</div>
	);
};
