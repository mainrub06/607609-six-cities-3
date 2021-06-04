import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../../const";
import OfferList from "../OffersList/OffersList";
import { IOffer } from "../../types/offer";
import { IUserInfo } from "../../types/user";
import { IConstCss } from "../../types/const-css";

interface IFavoriteProps {
  favoriteResponse: boolean;
  citiesNames: string[];
  favorites: IOffer[];
  userInfo: IUserInfo;
  offersCssClasses: IConstCss;
  onOfferClick(): void;
  getFavoritesServerData(): void;
  handleClickFavoriteButton(firstArg: string, secondArg: boolean): void;
}

interface IFavoritesState {
  getFavoritesByCity(firstArg: string): IOffer[] | null;
}

class Favorites extends PureComponent<IFavoriteProps, IFavoritesState> {
  constructor(props: IFavoriteProps) {
    super(props);

    this.getFavoritesByCity = this.getFavoritesByCity.bind(this);
  }

  componentDidMount() {
    const { getFavoritesServerData } = this.props;
    getFavoritesServerData();
  }

  getFavoritesByCity(city: string) {
    const { favorites } = this.props;

    if (favorites) {
      return favorites.filter((offer) => offer.city.name === city);
    }

    return null;
  }

  render() {
    const {
      favorites,
      userInfo,
      favoriteResponse,
      handleClickFavoriteButton,
      onOfferClick,
      offersCssClasses,
      citiesNames,
    } = this.props;

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link
                  to={LINKS.INDEX}
                  className="header__logo-link"
                  href="main.html"
                >
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        {userInfo.userEmail}
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {favorites !== null ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {citiesNames.map((city, index) => {
                    if (favorites.some((offer) => offer.city.name === city)) {
                      return (
                        <li
                          key={index + city}
                          className="favorites__locations-items"
                        >
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{city}</span>
                              </a>
                            </div>
                          </div>
                          <OfferList
                            offersCssClasses={offersCssClasses}
                            favoriteResponse={favoriteResponse}
                            handleClickFavoriteButton={
                              handleClickFavoriteButton
                            }
                            onOfferClick={onOfferClick}
                            offers={this.getFavoritesByCity(city)}
                          />
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </section>
            ) : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan yor future
                    trips.
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
        <footer className="footer container">
          <Link to={LINKS.INDEX} className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      </div>
    );
  }
}

export default Favorites;