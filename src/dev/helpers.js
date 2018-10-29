import subDays from 'date-fns/sub_days';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import {reduceSessionsByTimePeriod} from "../utils/reduceSessions";

export const reduceNames = (sessions) => {
    return sessions.reduce(function (ar, item) {
        let {sessionName} = item;
        const _item = ar.filter(function (a) {
            return a === sessionName
        })[0];
        const indexOf = ar.indexOf(_item);

        if (indexOf > -1) {
            ar[indexOf] = sessionName;
        } else {
            ar.push(sessionName);
        }
        // return ar.slice(-returnCount);
        return ar;
    }, []);
};

//imitates sessions get from server with durations
export const normalizeSessions = (sessions, date, timePeriod) => {
    if (sessions.length === 0) {
        return [];
    }
    if (timePeriod === 'month') {
        // console.log(getDaysInMonth(date));
        reduceSessionsByTimePeriod(sessions, 'month');
    }
};

// export const extractMinDate = (sessions) => {
//     return sessions.reduce(function (ar, item) {
//         let {sessionName} = item;
//         const _item = ar.filter(function (a) {
//             return a === sessionName
//         })[0];
//         const indexOf = ar.indexOf(_item);
//
//         if (indexOf > -1) {
//             ar[indexOf] = sessionName;
//         } else {
//             ar.push(sessionName);
//         }
//         return ar.slice(-returnCount);
//     }, []);
// };

export const createDummyData = () => {
    let ar = [];
    let startDate = subDays(new Date(), 500);
    const sessionName = ['pomodor app', 'fx', 'react', 'vue', 'date'];
    for (let i = 0; i < 980; i++) {
        startDate = addDays(startDate, Math.floor(Math.random() * 2));
        ar[i] = {
            "sessionName": sessionName[Math.floor(Math.random() * 5)],
            "date": format((startDate), 'YYYY-MM-DD'),
            "duration": 1500000,
            "id": i
        };
    }
    return JSON.stringify(ar);
};


// export const createDummyData = (date, type) => {
//     let sessionDurations = [];
//     if (type === 'line') {
//         const diff = moment().diff(date, 'months');
//         for (let i = 1; i <= diff; i++) {
//             const daysInMonth = date.daysInMonth();
//             let monthSessions = [];
//             for (let i = 1; i <= daysInMonth; i++) {
//                 if (i % 2 === 0) {
//                     const rand = Math.floor((Math.random() * 30) + 10);
//                     monthSessions.push({
//                         date: i,
//                         sessions: rand,
//                         durations: rand / 5
//                     });
//                 }
//             }
//             sessionDurations.push({
//                 'timePeriod': date.format('YYYY-MM'),
//                 data: monthSessions
//             });
//             date.add(1, 'months');
//         }
//     } else if (type === 'bar') {
//         const yearLength = 12;
//         for (let j = 0; j < 2; j++) {
//             let year = [];
//             for (let i = 1; i <= yearLength; i++) {
//                 const rand = Math.floor((Math.random() * 150) + 10);
//                 year.push({
//                     date: i,
//                     sessions: rand,
//                     durations: rand / 5
//                 });
//             }
//             // if (j % 2 !== 0) {
//             //     sessionDurations[date.add(1, 'year').format('YYYY')] = year;
//             // } else {
//             //     sessionDurations[date.format('YYYY')] = year;
//             // }
//             sessionDurations.push({
//                 'timePeriod': date.format('YYYY'),
//                 data: year
//             });
//             date.add(1, 'year');
//         }
//
//     }
//     return JSON.stringify(sessionDurations);
// };
