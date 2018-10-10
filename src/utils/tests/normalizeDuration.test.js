import normalizeDuration from './../normalizeDuration';

describe('normalizeDuration', () => {
    it('shows minutes if under 1 hour duration', () => {
        expect(normalizeDuration(3500000)).toBe('58 min');
    });

    it('shows hours if over 1 hour duration', () => {
        expect(normalizeDuration(3600000)).toBe('1 h');
    });

    it('shows hours if over 1 hour duration', () => {
        expect(normalizeDuration(3800000)).toBe('1 h 3 min');
    });
});
