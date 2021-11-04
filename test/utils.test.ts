import { TimeChecks } from "../src/model/utils/TimeChecks";

describe('Utils', () => {

    let checker: TimeChecks;
    beforeEach(() => {
        checker = new TimeChecks();
    });

    describe ('Time checks', () => {
        describe ('Time range', () => {
            it('should throw when created with wrong phenomenon time', () => {
                const create = () => checker.checkTimeRange("2014-03-01T13:00:00Z", 'phenomenonTime');
                expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z" is not a valid phenomenonTime value.'));
            });
        
            it('should throw when created with random string as first phenomenon time range member', () => {
                const create = () => checker.checkTimeRange("azerty/2015-05-11T15:30:00Z", 'phenomenonTime');
                expect(create).toThrowError(new RangeError('"azerty/2015-05-11T15:30:00Z" is not a valid phenomenonTime value.'));
            });
        
            it('should throw when created with random string as second phenomenon time range member', () => {
                const create = () => checker.checkTimeRange("2014-03-01T13:00:00Z/azerty", 'phenomenonTime');
                expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z/azerty" is not a valid phenomenonTime value.'));
            });
        
            it('should throw when created with random strings as both phenomenon time range members', () => {
                const create = () => checker.checkTimeRange("azerty/azerty", 'phenomenonTime');
                expect(create).toThrowError(new RangeError('"azerty/azerty" is not a valid phenomenonTime value.'));
            });
        
            it('should throw when created with too many phenomenon time range members', () => {
                const create = () => checker.checkTimeRange("azerty/azerty/azerty", 'phenomenonTime');
                expect(create).toThrowError(new RangeError('"azerty/azerty/azerty" is not a valid phenomenonTime value.'));
            });
        });
    });
});