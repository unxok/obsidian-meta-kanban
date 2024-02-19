import { Notice } from "obsidian";

import { z } from "zod";

const configSchema = z.object({
	title: z.string(),
	property: z.string(),
	direction: z.union([z.literal("horizontal"), z.literal("vertical")]),
	lanes: z
		.tuple([
			z.union([z.string(), z.number()]),
			z.union([z.string(), z.void()]),
		])
		.array(),
});

export type ConfigSchema = z.infer<typeof configSchema>;

export const validateInput = (text: string) => {
	const lines = text
		.trim()
		.split("\n")
		.map((l) => l.trim());
	const config = lines.reduce(
		(acc, line) => {
			const lineArr = line.split(":").map((c) => c.trim());
			switch (lineArr[0]) {
				case "title":
					acc.title = lineArr[1];
					return acc;
				case "property":
					acc.property = lineArr[1];
					return acc;
				case "direction":
					acc.direction = lineArr[1];
					return acc;
				case "lane":
					acc.lanes.push(lineArr[1].split(",").map((v) => v.trim()));
					return acc;
				default:
					return acc;
			}
		},
		{
			title: undefined,
			property: undefined,
			direction: undefined,
			lanes: [],
		},
	);

	console.log("config prior to parse: ", config);
	return configSchema.safeParse(config);
};
