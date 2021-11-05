import { isValidISODateString } from 'iso-datestring-validator';

export class TimeChecker {
    public checkISODate(date: string): boolean {
        return isValidISODateString(date);
    }

    public checkTimeRange(range: string): boolean {
        const dates = range.split('/');
        if (dates.length !== 2)
            return false;

        const firstMemberIsDate = this.checkISODate(dates[0]);
        const secondMemberIsDate = this.checkISODate(dates[1]);

        return firstMemberIsDate && secondMemberIsDate;
    }
}