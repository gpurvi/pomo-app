export default (env) => {
    if (env === 'dev') {
        return {
            state: 'http://localhost:3000/sessionState',
            sessions: 'http://localhost:3000/sessions',
            total: 'http://localhost:3000/total',
            sessionsMonth: 'http://localhost:3000/month',
            sessionsYear: 'http://localhost:3000/year',
            names: 'http://localhost:3000/sessions/',
            minDate: 'http://localhost:3000/sessions/'
        };
    }
    return {
        registration: '/registration',
        state: 'api/state',
        sessions: 'api/sessions',
        total: 'api/total',
        sessionsMonth: 'api/sessions',
        sessionsYear: 'api/sessions',
        names: 'api/names',
        //todo minDate: '', need to implement
        //todo appState: '', need to implement
    };
}