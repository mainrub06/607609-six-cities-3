import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { getStarsFromNum } from "../../utils";
import { MAX_PHOTOS_OFFER_DETAIL } from "../../const";
import Reviews from "../Reviews/Reviews.tsx";
import Map from "../Map/Map.tsx";
import OfferList from "../OffersList/OffersList.tsx";
import { Link } from "react-router-dom";
import { AUTHORIZATION_STATUS, LINKS, DETAIL_PAGE_PARAMS } from "../../const";
import { Operation as DataOperation } from "../../reducer/data/data";
import { Operation as ReviewsOperation } from "../../reducer/reviews/reviews";
import {
  getReviews,
  getReviewsResponse,
} from "../../reducer/reviews/selectors";
import { getOffer, getNearOffers } from "../../reducer/data/selectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class OfferDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.setFavoriteStatus = this.setFavoriteStatus.bind(this);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
  }

  componentDidMount() {
    const { offer, getComments, getNearOffersData } = this.props;

    getNearOffersData(offer.id);
    getComments(offer.id);
  }

  componentDidUpdate(prevProps) {
    const { match, offer, getNearOffersData, getComments } = this.props;

    if (prevProps.match.params.id !== match.params.id) {
      getNearOffersData(offer.id);
      getComments(offer.id);
    }
  }

  setFavoriteStatus(offer) {
    const { favoriteResponse, handleClickFavoriteButton } = this.props;

    if (!favoriteResponse) {
      handleClickFavoriteButton(offer.id, !offer.favorite);
    }
  }

  handleSubmitFeedback(feedback, activeHotelId) {
    const { postComment } = this.props;

    postComment(feedback, activeHotelId);
  }

  render() {
    const {
      onOfferClick,
      authStatus,
      userInfo,
      handleClickFavoriteButton,
      offersCssClasses,
      favoriteResponse,
      reviewsResponse,
      reviews,
      offer,
      nearOffers,
    } = this.props;

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
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
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

        {offer && (
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {offer.photos
                    .slice(0, MAX_PHOTOS_OFFER_DETAIL)
                    .map((photo, index) => (
                      <div
                        key={photo.alt + index}
                        className="property__image-wrapper"
                      >
                        <img
                          className="property__image"
                          src={photo.src}
                          alt={photo.alt}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {offer.isPremium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )}

                  <div className="property__name-wrapper">
                    <h1 className="property__name">{offer.name}</h1>
                    <button
                      className={`${
                        offer.isFavorite
                          ? `property__bookmark-button--active`
                          : ``
                      } property__bookmark-button button`}
                      type="button"
                      onClick={() => {
                        this.setFavoriteStatus(offer);
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
                        style={{ width: getStarsFromNum(offer.rate) + `%` }}
                      ></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">
                      {offer.rate}
                    </span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {offer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">
                      What&apos;s inside
                    </h2>
                    <ul className="property__inside-list">
                      {offer.facilities.map((facility, index) => (
                        <li
                          key={facility + index}
                          className="property__inside-item"
                        >
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div
                        className={
                          offer.owner.super
                            ? `property__avatar-wrapper--pro property__avatar-wrapper user__avatar-wrapper`
                            : `property__avatar-wrapper user__avatar-wrapper`
                        }
                      >
                        <img
                          className="property__avatar user__avatar"
                          src={`/${offer.owner.img.src}`}
                          width="74"
                          height="74"
                          alt={offer.owner.img.alt}
                        />
                      </div>
                      <span className="property__user-name">
                        {offer.owner.name}
                      </span>
                    </div>
                    <div className="property__description">
                      {offer.description}
                    </div>
                  </div>
                  <Reviews
                    reviewsResponse={reviewsResponse}
                    activeHotelId={offer.id}
                    authStatus={authStatus}
                    reviews={reviews}
                    handleSubmitFeedback={this.handleSubmitFeedback}
                  />
                </div>
              </div>

              {nearOffers && (
                <Map
                  city={offer.city}
                  activeOfferId={offer.id}
                  offers={nearOffers}
                  nearMap={true}
                />
              )}
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>

                {nearOffers && (
                  <OfferList
                    offersCssClasses={offersCssClasses}
                    cardsLength={DETAIL_PAGE_PARAMS.NEAR_OFFERS_MAX}
                    onOfferClick={onOfferClick}
                    offers={nearOffers}
                    favoriteResponse={favoriteResponse}
                    handleClickFavoriteButton={handleClickFavoriteButton}
                  />
                )}
              </section>
            </div>
          </main>
        )}
      </div>
    );
  }
}

OfferDetail.propTypes = {
  onOfferClick: PropTypes.func,
  authStatus: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    userEmail: PropTypes.string,
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    isPro: PropTypes.bool,
  }),
  handleClickFavoriteButton: PropTypes.func,
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
  favoriteResponse: PropTypes.bool,
  reviewsResponse: PropTypes.number,
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
        avatar: PropTypes.string,
      }),
    })
  ),
  offer: PropTypes.shape({
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
  }),
  nearOffers: PropTypes.arrayOf(
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  getNearOffersData: PropTypes.func,
  getComments: PropTypes.func,
  postComment: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  offer: getOffer(state, ownProps),
  nearOffers: getNearOffers(state),
  reviews: getReviews(state),
  reviewsResponse: getReviewsResponse(state),
});

const mapDispatchToProps = (dispatch) => ({
  getNearOffersData(id) {
    dispatch(DataOperation.getNearOffers(id));
  },
  getComments(id) {
    dispatch(ReviewsOperation.getReviewsFromHotelId(id));
  },
  postComment(review, id) {
    dispatch(ReviewsOperation.postReviewFromHotelId(review, id));
  },
});

export { OfferDetail };
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferDetail)
);
