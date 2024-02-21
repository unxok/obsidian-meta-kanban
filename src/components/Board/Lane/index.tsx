import { MkRenderer } from "@/components/MkRenderer";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { DropIndicator } from "./DropIndicator";

export const Lane = ({
	lane,
	propertyName,
	columns,
	app,
	plugin,
	setCards,
	allCards,
	metaEdit,
}) => {
	const [active, setActive] = useState(false);
	const cards = allCards.filter((p) => p[propertyName] === lane.value);

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
		clearHighlights();
	};

	const handleDragEnd = (e) => {
		setActive(false);
		clearHighlights();

		const cardId = e.dataTransfer.getData("cardId");
		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);
		const before = element.dataset.before || -1;
		if (before !== cardId) {
			const copiedAllCards = [...allCards];

			const cardToTransfer = copiedAllCards.find(
				(c) => c.link.path === cardId,
			);
			if (!cardToTransfer) return;

			const modifiedCard = {
				...cardToTransfer,
				[propertyName]: lane.value,
			};
			const cardsWithoutOld = copiedAllCards.filter(
				(c) => c.link.path !== cardId,
			);
			const moveToBack = before === "-1";
			if (moveToBack) {
				cardsWithoutOld.push(modifiedCard);
			} else {
				const insertAtIndex = cardsWithoutOld.findIndex(
					(el) => el.link.path === before,
				);
				if (!insertAtIndex) return;
				cardsWithoutOld.splice(insertAtIndex, 0, modifiedCard);
			}
			setCards(cardsWithoutOld);
			// technically this is async but it isn't currently causing any issues?
			metaEdit.update(propertyName, lane.value, cardId);
		}
	};

	const getIndicators = () => {
		return Array.from(
			document.querySelectorAll(`[data-lane="${lane.value}"]`),
		);
	};

	const getNearestIndicator = (e, indicators) => {
		const closestInd = indicators.reduce(
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
		// console.log(closestInd);
		return closestInd;
	};

	const clearHighlights = (els = null) => {
		const indicators = els || getIndicators();

		indicators.forEach((el) => (el.style.opacity = 0));
	};

	const highlightIndicator = (e) => {
		const indicators = getIndicators();
		clearHighlights(indicators);
		const el = getNearestIndicator(e, indicators);
		el.element.style.opacity = "1";
	};

	return (
		<div className="bg-slate-500 flex flex-col">
			<div className="flex flex-row">
				<h1>{lane.title}</h1>
				<span>{cards.length}</span>
			</div>
			<div
				id={lane.title}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDragEnd}
				className="flex flex-col ring-blue-600 w-max"
				// className={`${active ? "active-board-lane" : "board-lane"}`}

				// style={{
				// 	flexGrow: 1,
				// 	border: "var(--background-primary-alt) solid 1px",
				// 	display: "flex",
				// 	flexDirection: "column",
				// 	padding: "10px",
				// }}
			>
				<h4>{lane.title}</h4>
				{cards.map((page) => (
					<Card
						page={page}
						key={page.link.path}
						handleDragStart={handleDragStart}
						laneId={lane.value}
						columns={columns}
						app={app}
						plugin={plugin}
					></Card>
				))}
				<DropIndicator beforeId={-1} laneId={lane.value} />
			</div>
		</div>
	);
};
