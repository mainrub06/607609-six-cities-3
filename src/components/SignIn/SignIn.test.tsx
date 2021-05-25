import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./SignIn";
import { MemoryRouter } from "react-router-dom";

it(`Render snapshot <SignIn/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SignIn onSubmitAuth={() => {}} />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
