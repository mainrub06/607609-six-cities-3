import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import reducer from "./reducer/reducers";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import {Operation as LoadOffersData} from "./reducer/data/data";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(LoadOffersData.loadOffers());

// ПРИМЕРЫ
// store.dispatch(LoadOffersData.loadOffers());
// store.dispatch(LoadOffersDetailData.loadOffers());
// store.dispatch(LoadOffersReviewsData.loadOffers());




ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
