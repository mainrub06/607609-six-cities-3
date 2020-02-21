import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import CARDS from "./mock/offers";
import CARDS_DETAIL from "./mock/offers-detail";
import REVIEWS from "./mock/reviews"

ReactDOM.render(
    <App dataCards = {CARDS} dataCardsDetail = {CARDS_DETAIL} reviews={REVIEWS}></App>,
    document.getElementById(`root`)
);
