const normalizeDuration = (duration) => {
// if under 1 hour don't show 0 hour
    const hours = new Date(duration).getUTCHours();
    const min = new Date(duration).getUTCMinutes();
    if (duration < 3600000) {
        return `${min} min`;
    } else if ((duration % 3600000) === 0) {
        // if exactly whole hours don't show 0 min
        return `${hours} h`;
    }
    // show hour and min
    return `${hours} h ${min} min`;
};

export default normalizeDuration;