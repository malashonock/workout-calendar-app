import { PathParams, RestHandler, rest } from 'msw';
import dayjs from 'dayjs';
import _ from 'lodash';

import {
  CalendarStatsDto,
  ExerciseDto,
  ExerciseTypeDto,
} from 'common/model/dto';
import { isAuthenticated } from '../middleware';
import { ExerciseFields, UpdateExerciseFields } from 'common/model/form-fields';
import {
  DateString,
  MonthString,
  apiBaseUrl,
  extractToken,
} from 'common/utils';
import {
  ExerciseRepository,
  ExerciseTypeRepository,
  UserRepository,
} from 'common/mocks/repo';
import { ExerciseEntity, ExerciseTypeEntity } from 'common/mocks/entities';
import { DayStatus } from 'features/calendar/types';
import { ExerciseStatus } from 'common/types';

const createExerciseHandler: RestHandler = rest.post<
  ExerciseFields,
  PathParams<string>,
  ExerciseDto | string
>(`${apiBaseUrl}/exercises`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const user = await UserRepository.getUserByToken(extractToken(req));
    if (!user) {
      return res(ctx.status(403), ctx.text('Invalid authentication token'));
    }

    const exerciseData = await req.json<ExerciseFields>();

    const exerciseType: ExerciseTypeEntity | null =
      await ExerciseTypeRepository.getTypeById(exerciseData.exerciseTypeId);
    if (!exerciseType) {
      return res(ctx.status(404), ctx.text('Unknown exercise type'));
    }

    const createdExercise: ExerciseEntity =
      await ExerciseRepository.addExercise(user.id, exerciseData);

    if (!createdExercise) {
      return res(ctx.status(500), ctx.text('Failed to create new exercise'));
    }

    const { exerciseTypeId, ...excerciseFields } = createdExercise;
    return res(
      ctx.status(201),
      ctx.json({
        ...excerciseFields,
        exerciseType: exerciseType as ExerciseTypeDto,
      }),
    );
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const updateExerciseHandler: RestHandler = rest.patch<
  UpdateExerciseFields,
  PathParams<string>,
  ExerciseDto | string
>(`${apiBaseUrl}/exercises/:exerciseId`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const exerciseId = req.params.exerciseId as string;
    if (!exerciseId) {
      return res(ctx.status(400), ctx.text('Exercise id not specified'));
    }

    const exerciseData = await req.json<UpdateExerciseFields>();

    if (exerciseData.exerciseTypeId) {
      const exerciseType: ExerciseTypeEntity | null =
        await ExerciseTypeRepository.getTypeById(exerciseData.exerciseTypeId);
      if (!exerciseType) {
        return res(ctx.status(404), ctx.text('Unknown exercise type'));
      }
    }

    const updatedExercise: ExerciseEntity =
      await ExerciseRepository.updateExercise(exerciseId, exerciseData);

    const exerciseType: ExerciseTypeEntity | null =
      await ExerciseTypeRepository.getTypeById(updatedExercise.exerciseTypeId);
    if (!exerciseType) {
      return res(ctx.status(404), ctx.text('Unknown exercise type'));
    }

    const { exerciseTypeId, ...excerciseFields } = updatedExercise;
    return res(
      ctx.status(200),
      ctx.json({
        ...excerciseFields,
        exerciseType: exerciseType as ExerciseTypeDto,
      }),
    );
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const deleteExerciseHandler: RestHandler = rest.delete<
  null,
  PathParams<string>,
  string
>(`${apiBaseUrl}/exercises/:exerciseId`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const exerciseId = req.params.exerciseId as string;
    if (!exerciseId) {
      return res(ctx.status(400), ctx.text('Exercise id not specified'));
    }

    await ExerciseRepository.deleteExercise(exerciseId);

    return res(ctx.status(200), ctx.text('Exercise deleted'));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const getUserCalendarStatsHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  CalendarStatsDto | string
>(`${apiBaseUrl}/calendar/:month`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const user = await UserRepository.getUserByToken(extractToken(req));
    if (!user) {
      return res(ctx.status(403), ctx.text('Invalid authentication token'));
    }

    const currMonth = req.params.month as MonthString;
    if (!currMonth) {
      return res(ctx.status(400), ctx.text('Month not specified'));
    }

    const prevMonth: MonthString = dayjs(currMonth)
      .add(-1, 'month')
      .format('YYYY-DD');
    const nextMonth: MonthString = dayjs(currMonth)
      .add(+1, 'month')
      .format('YYYY-DD');

    const currMonthExercises = await ExerciseRepository.getUserExercisesByMonth(
      user.id,
      currMonth,
    );
    const prevMonthExercises = await ExerciseRepository.getUserExercisesByMonth(
      user.id,
      prevMonth,
    );
    const nextMonthExercises = await ExerciseRepository.getUserExercisesByMonth(
      user.id,
      nextMonth,
    );
    const exercises = [
      ...prevMonthExercises,
      ...currMonthExercises,
      ...nextMonthExercises,
    ];

    const calendarStats = _(exercises)
      .groupBy('date')
      .mapValues((dayExercises: ExerciseEntity[]): DayStatus | null => {
        if (dayExercises.length === 0) {
          return null;
        }

        const isFutureDate: boolean = dayjs(dayExercises[0].date).isAfter(
          dayjs(new Date()),
        );
        if (isFutureDate) {
          return DayStatus.ToDo;
        }

        const allDone: boolean = exercises.every(
          (exercise: ExerciseEntity): boolean =>
            exercise.status === ExerciseStatus.Done,
        );
        if (allDone) {
          return DayStatus.Done;
        }

        return DayStatus.Missed;
      })
      .omitBy(_.isNull)
      .value() as CalendarStatsDto;

    return res(ctx.status(200), ctx.json(calendarStats));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const getExerciseHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  ExerciseDto | string
>(`${apiBaseUrl}/exercises/:exerciseId`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const exerciseId = req.params.exerciseId as string;
    if (!exerciseId) {
      return res(ctx.status(400), ctx.text('Exercise id not specified'));
    }

    const exercise: ExerciseEntity | null =
      await ExerciseRepository.getExerciseById(exerciseId);

    if (!exercise) {
      return res(ctx.status(404), ctx.text('Exercise not found'));
    }

    const exerciseType: ExerciseTypeEntity | null =
      await ExerciseTypeRepository.getTypeById(exercise.exerciseTypeId);
    if (!exerciseType) {
      return res(ctx.status(404), ctx.text('Unknown exercise type'));
    }

    const { exerciseTypeId, ...excerciseFields } = exercise;
    return res(
      ctx.status(200),
      ctx.json({
        ...excerciseFields,
        exerciseType: exerciseType as ExerciseTypeDto,
      }),
    );
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const getUserDayExercisesHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  ExerciseDto[] | string
>(`${apiBaseUrl}/exercises/:date`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const user = await UserRepository.getUserByToken(extractToken(req));
    if (!user) {
      return res(ctx.status(403), ctx.text('Invalid authentication token'));
    }

    const date = req.params.date as DateString;
    if (!date) {
      return res(ctx.status(400), ctx.text('Date not specified'));
    }

    const exercises: ExerciseEntity[] =
      await ExerciseRepository.getUserExercisesByDate(user.id, date);
    const exerciseTypes: ExerciseTypeEntity[] =
      await ExerciseTypeRepository.getAllTypes();

    try {
      const exerciseDtos: ExerciseDto[] = exercises.map(
        (exercise: ExerciseEntity): ExerciseDto => {
          const { exerciseTypeId, ...excerciseFields } = exercise;

          const exerciseType = exerciseTypes.find(
            (type: ExerciseTypeEntity): boolean => type.id === exerciseTypeId,
          );
          if (!exerciseType) {
            throw new Error('Unknown exercise type');
          }

          return {
            ...excerciseFields,
            exerciseType,
          };
        },
      );

      return res(ctx.status(200), ctx.json(exerciseDtos));
    } catch (error) {
      return res(ctx.status(400), ctx.text((error as Error).message));
    }
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

export const excerciseHandlers = [
  getExerciseHandler,
  getUserCalendarStatsHandler,
  getUserDayExercisesHandler,
  createExerciseHandler,
  updateExerciseHandler,
  deleteExerciseHandler,
];
