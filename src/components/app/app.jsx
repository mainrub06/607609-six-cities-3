import React, { PureComponent } from "react";
import Main from "../Main/Main.tsx";
import OfferDetail from "../offer-detail/offer-detail.jsx";
import PropTypes from "prop-types";
import { ActionCreator } from "../../reducer/main/main.js";
import { Operation as UserOperation } from "../../reducer/user/user";
import { Operation as FavoritesOperation } from "../../reducer/favorites/favorites";
import { ActionCreator as DataAC } from "../../reducer/data/data";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { LINKS, AUTHORIZATION_STATUS, OFFERS_CSS_CLASSES } from "../../const";
import { connect } from "react-redux";
import { getActiveOfferId } from "../../reducer/main/selectors";
import {
  getCitiesNames,
  getCity,
  getOffersMain,
  getActiveFilter,
} from "../../reducer/data/selectors";
import { getAuthStatus, getUserInfo } from "../../reducer/user/selectors";
import {
  getResponseStatusFavorite,
  getFavoritesData,
} from "../../reducer/favorites/selectors";
import SignIn from "../SignIn/SignIn";
import history from "../../history";
import Favorites from "../Favorites/Favorites.tsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.tsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferClick = this.handleOfferClick.bind(this);
    this.handleOfferHover = this.handleOfferHover.bind(this);
    this.handleClickFavoriteButton = this.handleClickFavoriteButton.bind(this);

    this.isUserAuth = this.isUserAuth.bind(this);
    this.renderLoginPage = this.renderLoginPage.bind(this);
  }

  componentDidMount() {
    const { getAuthorizationStatus } = this.props;
    getAuthorizationStatus();
  }

  handleOfferClick() {
    this.props.onHoverOffer(null);
  }

  handleOfferHover(id) {
    this.props.onHoverOffer(id);
  }

  handleClickFavoriteButton(id, bool) {
    const {
      getUpdatedFavoriteOffer,
      changeFavoriteFlag,
      activeCity,
      getFavoritesServerData,
      authStatus,
    } = this.props;

    if (authStatus === AUTHORIZATION_STATUS.NO_AUTH) {
      this.redirectToLoginPage();
    }

    if (authStatus === AUTHORIZATION_STATUS.AUTH) {
      changeFavoriteFlag({ id, isFavorite: bool, city: activeCity.name });
      getUpdatedFavoriteOffer(id, bool);
      getFavoritesServerData();
    }
  }

  isUserAuth(status) {
    return status === AUTHORIZATION_STATUS.AUTH;
  }

  redirectToLoginPage() {
    return history.push(LINKS.LOGIN);
  }

  renderIndexPage() {
    const {
      offers,
      onChangeCity,
      onChangeFilterType,
      activeFilter,
      authStatus,
      citiesNames,
      activeCity,
      userInfo,
      favoriteResponse,
      activeOfferId,
    } = this.props;

    if (citiesNames !== null) {
      return (
        <Main
          onOfferClick={this.handleOfferClick}
          handleOfferHover={this.handleOfferHover}
          activeOfferId={activeOfferId}
          handleClickFavoriteButton={this.handleClickFavoriteButton}
          onChangeCity={onChangeCity}
          offers={offers}
          activeCity={activeCity}
          onChangeFilterType={onChangeFilterType}
          activeFilter={activeFilter}
          citiesNames={citiesNames}
          authStatus={authStatus}
          userInfo={userInfo}
          favoriteResponse={favoriteResponse}
          offersCssClasses={OFFERS_CSS_CLASSES.MAIN}
        />
      );
    }
    return null;
  }

  renderDetailPage() {
    const { authStatus, userInfo, citiesNames, favoriteResponse } = this.props;

    if (citiesNames !== null) {
      return (
        <OfferDetail
          onOfferClick={this.handleOfferClick}
          handleOfferHover={this.handleOfferHover}
          handleClickFavoriteButton={this.handleClickFavoriteButton}
          authStatus={authStatus}
          userInfo={userInfo}
          offersCssClasses={OFFERS_CSS_CLASSES.OFFER_DETAIL}
          favoriteResponse={favoriteResponse}
        />
      );
    }
    return null;
  }

  renderFavoritesPage() {
    const {
      userInfo,
      favorites,
      favoriteResponse,
      getFavoritesServerData,
      citiesNames,
    } = this.props;

    return (
      <Favorites
        handleClickFavoriteButton={this.handleClickFavoriteButton}
        onOfferClick={this.handleOfferClick}
        favorites={favorites}
        userInfo={userInfo}
        favoriteResponse={favoriteResponse}
        offersCssClasses={OFFERS_CSS_CLASSES.FAVORITE}
        getFavoritesServerData={getFavoritesServerData}
        citiesNames={citiesNames}
      />
    );
  }

  renderLoginPage() {
    const { login, authStatus } = this.props;

    return this.isUserAuth(authStatus) ? (
      <Redirect to={{ pathname: LINKS.INDEX }} />
    ) : (
      <SignIn onSubmitAuth={login} handleAuthToggle={this.handleAuthToggle} />
    );
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={LINKS.LOGIN}>
            {this.renderLoginPage()}
          </Route>
          <Route exact path={LINKS.INDEX}>
            {this.renderIndexPage()}
          </Route>
          <Route exact path={`${LINKS.OFFER_DETAIL}:id`}>
            {this.renderDetailPage()}
          </Route>
          <PrivateRoute
            exact
            path={LINKS.FAVORITES}
            redirectLink={LINKS.LOGIN}
            render={() => {
              return this.renderFavoritesPage();
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  citiesNames: PropTypes.arrayOf(PropTypes.string),
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          alt: PropTypes.string,
          src: PropTypes.string,
        })
      ),
      previewImage: PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
      }),
      isPremium: PropTypes.bool,
      type: PropTypes.string,
      rate: PropTypes.number,
      bedrooms: PropTypes.number,
      maxAdults: PropTypes.number,
      description: PropTypes.string,
      facilities: PropTypes.arrayOf(PropTypes.string),
      isFavorite: PropTypes.bool,
      owner: PropTypes.shape({
        name: PropTypes.string,
        super: PropTypes.bool,
        img: PropTypes.shape({
          src: PropTypes.string,
          alt: PropTypes.string,
        }),
      }),
      city: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          zoom: PropTypes.number,
        }),
      }),
      location: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  onChangeCity: PropTypes.func.isRequired,
  activeCity: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
  authStatus: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool,
  }),
  login: PropTypes.func,
  getUpdatedFavoriteOffer: PropTypes.func,
  getAuthorizationStatus: PropTypes.func,
  favoriteResponse: PropTypes.bool,
  changeFavoriteFlag: PropTypes.func,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          alt: PropTypes.string,
          src: PropTypes.string,
        })
      ),
      previewImage: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
      }).isRequired,
      isPremium: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      bedrooms: PropTypes.number,
      maxAdults: PropTypes.number,
      description: PropTypes.string,
      facilities: PropTypes.arrayOf(PropTypes.string),
      isFavorite: PropTypes.bool,
      owner: PropTypes.shape({
        name: PropTypes.string,
        super: PropTypes.bool,
        img: PropTypes.shape({
          src: PropTypes.string,
          alt: PropTypes.string,
        }),
      }),
      city: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          zoom: PropTypes.number,
        }),
      }),
      location: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  getFavoritesServerData: PropTypes.func,
  offersCssClasses: PropTypes.shape({
    LIST: PropTypes.string.isRequired,
    ITEM: PropTypes.string.isRequired,
    IMAGE_WRAPPER: PropTypes.string.isRequired,
    ITEM_INFO: PropTypes.string.isRequired,
    IMAGE_SIZE: PropTypes.shape({
      WIDTH: PropTypes.number.isRequired,
      HEIGHT: PropTypes.number.isRequired,
    }),
  }),
  onHoverOffer: PropTypes.func.isRequired,
  activeOfferId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  activeCity: getCity(state),
  activeFilter: getActiveFilter(state),
  activeOfferId: getActiveOfferId(state),
  offers: getOffersMain(state),
  favorites: getFavoritesData(state),
  citiesNames: getCitiesNames(state),
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state),
  favoriteResponse: getResponseStatusFavorite(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onChangeFilterType(type) {
    dispatch(ActionCreator.setActiveFilter({ activeFilterItem: type }));
  },
  getAuthorizationStatus() {
    dispatch(UserOperation.getAuthorizationStatus());
  },
  login(authData) {
    dispatch(UserOperation.setAuthorizationStatus(authData));
  },
  getUpdatedFavoriteOffer(id, value) {
    dispatch(FavoritesOperation.getFavoriteResponse(id, value));
  },
  changeFavoriteFlag(value) {
    dispatch(DataAC.changeFavoriteById(value));
  },
  getFavoritesServerData() {
    dispatch(FavoritesOperation.getFavoritesData());
  },
  onHoverOffer(id) {
    dispatch(ActionCreator.setActiveOfferId({ activeOfferId: id }));
  },
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
