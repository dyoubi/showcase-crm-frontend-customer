import React from 'react';

export type NativeDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

// We need to add a `readonly any[]` else the helper doesn't detect arrays as const
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueOf<T> = T extends ReadonlyArray<any> | Array<any> ? T[number] : T[keyof T];

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Primitives = number | string | boolean | null | undefined;

export type AnySerializableObject = {
  [key: string]:
    | Primitives
    | AnySerializableObject
    | Array<AnySerializableObject | Primitives>
    | ReadonlyArray<AnySerializableObject | Primitives>;
};
