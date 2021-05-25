import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./MainEmpty";

it(`Render snapshot <MainEmpty/>`, () => {
  const tree = renderer.create(<MainEmpty />).toJSON();

  expect(tree).toMatchSnapshot();
});
