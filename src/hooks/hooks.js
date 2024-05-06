import moment from 'moment';


export const getCurrentMonth = (dates, scrollPosition) => {
  const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM');
  return month;
}