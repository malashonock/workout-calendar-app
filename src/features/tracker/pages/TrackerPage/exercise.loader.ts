import { LoaderFunction } from 'react-router-dom';

import { ExerciseDto } from 'common/model/dto';
import { ExerciseService } from 'common/services';

export const exerciseLoader =
  (token?: string): LoaderFunction =>
  async ({ params }): Promise<ExerciseDto[]> => {
    try {
      const { date } = params;

      if (!token) {
        throw new Error('User not authenticated');
      }

      if (!date) {
        throw new Error('No date provided');
      }

      return await ExerciseService.getUserDayExercises(date, token);
    } catch (error) {
      return [];
    }
  };
