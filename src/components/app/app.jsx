import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LINKS} from "../../const";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.state = {
      activeId: null
    };
  }

  handleOfferClick(id) {
    this.setState({
      activeId: id
    });
  }

  renderMain() {
    const {dataCards, dataCardsDetail} = this.props;
    const {activeId} = this.state;

    if (activeId === null) {
      return (
        <Main dataCards = {dataCards} onOfferClick = {this.handleOfferClick}></Main>
      );
    } else {
      const dataElement = dataCardsDetail.find((it) => it.id === activeId.toString());
      return (
        <OfferDetail element = {dataElement}/>
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = {LINKS.INDEX}>
            {this.renderMain()}
          </Route>
          <Route exact path = {LINKS.OFFER_DETAIL}>
            <OfferDetail />
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
  ).isRequired,
  dataCardsDetail: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string.isRequired,
              src: PropTypes.string.isRequired
            }).isRequired
        ),
        class: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        rooms: PropTypes.number.isRequired,
        guests: PropTypes.number.isRequired,
        facilities: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ),
        owner: PropTypes.shape({
          name: PropTypes.string.isRequired,
          super: PropTypes.bool.isRequired,
          img: PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired
          })
        })
      })
  ).isRequired
};

export default App;
