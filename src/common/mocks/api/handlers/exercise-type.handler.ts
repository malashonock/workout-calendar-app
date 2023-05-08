import { PathParams, RestHandler, rest } from 'msw';

import { ExerciseTypeDto } from 'common/model/dto';
import { apiBaseUrl } from 'common/utils';
import { ExerciseTypeRepository } from 'common/mocks/repo';
import { ExerciseTypeEntity } from 'common/mocks/entities';

const getExerciseTypesHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  ExerciseTypeDto[] | string
>(`${apiBaseUrl}/exercisetypes`, async (req, res, ctx) => {
  try {
    const types: ExerciseTypeEntity[] =
      await ExerciseTypeRepository.getAllTypes();
    return res(ctx.status(200), ctx.json(types as ExerciseTypeDto[]));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const getExerciseTypeHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  ExerciseTypeDto | string
>(`${apiBaseUrl}/exercisetypes/:typeId`, async (req, res, ctx) => {
  try {
    const typeId = req.params.typeId as string;
    if (!typeId) {
      return res(ctx.status(400), ctx.text('Exercise type id not specified'));
    }

    const type: ExerciseTypeEntity | null =
      await ExerciseTypeRepository.getTypeById(typeId);

    if (!type) {
      return res(ctx.status(404), ctx.text('Exercise type not found'));
    }

    return res(ctx.status(200), ctx.json(type as ExerciseTypeDto));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

export const exerciseTypeHandlers = [
  getExerciseTypeHandler,
  getExerciseTypesHandler,
];
