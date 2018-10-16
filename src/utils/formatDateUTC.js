const formatDateUTC = (duration) => {
    const hours = new Date(duration).getUTCHours();
    if (hours >= 1) {
        return new Date(duration).toUTCString().slice(-12, -4);
    }
    return new Date(duration).toUTCString().slice(-9, -4);
};

export default formatDateUTC;