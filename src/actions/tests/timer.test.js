import React from 'react';
import {
    initTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    startBreakTimer,
    tick,
    changeName,
    error
} from "../timer";


const sessionState = {
    timerDuration: 5000,
    breakDuration: 500000,
    timerStarted: true,
    timerEndAt: 0,
    breakTimerEndAt: 0,
    sessionName: "gatis",
    breakTimerStarted: false,
    timerPaused: false,
    timeLeft: 0
};


describe('initTimer', () => {
    //init localeStorage
    localStorage.setItem('sessionState', JSON.stringify({...sessionState}));
    it('calls dispatch with state from localeStorage', async () => {
        const timeLeftInit = jest.fn().mockImplementation(() => -1);

        const dispatch = jest.fn();
        await initTimer()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({});
    });

});
