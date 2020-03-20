import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {MemoryRouter} from "react-router-dom";

it(`Render SignIn`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn
            onSubmitAuth = {() => {}}
            handleAuthToggle = {() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
