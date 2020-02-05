import React from "react";
import {Main} from './main.jsx';

export const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {countPlace} = props;
  return <Main countPlace = {countPlace} ></Main>;
};
