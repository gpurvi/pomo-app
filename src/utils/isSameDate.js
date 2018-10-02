import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';

const isSameDate = (firstDate, secDate, timePeriod = 'day') => {
    if (timePeriod === 'day') {
        return isSameDay(firstDate, secDate) &&
            isSameMonth(firstDate, secDate) &&
            isSameYear(firstDate, secDate);
    } else if (timePeriod === 'month') {
        return isSameMonth(firstDate, secDate) &&
            isSameYear(firstDate, secDate);
    } else if (timePeriod === 'year') {
        return isSameYear(firstDate, secDate);
    }
};

export default isSameDate;