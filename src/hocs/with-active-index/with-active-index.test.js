import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withActiveIndex from "./with-active-index.tsx";

const MockComponent = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

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
