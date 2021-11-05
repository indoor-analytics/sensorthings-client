import { TimeChecker } from "../src/model/utils/TimeChecker";

describe('Utils', () => {

    let checker: TimeChecker;
    beforeEach(() => {
        checker = new TimeChecker();
    });

    describe ('Time checks', () => {
        describe ('Date', () => {
            it ('should return true with YYYY-MM-DD calendar date', () => {
                const dateString = "2021-10-25";
                expect(checker.checkISODate(dateString)).toBeTruthy();
            });
        });

        describe ('Time range', () => {
            it('should return false when created with wrong phenomenon time', () => {
                const create = () => checker.checkTimeRange("2014-03-01T13:00:00Z");
                expect(create()).toBeFalsy();
                // expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z" is not a valid phenomenonTime value.'));
            });
        
            it('should return false when created with random string as first phenomenon time range member', () => {
                const create = () => checker.checkTimeRange("azerty/2015-05-11T15:30:00Z");
                expect(create()).toBeFalsy();
                // expect(create).toThrowError(new RangeError('"azerty/2015-05-11T15:30:00Z" is not a valid phenomenonTime value.'));
            });
        
            it('should return false when created with random string as second phenomenon time range member', () => {
                const create = () => checker.checkTimeRange("2014-03-01T13:00:00Z/azerty");
                expect(create()).toBeFalsy();
                // expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z/azerty" is not a valid phenomenonTime value.'));
            });
        
            it('should return false when created with random strings as both phenomenon time range members', () => {
                const create = () => checker.checkTimeRange("azerty/azerty");
                expect(create()).toBeFalsy();
                // expect(create).toThrowError(new RangeError('"azerty/azerty" is not a valid phenomenonTime value.'));
            });
        
            it('should return false when created with too many phenomenon time range members', () => {
                const create = () => checker.checkTimeRange("azerty/azerty/azerty");
                expect(create()).toBeFalsy();
                // expect(create).toThrowError(new RangeError('"azerty/azerty/azerty" is not a valid phenomenonTime value.'));
            });
        });
    });
});