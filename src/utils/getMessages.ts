/**
 * Meant for use with ZodErrors that have nested message properties
 * @param obj The object to search
 * @returns {string[]} An array of messages
 */
export const getMessages = (obj: any) => {
	const queue = [obj];
	const messages = [];

	while (queue.length > 0) {
		const current = queue.shift();

		if (typeof current === "object" && current !== null) {
			for (const [key, val] of Object.entries(current)) {
				if (key === "message") {
					messages.push(val);
				} else if (typeof val === "object") {
					queue.push(val);
				}
			}
		}
	}
	return messages;
};
