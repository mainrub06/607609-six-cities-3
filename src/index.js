import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import CARDS from "./mock/place-card";

ReactDOM.render(
    <App dataCards = {CARDS}></App>,
    document.getElementById(`root`)
);
