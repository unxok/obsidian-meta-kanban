import React from "react";

export const DropIndicator = ({ beforeId, laneId }) => {
	return (
		<div
			data-before={beforeId}
			data-lane={laneId}
			className="card-drop-indicator"
		/>
	);
};
