export interface DataEntry {
	key: string;
	value: number;
}

export interface ChartConfig {
	min?: number;
	max?: number;
}

function isConfigLine(line: string): boolean {
	const trimmed = line.trim();
	if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return false;
	const inner = trimmed.slice(1, -1).trim();
	if (inner === "") return false;
	return inner.split(",").every((part) =>
		/^\s*(min|max)\s*:\s*-?\d+(?:\.\d+)?\s*$/.test(part)
	);
}

export function parseConfig(inputString: string): ChartConfig {
	const lines: string[] = inputString.trim().split("\n");
	const config: ChartConfig = {};
	if (lines.length > 0 && isConfigLine(lines[0])) {
		const configLine: string = lines[0].trim();
		const minMatch = configLine.match(/\bmin\s*:\s*(-?\d+(?:\.\d+)?)/);
		const maxMatch = configLine.match(/\bmax\s*:\s*(-?\d+(?:\.\d+)?)/);
		if (minMatch) config.min = parseFloat(minMatch[1]);
		if (maxMatch) config.max = parseFloat(maxMatch[1]);
	}
	return config;
}

export function parseInput(inputString: string): DataEntry[] {
	const data: DataEntry[] = [];
	const lines: string[] = inputString.trim().split("\n");
	for (const line of lines) {
		if (isConfigLine(line)) continue;
		const [key, value] = line.split(",");
		const trimmedKey: string = key.trim();
		const trimmedValue: number = parseInt(value.trim(), 10);
		data.push({ key: trimmedKey, value: trimmedValue });
	}
	return data;
}
