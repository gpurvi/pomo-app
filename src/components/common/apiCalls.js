import format from 'date-fns/format';
import url from '../urls';
import {reduceNames} from "../../dev/helpers";
import {reduceSessions, reduceSessionsByTimePeriod} from "../../utils/reduceSessions";
import starwarsName from 'startwars-names';

const env = 'dev';
const urls = url(env);

//get by date sessions
export const getSessions = async (date, timePeriod = 'day') => {
    let response;
    if (env === 'dev') {
        if (timePeriod === 'day') {
            response = await fetch(`${urls.sessions}?date=${date}`);
            if (response.status >= 400) {
                throw(new Error('Error fetching sessions'))
            } else {
                return await response.json()
            }
        } else if (timePeriod === 'allTime') {
            //fetch all sessions by name
            response = await fetch(`${urls.sessions}`);
            if (response.status >= 400) {
                throw(new Error('Error fetching sessions'))
            } else {
                const sessions = await response.json();
                return new Promise((resolve) => {
                    resolve(reduceSessions(sessions));
                });
            }
        } else {
            //fetch sessions in year or month
            response = await fetch(`${urls.sessions}?q=${date}`);
            if (response.status >= 400) {
                throw(new Error('Error fetching sessions'))
            } else {
                const sessions = await response.json();
                return new Promise((resolve) => {
                    resolve(reduceSessionsByTimePeriod(sessions, timePeriod));
                });
            }
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
    if (env === 'dev') {
        // id exists so patch single session
        if (id !== undefined) {
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
        } else if (id === undefined) {
            const init = {
                method: "PATCH",
                body: JSON.stringify({sessionName}),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${urls.sessions}/?sessionName=${sessionName}`, init);
            if (response.status >= 400) {
                throw(new Error('Error update sessions'))
            } else {
                return await response.json()
            }
        }
    }
};

//DELETE session(delete)
export const deleteSessions = async (id) => {
    if (env === 'dev') {
        // id exists so patch single session
        if (id !== undefined) {
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
        } else if (id === undefined) {
            const init = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(`${urls.sessions}/?sessionName=gatis`, init);
            if (response.status >= 400) {
                throw(new Error('Error in delete sessions'))
            } else {
                return await response.json()
            }
        }
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

export const getSessionState = async () => {
    if (env === 'dev') {
        const responseState = await fetch(urls.state);
        // const minDate = await getMinDate();
        if (responseState.status >= 400) {
            throw(new Error('Error fetching state'))
        } else {
            return await responseState.json();
            // return new Promise((resolve) => {
            //     resolve({sessionState, appState: {minDate}});
            // });
        }
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
export const getNames = async () => {
    //development server url
    if (env === 'dev') {
        const response = await fetch(urls.names);
        if (response.status >= 400) {
            throw(new Error('Error fetching sessions'))
        } else {
            const names = await response.json();
            //helper function to imitate data returned from server
            return reduceNames(names);
        }
    }
};

// get minDate
export const getMinDate = async () => {
    //development server url
    if (env === 'dev') {
        const response = await fetch(urls.sessions);
        if (response.status >= 400) {
            throw(new Error('Error fetching minDate'))
        } else {
            const sessions = await response.json();
            //helper function to imitate data returned from server
            return sessions[0].date;
        }
    }
};
