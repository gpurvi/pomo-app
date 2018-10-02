export const reduceNames = (sessions, returnCount) => {
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
        return ar.slice(-returnCount);
    }, []);
};
