import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/main/main";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews";
import {Router, Route, Switch} from "react-router-dom";
import {LINKS, AUTHORIZATION_STATUS} from "../../const";
import {connect} from "react-redux";
import {getCityName, getCitiesNames, getCity, getOffersMain, getOffersDetail, getActiveFilter, getloadCityOffers} from "../../reducer/data/selectors";
import {getAuthStatus, getUserInfo} from "../../reducer/user/selectors";
import {getReviews} from "../../reducer/reviews/selectors";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history";
import Favorites from "../favorites/favorites.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.handleOfferHover = this.handleOfferHover.bind(this);
    this.handleAuthToggle = this.handleAuthToggle.bind(this);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
    this.state = {
      activeId: null,
      activePointId: null,
      auth: false
    };
  }

  handleOfferClick(id) {
    const {getComments} = this.props;
    this.setState({
      activeId: id,
      activePointId: null
    });
    getComments(id);
    history.push(LINKS.OFFER_DETAIL);
  }

  handleOfferHover(id) {
    this.setState({
      activePointId: id
    });
  }

  handleAuthToggle() {
    this.setState({
      auth: !this.state.auth
    });
    history.push(LINKS.INDEX);
  }

  handleSubmitFeedback(feedbackData, activeHotelId) {
    const {postComment} = this.props;
    postComment(feedbackData, activeHotelId);
  }

  renderIndexPage() {
    const {offers, onChangeCity, onChangeFilterType, activeFilter, citiesNames, authStatus, city, userInfo} = this.props;
    if (citiesNames !== null) {
      if (authStatus === AUTHORIZATION_STATUS.NO_AUTH) {
        history.push(LINKS.LOGIN);
      } else {
        return <Main onChangeCity = {onChangeCity}
          dataCards = {offers}
          onOfferClick = {this.handleOfferClick}
          city = {city}
          onChangeFilterType = {onChangeFilterType}
          handleOfferHover = {this.handleOfferHover}
          activePointId = {this.state.activePointId}
          activeFilter = {activeFilter}
          citiesNames = {citiesNames}
          authStatus = {authStatus}
          userInfo = {userInfo}
          handleAuthToggle = {this.handleAuthToggle}
        />
      }
    }
  }

  render() {
    const {offersDetail, reviews, offers, city, authStatus, login, userInfo} = this.props;
    const {activeId} = this.state;

    return (
      <Router history = {history}>
        <Switch>
          <Route exaxt path = {LINKS.LOGIN}>
            <SignIn onSubmitAuth = {login} handleAuthToggle = {this.handleAuthToggle}/>
          </Route>
          <Route exact path = {LINKS.INDEX}>
            {this.renderIndexPage()}
          </Route>
          <Route exact path = {LINKS.OFFER_DETAIL}>
            <OfferDetail onOfferClick = {this.handleOfferClick}
              reviews={reviews}
              dataCardsDetail = {offersDetail}
              activeId = {activeId}
              dataCards = {offers}
              handleOfferHover = {this.handleOfferHover}
              activePointId = {this.state.activePointId}
              city = {city}
              authStatus = {authStatus}
              userInfo = {userInfo}
              handleAuthToggle = {this.handleAuthToggle}
              handleSubmitFeedback = {this.handleSubmitFeedback}
            />
          </Route>
          <Route exaxt path={LINKS.FAVORITES}>
            <Favorites/>
          </Route>
        </Switch>
      </Router>
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
        id: PropTypes.number,
        rate: PropTypes.number,
        comment: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
          id: PropTypes.number,
          isPro: PropTypes.bool,
          name: PropTypes.string,
          avatar: PropTypes.string
        })
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
  activeFilter: PropTypes.string,
  authStatus: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  login: PropTypes.func,
  getComments: PropTypes.func,
  postComment: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(cityIn) {
    dispatch(ActionCreator.changeCity({cityName: cityIn}));
  },
  onChangeFilterType(type) {
    dispatch(ActionCreator.setActiveFilter({activeFilterItem: type}));
  },
  login(authData) {
    dispatch(UserOperation.setAuthorizationStatus(authData));
  },
  getComments(id) {
    dispatch(ReviewsOperation.getReviewsFromHotelId(id));
  },
  postComment(review, id) {
    dispatch(ReviewsOperation.postReviewFromHotelId(review, id));
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
  activeFilter: getActiveFilter(state),
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state)
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
