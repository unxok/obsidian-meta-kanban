import React, { useState } from "react";
import { ZodError } from "zod";
import { InfoModal } from "@/components/InfoModal";
import { getMessages } from "@/utils/getMessages";
import { configSchema } from "../App";

type ErrorBlockProps =
	| { eType: "yaml"; e: Error }
	| { eType: "zod"; e: ZodError };

export const ErrorBlock = ({ eType, e }: ErrorBlockProps) => {
	const [isDetailsOpen, setDetailsOpen] = useState(false);
	const info =
		eType === "yaml"
			? {
					generic: "Invalid YAML formatting!",
					docs: "Need a refresher on YAML? [Look here](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)",
					errorDetails: e,
				}
			: // eType === 'zod'
				{
					generic: "Invalid configuration syntax!",
					docs: "Please refer to the [Meta Kanban docs](https://github.com/unxok/obsidian-meta-kanban/tree/main) for reference",
					errorDetails: e,
				};
	return (
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
			<p>
				<i>{info.generic}</i>
			</p>
			{eType === "zod" && (
				<>
					<p>
						<b>Required fields:</b>{" "}
					</p>
					<p>{Object.keys(configSchema.shape).join(", ")}</p>
				</>
			)}
			{eType === "yaml" && <pre>{e.message}</pre>}
			<button onClick={() => setDetailsOpen(true)}>Error details</button>
			{isDetailsOpen && (
				<InfoModal
					app={app}
					title={"Meta Kanban Error Details"}
					paragraph={"See JSON snippet below"}
					callback={(content) =>
						content.createEl("pre").createEl("code", {
							text: JSON.stringify(
								info.errorDetails,
								undefined,
								1,
							),
						})
					}
					detailsHandler={setDetailsOpen}
				></InfoModal>
			)}
		</div>
	);
};

// export const ZodErrorBlock = ({ validated, original }) => {
// 	const [isDetailsOpen, setDetailsOpen] = useState(false);
// 	const validationError = (validated as { error: ZodError }).error;
// 	console.log("original text: ", original);
// 	console.log("validated result: ", validated);
// 	const messages = getMessages(validationError.issues);
// 	return (
// 		<div
// 			id="meta-kanban"
// 			style={{
// 				backgroundColor: "var(--code-background)",
// 				padding: "1em",
// 			}}
// 		>
// 			<span className="code-block-flair" style={{ zIndex: 0 }}>
// 				Meta Kanban
// 			</span>
// 			<h4>Oops! Let's try that again...</h4>
// 			<i>Here's what went wrong:</i>
// 			<ul>
// 				{/* TODO fix these ids to be non sketchy */}
// 				{messages.map((txt, i) => (
// 					<li key={`msg-${i}-${Math.random()}`}>{txt}</li>
// 				))}
// 			</ul>
// 			<p>
// 				<i>Required fields:</i> title, property, direction, from, where,
// 				columns, lane
// 			</p>
// 			<p>
// 				Refer to the&nbsp;
// 				<a href="https://github.com/unxok/obsidian-meta-kanban">docs</a>
// 				&nbsp;if needed.
// 			</p>
// 			<button onClick={() => setDetailsOpen(true)}>Error details</button>
// 			{isDetailsOpen && (
// 				<InfoModal
// 					app={app}
// 					title={"Error Details"}
// 					paragraph={"Please see below for the details of your error"}
// 					callback={(content) =>
// 						content.createEl("pre").createEl("code", {
// 							text: JSON.stringify(validationError, undefined, 1),
// 						})
// 					}
// 					detailsHandler={setDetailsOpen}
// 				></InfoModal>
// 			)}
// 		</div>
// 	);
// };

// export const YamlErrorBlock = ({ error, original }) => {
// 	const [isDetailsOpen, setDetailsOpen] = useState(false);
// 	console.log("original text: ", original);

// 	return (
// 		<div
// 			id="meta-kanban"
// 			style={{
// 				backgroundColor: "var(--code-background)",
// 				padding: "1em",
// 			}}
// 		>
// 			<span className="code-block-flair" style={{ zIndex: 0 }}>
// 				Meta Kanban
// 			</span>
// 			<h4>Oops! Let's try that again...</h4>
// 			<div>
// 				<i>Looks like your YAML syntax is invalid:</i>
// 			</div>
// 			<code>
// 				<b>{error.message}</b>
// 			</code>
// 			<p>
// 				Refer to&nbsp;
// 				<a href="https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html">
// 					YAML syntax guides
// 				</a>
// 				&nbsp;if needed.
// 			</p>
// 			<p>
// 				Refer to the&nbsp;
// 				<a href="https://github.com/unxok/obsidian-meta-kanban">docs</a>
// 				&nbsp;if needed.
// 			</p>
// 			<button onClick={() => setDetailsOpen(true)}>Error details</button>
// 			{isDetailsOpen && (
// 				<InfoModal
// 					app={app}
// 					title={"Error Details"}
// 					paragraph={"Please see below for the details of your error"}
// 					callback={(content) =>
// 						content.createEl("pre").createEl("code", {
// 							text: JSON.stringify(error, undefined, 1),
// 						})
// 					}
// 					detailsHandler={setDetailsOpen}
// 				></InfoModal>
// 			)}
// 		</div>
// 	);
// };
