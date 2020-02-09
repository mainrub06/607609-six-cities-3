import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import CARDS from "./mock/place-card";

const onTitleClick = () => {};

ReactDOM.render(
    <App dataCards = {CARDS} onTitleClick={onTitleClick}></App>,
    document.getElementById(`root`)
);
