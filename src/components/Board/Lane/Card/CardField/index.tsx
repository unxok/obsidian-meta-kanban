import { MkRenderer } from "@/components/MkRenderer";
import React from "react";

export const CardField = ({ field, app, plugin }) => {
	const className = "lane-card-field";
	if (!field) {
		return (
			<div className={className} key={`lane-card-value-${Math.random()}`}>
				-
			</div>
		);
	}
	if (field.path && field.embed) {
		return (
			<div
				onDragStart={() => false}
				className={className}
				key={`lane-card-value-${Math.random()}`}
			>
				<MkRenderer app={app} plugin={plugin}>
					{"![[" + field.path.slice(0, field.path.length - 3) + "]]"}
				</MkRenderer>
			</div>
		);
	}
	if (field.path) {
		return (
			<h4
				onDragStart={() => false}
				className={className + " lane-card-title"}
				key={`lane-card-value-${Math.random()}`}
			>
				<MkRenderer app={app} plugin={plugin}>
					{"[[" + field.path.slice(0, field.path.length - 3) + "]]"}
				</MkRenderer>
			</h4>
		);
	}
	return (
		<div className={className} key={`lane-card-value-${Math.random()}`}>
			{field}
		</div>
	);
};
