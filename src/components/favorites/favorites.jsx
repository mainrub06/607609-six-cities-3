import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {LINKS} from "../../const";
import OfferList from "../offers-list/offers-list.jsx";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {getFavoritesServerData} = this.props;
    getFavoritesServerData();
  }

  render() {
    const {
      favorites,
      userInfo,
      favoriteResponse,
      handleClickFavoriteButton,
      onOfferClick,
      offersCssClasses,
      citiesNames} = this.props;

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to={LINKS.INDEX} className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userInfo.userEmail}</span>
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
                  {
                    citiesNames.map((city, index) => {
                      return favorites.map((offer) => {
                        if (offer.city.name === city) {
                          return (
                            <li key= {index + city} className="favorites__locations-items">
                              <div className="favorites__locations locations locations--current">
                                <div className="locations__item">
                                  <a className="locations__item-link" href="#">
                                    <span>{city}</span>
                                  </a>
                                </div>
                              </div>
                              <OfferList offersCssClasses = {offersCssClasses}
                                favoriteResponse = {favoriteResponse}
                                handleClickFavoriteButton = {handleClickFavoriteButton}
                                onOfferClick={onOfferClick}
                                offers={offer}
                              />
                            </li>
                          );
                        }
                        return null;
                      });
                    })
                  }
                </ul>
              </section>
            ) : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                </div>
              </section>
            )
            }
          </div>
        </main>
        <footer className="footer container">
          <Link to={LINKS.INDEX} className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    );
  }
}


Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
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
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  favoriteResponse: PropTypes.bool,
  handleClickFavoriteButton: PropTypes.func,
  onOfferClick: PropTypes.func,
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
  getFavoritesServerData: PropTypes.func,
  citiesNames: PropTypes.arrayOf(
      PropTypes.string
  )
};

export default Favorites;
