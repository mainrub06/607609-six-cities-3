import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withActiveIndex from "./withActiveIndex.jsx";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

const MockComponentWrapped = withActiveIndex(MockComponent);

it(`Render HOC withAudioIndex with mock Component`, () => {
  const tree = renderer
      .create((
        <MockComponentWrapped activeItemIndex = {0}/>
      ), {
        createNodeMock() {
          return {};
        }
      })
      .toJSON();

  expect(tree).toMatchSnapshot();
});
