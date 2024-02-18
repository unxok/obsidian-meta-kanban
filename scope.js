const fs = require("fs");
const postcss = require("postcss");

const prefixer = require("postcss-prefix-selector");

// css to be processed
const css = fs.readFileSync("build/my-obsidian-plugin/styles.css", "utf8");

const out = postcss()
	.use(
		prefixer({
			prefix: "#my-obsidian-plugin ",
			transform: function (
				prefix,
				selector,
				prefixedSelector,
				filePath,
				rule
			) {
				return prefixedSelector;
			},
		})
	)
	.process(css).css;

fs.writeFileSync("build/my-obsidian-plugin/styles.css", out);
