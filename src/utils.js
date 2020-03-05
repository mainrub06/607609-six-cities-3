import {STAR_PARAMS} from "./const";

export const getRandomNum = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomElement = (array) => {
  const min = 0;
  const max = array.length;

  return array[getRandomNum(min, max)];
};

export const getStarsFromNum = (num) => {
  if (num <= STAR_PARAMS.MAX_VALUE && num > STAR_PARAMS.MIN_VALUE) {
    return Math.round(num) * STAR_PARAMS.STAR_STEP;
  } else {
    return STAR_PARAMS.MIN_VALUE;
  }
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGrowingArrayByPrice = (array) => {
  return array.slice().sort((a, b) => Number(a.price) - Number(b.price));
};

export const getFallingArrayByPrice = (array) => {
  return array.slice().sort((a, b) => Number(b.price) - Number(a.price));
};

export const getTopRated = (array) => {
  return array.slice().sort((a, b) => b.rate - a.rate);
};

export const getFilteredOffers = (type, offers) => {
  switch (type) {
    case `Popular`:
      return offers;
    case `Price: low to high`:
      return getGrowingArrayByPrice(offers);
    case `Price: high to low`:
      return getFallingArrayByPrice(offers);
    case `Top rated first`:
      return getTopRated(offers);
  }
  return offers;
};

export const getCityObj = (offers, city) => {
  if (offers !== null) {
    const data = offers[city][0].city;
    return data;
  }
  return {};
}

export const getFirstCity = (cities) => {
  if (cities !== null) {
    return cities[0];
  }
};

export const getOffers = (cityOffers, activeFilter) => {
  if (cityOffers !== null) {
    return cityOffers[activeFilter];
  }
};
