import { MkRenderer } from "@/components/MkRenderer";
import React from "react";
import { CardField } from "./CardField";
import { iterateObjectByArray } from "@/utils/iterateObjectByArray";
import { DropIndicator } from "../DropIndicator";
import { motion } from "framer-motion";

export const Card = ({
	page,
	handleDragStart,
	laneId,
	columns,
	app,
	plugin,
}) => {
	return (
		<>
			<DropIndicator beforeId={page.link.path || "-1"} laneId={laneId} />
			{/* This should be a motion.div but framer motion isn't liking it */}
			<div
				id={page.link.path}
				draggable
				// layout="position"
				// layoutId={page.link.path}
				onDragStart={(e) =>
					handleDragStart(e, { id: page.link.path, laneId: laneId })
				}
				className="lane-card"
				key={`lane-card-${Math.random()}`}
			>
				{[page.link, ...iterateObjectByArray(page, columns)].map(
					(field, i) => (
						<div key={`${page.link.path}-${i}-${field}`}>
							<CardField
								field={field}
								app={app}
								plugin={plugin}
							></CardField>
						</div>
					),
				)}
			</div>
		</>
	);
};
