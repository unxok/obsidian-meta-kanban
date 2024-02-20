/**
 * Maps over the given object in order by keys in the given array
 * @param obj The object to iterate over
 * @param orderArray The array which to sequentially map over each obj key
 * @returns {any[]} An array of the values of obj in the order given by orderArray
 */
export const iterateObjectByArray = (
	obj: { [key: string]: any },
	orderArray: any[],
) => {
	return orderArray.map((key) => {
		return obj[key];
	});
};
