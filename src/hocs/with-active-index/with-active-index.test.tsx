import React from "react";
import renderer from "react-test-renderer";
import withActiveIndex from "./with-active-index";

const MockComponent = ({ children }: any) => <div>{children}</div>;
const MockComponentWrapped = withActiveIndex(MockComponent);

it(`Render snapshot HOC <withActiveIndex/> with mock Component`, () => {
  const tree = renderer
    .create(<MockComponentWrapped activeItemIndex={0} />, {
      createNodeMock() {
        return {};
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
