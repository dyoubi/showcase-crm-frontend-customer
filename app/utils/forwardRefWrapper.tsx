import { ComponentType, ForwardedRef, forwardRef, PropsWithoutRef } from 'react';

export type GenericForward<T = unknown> = ComponentType<T>;

// Want to know more?
// Please check ADR file: 0016-forward-ref-wrapper.md
export function forwardRefWrapper<CPROP>(Component: GenericForward<PropsWithoutRef<CPROP>>) {
  const component = (props: PropsWithoutRef<CPROP>, ref: ForwardedRef<HTMLElement>) => (
    <Component {...props} forwardedRef={ref} />
  );

  component.displayName = Component.displayName || Component.name;

  return forwardRef(component);
}
