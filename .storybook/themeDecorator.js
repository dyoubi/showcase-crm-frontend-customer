import { Providers } from '../app/core/components/Providers';
import { makeStore } from '../app/core/store/store';

const ThemeDecorator = (Story) => (
  <Providers store={makeStore()}>
    <Story />
  </Providers>
);

export default ThemeDecorator;
