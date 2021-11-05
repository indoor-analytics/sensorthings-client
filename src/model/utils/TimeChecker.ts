export class TimeChecker {
    public checkTimeRange(range: string, attributeName: string): void {
        const dates = range.split('/');
        if (dates.length !== 2)
            throw new RangeError(`"${range}" is not a valid ${attributeName} value.`);
        try {
            new Date(dates[0]).toISOString();
            new Date(dates[1]).toISOString();
        } catch (err) {
            throw new RangeError(`"${range}" is not a valid ${attributeName} value.`);
        }
    }
}