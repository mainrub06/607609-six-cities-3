import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withActiveFlag from "./with-active-flag.jsx";

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

const MockComponentWrapped = withActiveFlag(MockComponent);

it(`Render snapshot HOC <withActiveFlag/> with mock Component`, () => {
  const tree = renderer
      .create((
        <MockComponentWrapped/>
      ), {
        createNodeMock() {
          return {};
        }
      })
      .toJSON();

  expect(tree).toMatchSnapshot();
});
