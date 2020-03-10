import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`Render SignIn`, () => {
  const tree = renderer
    .create(
        <SignIn
          onSubmitAuth = {() => {}}
          handleAuthToggle = {() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
