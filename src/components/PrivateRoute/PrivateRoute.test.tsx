import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

const MockComponent = () => <p>Hallo world!</p>;
const mockPath = `/`;
const mockRedirectLink = `/redirect`;
const mockAuthStatus = `AUTH`;

it(`Render snapshot <PrivateRoute/>`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <PrivateRoute
          redirectLink={mockRedirectLink}
          authorizationStatus={mockAuthStatus}
          exact
          path={mockPath}
          render={() => <MockComponent />}
        />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
