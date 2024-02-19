import React from "react";
import { ConfigSchema } from "../../utils/validateInput";
import { getDv } from "@/utils/getDv";
import { getLinkpath, parseLinktext } from "obsidian";

type BoardProps = {
	config: ConfigSchema;
	dv: ReturnType<typeof getDv>;
};

export const Board = ({ config, dv }: BoardProps) => {
	const dvData = dv
		.pages(config.from)
		.where((p) => eval(config.where))
		.map((p) => [p.file.link, ...config.columns.map((c) => p[c])]);

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
				{config.lanes.map((lane, i) => {
					return (
						<div
							// TODO fix this janky key convention
							key={`${config.title}-${i}-${lane}`}
							className="board-lane"
							style={{
								flexGrow: 1,
								border: "var(--background-primary-alt) solid 1px",
								padding: "10px",
							}}
						>
							<h4>{lane[1] ? lane[1] : lane[0]}</h4>
							{dvData.map((p, i) => (
								<div
									className="lane-card"
									key={`lane-card-${i}-${Math.random()}`}
									style={{
										backgroundColor:
											"var(--background-primary-alt)",
									}}
								>
									{p.map((v, i) => {
										if (i === 0) {
											console.log(parseLinktext(v.path));
											return (
												<div
													key={`lane-card-value-${i}-${Math.random()}`}
												>
													<a href={v.path}>
														{v.path.slice(
															0,
															v.path.length - 3,
														)}
													</a>
												</div>
											);
										}
										<div
											key={`lane-card-value-${i}-${Math.random()}`}
										>
											{v}
										</div>;
									})}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};
