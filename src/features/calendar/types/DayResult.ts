import { DayStatus } from './DayStatus';

export interface DayResult {
  date: string; // ISO date string: YYYY-MM-DD
  status: DayStatus;
}
