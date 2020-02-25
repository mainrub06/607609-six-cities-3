import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import CARDS from "./mock/offers";
import CARDS_DETAIL from "./mock/offers-detail";
import REVIEWS from "./mock/reviews";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store = {store}>
      <App dataCards = {CARDS} dataCardsDetail = {CARDS_DETAIL} reviews={REVIEWS}></App>
    </Provider>,
    document.getElementById(`root`)
);
