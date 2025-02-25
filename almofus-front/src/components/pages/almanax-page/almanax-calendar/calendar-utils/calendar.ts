import dayjs, { Dayjs } from 'dayjs';

const TOTAL_CALENDAR_DAYS = 7 * 6;

export function generateCalendar(date: Dayjs): number[] {
  const nbDaysInMonth = dayjs(date).daysInMonth();
  const firstDayOfTheMonthIndex = (date.startOf('month').get('day') + 6) % 7;

  const calendar: number[] = [];
  for (let i = 0; i < firstDayOfTheMonthIndex; i++) {
    calendar.push(0);
  }
  for (let i = 1; i <= nbDaysInMonth; i++) {
    calendar.push(i);
  }
  for (let i = 0; i < TOTAL_CALENDAR_DAYS - nbDaysInMonth - firstDayOfTheMonthIndex; i++) {
    calendar.push(0);
  }
  return calendar;
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
