import { combine, device, mq, screen } from './media';

describe('media', () => {
  it('should generate between media queries', () => {
    const result = mq.with({ color: 'red' }).between(screen.SM, screen.LG)`
      background: ${(props: any) => props.color};
    `;

    expect(result).toContain('@media (min-width: 480px) and (max-width: 1024px)');
    expect(result).toContain('background: red;');
  });

  it('should generate from media queries', () => {
    const result = mq.with({ color: 'red' }).from(screen.SM)`
      background: ${(props: any) => props.color};
    `;

    expect(result).toContain('@media (min-width: 480px)');
    expect(result).toContain('background: red;');
  });

  it('should handle empty props in combine function', () => {
    const result = mq.with({}).from(screen.SM)`
      background: red;
    `;

    expect(result).toContain('@media (min-width: 480px)');
    expect(result).toContain('background: red;');
  });

  it('should handle functions in combine function', () => {
    const result = mq.with({ color: () => 'blue' }).from(screen.SM)`
      background: ${(props: any) => props.color()};
    `;

    expect(result).toContain('@media (min-width: 480px)');
    expect(result).toContain('background: blue;');
  });

  it('should handle nested media queries', () => {
    const result = mq.with({ color: 'red' }).from(screen.SM)`
      background: ${(props: any) => props.color};
      ${mq.with({ color: 'blue' }).from(screen.LG)`
        color: ${(props: any) => props.color};
      `}
    `;

    expect(result).toContain('@media (min-width: 480px)');
    expect(result).toContain('background: red;');
    expect(result).toContain('@media (min-width: 1024px)');
    expect(result).toContain('color: blue;');
  });

  it('should generate device media queries', () => {
    const result = mq.with({ color: 'red' }).from(device.MOBILE)`
      background: ${(props: any) => props.color};
    `;

    expect(result).toContain('@media (min-width: 375px)');
    expect(result).toContain('background: red;');
  });

  it('should handle combine function with props', () => {
    const strings = Object.assign(['background: ', ';'], { raw: ['background: ', ';'] });
    const args = [(props: any) => props.color];
    const props = { color: 'green' };

    const result = combine(strings as TemplateStringsArray, args, props);

    expect(result).toBe('background: green;');
  });

  it('should handle combine function without props', () => {
    const strings: TemplateStringsArray = Object.assign(['background: ', ';'], { raw: ['background: ', ';'] });
    const args = ['yellow'];

    const result = combine(strings, args);

    expect(result).toBe('background: yellow;');
  });
});
