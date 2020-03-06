import {STAR_PARAMS, cities} from "./const";

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
    return offers[city][0].city;
  }
  return {};
};

export const getFirstCity = (citiesIn) => {
  if (citiesIn !== null) {
    return cities[0];
  }
  return [];
};

export const getOffers = (cityOffers, activeFilter) => {
  if (cityOffers !== null) {
    return cityOffers[activeFilter];
  }
  return [];
};

export const getImages = (images) => {
  return images.map((image, index) => ({src: image, alt: index.toString()}));
};

export const getOffersDataFromLoadData = (loadData) => {
  return loadData.map((offer) => {
    return {
      id: offer.id.toString(),
      name: offer.title,
      price: offer.price.toString(),
      img: {
        alt: offer.id.toString(),
        src: offer.preview_image,
      },
      class: offer.is_premium,
      type: offer.type,
      rate: offer.rating,
      cords: [offer.location.latitude, offer.location.longitude],
      favorite: offer.is_favorite,
      city: offer.city
    };
  });
};

export const getOffersDataDetailFromLoadData = (loadData) => {
  return loadData.map((offer) => {
    return {
      id: offer.id.toString(),
      name: offer.title,
      price: offer.price.toString(),
      photos: getImages(offer.images),
      class: offer.is_premium,
      type: offer.type,
      rate: offer.rating,
      rooms: offer.bedrooms,
      guests: offer.max_adults,
      facilities: offer.goods,
      favorite: offer.is_favorite,
      owner: {
        id: offer.host.id,
        name: offer.host.name,
        super: offer.host.is_pro,
        img: {
          src: offer.host.avatar_url,
          alt: offer.host.id.toString()
        }
      },
      description: [offer.description],
      city: offer.city
    };
  });
};

export const getFilteredOffersByCity = (offers) => {
  const getFilteredData = cities.map((city) => {
    return {[city]: offers.filter((item) => item.city.name === city)};
  });
  return Object.assign({}, ...getFilteredData);
};

export const getFilteredData = (data) => {
  const dataOffers = getOffersDataFromLoadData(data);
  const dataOffersDetail = getOffersDataDetailFromLoadData(data);
  const filteredDataOffers = getFilteredOffersByCity(dataOffers);
  const filteredDataOffersDetail = getFilteredOffersByCity(dataOffersDetail);
  const citiesList = Object.keys(filteredDataOffers);

  return {loadCityOffers: filteredDataOffers, citiesNames: citiesList, loadCityOffersDetail: filteredDataOffersDetail};
};
