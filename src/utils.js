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

export const getStarsFromNum = (number) => {
  if (number <= STAR_PARAMS.MAX_VALUE && number > STAR_PARAMS.MIN_VALUE) {
    return Math.round(number) * STAR_PARAMS.STAR_STEP;
  } else {
    return STAR_PARAMS.MIN_VALUE;
  }
};

export const extend = (firstInnerElement, secondInnerElement) => {
  return Object.assign({}, firstInnerElement, secondInnerElement);
};

export const getGrowingArrayByPrice = (array) => {
  return array.slice().sort((firstInnerElement, secondInnerElement) => Number(firstInnerElement.price) - Number(secondInnerElement.price));
};

export const getFallingArrayByPrice = (array) => {
  return array.slice().sort((firstInnerElement, secondInnerElement) => Number(secondInnerElement.price) - Number(firstInnerElement.price));
};

export const getTopRated = (array) => {
  return array.slice().sort((firstInnerElement, secondInnerElement) => secondInnerElement.rate - firstInnerElement.rate);
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

// export const getOffersDataFromLoadData = (loadData) => {
//   return loadData.map((offer) => {
//     return {
//       id: offer.id.toString(),
//       name: offer.title,
//       price: offer.price.toString(),
//       img: {
//         alt: offer.id.toString(),
//         src: offer.preview_image,
//       },
//       isPremium: offer.is_premium,
//       type: offer.type,
//       rate: offer.rating,
//       cords: [offer.location.latitude, offer.location.longitude],
//       favorite: offer.is_favorite,
//       city: offer.city
//     };
//   });
// };

export const getOffersFromLoadData = (loadData) => {
  return loadData.map((offer) => {
    return {
      id: offer.id.toString(),
      name: offer.title,
      price: offer.price.toString(),
      photos: getImages(offer.images),
      img: {
        alt: offer.id.toString(),
        src: offer.preview_image,
      },
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
      city: offer.city,
      cords: [offer.location.latitude, offer.location.longitude],
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
    const offers = getOffersFromLoadData(data);
    const filteredOffers = getFilteredOffersByCity(offers);
    const cities = Object.keys(filteredOffers);

    return {loadCityOffers: filteredOffers, citiesNames: cities};
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
  if (response && state.data.loadCityOffers) {
    const activeOffer = getAllOffers(state.data.loadCityOffers).find((offer) => offer.id === activeId);
    const nearOffers = getOffersFromLoadData(response);
    nearOffers.push(activeOffer);
    const nearOffersId = nearOffers.map((offer) => offer.id)

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

export const getOfferById = (offers, id) => {
  if (offers) {
    return getAllOffers(offers).find((offer) => offer.id === id);
  }
  return null;
};
