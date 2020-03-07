import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/main/main.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LINKS} from "../../const";
import {connect} from "react-redux";
import {getCityName, getCitiesNames, getCity, getOffersMain, getOffersDetail, getReviews, getActiveFilter, getloadCityOffers} from "../../reducer/data/selectors";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.handleOfferHover = this.handleOfferHover.bind(this);
    this.state = {
      activeId: null,
      activePointId: null
    };
  }

  handleOfferClick(id) {
    this.setState({
      activeId: id,
      activePointId: null
    });
  }

  handleOfferHover(id) {
    this.setState({
      activePointId: id
    });
  }

  renderMain() {
    const {offersDetail, reviews, onChangeCity, offers, city, onChangeFilterType, activeFilter, citiesNames} = this.props;
    const {activeId} = this.state;

    if (citiesNames !== null) {
      if (activeId === null) {
        return (
          <Main onChangeCity = {onChangeCity}
            dataCards = {offers}
            onOfferClick = {this.handleOfferClick}
            city = {city}
            onChangeFilterType = {onChangeFilterType}
            handleOfferHover = {this.handleOfferHover}
            activePointId = {this.state.activePointId}
            activeFilter = {activeFilter}
            citiesNames = {citiesNames}
          />
        );
      } else {
        const dataReview = reviews.find((it) => it.id === activeId.toString());
        return (
          <OfferDetail onOfferClick = {this.handleOfferClick}
            review={dataReview}
            dataCardsDetail = {offersDetail}
            activeId = {activeId}
            dataCards = {offers}
            handleOfferHover = {this.handleOfferHover}
            activePointId = {this.state.activePointId}
            city = {city}/>
        );
      }
    }
    return null;
  }

  render() {
    const {offersDetail, offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = {LINKS.INDEX}>
            {this.renderMain()}
          </Route>
          <Route exact path = {LINKS.OFFER_DETAIL}>
            <OfferDetail dataCards = {offers} dataCardsDetail = {offersDetail}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  citiesNames: PropTypes.arrayOf(
      PropTypes.string
  ),
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        img: PropTypes.shape({
          alt: PropTypes.string,
          src: PropTypes.string
        }),
        class: PropTypes.bool,
        type: PropTypes.string,
        rate: PropTypes.number
      })
  ),
  offersDetail: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string,
              src: PropTypes.string
            })
        ),
        class: PropTypes.bool,
        type: PropTypes.string,
        rate: PropTypes.number,
        rooms: PropTypes.number,
        guests: PropTypes.number,
        facilities: PropTypes.arrayOf(
            PropTypes.string
        ),
        owner: PropTypes.shape({
          name: PropTypes.string,
          super: PropTypes.bool,
          img: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
          })
        })
      })
  ),
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        reviewsArr: PropTypes.arrayOf(
            PropTypes.shape({
              author: PropTypes.string,
              rate: PropTypes.number,
              text: PropTypes.string,
              date: PropTypes.string,
              photo: PropTypes.shape({
                src: PropTypes.string,
                alt: PropTypes.string
              })
            })
        )
      })
  ),
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    })
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  activeFilter: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(cityIn) {
    dispatch(ActionCreator.changeCity({cityName: cityIn}));
  },
  onChangeFilterType(type) {
    dispatch(ActionCreator.setActiveFilter({activeFilterItem: type}));
  }
});

const mapStateToProps = (state) => ({
  cityOffers: getloadCityOffers(state),
  cityName: getCityName(state),
  citiesNames: getCitiesNames(state),
  city: getCity(state),
  offers: getOffersMain(state),
  offersDetail: getOffersDetail(state),
  reviews: getReviews(state),
  activeFilter: getActiveFilter(state)
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
