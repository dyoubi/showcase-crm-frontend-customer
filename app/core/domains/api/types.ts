import { ValueOf } from '@/utils/typescript';

export const ERRORS_NAMES = {
  UNAUTHORIZED_ERROR: 'UnauthorizedError',
  BAD_REQUEST_ERROR: 'BadRequestError',
  PRECONDITION_FAILED_ERROR: 'PreconditionFailedError',
} as const;

export const ERROR_MESSAGES = {
  CANNONT_CREATE_SESSION: 'cannot_create_session',
  INCOMPLETE_PROFILE_CANNOT_RUN_GAMES: 'incomplete profile cannot run games',
} as const;

export type ErrorNames = ValueOf<typeof ERRORS_NAMES>;
export type ErrorMessages = ValueOf<typeof ERROR_MESSAGES>;

export interface ApiErrorType {
  error: {
    statusCode: number;
    name: ErrorNames;
    message: ErrorMessages;
  };
}
