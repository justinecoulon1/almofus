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
      monthIndex: dayjs(date).month(),
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

export function getMonthStartAndEndDate(currentDayJs: Dayjs) {
  const daysInMonth = currentDayJs.daysInMonth();
  const month = currentDayJs.month() + 1;
  const year = currentDayJs.year();
  const startDate = year.toString().concat(month.toString().padStart(2, '0'), '01');
  const endDate = year.toString().concat(month.toString().padStart(2, '0'), daysInMonth.toString());
  return { startDate: startDate, endDate: endDate };
}

export const DaysOfWeek = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
} as const;

export const Months = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
} as const;
