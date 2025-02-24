import dayjs, { Dayjs } from 'dayjs';

export function generateCalendar(date: Dayjs) {
  const nbDaysInMonth = dayjs(date).daysInMonth();
  const firstDayOftheMonthIndex = date.startOf('month').get('day');

  const calendar = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOftheMonthIndex - 1) {
        week[j] = 0;
      } else if (day <= nbDaysInMonth) {
        week[j] = day;
        day++;
      } else {
        week[j] = 0;
      }
    }
    calendar.push([...week]);
  }
  return calendar;
}

export enum DaysOfWeek {
  'MONDAY' = '1',
  'TUESDAY' = '2',
  'WEDNESDAY' = '3',
  'THURSDAY' = '4',
  'FRIDAY' = '5',
  'SATURDAY' = '6',
  'SUNDAY' = '7',
}
