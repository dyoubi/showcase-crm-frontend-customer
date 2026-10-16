import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { MenuItemProps, MenuVariant } from './Menu.types';

export const StyledMenu = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  margin: 0,
  padding: 0,
  ...getTypography(theme.typography.body.medium),
  fontWeight: 400,

  listStyle: 'none',
}));

export const StyledMenuItem = styled.li<MenuItemProps>(({ theme, isActive, variant }) => ({
  overflow: 'hidden',
  border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[40]}`,
  cursor: 'pointer',

  '> *': {
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: theme.padding.s,
    color: theme.rebrandingColors.palette.light[20],
    textDecoration: 'none',

    ...(variant === MenuVariant.Tooltip
      ? {
          justifyContent: 'center',

          span: {
            display: 'block',
            flex: 1,
            textAlign: 'center',
          },
        }
      : {}),

    '&:hover': {
      background: theme.rebrandingColors.palette.dark[100],
    },
  },

  svg: {
    marginRight: theme.margin.xxs,
  },

  '& + &': {
    borderTop: 'none',
  },

  ...(variant === MenuVariant.Tooltip
    ? {
        background: theme.rebrandingColors.palette.dark[20],

        ':first-child': {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },

        ':last-child': {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
      }
    : {}),

  ...(isActive
    ? {
        '& > *, &:hover > *': {
          background: theme.rebrandingColors.colorsToBeDeprecated.dark[60],
          fontWeight: 700,
        },

        ...(variant === MenuVariant.Lateral
          ? {
              borderWidth: 0,
            }
          : {}),

        '&:not(:last-child)': {
          borderBottomWidth: 1,
        },
      }
    : {}),
}));
