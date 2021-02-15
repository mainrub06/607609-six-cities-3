import { STAR_PARAMS, CITIES } from "./const";

export const getRandomNum = (min: number, max: number): number => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomElement = (arr: Array<number>): any => {
  const min = 0;
  const max = arr.length;

  return arr[getRandomNum(min, max)];
};

export const getStarsFromNum = (number: number): number => {
  if (number <= STAR_PARAMS.MAX_VALUE && number > STAR_PARAMS.MIN_VALUE) {
    return Math.round(number) * STAR_PARAMS.STAR_STEP;
  } else {
    return STAR_PARAMS.MIN_VALUE;
  }
};

export const extend = (
  firstInnerElement: Object,
  secondInnerElement: Object
): Object => {
  return Object.assign({}, firstInnerElement, secondInnerElement);
};

interface IPrice {
  price: string | number;
}

export const getGrowingArrayByPrice = (array: Array<IPrice>): Array<Object> => {
  return array
    .slice()
    .sort(
      (firstInnerElement, secondInnerElement) =>
        Number(firstInnerElement.price) - Number(secondInnerElement.price)
    );
};

export const getFallingArrayByPrice = (array: Array<any>): Array<any> => {
  return array
    .slice()
    .sort(
      (firstInnerElement: any, secondInnerElement: any): number =>
        Number(secondInnerElement.price) - Number(firstInnerElement.price)
    );
};

export const getTopRated = (array: Array<any>): Array<any> => {
  return array
    .slice()
    .sort(
      (firstInnerElement: any, secondInnerElement: any): number =>
        secondInnerElement.rate - firstInnerElement.rate
    );
};

export const getFilteredOffers = (
  type: string,
  offers: Array<any>
): Array<any> => {
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

export const getCityObj = (offers: Array<any>, city: any) => {
  if (offers !== null) {
    return offers[city][0].city;
  }
  return null;
};

export const getFirstCity = (citiesIn: any) => {
  if (citiesIn !== null) {
    return CITIES[0];
  }
  return null;
};

export const getOffers = (cityOffers: Array<any>, activeFilter: any) => {
  return cityOffers && cityOffers[activeFilter];
};

export const getAllOffers = (cityOffers: Object) => {
  return cityOffers && Object.values(cityOffers).flat(1);
};

export const getImages = (images: any) => {
  return images.map((image: string, index: any) => ({
    src: image,
    alt: index.toString(),
  }));
};

export const getOffersFromLoadData = (loadData: Array<Object>) => {
  return loadData.map((offer: any) => {
    return {
      id: offer.id.toString(),
      name: offer.title,
      price: offer.price.toString(),
      photos: getImages(offer.images),
      previewImage: {
        alt: offer.id.toString(),
        src: offer.preview_image,
      },
      isPremium: offer.is_premium,
      type: offer.type,
      rate: offer.rating,
      bedrooms: offer.bedrooms,
      maxAdults: offer.max_adults,
      facilities: offer.goods,
      isFavorite: offer.is_favorite,
      owner: {
        id: offer.host.id,
        name: offer.host.name,
        super: offer.host.is_pro,
        img: {
          src: offer.host.avatar_url,
          alt: offer.host.id.toString(),
        },
      },
      description: offer.description,
      city: offer.city,
      cords: [offer.location.latitude, offer.location.longitude],
    };
  });
};

export const getFilteredOffersByCity = (offers: Array<Object>) => {
  const getСollectedDataByCity = CITIES.map((city: string) => {
    return { [city]: offers.filter((item: any) => item.city.name === city) };
  });
  return Object.assign({}, ...getСollectedDataByCity);
};

export const getFilteredData = (data: any) => {
  if (data) {
    const offers = getOffersFromLoadData(data);
    const filteredOffers = getFilteredOffersByCity(offers);
    const cities = Object.keys(filteredOffers);

    return { loadCityOffers: filteredOffers, citiesNames: cities };
  }
  return null;
};

export const getUserData = (data: any) => {
  if (data) {
    return {
      id: data.id,
      userName: data.name,
      userEmail: data.email,
      userAvatar: data.avatar_url,
      isPro: data.is_pro,
    };
  }
  return null;
};

export const getReviewsList = (reviews: any) => {
  if (reviews) {
    return reviews.map((review: any) => ({
      id: review.id,
      rate: review.rating,
      comment: review.comment,
      date: review.date,
      user: {
        id: review.user.id,
        isPro: review.user.is_pro,
        name: review.user.name,
        avatar: review.user.avatar_url,
      },
    }));
  }
  return null;
};

export const getFavoriteTargetByCityAndId = (offers: any, obj: any) => {
  if (offers && obj) {
    const newExtendArr = offers[obj.city].map((offer: any) => {
      return offer.id === obj.id
        ? extend(offer, { isFavorite: obj.isFavorite })
        : offer;
    });
    return extend(offers, { [obj.city]: newExtendArr });
  }
  return null;
};

export const getFavoriteHotelsData = (offers: any) => {
  return offers.length !== 0 ? getOffersFromLoadData(offers) : null;
};

export const getNearHotelsIdWithActiveHotel = (
  state: any,
  activeId: any,
  response: any
) => {
  if (response && state.data.loadCityOffers) {
    const activeOffer = getAllOffers(state.data.loadCityOffers).find(
      (offer: any) => offer.id === activeId
    );
    const nearOffers = getOffersFromLoadData(response);
    nearOffers.push(activeOffer);
    const nearOffersId = nearOffers.map((offer) => offer.id);

    return nearOffersId;
  }
  return null;
};

export const getFallingSortByDate = (array: any) => {
  if (array) {
    return array.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      const sorted = dateB - dateA;

      return sorted;
    });
  }
  return null;
};

export const getOfferById = (offers: any, id: number) => {
  if (offers) {
    return getAllOffers(offers).find((offer: any) => offer.id === id);
  }
  return null;
};
