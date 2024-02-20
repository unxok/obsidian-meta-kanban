import React from "react";
import { ErrorBlock } from "@/components/ErrorBlock";
import { MissingDependencyBlock } from "@/components/MissingDependencyBlock";
import { Board } from "@/components/Board";
import { App as AppType, Plugin, parseYaml } from "obsidian";
import { z } from "zod";

export const configSchema = z.object({
	title: z.string(),
	id: z.string(),
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

export type ConfigSchema = z.infer<typeof configSchema>;

type AppProps = {
	// data: unknown;
	// getSectionInfo: unknown;
	// settings: unknown;
	app: AppType;
	plugin: Plugin;
	text: string;
	dv: any;
	metaEdit: any;
};
export const App = ({ app, plugin, text, dv, metaEdit }: AppProps) => {
	if (!dv) return <MissingDependencyBlock />;
	if (!metaEdit) return <MissingDependencyBlock />;

	const parsedYAML = (() => {
		try {
			return parseYaml(text);
		} catch (e) {
			return e;
		}
	})();
	if (parsedYAML instanceof Error)
		return <ErrorBlock eType="yaml" e={parsedYAML} />;

	const parsedJSON = configSchema.safeParse(parsedYAML);
	if (!parsedJSON.success && parsedJSON.hasOwnProperty("error"))
		// @ts-ignore typings are messed up in Zod I guess
		return <ErrorBlock eType="zod" e={parsedJSON.error} />;

	// return <div>Hello there!</div>;
	return (
		<Board
			app={app}
			dv={dv}
			plugin={plugin}
			// @ts-ignore Zod is dumb???
			config={parsedJSON.data}
			metaEdit={metaEdit}
		/>
	);
};

// const App = (props: any) => {
// 	const { data, getSectionInfo, settings, app, text, plugin } = props;

// 	const dv = useDv();
// 	if (!dv) {
// 		return <NoDvBlock />;
// 	}
// 	const validated = validateInput(text);
// 	if (validated instanceof Error) {
// 		return <YamlErrorBlock error={validated} original={text} />;
// 	}
// 	if (!validated.success) {
// 		return <ZodErrorBlock validated={validated} original={text} />;
// 	}
// 	return <Board dv={dv} config={validated.data} app={app} plugin={plugin} />;
// };
