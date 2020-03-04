import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/main/main.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LINKS} from "../../const";
import {connect} from "react-redux";
import {getFilteredOffers} from "../../utils";

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
    const {offersDetail, reviews, onChangeCity, offers, city, onChangeFilterType, activeFilter} = this.props;
    const {activeId} = this.state;

    if (activeId === null) {
      return (
        <Main onChangeCity = {onChangeCity}
          dataCards = {offers}
          onOfferClick = {this.handleOfferClick}
          city = {city}
          onChangeFilterType = {onChangeFilterType}
          handleOfferHover = {this.handleOfferHover}
          activePointId = {this.state.activePointId}
          activeFilter = {activeFilter}/>
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
          activePointId = {this.state.activePointId}/>
      );
    }
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
  offers: PropTypes.arrayOf(
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
  offersDetail: PropTypes.arrayOf(
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
  ).isRequired,
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  onChangeFilterType: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(cityIn) {
    dispatch(ActionCreator.changeCity({city: cityIn}));
  },
  onChangeFilterType(type) {
    dispatch(ActionCreator.setActiveFilter({activeFilterItem: type}));
  }
});

const mapStateToProps = (state) => ({
  city: state.main.city,
  offers: getFilteredOffers(state.main.activeFilterItem, state.main.cities[state.main.city]),
  offersDetail: state.main.citiesDetail[state.main.city],
  reviews: state.main.reviews,
  activeFilter: state.main.activeFilterItem
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
