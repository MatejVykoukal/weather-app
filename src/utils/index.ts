export function onlySpaces(str: string): boolean {
	return str.trim().length === 0;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { onlySpaces };
