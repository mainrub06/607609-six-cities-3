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
  return null;
};

export const getFirstCity = (citiesIn) => {
  if (citiesIn !== null) {
    return cities[0];
  }
  return null;
};

export const getOffers = (cityOffers, activeFilter) => {
  return cityOffers && cityOffers[activeFilter];
};

export const getAllOffers = (cityOffers) => {
  return cityOffers && Object.values(cityOffers).flat(1);
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
      isPremium: offer.is_premium,
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
      isPremium: offer.is_premium,
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
  const getСollectedDataByCity = cities.map((city) => {
    return {[city]: offers.filter((item) => item.city.name === city)};
  });
  return Object.assign({}, ...getСollectedDataByCity);
};

export const getFilteredData = (data) => {
  if (data) {
    const dataOffers = getOffersDataFromLoadData(data);
    const dataOffersDetail = getOffersDataDetailFromLoadData(data);
    const filteredDataOffers = getFilteredOffersByCity(dataOffers);
    const filteredDataOffersDetail = getFilteredOffersByCity(dataOffersDetail);
    const citiesList = Object.keys(filteredDataOffers);

    return {loadCityOffers: filteredDataOffers, citiesNames: citiesList, loadCityOffersDetail: filteredDataOffersDetail};
  }
  return null;
};

export const getUserData = (data) => {
  if (data) {
    return {
      id: data.id,
      userName: data.name,
      userEmail: data.email,
      userAvatar: data.avatar_url,
      isPro: data.is_pro
    };
  }
  return null;
};

export const getReviewsList = (reviews) => {
  if (reviews) {
    return reviews.map((review) => ({
      id: review.id,
      rate: review.rating,
      comment: review.comment,
      date: review.date,
      user: {
        id: review.user.id,
        isPro: review.user.is_pro,
        name: review.user.name,
        avatar: review.user.avatar_url
      }
    }));
  }
  return null;
};

export const getFavoriteTargetByCityAndId = (offers, obj) => {
  if (offers && obj) {
    const newExtendArr = offers[obj.cityName].map((hotel) => {
      return hotel.id === obj.id ? extend(hotel, {favorite: obj.favorite}) : hotel;
    });
    return extend(offers, {[obj.cityName]: newExtendArr});
  }
  return null;
};

export const getFavoriteHotelsData = (hotels) => {
  return hotels.length !== 0 ? getFilteredData(hotels) : null;
};

export const getNearHotelsIdWithActiveHotel = (state, activeId, response) => {
  if (state.loadCityOffers !== null) {
    const nearOffersId = getOffersDataFromLoadData(response).map((hotel) => hotel.id);
    nearOffersId.push(activeId);
    return nearOffersId;
  }
  return null;
};

export const getFallingSortByDate = (array) => {
  if (array) {
    return array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA;
    });
  }
  return null;
};
