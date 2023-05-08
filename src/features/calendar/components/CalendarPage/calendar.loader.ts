import { LoaderFunction } from 'react-router-dom';

import { CalendarStatsDto } from 'common/model/dto';
import { ExerciseService } from 'common/services';

export const calendarLoader =
  (token?: string): LoaderFunction =>
  async ({ params }): Promise<CalendarStatsDto> => {
    try {
      const { yearMonth } = params;

      if (!token) {
        throw new Error('User not authenticated');
      }

      if (!yearMonth) {
        throw new Error('No year/month provided');
      }

      return await ExerciseService.getUserCalendarStats(yearMonth, token);
    } catch (error) {
      return {};
    }
  };
