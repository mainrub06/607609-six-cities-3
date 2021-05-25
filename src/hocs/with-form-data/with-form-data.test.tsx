import React from "react";
import renderer from "react-test-renderer";
import withFormData from "./with-form-data";

const MockComponent = ({ children }: any) => <div>{children}</div>;
const MockComponentWrapped = withFormData(MockComponent);

it(`Render snapshot HOC <withFormData/> with mock Component`, () => {
  const tree = renderer
    .create(<MockComponentWrapped />, {
      createNodeMock() {
        return {};
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
