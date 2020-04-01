import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withFormData from "./with-form-data.jsx";

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

const MockComponentWrapped = withFormData(MockComponent);

it(`Render snapshot HOC <withFormData/> with mock Component`, () => {
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
