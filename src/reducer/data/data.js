import {extend, getImages} from "../../utils.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialState = {
  loadCityOffers: null,
  citiesNames: null,
  loadCityOffersDetail: null
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data))
    });
  }
}

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

const getFilteredData = (data) => {



  const dataOffers = data.map((offer) => {
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

  const dataOffersDetail = data.map((offer) => {
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

  //------------

  const filteredDataOffers =  cities.map((city) => {
    return {[city]: dataOffers.filter((item) => item.city.name === city)}
  });

  const datas = Object.assign({}, ...filteredDataOffers);
  const citiesList = Object.keys(datas);


  //------------

  const filteredDataOffersDetail = cities.map((city) => {
    return {[city]: dataOffersDetail.filter((item) => item.city.name === city)}
  });

  const datasDetail = Object.assign({}, ...filteredDataOffersDetail);

  // console.log(datasDetail);



  return {loadCityOffers: datas, citiesNames: citiesList, loadCityOffersDetail: datasDetail}
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
