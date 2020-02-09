import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";
import PLACE_MOCK from "../../mock/place-card";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`on title click`, () => {
  const onTitleClick = jest.fn();

  const MainScreen = shallow(
      <Main
        dataCards={PLACE_MOCK}
        onTitleClick={onTitleClick}
      />
  );

  const title = MainScreen.find(`h1`);

  title.props().onClick();

  expect(onTitleClick.mock.calls.length).toBe(1);
});
