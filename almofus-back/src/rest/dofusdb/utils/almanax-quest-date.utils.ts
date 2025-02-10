import dayjs, { Dayjs } from 'dayjs';
import { AlmanaxMobileDate } from 'src/db/model/almanax-mobile-date.entity';
import { AlmanaxQuest, MobileEvent } from 'src/db/model/almanax-quest.entity';

type MobileDateInfo = {
  day: Dayjs;
  mobileEvent: MobileEvent;
};

export function getMobileDates(year: number, mobileEventAlmanaxQuests: AlmanaxQuest[]): AlmanaxMobileDate[] {
  const easterDate = getEasterDate(year);
  const shroveTuesdayDate = getShroveTuesdayDate(easterDate);
  const ascensionDate = getAscensionDate(easterDate);
  const pentecostDate = getPentecostDate(easterDate);
  const thanksgivingCanadaDate = getThanksgivingCanadaDate(year);
  const thanksgivingUnitedStatesDate = getThanksgivingUnitedStatesDate(year);

  const mobileDateInfos = [
    easterDate,
    shroveTuesdayDate,
    ascensionDate,
    pentecostDate,
    thanksgivingCanadaDate,
    thanksgivingUnitedStatesDate,
  ];

  return mobileDateInfos.map((mobileDateInfo) => {
    const formattedDate = formatMobileDateDay(mobileDateInfo.day);
    const quest = mobileEventAlmanaxQuests.find((quest) => quest.mobileEvent === mobileDateInfo.mobileEvent);
    return new AlmanaxMobileDate(formattedDate, year, quest.id);
  });
}

function formatMobileDateDay(dateDay: Dayjs) {
  return dateDay.format('DD/MM');
}

/**
 * Computation taken from : https://en.wikipedia.org/wiki/Date_of_Easter#Anonymous_Gregorian_algorithm
 * @param year
 * @returns
 */
function getEasterDate(year: number): MobileDateInfo {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = h + l - 7 * m;
  const month = Math.floor((n + 114) / 31);
  const day = ((n + 114) % 31) + 1;

  return {
    day: dayjs(`${year}-${month}-${day}`),
    mobileEvent: MobileEvent.PAQUES,
  };
}

function getShroveTuesdayDate(easterDate: MobileDateInfo): MobileDateInfo {
  return {
    day: easterDate.day.subtract(47, 'day'),
    mobileEvent: MobileEvent.MARDIGRAS,
  };
}

function getAscensionDate(easterDate: MobileDateInfo): MobileDateInfo {
  return {
    day: easterDate.day.add(39, 'day'),
    mobileEvent: MobileEvent.ASCENSION,
  };
}

function getPentecostDate(easterDate: MobileDateInfo): MobileDateInfo {
  return {
    day: easterDate.day.add(50, 'day'),
    mobileEvent: MobileEvent.PENTECOTE,
  };
}

function getThanksgivingCanadaDate(year: number): MobileDateInfo {
  const firstDayOfMonth = dayjs(`${year}-${9 + 1}-01`);
  const firstMondayOfMonth = firstDayOfMonth.day() === 1 ? firstDayOfMonth : firstDayOfMonth.day(1 + 7);
  const thanksgivingCanadaDate = firstMondayOfMonth.day(1 + 7);
  return {
    day: thanksgivingCanadaDate,
    mobileEvent: MobileEvent.THANKSGIVING_CA,
  };
}
function getThanksgivingUnitedStatesDate(year: number): MobileDateInfo {
  const november = dayjs(`${year}-11-01`);
  const firstDayOfMonth = november.startOf('month');
  let firstThursdayOfMonth = firstDayOfMonth.day(4);

  if (firstThursdayOfMonth.month() < 10) {
    firstThursdayOfMonth = firstThursdayOfMonth.add(1, 'week');
  }

  const thanksgivingUnitedStatesDate = firstThursdayOfMonth.add(3, 'week');

  return {
    day: thanksgivingUnitedStatesDate,
    mobileEvent: MobileEvent.THANKSGIVING,
  };
}
