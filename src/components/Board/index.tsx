import React from "react";
import { ConfigSchema } from "../../utils/validateInput";

type BoardProps = {
	config: ConfigSchema;
};

export const Board = ({ config }: BoardProps) => {
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
							<div
								style={{
									backgroundColor:
										"var(--background-primary-alt)",
								}}
							>
								sadfsadf
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
