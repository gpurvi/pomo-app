import moment from 'moment';

export const createDummyData = (date, type) => {
    let sessionDurations = [];
    if (type === 'line') {
        const diff = moment().diff(date, 'months');
        for (let i = 1; i <= diff; i++) {
            const daysInMonth = date.daysInMonth();
            let monthSessions = [];
            for (let i = 1; i <= daysInMonth; i++) {
                if (i % 2 === 0) {
                    const rand = Math.floor((Math.random() * 30) + 10);
                    monthSessions.push({
                        date: i,
                        sessions: rand,
                        durations: rand / 5
                    });
                }
            }
            sessionDurations.push({
                'timePeriod': date.format('YYYY-MM'),
                data: monthSessions
            });
            date.add(1, 'months');
        }
    } else if (type === 'bar') {
        const yearLength = 12;
        for (let j = 0; j < 2; j++) {
            let year = [];
            for (let i = 1; i <= yearLength; i++) {
                const rand = Math.floor((Math.random() * 150) + 10);
                year.push({
                    date: i,
                    sessions: rand,
                    durations: rand / 5
                });
            }
            // if (j % 2 !== 0) {
            //     sessionDurations[date.add(1, 'year').format('YYYY')] = year;
            // } else {
            //     sessionDurations[date.format('YYYY')] = year;
            // }
            sessionDurations.push({
                'timePeriod': date.format('YYYY'),
                data: year
            });
            date.add(1, 'year');
        }

    }
    return JSON.stringify(sessionDurations);
};

// const startdate = moment().subtract(10, 'months');
//
// console.log(createDummyData(startdate, 'line'));