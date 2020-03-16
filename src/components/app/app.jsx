import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/main/main";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews";
import {Operation as FavoritesOperation} from "../../reducer/favorites/favorites";
import {ActionCreator as DataAC} from "../../reducer/data/data";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {LINKS, AUTHORIZATION_STATUS} from "../../const";
import {connect} from "react-redux";
import {getCityName} from "../../reducer/main/selectors";
import {getCitiesNames, getCity, getOffersMain, getOffersDetail, getActiveFilter, getloadCityOffers} from "../../reducer/data/selectors";
import {getAuthStatus, getUserInfo} from "../../reducer/user/selectors";
import {getResponseStatusFavorite} from "../../reducer/favorites/selectors";
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
    this.handleClickFavoriteButton = this.handleClickFavoriteButton.bind(this);

    this.isUserAuth = this.isUserAuth.bind(this);
    this.renderLoginPage = this.renderLoginPage.bind(this);
    this.checkUserAuth = this.checkUserAuth.bind(this);

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

  handleClickFavoriteButton(id, bool) {
    if (this.state.auth === AUTHORIZATION_STATUS.NO_AUTH) {
      history.push(LINKS.LOGIN);
    }
    const {getUpdatedFavoriteHotel, changeFavoriteFlag, cityName} = this.props;

    changeFavoriteFlag({id, favorite: bool, cityName});
    getUpdatedFavoriteHotel(id, bool);
  }

  isUserAuth(status) {
    return status === AUTHORIZATION_STATUS.AUTH;
  }

  componentDidMount() {
    this.props.getAuthorizationStatus();
  }

  renderIndexPage() {
    const {offers, onChangeCity, onChangeFilterType, activeFilter, authStatus, citiesNames, city, userInfo, favoriteResponse} = this.props;
    if (citiesNames !== null) {
      return (<Main onChangeCity = {onChangeCity}
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
        handleClickFavoriteButton = {this.handleClickFavoriteButton}
        favoriteResponse = {favoriteResponse}
      />);
    }
    return null;
  }

  renderLoginPage() {
    const {login, authStatus} = this.props;
    return this.isUserAuth(authStatus) ? <Redirect to = {{pathname: LINKS.INDEX}}/> : <SignIn onSubmitAuth = {login} handleAuthToggle = {this.handleAuthToggle}/>;
  }

  checkUserAuth() {
    const {authStatus} = this.props;
    return this.isUserAuth(authStatus) ? this.renderIndexPage() : <Redirect to = {{pathname: LINKS.LOGIN}}/>;
  }

  render() {
    const {offersDetail, reviews, offers, city, authStatus, userInfo} = this.props;
    const {activeId} = this.state;
    return (
      <Router history = {history}>
        <Switch>
          <Route exact path = {LINKS.LOGIN}>
            {this.renderLoginPage()}
          </Route>
          <Route exact path = {LINKS.INDEX}>
            {this.checkUserAuth()}
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
              handleClickFavoriteButton = {this.handleClickFavoriteButton}
            />
          </Route>
          <Route exact path={LINKS.FAVORITES}>
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
  postComment: PropTypes.func,
  getUpdatedFavoriteHotel: PropTypes.func,
  getAuthorizationStatus: PropTypes.func,
  favoriteResponse: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(cityIn) {
    dispatch(ActionCreator.changeCity({cityName: cityIn}));
  },
  onChangeFilterType(type) {
    dispatch(ActionCreator.setActiveFilter({activeFilterItem: type}));
  },
  getAuthorizationStatus() {
    dispatch(UserOperation.getAuthorizationStatus());
  },
  login(authData) {
    dispatch(UserOperation.setAuthorizationStatus(authData));
  },
  getComments(id) {
    dispatch(ReviewsOperation.getReviewsFromHotelId(id));
  },
  postComment(review, id) {
    dispatch(ReviewsOperation.postReviewFromHotelId(review, id));
  },
  getUpdatedFavoriteHotel(id, value) {
    dispatch(FavoritesOperation.getFavoriteResponse(id, value));
  },
  changeFavoriteFlag(value) {
    dispatch(DataAC.changeFavoriteById(value));
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
  userInfo: getUserInfo(state),
  favoriteResponse: getResponseStatusFavorite(state)
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
