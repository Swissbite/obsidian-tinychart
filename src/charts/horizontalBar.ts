import { PluginSettings } from "../settings/pluginSettings";
import { ChartConfig, DataEntry } from "./parseInput";

export function generateBarChart(
	data: DataEntry[],
	settings: PluginSettings,
	config: ChartConfig = {}
): string {
	let chartLength: number = settings.chartLength;
	let fillChar: string = settings.fillChar;
	let emptyChar: string = settings.emptyChar;
	let showLabelsFlag: boolean = settings.showLabels;
	let rightAlignLabelsFlag: boolean = settings.rightAlignLabels;
	let prefixChar: string = settings.prefixChar;
	let suffixChar: string = settings.suffixChar;

	const dataMax: number = Math.max(...data.map((entry) => entry.value));
	const maxValue: number = config.max !== undefined ? config.max : dataMax;
	const minValue: number = config.min !== undefined ? config.min : 0;
	const range: number = maxValue - minValue;
	const maxValueLength: number = dataMax.toString().length;
	const maxKeyLength: number = Math.max(
		...data.map((entry) => entry.key.length)
	);
	const barChart: string[] = [];
	for (const { key, value } of data) {
		const clampedValue: number = Math.max(minValue, Math.min(maxValue, value));
		const barLength: number = range > 0 ? Math.floor(((clampedValue - minValue) / range) * chartLength) : 0;
		const bars: string =
			fillChar.repeat(barLength) +
			emptyChar.repeat(chartLength - barLength);
		let value_padded: string = " " + value.toString();

		if (rightAlignLabelsFlag === true) {
			value_padded = value_padded.padStart(maxValueLength + 1);
		}

		if (showLabelsFlag === true) {
			barChart.push(
				`${key.padEnd(
					maxKeyLength + 2
				)} ${prefixChar}${bars}${suffixChar}${value_padded}`
			);
		} else {
			barChart.push(
				`${key.padEnd(
					maxKeyLength + 2
				)} ${prefixChar}${bars}${suffixChar}`
			);
		}
	}
	return barChart.join("\n");
}
