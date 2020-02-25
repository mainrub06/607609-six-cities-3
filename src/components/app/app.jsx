import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LINKS} from "../../const";
import {connect} from "react-redux";

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
    const {dataCards, dataCardsDetail, reviews} = this.props;
    const {activeId} = this.state;

    if (activeId === null) {
      return (
        <Main dataCards = {dataCards} onOfferClick = {this.handleOfferClick}></Main>
      );
    } else {
      const dataReview = reviews.find((it) => it.id === activeId.toString());
      return (
        <OfferDetail onOfferClick = {this.handleOfferClick} review={dataReview} dataCardsDetail = {dataCardsDetail} activeId = {activeId} dataCards = {dataCards}/>
      );
    }
  }

  render() {
    const {dataCards, dataCardsDetail} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = {LINKS.INDEX}>
            {this.renderMain()}
          </Route>
          <Route exact path = {LINKS.OFFER_DETAIL}>
            <OfferDetail dataCards = {dataCards} dataCardsDetail = {dataCardsDetail}/>
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
  ).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        reviewsArr: PropTypes.arrayOf(
            PropTypes.shape({
              author: PropTypes.string.isRequired,
              rate: PropTypes.number.isRequired,
              text: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              photo: PropTypes.shape({
                src: PropTypes.string.isRequired,
                alt: PropTypes.string.isRequired
              })
            })
        ).isRequired
      })
  ).isRequired
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.cityOffers
});

export {App};
export default connect(mapStateToProps)(App);
