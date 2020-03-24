export const STAR_PARAMS = {
  MIN_VALUE: 0,
  MAX_VALUE: 5,
  STAR_STEP: 20
};

export const LINKS = {
  INDEX: `/`,
  OFFER_DETAIL: `/offer/`,
  LOGIN: `/login`,
  FAVORITES: `/my-list`
};

export const OFFERS_SORT_ITEMS = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

export const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

export const MAX_PHOTOS_OFFER_DETAIL = 6;

export const AUTHORIZATION_STATUS = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const FAVORITE_REQUESTS = {
  ADD: `1`,
  DELETE: `0`
};

export const REQUEST_STATUS = {
  NO_AUTH: 401,
  OK: 200
};

export const OFFERS_CSS_CLASSES = {
  MAIN: {
    LIST: `cities__places-list`,
    ITEM: `cities__place-card`,
    IMAGE_WRAPPER: `cities__image-wrapper`,
    ITEM_INFO: ``,
    IMAGE_SIZE: {
      WIDTH: 260,
      HEIGHT: 200
    }
  },
  OFFER_DETAIL: {
    LIST: `near-places__list`,
    ITEM: `near-places__card`,
    IMAGE_WRAPPER: `near-places__image-wrapper`,
    ITEM_INFO: ``,
    IMAGE_SIZE: {
      WIDTH: 260,
      HEIGHT: 200
    }
  },
  FAVORITE: {
    LIST: `favorites__places`,
    ITEM: `favorites__card`,
    IMAGE_WRAPPER: `favorites__image-wrapper`,
    ITEM_INFO: `favorites__card-info`,
    IMAGE_SIZE: {
      WIDTH: 150,
      HEIGHT: 110
    }
  }
};

export const DETAIL_PAGE_PARAMS = {
  NEAR_OFFERS_MAX: 3
};

export const FORM_PARAMS = {
  STARS: [`perfect`, `good`, `not bad`, `badly`, `terribly`],
  MIN_TEXTAREA_VALUE: 50,
  MAX_TEXTAREA_VALUE: 300,
  MIN_STARS_CHECKED: 1
};

export const REVIEWS_PARAMS = {
  MAX_REVIEWS: 10
};
