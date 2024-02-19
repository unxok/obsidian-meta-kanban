import React from "react";

export const NoDvBlock = () => (
	<div
		id="meta-kanban"
		style={{
			backgroundColor: "var(--code-background)",
			padding: "1em",
		}}
	>
		<span className="code-block-flair" style={{ zIndex: 0 }}>
			Meta Kanban
		</span>
		<h4>Oops! Let's try that again...</h4>
		<b>
			The{" "}
			<a href="https://github.com/blacksmithgu/obsidian-dataview">
				Dataview
			</a>{" "}
			plugin must be installed!
		</b>
		<p>
			Once you have installed and enabled Dataview, edit this code block
			or otherwise cause this to re-render to retry.
		</p>
		<p>
			Refer to the{" "}
			<a href="https://github.com/unxok/obsidian-meta-kanban">docs</a> if
			needed.
		</p>
	</div>
);
