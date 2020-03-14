import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import CityList from "../city-list/city-list.jsx";
import MainInner from "../main-inner/main-inner.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import withActiveIndex from "../../hocs/withActiveIndex/withActiveIndex.jsx";
import {Link} from "react-router-dom";
import {AUTHORIZATION_STATUS, LINKS} from "../../const";

const CityListWrapper = withActiveIndex(CityList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {dataCards,
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
      handleAuthToggle,
      handleClickFavoriteButton,
      favoriteResponse} = this.props;

    return (
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
                    {authStatus === AUTHORIZATION_STATUS.NO_AUTH ?
                      <Link to={LINKS.LOGIN} className="header__nav-link header__nav-link--profile">
                        <span onClick = {handleAuthToggle} className="header__login">Sign in</span>
                      </Link>
                      :
                      <Link to={LINKS.FAVORITES} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userInfo.userEmail}</span>
                      </Link>
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

          {dataCards.length !== 0 ?
            <MainInner activeFilter = {activeFilter}
              activePointId = {activePointId}
              handleOfferHover = {handleOfferHover}
              onChangeFilterType = {onChangeFilterType}
              dataCards = {dataCards}
              onOfferClick = {onOfferClick}
              city = {city}
              handleClickFavoriteButton = {handleClickFavoriteButton}
              favoriteResponse = {favoriteResponse}/>
            :
            <MainEmpty/>
          }
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        }).isRequired,
        class: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        cords: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
      }).isRequired
  ).isRequired,
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
  handleAuthToggle: PropTypes.func.isRequired,
  handleClickFavoriteButton: PropTypes.func.isRequired,
  favoriteResponse: PropTypes.bool
};

export default Main;
