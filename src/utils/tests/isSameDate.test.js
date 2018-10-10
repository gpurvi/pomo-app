import isSameDate from './../isSameDate.js';

describe('isSameDate', () => {
    it('return true if two dates ar same by days', () => {
        const date1 = '2017-08-20', date2 = '2017-08-20';
        expect(isSameDate(date1, date2)).toBe(true);
    });

    it('return false if two dates are not same by days', () => {
        const date1 = '2017-08-21', date2 = '2017-08-20';
        expect(isSameDate(date1, date2)).toBeFalsy();
    });

    it('return true if two dates ar same by months', () => {
        const date1 = '2017-08-23', date2 = '2017-08-20';
        expect(isSameDate(date1, date2, 'month')).toBe(true);
    });

    it('return false if two dates are not same by months', () => {
        const date1 = '2017-09-23', date2 = '2017-08-20';
        expect(isSameDate(date1, date2, 'month')).toBeFalsy();
    });

    it('return true if two dates ar same by years', () => {
        const date1 = '2017-11-23', date2 = '2017-08-20';
        expect(isSameDate(date1, date2, 'year')).toBe(true);
    });

    it('return false if two dates are not same by years', () => {
        const date1 = '2018-09-23', date2 = '2017-08-20';
        expect(isSameDate(date1, date2, 'year')).toBeFalsy();
    });
});