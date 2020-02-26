import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import PLACE_MOCK from "../../mock/offers.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    city: `Paris`
  });

  const tree = renderer
    .create(
        <Provider store = {store}>
          <Main onChangeCity={() => {}} getCityOffers={() => {}} onOfferClick={() => {}} dataCards={PLACE_MOCK} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
