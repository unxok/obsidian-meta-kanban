import React, { useEffect, useRef } from "react";
import { MarkdownRenderer } from "obsidian";

export const MkRenderer = ({ app, plugin, children }) => {
	const mkContainerRef = useRef(null);
	useEffect(() => {
		if (mkContainerRef.current) {
			const mkEl = document.createElement("div");
			MarkdownRenderer.render(app, children, mkEl, "/", plugin);
			mkContainerRef.current.appendChild(mkEl);
		}
	}, [app, plugin]);
	return <div ref={mkContainerRef}></div>;
};
