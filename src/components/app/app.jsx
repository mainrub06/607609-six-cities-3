import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx"
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.state = {
      activeId: ``
    }
  }

  handleOfferClick(id) {
    this.setState({
      activeId: id
    });
  }

  render() {
    const {dataCards, dataCardsDetail} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = "/">
            <Main dataCards = {dataCards} onOfferClick = {this.handleOfferClick}></Main>
          </Route>
          <Route exact path = "/offer-detail">
            <OfferDetail dataCardsDetail = {dataCardsDetail} cardId = {this.state.activeId}/>
          </Route>
        </Switch>
      </BrowserRouter>
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
        }),
        class: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired
      })
  ).isRequired
};

export default App;
