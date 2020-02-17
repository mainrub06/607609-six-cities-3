import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import CARDS from "./mock/offers";
import CARDS_DETAIL from "./mock/offers-detail";

ReactDOM.render(
    <App dataCards = {CARDS} dataCardsDetail = {CARDS_DETAIL}></App>,
    document.getElementById(`root`)
);
