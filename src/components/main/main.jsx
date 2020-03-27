import React from "react";
import PropTypes from "prop-types";
import CityList from "../city-list/city-list.jsx";
import MainInner from "../main-inner/main-inner.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import withActiveIndex from "../../hocs/with-active-index/with-active-index.jsx";
import {Link} from "react-router-dom";
import {AUTHORIZATION_STATUS, LINKS} from "../../const";

const CityListWrapper = withActiveIndex(CityList);

const Main = ({
  offers,
  onOfferClick,
  onChangeCity,
  city,
  onChangeFilterType,
  handleOfferHover,
  activePointId,
  activeFilter,
  citiesNames,
  authStatus,
  userInfo,
  handleClickFavoriteButton,
  favoriteResponse,
  handleFavoriteClick,
  offersCssClasses}) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authStatus === AUTHORIZATION_STATUS.NO_AUTH ? (
                  <Link to={LINKS.LOGIN} className="header__nav-link header__nav-link--profile">
                    <span className="header__login">Sign in</span>
                  </Link>
                ) : (
                  <Link to={LINKS.FAVORITES} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span onClick = {handleFavoriteClick} className="header__user-name user__name">{userInfo.userEmail}</span>
                  </Link>
                )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityListWrapper citiesNames = {citiesNames} onChangeCity = {onChangeCity} />
      {offers.length !== 0 ?
        <MainInner activeFilter = {activeFilter}
          activePointId = {activePointId}
          handleOfferHover = {handleOfferHover}
          onChangeFilterType = {onChangeFilterType}
          offers = {offers}
          onOfferClick = {onOfferClick}
          city = {city}
          handleClickFavoriteButton = {handleClickFavoriteButton}
          favoriteResponse = {favoriteResponse}
          offersCssClasses = {offersCssClasses}/>
        :
        <MainEmpty/>
      }
    </main>
  </div>
);

Main.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string,
              src: PropTypes.string
            })
        ),
        previewImage: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        }).isRequired,
        isPremium: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        bedrooms: PropTypes.number,
        maxAdults: PropTypes.number,
        description: PropTypes.string,
        facilities: PropTypes.arrayOf(
            PropTypes.string
        ),
        isFavorite: PropTypes.bool,
        owner: PropTypes.shape({
          name: PropTypes.string,
          super: PropTypes.bool,
          img: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
          })
        }),
        city: PropTypes.shape({
          name: PropTypes.string,
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number
          })
        }),
        location: PropTypes.arrayOf(
            PropTypes.number
        )
      })
  ),
  onOfferClick: PropTypes.func,
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func.isRequired,
  activePointId: PropTypes.string,
  activeFilter: PropTypes.string.isRequired,
  citiesNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  authStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  handleClickFavoriteButton: PropTypes.func.isRequired,
  favoriteResponse: PropTypes.bool,
  handleFavoriteClick: PropTypes.func,
  offersCssClasses: PropTypes.shape({
    LIST: PropTypes.string.isRequired,
    ITEM: PropTypes.string.isRequired,
    IMAGE_WRAPPER: PropTypes.string.isRequired,
    ITEM_INFO: PropTypes.string.isRequired,
    IMAGE_SIZE: PropTypes.shape({
      WIDTH: PropTypes.number.isRequired,
      HEIGHT: PropTypes.number.isRequired
    })
  })
};

export default Main;
