import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/main/main";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews";
import {Operation as FavoritesOperation} from "../../reducer/favorites/favorites";
import {ActionCreator as DataAC} from "../../reducer/data/data";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {LINKS, AUTHORIZATION_STATUS, OFFERS_CSS_CLASSES} from "../../const";
import {connect} from "react-redux";
import {getCityName} from "../../reducer/main/selectors";
import {getCitiesNames, getCity, getOffersMain, getOffersDetail, getActiveFilter, getloadCityOffers, getNearOffers} from "../../reducer/data/selectors";
import {getAuthStatus, getUserInfo} from "../../reducer/user/selectors";
import {getResponseStatusFavorite, getFavoritesData} from "../../reducer/favorites/selectors";
import {getReviews, getReviewsResponse} from "../../reducer/reviews/selectors";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history";
import Favorites from "../favorites/favorites.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.handleOfferHover = this.handleOfferHover.bind(this);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
    this.handleClickFavoriteButton = this.handleClickFavoriteButton.bind(this);

    this.isUserAuth = this.isUserAuth.bind(this);
    this.renderLoginPage = this.renderLoginPage.bind(this);
  }

  handleOfferClick(id) {
    const {getNearHotels, getComments, handleItemClick} = this.props;

    handleItemClick(null);
    getNearHotels(id);
    getComments(id);
  }

  handleOfferHover(id) {
    this.props.handleItemClick(id);
  }

  handleSubmitFeedback(feedbackData, activeHotelId) {
    const {postComment} = this.props;

    postComment(feedbackData, activeHotelId);
  }

  handleClickFavoriteButton(id, bool) {
    const {getUpdatedFavoriteHotel, changeFavoriteFlag, cityName, getFavoritesServerData, authStatus} = this.props;

    if (authStatus === AUTHORIZATION_STATUS.NO_AUTH) {
      this.redirectToLoginPage();
    }

    if (authStatus === AUTHORIZATION_STATUS.AUTH) {
      changeFavoriteFlag({id, favorite: bool, cityName});
      getUpdatedFavoriteHotel(id, bool);
      getFavoritesServerData();
    }
  }

  isUserAuth(status) {
    return status === AUTHORIZATION_STATUS.AUTH;
  }

  redirectToLoginPage() {
    return history.push(LINKS.LOGIN);
  }

  componentDidMount() {
    const {getAuthorizationStatus, handleItemClick} = this.props;
    handleItemClick(null);
    getAuthorizationStatus();
  }

  renderIndexPage() {
    const {offers, onChangeCity, onChangeFilterType, activeFilter, authStatus, citiesNames, city, userInfo, favoriteResponse, activeItemIndex} = this.props;

    if (citiesNames !== null) {
      return (
        <Main
          onOfferClick = {this.handleOfferClick}
          handleOfferHover = {this.handleOfferHover}
          activePointId = {activeItemIndex}
          handleClickFavoriteButton = {this.handleClickFavoriteButton}
          onChangeCity = {onChangeCity}
          dataCards = {offers}
          city = {city}
          onChangeFilterType = {onChangeFilterType}
          activeFilter = {activeFilter}
          citiesNames = {citiesNames}
          authStatus = {authStatus}
          userInfo = {userInfo}
          favoriteResponse = {favoriteResponse}
          offersCssClasses = {OFFERS_CSS_CLASSES.MAIN}
        />
      );
    }
    return null;
  }

  renderDetailPage() {
    const {offersDetail, reviews, offers, authStatus, userInfo, citiesNames, getNearHotels, offersNear, getComments, favoriteResponse, reviewsResponse} = this.props;

    if (citiesNames !== null) {
      return (
        <OfferDetail
          onOfferClick = {this.handleOfferClick}
          handleOfferHover = {this.handleOfferHover}
          handleSubmitFeedback = {this.handleSubmitFeedback}
          handleClickFavoriteButton = {this.handleClickFavoriteButton}
          reviews={reviews}
          dataCardsDetail = {offersDetail}
          dataCards = {offers}
          authStatus = {authStatus}
          userInfo = {userInfo}
          offersCssClasses = {OFFERS_CSS_CLASSES.OFFER_DETAIL}
          getNearHotels = {getNearHotels}
          offersNear = {offersNear}
          getComments = {getComments}
          favoriteResponse = {favoriteResponse}
          reviewsResponse = {reviewsResponse}
        />
      );
    }
    return null;
  }

  renderFavoritesPage() {
    const {userInfo, favorites, favoriteResponse, getFavoritesServerData} = this.props;

    return (
      <Favorites
        handleClickFavoriteButton = {this.handleClickFavoriteButton}
        onOfferClick = {this.handleOfferClick}
        favorites = {favorites}
        userInfo = {userInfo}
        favoriteResponse = {favoriteResponse}
        offersCssClasses = {OFFERS_CSS_CLASSES.FAVORITE}
        getFavoritesServerData = {getFavoritesServerData}
      />
    );
  }

  renderLoginPage() {
    const {login, authStatus} = this.props;

    return this.isUserAuth(authStatus) ? <Redirect to = {{pathname: LINKS.INDEX}}/> : <SignIn onSubmitAuth = {login} handleAuthToggle = {this.handleAuthToggle}/>;
  }

  render() {
    return (
      <Router history = {history}>
        <Switch>
          <Route exact path = {LINKS.LOGIN}>
            {this.renderLoginPage()}
          </Route>
          <Route exact path = {LINKS.INDEX}>
            {this.renderIndexPage()}
          </Route>
          <Route exact path = {`${LINKS.OFFER_DETAIL}:id`}>
            {this.renderDetailPage()}
          </Route>
          <PrivateRoute
            exact
            path= {LINKS.FAVORITES}
            redirectLink = {LINKS.LOGIN}
            render = {() => {
              return this.renderFavoritesPage();
            }}
          />
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
        isPremium: PropTypes.bool,
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
        isPremium: PropTypes.bool,
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
  favoriteResponse: PropTypes.bool,
  changeFavoriteFlag: PropTypes.func,
  cityName: PropTypes.string,
  favorites: PropTypes.shape({
    citiesNames: PropTypes.arrayOf(
        PropTypes.string
    ),
    loadCityOffers: PropTypes.shape(),
    loadCityOffersDetail: PropTypes.shape()
  }),
  getFavoritesServerData: PropTypes.func,
  offersCssClasses: PropTypes.shape({
    LIST: PropTypes.string.isRequired,
    ITEM: PropTypes.string.isRequired,
    IMAGE_WRAPPER: PropTypes.string.isRequired,
    ITEM_INFO: PropTypes.string.isRequired,
    IMAGE_SIZE: PropTypes.shape({
      WIDTH: PropTypes.number.isRequired,
      HEIGHT: PropTypes.number.isRequired
    })
  }),
  getNearHotels: PropTypes.func,
  offersNear: PropTypes.arrayOf(
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
        isPremium: PropTypes.bool,
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
  reviewsResponse: PropTypes.number,
  activeItemIndex: PropTypes.string,
  handleItemClick: PropTypes.func.isRequired
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
  },
  getFavoritesServerData() {
    dispatch(FavoritesOperation.getFavoritesData());
  },
  getNearHotels(id) {
    dispatch(DataOperation.getNearHotels(id));
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
  reviewsResponse: getReviewsResponse(state),
  activeFilter: getActiveFilter(state),
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state),
  favoriteResponse: getResponseStatusFavorite(state),
  favorites: getFavoritesData(state),
  offersNear: getNearOffers(state)
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
