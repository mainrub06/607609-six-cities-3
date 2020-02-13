import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";


const onTitleClickFn = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {dataCards} = this.props;

    return (
      <Main dataCards={dataCards} onTitleClick={onTitleClickFn}></Main>
    );
  }
}

App.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        })
      })
  ).isRequired
};

export default App;
