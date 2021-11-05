import { isValidISODateString } from 'iso-datestring-validator';

export class TimeChecker {
    public checkTimeRange(range: string): boolean {
        const dates = range.split('/');
        if (dates.length !== 2)
            return false;
        try {
            new Date(dates[0]).toISOString();
            new Date(dates[1]).toISOString();
        } catch (err) {
            return false;
        }
        return true;
    }

    public checkISODate(date: string): boolean {
        return isValidISODateString(date);
    }
}