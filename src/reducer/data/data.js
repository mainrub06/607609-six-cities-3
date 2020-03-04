import {extend} from "../../utils.js";
import {OFFERS_SORT_ITEMS} from "../../const";

const initialState = {
  offers: []
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
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

const proverka = (it) => {
  const data = it;



  const filteredDataByCity = cities.map((it) => ({[it]: data.filter((item) => item.city.name === it)}));
  console.log(filteredDataByCity);

};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, proverka(action.payload));
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
