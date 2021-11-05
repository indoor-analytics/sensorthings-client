import { isValidISODateString } from 'iso-datestring-validator';

/**
 * SensorThings API allows entities to hold time representations as strings.
 * This class allows to check both dates (TM_Instant) and time intervals (TM_Period).
 */
export class TimeChecker {
    public checkISODate(date: string): boolean {
        return isValidISODateString(date);
    }

    /**
     * Checks if a string is a correct time interval.
     * A correct time interval is a combination of two ISO-8601 dates separated by 
     * a slash ('/') character.
     * 
     * @param range time interval to verify
     * @returns is the time interval valid
     */
    public checkTimeRange(range: string): boolean {
        const dates = range.split('/');
        if (dates.length !== 2)
            return false;

        const firstMemberIsDate = this.checkISODate(dates[0]);
        const secondMemberIsDate = this.checkISODate(dates[1]);

        return firstMemberIsDate && secondMemberIsDate;
    }
}