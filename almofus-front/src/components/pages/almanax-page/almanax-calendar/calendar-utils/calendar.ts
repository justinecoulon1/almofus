import dayjs, { Dayjs } from 'dayjs';

const TOTAL_CALENDAR_DAYS = 7 * 6;

export type CalendarDateInfo = {
  monthIndex: number;
  dayIndex: number;
};

export function generateCalendar(date: Dayjs): CalendarDateInfo[] {
  const nbDaysInPreviousMonth = date.add(-1, 'month').daysInMonth();
  const nbDaysInCurrentMonth = dayjs(date).daysInMonth();
  const firstDayOfTheMonthIndex = (date.startOf('month').get('day') + 6) % 7;

  const calendar: CalendarDateInfo[] = [];
  for (let i = 0; i < firstDayOfTheMonthIndex; i++) {
    calendar.push({
      monthIndex: date.add(-1, 'month').month(),
      dayIndex: nbDaysInPreviousMonth - firstDayOfTheMonthIndex + 1 + i,
    });
  }
  for (let i = 1; i <= nbDaysInCurrentMonth; i++) {
    calendar.push({
      monthIndex: date.month(),
      dayIndex: i,
    });
  }
  for (let i = 0; i < TOTAL_CALENDAR_DAYS - nbDaysInCurrentMonth - firstDayOfTheMonthIndex; i++) {
    calendar.push({
      monthIndex: date.add(1, 'month').month(),
      dayIndex: i + 1,
    });
  }
  return calendar;
}
