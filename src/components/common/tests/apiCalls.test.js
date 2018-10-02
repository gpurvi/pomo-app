import {getSessions, postSessions, putState, getState, patchSessions, deleteSessions} from '../apiCalls';

describe('getSessions', () => {
    it('returns sessions object if status code is ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve) => {
                resolve({
                    sessions: [],
                })
            }),
        }));

        expect(getSessions()).resolves.toEqual({sessions: []})
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));

        expect(getSessions()).rejects.toEqual(Error('Error fetching sessions'));
    });
});

describe('patchSessions', () => {
    it('patches and returns sessions object if status code is ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve) => {
                resolve({
                    sessions: {},
                })
            }),
        }));
        expect(patchSessions()).resolves.toEqual({sessions: {}})
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));
        expect(patchSessions()).rejects.toEqual(Error('Error update sessions'));
    });
});

describe('deleteSessions', () => {
    it('deletes session', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve) => {
                resolve({
                    sessions: {},
                })
            }),
        }));
        expect(deleteSessions()).resolves.toEqual({sessions: {}})
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));
        expect(deleteSessions()).rejects.toEqual(Error('Error in delete sessions'));
    });
});

describe('postSessions', () => {
    it('returns sessions object if status code is ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve) => {
                resolve({
                    sessions: [],
                })
            }),
        }));
        expect(postSessions()).resolves.toEqual({sessions: []})
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));

        expect(postSessions()).rejects.toEqual(Error('Error posting sessions'));
    });
});

describe('getState', () => {
    it('returns state object if status code is ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve) => {
                resolve({
                    state: [],
                })
            }),
        }));
        expect(getState()).resolves.toEqual({state: []})
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));

        expect(getState()).rejects.toEqual(Error('Error fetching state'));
    });
});

describe('putState', () => {
    it('puts state object', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            ok: true
        }));
        expect(putState()).resolves.toEqual(true)
    });

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500
        }));
        expect(putState()).rejects.toEqual(Error('Error putting state'));
    });
});