export class TimeUtils {
	static timeToSecods(data: string): number {
		const time = data.split(":")

		const seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);

		return seconds
	}
}
