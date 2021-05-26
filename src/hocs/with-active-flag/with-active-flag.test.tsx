import React from "react";
import renderer from "react-test-renderer";
import withActiveFlag from "./with-active-flag";

const MockComponent = ({ children }: any) => <div>{children}</div>;
const MockComponentWrapped = withActiveFlag(MockComponent);

it(`Render snapshot HOC <withActiveFlag/> with mock Component`, () => {
  const tree = renderer
    .create(<MockComponentWrapped />, {
      createNodeMock() {
        return {};
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
