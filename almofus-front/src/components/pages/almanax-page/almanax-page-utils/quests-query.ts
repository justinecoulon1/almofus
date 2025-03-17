import { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import almanaxQuestRequestProcessor from '@/utils/api/almanax-quest.request-processor';

export function useQuestsQuery(dayJs: Dayjs) {
  return useQuery({
    queryKey: ['almanaxCalendarQuests', dayJs.month(), dayJs.year()],
    staleTime: 1000 * 60 * 5,
    queryFn: () => {
      const { startDate, endDate } = getMonthStartAndEndDate(dayJs);
      return almanaxQuestRequestProcessor.getAlmanaxQuestByDateRange(startDate, endDate);
    },
  });
}

function getMonthStartAndEndDate(dayJs: Dayjs) {
  const year = dayJs.year();
  const month = (dayJs.month() + 1).toString().padStart(2, '0');
  const daysInMonth = dayJs.daysInMonth();

  const startDate = `${year}${month}01`;
  const endDate = `${year}${month}${daysInMonth}`;

  return { startDate, endDate };
}
