import React from "react";
import CityList from "../CityList/CityList";
import MainContainer from "../MainContainer/MainContainer";
import MainEmpty from "../MainEmpty/MainEmpty";
import { Link } from "react-router-dom";
import { AUTHORIZATION_STATUS, LINKS } from "../../const";
import {ICity, IOffer} from "../../types/offer";
import {IConstCss} from "../../types/const-css";
import {IUserInfo} from "../../types/user";

export interface IMainContainer {
  activeOfferId?: string;
  activeFilter: string;
  favoriteResponse: boolean;
  offers: IOffer[] | null;
  activeCity: ICity;
  offersCssClasses: IConstCss;
  onOfferClick(): void;
  onChangeFilterType(): void;
  handleOfferHover(): void;
  handleClickFavoriteButton(): void;
}

interface IMain extends IMainContainer {
  authStatus: string;
  citiesNames: string[];
  userInfo: IUserInfo;
  onChangeCity(): void;
  handleFavoriteClick(): void;
}

const Main = ({
  offers,
  onOfferClick,
  onChangeCity,
  activeCity,
  onChangeFilterType,
  handleOfferHover,
  activeOfferId,
  activeFilter,
  citiesNames,
  authStatus,
  userInfo,
  handleClickFavoriteButton,
  favoriteResponse,
  handleFavoriteClick,
  offersCssClasses,
}: IMain) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authStatus === AUTHORIZATION_STATUS.NO_AUTH ? (
                  <Link
                    to={LINKS.LOGIN}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <span className="header__login">Sign in</span>
                  </Link>
                ) : (
                  <Link
                    to={LINKS.FAVORITES}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span
                      onClick={handleFavoriteClick}
                      className="header__user-name user__name"
                    >
                      {userInfo.userEmail}
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityList
        activeCity={activeCity}
        citiesNames={citiesNames}
        onChangeCity={onChangeCity}
      />
      {offers && offers.length !== 0 ? (
        <MainContainer
          activeCity={activeCity}
          activeFilter={activeFilter}
          activeOfferId={activeOfferId}
          handleOfferHover={handleOfferHover}
          handleClickFavoriteButton={handleClickFavoriteButton}
          onChangeFilterType={onChangeFilterType}
          onOfferClick={onOfferClick}
          offers={offers}
          favoriteResponse={favoriteResponse}
          offersCssClasses={offersCssClasses}
        />
      ) : (
        <MainEmpty />
      )}
    </main>
  </div>
);

export default Main;
