import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app.jsx";

const COUNT_PLACE_CARDS = 5;

ReactDOM.render(
    // eslint-disable-next-line react/prop-types
    <App countPlace = {COUNT_PLACE_CARDS}></App>,
    document.getElementById(`root`)
);
