export const SSRErrorsType = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNKNOWN_API_ERROR: 'UNKNOWN_API_ERROR',
} as const;

export const AuthApiErrorEnums = {
  INVALID_CREDENTIALS: 'invalid_credentials',
} as const;

export type HeaderSettings = {
  [key: string]: string;
};

export type SSRRequestOptions = {
  headers: HeaderSettings;
};
