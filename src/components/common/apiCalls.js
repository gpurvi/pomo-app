import format from 'date-fns/format';
import url from '../urls';
import {reduceNames} from "../../dev/helpers";

const env = 'dev';
const urls = url(env);

//get by date sessions
export const getSessions = async (date, timePeriod = 'day') => {
    let response;
    if (env === 'dev') {
        if (timePeriod === 'day') {
            response = await fetch(`${urls.sessions}?date=${date}`);
        } else {
            response = await fetch(`${urls.sessions}?q=${date}`);
        }
        if (response.status >= 400) {
            throw(new Error('Error fetching sessions'))
        } else {
            return await response.json()
        }
    }
};
//get by id sessions
// export const getSessionsId = async (id) => {
//     const response = await fetch(`${urls.sessions}/${id}`);
//     if (response.status >= 400) {
//         throw(new Error('Error fetching sessions'))
//     } else {
//         return await response.json()
//     }
// };

//PATCH session (update)
export const patchSessions = async (id, sessionName) => {
    const init = {
        method: "PATCH",
        body: JSON.stringify({sessionName}),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`${urls.sessions}/${id}`, init);
    if (response.status >= 400) {
        throw(new Error('Error update sessions'))
    } else {
        return await response.json()
    }
};

//DELETE session(delete)
export const deleteSessions = async (id) => {
    const init = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`${urls.sessions}/${id}`, init);
    if (response.status >= 400) {
        throw(new Error('Error in delete sessions'))
    } else {
        return await response.json()
    }
};

export const postSessions = async (sessionName, duration) => {
    const init = {
        method: "POST",
        body: JSON.stringify({
            sessionName,
            duration,
            date: format(new Date(), 'YYYY-MM-DD')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(urls.sessions, init);
    if (response.status >= 400) {
        throw(new Error('Error posting sessions'))
    } else {
        return await response.json()
    }
};

export const getState = async () => {
    const response = await fetch(urls.state);
    if (response.status >= 400) {
        throw(new Error('Error fetching state'))
    } else {
        return await response.json()
    }
};

export const putState = async (modifiedState) => {
    const init = {
        method: "PUT",
        body: JSON.stringify(modifiedState),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(urls.state, init);
    if (response.status >= 400) {
        throw(new Error('Error putting state'))
    } else {
        return response.ok;
    }
};

export const getTotal = async () => {
    const response = await fetch(urls.total);
    if (response.status >= 400) {
        throw(new Error('Error fetching sessions'))
    } else {
        return await response.json()
    }
};

//get last five used session names
export const getNames = async (count) => {
    //development server url
    if (env === 'dev') {
        const response = await fetch(urls.names);
        if (response.status >= 400) {
            throw(new Error('Error fetching sessions'))
        } else {
            const names = await response.json();
            //helper function to imitate data returned from server
            return reduceNames(names, count);
        }
    }
};

// export const getMinDate = async () => {
//     const response = await fetch(urls.total);
//     if (response.status >= 400) {
//         throw(new Error('Error fetching minDate'))
//     } else {
//         return await response.json()
//     }
// };

// this is for dev server fetches
export const getSessionsDurations = async (date, length) => {
    let response;
    if (length === 'month') {
        response = await fetch(`${urls.sessionsMonth}?timePeriod=${date}`);
    } else if (length === 'year') {
        response = await fetch(`${urls.sessionsYear}?timePeriod=${date}`);
    }
    if (response.status >= 400) {
        throw(new Error(`Error fetching ${length} sessions`))
    } else {
        return await response.json()
    }
};

// // get mindate
// export const getMinDate = async () => {
//     //development server url
//     if (env === 'dev') {
//         const response = await fetch(urls.minDate);
//         if (response.status >= 400) {
//             throw(new Error('Error fetching minDate'))
//         } else {
//             const names = await response.json();
//             //helper function to imitate data returned from server
//             return reduceNames(names, count);
//         }
//     }
//     await fetch();
// };
