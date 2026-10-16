/* eslint-disable sort-keys */
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  padding: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '18px',
    l: '24px',
    xl: '32px',
    xxl: '56px',
  },
  margin: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '24px',
    l: '32px',
    xl: '64px',
    xxl: '96px',
  },
  typography: {
    fontFamily: 'loos-wide, sans-serif',
    heading: {
      h1: {
        fontSize: '56px',
        fontWeight: 700,
        lineHeight: '67.5px',
      },
      h2: {
        fontSize: '40px',
        fontWeight: 700,
        lineHeight: '48px',
      },
      h3: {
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '40px',
      },
      h4: {
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '32px',
      },
      h5: {
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: '30px',
      },
    },
    body: {
      big: {
        fontSize: '18px',
        lineHeight: '24px',
      },
      medium: {
        fontSize: '16px',
        lineHeight: '24px',
      },
      small: {
        fontSize: '14px',
        lineHeight: '18px',
      },
      xsmall: {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
    button: {
      extraBig: {
        fontSize: '18px',
        lineHeight: '24px',
      },
      big: {
        fontSize: '16px',
        lineHeight: '24px',
      },
      medium: {
        fontSize: '12px',
        lineHeight: '16px',
      },
      small: {
        fontSize: '12px',
        lineHeight: '16px',
      },
      block: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    caption: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
    },
    headline: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '32px',
    },
    subheadline: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    },
  },
  sizes: {
    icons: {
      // TODO check with ui design team if all these values are correctly set
      xxxs: 6,
      xxs: 9,
      xs: 12,
      s: 14,
      m: 18,
      l: 24,
      xl: 32,
      xxl: 48,
    },
    button: {
      padding: {
        extraBig: '20px 93px',
        big: '20px 93px',
        medium: '16px 60px',
        small: '8px 16px',
        block: '20px 93px',
      },
    },
  },
  zIndexes: {
    modal: 1000,
    tooltip: 300,
  },
  rebrandingColors: {
    gradients: {
      blue: 'linear-gradient(90deg, #0066FE 41.82%, #00D1FF 105.56%)',
      yellow: 'linear-gradient(90deg, #F8D102 41.82%, #FFFA7E 105.56%)',
      grey: 'linear-gradient(90deg, #A1ABB2 41.82%, #E1F6FF 105.56%)',
      red: 'linear-gradient(90deg, #FF005C 41.82%, #FF307B 105.56%)',
      orange: 'linear-gradient(90deg, #FE5B00 41.82%, #FFA800 105.56%)',
      green: 'linear-gradient(90deg, #33FF00 41.82%, #CF0 105.56%)',
      genesis: 'linear-gradient(90deg, #AD34C6 41.82%, #FF307B 105.56%)',
      // notificationBlue: 'linear-gradient(90deg, #0166FF 41.82%, #00D1FF 105.56%)',
    },
    palette: {
      dark: {
        10: '#120D2A',
        20: '#0E0B1C',
        40: '#120D2A',
        60: '#231B47',
        80: '#150F30',
        100: '#221B42',
      },
      light: {
        20: '#FFFFFF',
        40: '#79819A',
        60: '#405678',
        80: '#30265C',
      },
      green: {
        20: '#24B500',
      },
      gray: {
        20: '#9EA4B9',
      },
      blue: {
        20: '#0066FE',
      },
    },
    backgroundColor: '#150F30',
    colorsToBeDeprecated: {
      link: '#496DD0',
      dark: {
        20: '#6C7FA5',
        40: '#555E7A',
        60: '#373C4A',
        100: '#151A24',
      },
      green: {
        40: '#BDFDD4',
      },
      blue: {
        20: '#BBDDFF',
        40: '#8DBCFF',
        60: '#628CE9',
      },
      yellow: {
        20: '#FFFED2',
        70: '#FFC14D',
        80: '#EEB001',
      },
      orange: {
        20: '#FFA67E',
        60: '#FF8650',
        80: '#FD5F18',
      },
      orangeWarning: '#F6B05D',
      red: {
        40: '#E8726C',
        100: '#E53535',
      },
      gray: {
        40: '#D9D9D933',
        60: '#888888',
      },
    },
    colorVariants: {
      success: '#00FF73',
      warning: '#FFA800',
      danger: '#FF005C',
    },
  },
};

export { theme };
