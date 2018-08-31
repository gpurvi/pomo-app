import url from './urls';

const urls = url('dev');

export const getSessions = async (date) => {
    const response = await fetch(`${urls.sessions}?date=${date}`);
    if (response.status >= 400) {
        throw(new Error('Error fetching sessions'))
    } else {
        return await response.json()
    }
};

export const postSessions = async (sessionName, duration) => {
    const init = {
        method: "POST",
        body: JSON.stringify({sessionName, duration}),
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

