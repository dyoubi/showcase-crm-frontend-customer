import { ReactNode } from 'react';

export enum FieldVariant {
  Default = 'default',
  Error = 'error',
  Valid = 'valid',
  Disabled = 'disabled',
}

export type FeedbackMessageProps = {
  withInput?: boolean;
  variant?: FieldVariant;
  noIcon?: boolean;
  children?: ReactNode;
};
