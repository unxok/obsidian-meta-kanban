import { ConfigSchema, validateInput } from "@/utils/validateInput";
import React, { useEffect, useState } from "react";
import { ErrorBlock } from "@/components/ErrorBlock";
import { NoDvBlock } from "@/components/NoDvBlock";
import { Board } from "@/components/Board";
import { getDv } from "@/utils/getDv";

const containerStyle = {
	backgroundColor: "pink",
};

const App = (props: any) => {
	const { data, getSectionInfo, settings, app, text, plugin } = props;
	const dv = getDv();
	if (!dv) {
		return <NoDvBlock />;
	}

	const validated = validateInput(text);
	if (!validated.success) {
		return <ErrorBlock validated={validated} original={text} />;
	}
	return <Board dv={dv} config={validated.data} />;
};

export default App;
