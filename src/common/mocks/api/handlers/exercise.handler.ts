import { PathParams, RestHandler, rest } from 'msw';
import dayjs from 'dayjs';
import _ from 'lodash';

import {
  CalendarStatsDto,
  ExerciseDto,
  ExerciseStatsDto,
  ExerciseTypeDto,
} from 'common/model/dto';
import { isAuthenticated } from '../middleware';
import { ExerciseFields } from 'common/model/form-fields';
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
import { ExerciseStatus, TimeScale } from 'common/types';

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
  Partial<ExerciseFields>,
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

    const exerciseData = await req.json<ExerciseFields>();

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
      .format('YYYY-MM');
    const nextMonth: MonthString = dayjs(currMonth)
      .add(+1, 'month')
      .format('YYYY-MM');

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
          dayjs(new Date()).add(-1, 'day'),
        );
        if (isFutureDate) {
          return DayStatus.ToDo;
        }

        const allDone: boolean = dayExercises.every(
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
>(`${apiBaseUrl}/tracker/:date`, async (req, res, ctx) => {
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

const getUserExerciseStatsHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  ExerciseStatsDto[] | string
>(`${apiBaseUrl}/stats`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const user = await UserRepository.getUserByToken(extractToken(req));
    if (!user) {
      return res(ctx.status(403), ctx.text('Invalid authentication token'));
    }

    const timeScale = req.url.searchParams.get('timeScale');
    if (!timeScale) {
      return res(ctx.status(400), ctx.text('Time scale not specified'));
    }

    const startDate = req.url.searchParams.get('startDate');
    if (!startDate || !dayjs(startDate).isValid()) {
      return res(
        ctx.status(400),
        ctx.text('Start date not specified or invalid'),
      );
    }

    const endDate = dayjs(startDate)
      .endOf(timeScale as TimeScale)
      .toDate();

    const allUserExercises: ExerciseEntity[] =
      await ExerciseRepository.getAllUserExercises(user.id);

    const groupedByType = _(allUserExercises)
      .filter((exercise) => {
        const date = dayjs(exercise.date).toDate();
        return date >= dayjs(startDate).toDate() && date <= endDate;
      })
      .groupBy('exerciseTypeId')
      .mapValues((exercises) =>
        exercises.map((exercise) => ({
          status: exercise.status,
          date: dayjs(exercise.date).toDate(),
          effort: exercise.effort * (exercise.setsCount || 1),
        })),
      )
      .value();

    // console.log(groupedByType);

    const aggregateEffort = _(groupedByType)
      .mapValues((exercises) =>
        exercises.reduce((total, curr) => total + curr.effort, 0),
      )
      .value();

    // console.log('total effort', aggregateEffort);

    const groupedByTypePrev = _(allUserExercises)
      .filter((exercise) => {
        const date = dayjs(exercise.date).toDate();
        const prevStartDate = dayjs(startDate)
          .add(-1, timeScale as TimeScale)
          .toDate();
        return date >= prevStartDate && date < dayjs(startDate).toDate();
      })
      .groupBy('exerciseTypeId')
      .mapValues((exercises) =>
        exercises.map((exercise) => ({
          effort: exercise.effort * (exercise.setsCount || 1),
        })),
      )
      .mapValues((exercises) =>
        exercises.reduce((total, curr) => total + curr.effort, 0),
      )
      .value();

    // console.log('by type (prev)', groupedByTypePrev);

    const aggregateChange = _(aggregateEffort)
      .mapValues((currEffort, exerciseTypeId) => {
        const prevEffort = groupedByTypePrev[exerciseTypeId];
        return prevEffort
          ? Math.round(((currEffort - prevEffort) / prevEffort) * 100) / 100
          : undefined;
      })
      .value();

    // console.log('change', aggregateChange);

    const subperiodKey = (() => {
      switch (timeScale) {
        case TimeScale.Year:
          return 'month';
        case TimeScale.Month:
        default:
          return 'day';
        case TimeScale.Week:
          return 'dayOfWeek';
      }
    })();

    const aggregateBySubperiod = _(groupedByType)
      .mapValues((exercises) =>
        _(exercises)
          .map((exercise) => {
            const subperiodValue = (() => {
              switch (subperiodKey) {
                case 'dayOfWeek':
                  return exercise.date.toLocaleString('default', {
                    weekday: 'short',
                  });
                case 'day':
                default:
                  return dayjs(exercise.date).day();
                case 'month':
                  return dayjs(exercise.date).month();
              }
            })();
            return {
              [subperiodKey]: subperiodValue,
              effort: exercise.effort,
            };
          })
          .groupBy(subperiodKey)
          .mapValues((exercises) =>
            exercises.reduce((total, curr) => total + curr.effort, 0),
          )
          .value(),
      )
      .mapValues((exercises) =>
        Object.entries(exercises).map(([subperiodValue, effort]) => ({
          [subperiodKey]: subperiodValue,
          effort,
        })),
      )
      .value();

    // console.log('by subperiod', aggregateBySubperiod);

    const aggregateByStatus = _(groupedByType)
      .mapValues((exercises) =>
        _(exercises)
          .map((exercise) => ({
            status: exercise.status,
            effort: exercise.effort,
          }))
          .groupBy('status')
          .mapValues((exercises) =>
            exercises.reduce((total, curr) => total + curr.effort, 0),
          )
          .value(),
      )
      .mapValues((exercises) =>
        Object.entries(exercises).map(([status, effort]) => ({
          status: status as ExerciseStatus,
          effort,
        })),
      )
      .value();

    // console.log('by status', aggregateByStatus);

    const exerciseTypes: ExerciseTypeEntity[] =
      await ExerciseTypeRepository.getAllTypes();

    const exerciseStats = exerciseTypes
      .map((exerciseType) => ({
        exerciseType,
        timeScale: timeScale as TimeScale,
        startDate,
        totalEffort: aggregateEffort[exerciseType.id],
        effortChange: aggregateChange[exerciseType.id],
        breakdownByStatus: aggregateByStatus[exerciseType.id],
        breakdownBySubperiod: aggregateBySubperiod[exerciseType.id],
      }))
      .filter(
        (exerciseType) => exerciseType.totalEffort > 0,
      ) as ExerciseStatsDto[];

    console.log(exerciseStats);

    return res(ctx.status(200), ctx.json(exerciseStats));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

export const excerciseHandlers = [
  getExerciseHandler,
  getUserCalendarStatsHandler,
  getUserDayExercisesHandler,
  getUserExerciseStatsHandler,
  createExerciseHandler,
  updateExerciseHandler,
  deleteExerciseHandler,
];
