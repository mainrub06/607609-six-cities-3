import {extend} from "../../utils.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialState = {
  loadCityOffers: null,
  citiesNames: null
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
      id: offer.id,
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

  const filteredDataOffers =  cities.map((city) => {
    return {[city]: dataOffers.filter((item) => item.city.name === city)}
  });

  const datas = Object.assign({}, ...filteredDataOffers);
  const citiesList = Object.keys(datas);

  return {loadCityOffers: datas, citiesNames: citiesList}
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, getFilteredData(action.payload));
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
