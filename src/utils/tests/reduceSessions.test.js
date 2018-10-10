import {reduceSessions, reduceSessionsByTimePeriod} from './../reduceSessions';

const sessions = [
    {
        "sessionName": "vue",
        "date": "2017-05-22",
        "duration": 1,
        "id": 0
    },
    {
        "sessionName": "pomodor app",
        "date": "2017-05-23",
        "duration": 1,
        "id": 1
    },
    {
        "sessionName": "pomodor app",
        "date": "2017-05-23",
        "duration": 2,
        "id": 2
    }];


describe('reduceSessions', () => {
    it('returns array with 2 objects', () => {
        const reducedData = reduceSessions(sessions);
        expect(reducedData.length).toBe(2);
        expect(reducedData[1].count).toBe(2);
        expect(reducedData[1].duration).toBe(3);
    });

    it('returns empty array', () => {
        const reducedData = reduceSessions([]);
        expect(reducedData).toEqual([]);
    });
});


describe('reduceSessionsByTimePeriod', () => {
    it('returns array with 2 objects when compared by month', () => {
        const reducedData = reduceSessionsByTimePeriod(sessions, 'month');
        expect(reducedData.length).toBe(2);
        expect(reducedData[0].date).toBe('2017-05-22');
        expect(reducedData[1].count).toBe(2);
        expect(reducedData[1].duration).toBe(3);
    });

    it('returns array with 1 objects when compared by year', () => {
        const reducedData = reduceSessionsByTimePeriod(sessions, 'year');
        expect(reducedData.length).toBe(1);
        expect(reducedData[0].date).toContain('2017-05');
        expect(reducedData[0].count).toBe(3);
        expect(reducedData[0].duration).toBe(4);
    });

    it('returns empty array', () => {
        const reducedData = reduceSessionsByTimePeriod([]);
        expect(reducedData).toEqual([]);
    });
});