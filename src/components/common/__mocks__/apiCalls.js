export const getSessions = jest.fn()
    .mockImplementationOnce(() =>
        [
            {
                "sessionName": "pomodor app",
                "date": "2018-07-31",
                "duration": 1500000,
                "id": 1
            },
            {
                "sessionName": "pomodor app",
                "date": "2018-07-31",
                "duration": 1500000,
                "id": 2
            }
        ]
    )
    .mockImplementationOnce(() => {
        throw(new Error('Error fetching sessions'))
    });

export const patchSessions = jest.fn()
    .mockImplementationOnce(() => (
            {
                "sessionName": "pomodor",
                "date": "2018-07-31",
                "duration": 1500000,
                "id": 1
            }
        )
    )
    .mockImplementationOnce(() => {
        throw(new Error('Error update sessions'))
    });

export const deleteSessions = jest.fn()
    .mockImplementationOnce(() => 'OK')
    .mockImplementationOnce(() => {
        throw(new Error('Error in delete sessions'))
    });


export const postSessions = jest.fn()
    .mockImplementationOnce(() =>
        [
            {
                "sessionName": "pomodor app",
                "duration": 1500000,
                "id": 1
            }
        ],
    )
    .mockImplementationOnce(() => {
        throw(new Error('Error posting sessions'))
    });

export const getState = jest.fn()
    .mockImplementationOnce(() => ({
            timerStarted: true
        })
    )
    .mockImplementationOnce(() => {
        throw(new Error('Error fetching state'))
    });

export const putState = jest.fn()
    .mockImplementationOnce(() => true
    )
    .mockImplementationOnce(() => {
        throw(new Error('Error putting state'))
    });