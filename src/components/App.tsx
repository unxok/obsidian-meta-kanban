import { validateInput } from "@/utils/validateInput";
import React from "react";
import { YamlErrorBlock, ZodErrorBlock } from "@/components/ErrorBlock";
import { NoDvBlock } from "@/components/NoDvBlock";
import { Board } from "@/components/Board";
import { useDv } from "@/hooks/useDv";

const containerStyle = {
	backgroundColor: "pink",
};

const App = (props: any) => {
	const { data, getSectionInfo, settings, app, text, plugin } = props;

	const dv = useDv();
	if (!dv) {
		return <NoDvBlock />;
	}
	const validated = validateInput(text);
	if (validated instanceof Error) {
		return <YamlErrorBlock error={validated} original={text} />;
	}
	if (!validated.success) {
		return <ZodErrorBlock validated={validated} original={text} />;
	}
	return <Board dv={dv} config={validated.data} app={app} plugin={plugin} />;
};

export default App;
