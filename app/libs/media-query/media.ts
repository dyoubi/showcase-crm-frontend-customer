export const viewports = [
  { device: 'MOBILE', max: 375 },
  { device: 'MOBILE_PLUS', max: 480 },
  { device: 'TABLET', max: 768 },
  { device: 'TABLET_PLUS', max: 1024 },
  { device: 'TABLET_OR_PHONE', max: 768 },
  { device: 'DESKTOP' },
];

export const device = Object.freeze({
  MOBILE: '375px',
  MOBILE_PLUS: '480px',
  TABLET: '768px',
  TABLET_PLUS: '1024px',
  TABLET_OR_PHONE: '768px',
  DESKTOP: '1200px',
});

export const screen = Object.freeze({
  XS: '375px',
  SM: '480px',
  MD: '768px',
  LG: '1024px',
  XL: '1200px',
  XXL: '1440px',
});

export const sizeWidth = Object.freeze({
  sm: '640px',
  md: '768px',
  lg: '1024px',
});

export const deviceVP = Object.freeze({
  sm: `@media(min-width: ${sizeWidth.sm})`,
  md: `@media(min-width: ${sizeWidth.md})`,
  lg: `@media(min-width: ${sizeWidth.lg})`,
});

export function combine(strings: TemplateStringsArray, args: Array<any>, props: any = undefined): string {
  const stringArgs = args.map((v) => {
    if (typeof v === 'function') {
      return props !== undefined ? v(props) : v();
    }

    return v;
  });

  return strings
    .reduce((acc, cur, idx) => [...acc, cur, stringArgs[idx] ?? ''], [] as Array<string>)
    .filter((v) => !!v)
    .join('');
}

type MediaQueryFunction = {
  (strings: TemplateStringsArray, ...args: Array<any>): string;
  toString(): string;
};

type MqProps = {
  with(props: any): {
    between(fromSize: string, toSize: string): MediaQueryFunction;
    from(size: string): MediaQueryFunction;
    until(size: string): MediaQueryFunction;
  };
};

export const mq: MqProps = Object.freeze({
  with: (props: any) =>
    Object.freeze({
      between: (fromSize: string, toSize: string) => {
        const mediaQuery = `@media (min-width: ${fromSize}) and (max-width: ${toSize})`;
        const fn = (strings?: TemplateStringsArray, ...args: Array<any>) => {
          if (!strings) return mediaQuery;

          return `${mediaQuery} { ${combine(strings, args, props)} }`;
        };

        fn.toString = () => mediaQuery;

        return fn as MediaQueryFunction;
      },
      from: (size: string) => {
        const mediaQuery = `@media (min-width: ${size})`;
        const fn = (strings?: TemplateStringsArray, ...args: Array<any>) => {
          if (!strings) return mediaQuery;

          return `${mediaQuery} { ${combine(strings, args, props)} }`;
        };

        fn.toString = () => mediaQuery;

        return fn as MediaQueryFunction;
      },
      until: (size: string) => {
        const mediaQuery = `@media (max-width: ${size})`;
        const fn = (strings?: TemplateStringsArray, ...args: Array<any>) => {
          if (!strings) return mediaQuery;

          return `${mediaQuery} { ${combine(strings, args, props)} }`;
        };

        fn.toString = () => mediaQuery;

        return fn as MediaQueryFunction;
      },
    }),
});
