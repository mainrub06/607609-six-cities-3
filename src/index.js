import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducers";
import thunk from "redux-thunk";
import withActiveIndex from "./hocs/with-active-index/with-active-index.jsx";
import {createAPI} from "./api";
import {Operation as LoadOffersData} from "./reducer/data/data";
import {Operation as UserOperation} from "./reducer/user/user";

const AppWrapper = withActiveIndex(App);
const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(LoadOffersData.loadOffers());
store.dispatch(UserOperation.getAuthorizationStatus());

ReactDOM.render(
    <Provider store = {store}>
      <AppWrapper />
    </Provider>,
    document.getElementById(`root`)
);
