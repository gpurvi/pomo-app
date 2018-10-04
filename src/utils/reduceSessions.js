import isSameDate from "./isSameDate";

export const reduceSessions = (sessions) => {
    return sessions.reduce(function (ar, item) {
        let {sessionName, duration} = item;
        const _item = ar.filter(function (a) {
            return a.sessionName === sessionName
        })[0];
        const indexOf = ar.indexOf(_item);

        if (indexOf > -1) {
            ar[indexOf] = {
                sessionName,
                count: _item.count + 1,
                duration: _item.duration + duration
            };
        } else {
            ar.push({sessionName, count: 1, duration});
        }
        return ar;
    }, []);
};

export const reduceSessionsByTimePeriod = (sessions, timePeriod) => {
    let period = timePeriod === 'month' ? 'day' : 'month';
    return sessions.reduce(function (ar, item) {
        let {date, duration} = item;
        const _item = ar.filter(function (a) {
            return isSameDate(a.date, date, period);
        })[0];
        const indexOf = ar.indexOf(_item);
        if (indexOf > -1) {
            ar[indexOf] = {
                date,
                count: _item.count + 1,
                duration: _item.duration + duration
            };
        } else {
            ar.push({date, count: 1, duration});
        }
        return ar;
    }, []);
};