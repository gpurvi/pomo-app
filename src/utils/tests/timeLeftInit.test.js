import {timeLeftInit} from "../timeLeftInit";

const sessionState = {
    timerDuration: 5000,
    breakDuration: 500000,
    timerStarted: false,
    timerEndAt: 0,
    breakTimerEndAt: 0,
    sessionName: "gatis",
    breakTimerStarted: false,
    timerPaused: false,
    timeLeft: 0
};

//mock Date to return fixed value all the time
const fixedDate = new Date(1000);
Date = class extends Date {
    constructor() {
        super();
        return fixedDate;
    }
};

describe('timeLeftInit', () => {
    it('should subtract timerEndAt from new Date if timer running', () => {
        let modifiedState = {...sessionState, timerStarted: true, timerEndAt: 5000};
        expect(timeLeftInit(modifiedState)).toBe(4000);
    });

    it('should subtract breakTimerEndAt from new Date if breakTimer is running ', () => {
        let modifiedState = {...sessionState, breakTimerStarted: true, breakTimerEndAt: 5000};
        expect(timeLeftInit(modifiedState)).toBe(4000);
    });

    it('should return timeLeft if no timers running', () => {
        let modifiedState = {...sessionState};
        expect(timeLeftInit(modifiedState)).toBe(0);
    });
});