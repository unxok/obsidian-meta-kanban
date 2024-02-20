import { MkRenderer } from "@/components/MkRenderer";
import React, { useState } from "react";
import { Card } from "./Card";
import { DropIndicator } from "./DropIndicator";

export const Lane = ({ lane, propertyName, columns, dvData, app, plugin }) => {
	const [active, setActive] = useState(false);
	const filteredDvData = dvData.filter((p) => p[propertyName] === lane.value);

	const handleDragStart = (e, card) => {
		e.dataTransfer.setData("cardId", card.id);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		highlightIndicator(e);
		setActive(true);
	};
	const handleDragLeave = () => {
		setActive(false);
	};

	const handleDragEnd = () => {
		setActive(false);
	};

	const getIndicators = () => {
		return Array.from(
			document.querySelectorAll(`[data-lane="${lane.title}"]`),
		);
	};

	const getNearestIndicator = (e, indicators) => {
		return indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = e.clientY - (box.top + 50);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				}
				return closest;
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			},
		);
	};

	const highlightIndicator = (e) => {
		const indicators = getIndicators();
		const el = getNearestIndicator(e, indicators);
		el.element.style.opacity = "1";
	};

	return (
		<div
			id={lane.title}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDragEnd}
			className={`${active ? "active-board-lane" : "board-lane"}`}
			style={{
				flexGrow: 1,
				border: "var(--background-primary-alt) solid 1px",
				padding: "10px",
			}}
		>
			<h4>{lane.title}</h4>
			{filteredDvData.map((page) => (
				<Card
					page={page}
					key={page.link.path}
					handleDragStart={handleDragStart}
					laneId={lane.title}
					columns={columns}
					app={app}
					plugin={plugin}
				></Card>
			))}
			<DropIndicator beforeId={-1} laneId={lane.title} />
		</div>
	);
};
