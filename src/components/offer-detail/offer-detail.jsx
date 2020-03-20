import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getStarsFromNum} from "../../utils";
import {MAX_PHOTOS_OFFER_DETAIL} from "../../const";
import Reviews from "../reviews/reviews.jsx";
import MapDetail from "../map/map.jsx";
import OfferList from "../offers-list/offers-list.jsx";
import {Link} from "react-router-dom";
import {AUTHORIZATION_STATUS, LINKS, DETAIL_PAGE_PARAMS} from "../../const";
import {withRouter} from "react-router-dom";

class OfferDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.setFavoriteStatus = this.setFavoriteStatus.bind(this);
  }

  setFavoriteStatus(element) {
    const {favoriteResponse, handleClickFavoriteButton} = this.props;

    if (!favoriteResponse) {
      handleClickFavoriteButton(element.id, !element.favorite);
    }
  }

  render() {
    const {
      dataCardsDetail,
      reviews,
      onOfferClick,
      handleOfferHover,
      authStatus,
      userInfo,
      handleSubmitFeedback,
      handleClickFavoriteButton,
      offersCssClasses,
      match,
      getNearHotels,
      offersNear,
      getComments
    } = this.props;

    const element = dataCardsDetail.find((dataCardsDetailItem) => dataCardsDetailItem.id === match.params.id);

    if (offersNear === null && reviews === null) {
      getNearHotels(element.id);
      getComments(element.id);
    }

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to={LINKS.INDEX} className="header__logo-link" href="#">
                  <img
                    className="header__logo"
                    src="/img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    {authStatus === AUTHORIZATION_STATUS.NO_AUTH ?
                      <Link to={LINKS.LOGIN} className="header__nav-link header__nav-link--profile">
                        <span className="header__login">Sign in</span>
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

        {element && (

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {element.photos.slice(0, MAX_PHOTOS_OFFER_DETAIL).map((el, id) => (<div key={el.alt + id} className="property__image-wrapper">
                    <img className="property__image" src={el.src} alt={el.alt}/>
                  </div>)
                  )}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {element.class &&
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  }

                  <div className="property__name-wrapper">
                    <h1 className="property__name">{element.name}</h1>
                    <button
                      className={`${element.favorite ? `property__bookmark-button--active` : ``} property__bookmark-button button`}
                      type="button"
                      onClick = {() => {
                        this.setFavoriteStatus(element);
                      }}
                    >
                      <svg
                        className="property__bookmark-icon"
                        width="31"
                        height="33"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span
                        style={{width: getStarsFromNum(element.rate) + `%`}}
                      ></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">
                      {element.rate}
                    </span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {element.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {element.rooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {element.guests} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">
                      &euro;{element.price}
                    </b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">
                      What&apos;s inside
                    </h2>
                    <ul className="property__inside-list">
                      {element.facilities.map((it, id) => (
                        <li key={it + id} className="property__inside-item">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div
                        className={
                          element.owner.super
                            ? `property__avatar-wrapper--pro property__avatar-wrapper user__avatar-wrapper`
                            : `property__avatar-wrapper user__avatar-wrapper`
                        }
                      >
                        <img
                          className="property__avatar user__avatar"
                          src={`/${element.owner.img.src}`}
                          width="74"
                          height="74"
                          alt={element.owner.img.alt}
                        />
                      </div>
                      <span className="property__user-name">
                        {element.owner.name}
                      </span>
                    </div>
                    <div className="property__description">
                      {element.description.map((it, id) => (
                        <p key={it + id} className="property__text">
                          {it}
                        </p>
                      ))}
                    </div>
                  </div>
                  {<Reviews activeHotelId = {element.id} authStatus = {authStatus} reviews={reviews} handleSubmitFeedback={handleSubmitFeedback}/>}
                </div>
              </div>

              {offersNear !== null &&
                <MapDetail city = {element.city} activePointId = {element.id} points={offersNear} nearMap={true} />
              }
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>

                {offersNear !== null &&
                  <OfferList
                    onOfferClick={onOfferClick}
                    dataCards={offersNear}
                    handleOfferHover = {handleOfferHover}
                    handleClickFavoriteButton = {handleClickFavoriteButton}
                    offersCssClasses = {offersCssClasses}
                    cardsLength = {DETAIL_PAGE_PARAMS.NEAR_OFFERS_MAX}
                  />
                }
              </section>
            </div>
          </main>
        )}
      </div>
    );
  }
}

OfferDetail.propTypes = {
  element: PropTypes.shape({
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
    description: PropTypes.arrayOf(
        PropTypes.string
    ),
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
  }),
  dataCardsDetail: PropTypes.arrayOf(
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
  onOfferClick: PropTypes.func,
  dataCards: PropTypes.arrayOf(
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
  handleOfferHover: PropTypes.func,
  activePointId: PropTypes.string,
  city: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    })
  }),
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  authStatus: PropTypes.string,
  handleAuthToggle: PropTypes.func,
  handleSubmitFeedback: PropTypes.func,
  handleClickFavoriteButton: PropTypes.func,
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
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
  getComments: PropTypes.func,
  favoriteResponse: PropTypes.bool
};

export default withRouter(OfferDetail);
