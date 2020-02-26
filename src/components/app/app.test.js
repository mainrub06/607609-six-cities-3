import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import PLACE_MOCK from "../../mock/offers";
import PLACE_MOCK_DETAIL from "../../mock/offers-detail";
import REVIEWS from "../../mock/reviews";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    offers: PLACE_MOCK,
    offersDetail: PLACE_MOCK_DETAIL,
    reviews: REVIEWS
  });

  const tree = renderer
    .create(
        <Provider store = {store}>
          <App activeId = {PLACE_MOCK_DETAIL[0].id} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
