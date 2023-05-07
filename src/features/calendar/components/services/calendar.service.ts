import { DayResult, DayStatus } from '../../types';

const getMonthResults = async (
  year: number,
  month: number,
): Promise<DayResult[]> => {
  // For now, fake data
  return Promise.resolve([
    {
      date: '2023-05-01',
      status: DayStatus.Done,
    },
    {
      date: '2023-05-03',
      status: DayStatus.Done,
    },
    {
      date: '2023-05-05',
      status: DayStatus.Failed,
    },
    {
      date: '2023-05-09',
      status: DayStatus.ToDo,
    },
    {
      date: '2023-05-11',
      status: DayStatus.ToDo,
    },
    {
      date: '2023-05-16',
      status: DayStatus.ToDo,
    },
    {
      date: '2023-05-18',
      status: DayStatus.ToDo,
    },
    {
      date: '2023-05-23',
      status: DayStatus.ToDo,
    },
    {
      date: '2023-05-25',
      status: DayStatus.ToDo,
    },
  ]);
};

export const CalendarService = {
  getMonthResults,
};
