import format from 'date-fns/format';

const normalizeDuration = (duration) => {
// if under 1 hour don't show 0 hour
    if (duration < 3600000) {
        return format(duration, 'm [min]');
    }
    // if exactly whole hours don't show 0 min
    if ((duration % 3600000) === 0) {
        return format(duration, 'h [h]');
    }
    // show hour and min
    return format(duration, 'h [h] m [min]');
};

export default normalizeDuration;