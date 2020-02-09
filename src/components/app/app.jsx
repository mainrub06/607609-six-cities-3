import React from "react";
import {Main} from "../main/main.jsx";
import PropTypes from "prop-types";


const onTitleClickFn = () => {};

export const App = ({dataCards}) => {
  return <Main dataCards={dataCards} onTitleClick={onTitleClickFn}></Main>;
};

App.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        })
      })
  ).isRequired
};
