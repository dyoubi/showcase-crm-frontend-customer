# Media Query (MQ)

Generate styled-component compatible media queries simply using existing breakpoints or using your own.

## Available breakpoints

The media-query package provides some reasonable default breakpoints but
you can always use your own.

```ts
import { screen, device } from 'libs/media-query';

screen.XS; // 320px
screen.SM; // 576px
screen.MD; // 768px
screen.LG; // 992px
screen.XL; // 1200px

device.MOBILE; // 320px
device.MOBILE_PLUS; // 414px
device.TABLET; // 768px
device.LAPTOP; // 1200px for big screen
```

## Available functions

```ts
import { mq } from 'libs/media-query';

const min = '320px';
const max = '1200px';

mq.from(min)``;
mq.to(max)``;
mq.between(min, max)``;

const props = { color: 'testprop' };
mq.with(props).from(min)``;
mq.with(props).to(max)``;
mq.with(props).between(min, max)``;
```

## Usage

```ts
import { mq, screen } from 'lib/media-query';
import styled from 'styled-components';

// simplest use case
const MyElement = styled.div`
  background: blue;

  ${mq.between(screen.MD, screen.LG)`
    background: red;
  `}
`;

// this method only works if props are used directly. If using a nested
// props callback you will need to use the method below.
const MyElementWithProps = styled.div`
  background: blue;

  ${(props) => mq.between(screen.MD, screen.LG)`
    background: ${props.color};
  `}
`;

// this method work if are used in a nested props callback
const MyElementWithPropsCallback = styled.div`
  background: blue;

  ${(props) => mq.with(props).between(screen.MD, screen.LG)`
    background: ${({ color }) => color};
  `}
`;

// using your own breakpoints
const MyElementWithCustomBreakpoints = styled.div`
  background: blue;

  ${mq.between('100px', '200px')`
    background: red;
  `}
`;
```
