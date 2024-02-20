import { Notice, parseYaml } from "obsidian";

import { z } from "zod";

export const configSchema = z.object({
	title: z.string(),
	from: z.string().nullable(),
	where: z.union([z.string(), z.boolean()]),
	columns: z.string().array().min(1),
	property: z.string(),
	direction: z.union([z.literal("horizontal"), z.literal("vertical")]),
	lanes: z
		.object({
			title: z.string(),
			value: z.string(),
		})
		.array()
		.min(1),
});

export const validateInput = (yaml) => {
	try {
		const config = parseYaml(yaml);
		console.log("config prior to parse: ", config);
		return configSchema.safeParse(config);
	} catch (e) {
		return e;
	}
};

// export const validateInput = (text: string) => {
// 	const lines = text
// 		.trim()
// 		.split("\n")
// 		.map((l) => l.trim());
// 	const config = lines.reduce(
// 		(acc, line) => {
// 			const lineArr = line.split(":").map((c) => c.trim());
// 			switch (lineArr[0]) {
// 				case "title":
// 					acc.title = lineArr[1];
// 					return acc;
// 				case "from":
// 					acc.from = lineArr[1];
// 					return acc;
// 				case "where":
// 					acc.where = lineArr[1];
// 					return acc;
// 				case "columns":
// 					acc.columns.push(
// 						...lineArr[1].split(",").map((v) => v.trim()),
// 					);
// 					return acc;
// 				case "property":
// 					acc.property = lineArr[1];
// 					return acc;
// 				case "direction":
// 					acc.direction = lineArr[1];
// 					return acc;
// 				case "lane":
// 					acc.lanes.push(lineArr[1].split(",").map((v) => v.trim()));
// 					return acc;
// 				default:
// 					return acc;
// 			}
// 		},
// 		{
// 			title: undefined,
// 			property: undefined,
// 			direction: undefined,
// 			from: "",
// 			where: "",
// 			columns: [],
// 			lanes: [],
// 		},
// 	)};
