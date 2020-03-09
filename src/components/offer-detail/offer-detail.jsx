import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getStarsFromNum} from "../../utils";
import {MAX_PHOTOS_OFFER_DETAIL} from "../../const";
import Reviews from "../reviews/reviews.jsx";
import MapDetail from "../map/map.jsx";
import OfferList from "../offers-list/offers-list.jsx";
import {AUTHORIZATION_STATUS} from "../../const";

class OfferDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  getSameOffers(cords, dataCards) {
    if (cords && dataCards) {
      return cords.map((nearCordsItem) => dataCards.find((dataCardsItem) => dataCardsItem.id === nearCordsItem.id));
    } else {
      return [];
    }
  }

  render() {
    const {
      dataCardsDetail,
      review,
      activeId,
      dataCards,
      onOfferClick,
      handleOfferHover,
      activePointId,
      city,
      authStatus,
      userInfo,
      handleAuthToggle
    } = this.props;
    const element = dataCardsDetail.find((dataCardsDetailItem) => dataCardsDetailItem.id === activeId.toString());
    const sameOffers = this.getSameOffers(element.nearCords, dataCards);

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="#">
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
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      {authStatus === AUTHORIZATION_STATUS.NO_AUTH ?
                        <span onClick = {handleAuthToggle} className="header__login">Sign in</span>
                        :
                        <span className="header__user-name user__name">{userInfo.userEmail}</span>
                      }
                    </a>
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
                      className="property__bookmark-button button"
                      type="button"
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
                          src={element.owner.img.src}
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
                  {<Reviews review={review} />}
                </div>
              </div>

              {<MapDetail city = {city} activePointId = {activePointId} points={sameOffers} nearMap={true} />}
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>

                {
                  <OfferList
                    onOfferClick={onOfferClick}
                    isOfferDetailItem={true}
                    dataCards={sameOffers}
                    handleOfferHover = {handleOfferHover}
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
  activeId: PropTypes.string,
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
  review: PropTypes.shape({
    id: PropTypes.string,
    reviewsArr: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string,
          rate: PropTypes.number,
          text: PropTypes.string,
          date: PropTypes.string,
          photo: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
          })
        })
    )
  }),
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
  handleAuthToggle: PropTypes.func
};

export default OfferDetail;
