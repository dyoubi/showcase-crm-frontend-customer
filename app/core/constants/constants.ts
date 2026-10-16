/* eslint-disable no-useless-computed-key */
export const maxPagesCount = 5;
export const itemsPerPage = 10;

export enum LoginStatesValues {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export type LoginStates =
  | LoginStatesValues.AUTHENTICATED
  | LoginStatesValues.LOADING
  | LoginStatesValues.UNAUTHENTICATED;

export enum LoginEnpoints {
  LOGIN = 'login/',
}

export enum UnrestrictedEnpoints {
  CREATE = 'v1/auth/jwt/create/',
  REFRESH = 'v1/auth/jwt/refresh/',
}

export enum ThemeDirection {
  RTL = 'rtl',
  LTR = 'ltr',
}

export enum PolicyParams {
  PRIVACY = 'privacy',
  AML = 'aml',
  TERMS_OF_SERVICE = 'terms-of-service',
}

export enum LocalStorage {
  SEARCH = 'BITPLAY_SEARCH',
}

export const DATA_TEST_IDS = {
  // auth
  LOGIN_BTN: 'login_btn',
  REGISTER_BTN: 'register-btn',
  CONNECTED_NAV_BAR: 'connected-nav-bar',
  OFFLINE_NAV_BAR: 'offline-nav-bar',
  REGISTER_BIRTH_DATE_INPUT: 'register-birth-date-input',

  // favorite
  FAVORITES_GAMES_CAROUSEL: 'favorites-games-carousel',
  REMOVE_FAVORITE_BTN: 'remove-favorite-btn',
  ADD_FAVORITE_BTN: 'add-favorite-btn',
  ADD_FAVORITE_ICON: 'add-favorite-icon',

  // machine-view
  RUN_REAL_PLAY_BUTTON: 'run-real-play-btn',
  RUN_FUN_PLAY_BUTTON: 'run-fun-play-btn',
  GAME_DETAILS_BOX: 'game-details-box',
  GAME_DETAILS_DESCRIPTION: 'game-details-description',
  GAME_TAG_LINK: 'game-tag-link',
} as const;

export const DateFormatsByLanguage: { [key: string]: string } = {
  ['fr']: 'dd/MM/yyyy HH:mm:ss',
  ['en']: 'MM/dd/yyyy HH:mm:ss',
  default: 'MM/dd/yyyy HH:mm:ss',
};

export const URLDateFormatsByLanguage: { [key: string]: string } = {
  ['fr']: 'dd-MM-yyyy',
  ['en']: 'MM-dd-yyyy',
  default: 'MM-dd-yyyy',
};

export const UIDateFormatsByLanguage: { [key: string]: string } = {
  ['fr']: 'dd MMMM, yyyy',
  ['en']: 'MMMM dd, yyyy',
  default: 'MMMM dd, yyyy',
};

export const EMAIL_LOCAL_PART_LENGTH_REGEX = /^(?=.{1,64}@)/;
export const EMAIL_DOMAIN_LENGTH_REGEX = /@.{1,61}$/;

// Modified to work in Safari iOS 15 by removing negative lookbehind
export const EMAIL_REGEX =
  /^(?!.*\s)(?!\.)(?!.*\.\.)(?!.*\.$)(?!.*@\.)[A-Za-z0-9]+(?:[._+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export const PASSWORD_REQUIREMENTS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+\-=.?~/])[A-Za-z\d!@#$%^&*_+\-=.?~/]+$/;

// Regex for usernames: 5-20 chars, letters, numbers, and [._-] (not at start/end or consecutive)
export const USERNAME_REGEX = /^(?!.*[._-]{2})[A-Za-z0-9][A-Za-z0-9._-]{3,18}[A-Za-z0-9]$/;

export const ZIPCODE_REGEX = /^(?!.*__)(?!.* {2})(?!^ )(?!.*_$)[A-Za-z0-9- ]+$/;

export const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ'-]+)*\s*$/;

export const CITY_REGEX = /^[0-9A-Za-zÀ-ÖØ-öø-ÿ'\-.]+(?:\s[0-9A-Za-zÀ-ÖØ-öø-ÿ'\-.]+)*\s*$/;
