import { setupWorker } from 'msw';
import {
  userHandlers,
  authHandlers,
  excerciseHandlers,
  exerciseTypeHandlers,
} from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...userHandlers,
  ...authHandlers,
  ...excerciseHandlers,
  ...exerciseTypeHandlers,
);
