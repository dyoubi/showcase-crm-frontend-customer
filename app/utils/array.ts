import isNil from 'lodash/isNil';

export const removeNilValuesFromArray = <C>(array: Array<C> | ReadonlyArray<C>) => [...array].filter((it) => isNil(it));
