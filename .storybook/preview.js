import ThemeDecorator from './themeDecorator';
import { fn } from '@storybook/test';
import './storybook-global.css';

export const parameters = {
  actions: {
    args: {
      onClick: fn(),
    },
  },
  background: {
    default: 'bitplay',
    values: [
      {
        name: 'bitplay',
        value: '#161a23',
      },
    ],
  },
};

export const decorators = [ThemeDecorator];
export const tags = ['autodocs'];
