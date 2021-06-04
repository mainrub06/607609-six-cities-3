import React, { PureComponent } from "react";
import { getStarsFromNum } from "../../utils";
import { MAX_PHOTOS_OFFER_DETAIL } from "../../const";
import Reviews from "../Reviews/Reviews";
import Map from "../Map/Map";
import OfferList from "../OffersList/OffersList";
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
import {IOffer} from "../../types/offer";
import {IUserInfo} from "../../types/user";
import {IConstCss} from "../../types/const-css";
import {IReview, IReviewFormSubmit} from "../../types/reviews";
import {match} from "../../types/router";
import {IRootApp} from "../../types/reducers";

interface IOfferDetail {
  favoriteResponse: boolean;
  reviewsResponse: number;
  authStatus: string;
  activeHotelId: string;
  offer: IOffer;
  nearOffers: IOffer[];
  reviews: IReview[];
  userInfo: IUserInfo;
  offersCssClasses: IConstCss;
  onOfferClick(): void;
  handleClickFavoriteButton(id: string, isFavorite: boolean): void;
  getComments(id: string): void;
  getNearOffersData(id: string): void;
  postComment(review: IReviewFormSubmit, activeHotelId: string | undefined): void;

  match: match<{id: string}>
}

class OfferDetail extends PureComponent<IOfferDetail> {
  constructor(props: IOfferDetail) {
    super(props);

    this.setFavoriteStatus = this.setFavoriteStatus.bind(this);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
  }

  componentDidMount() {
    const { offer, getComments, getNearOffersData } = this.props;

    getNearOffersData(offer.id);
    getComments(offer.id);
  }

  componentDidUpdate(prevProps: IOfferDetail) {
    const { match, offer, getNearOffersData, getComments } = this.props;

    if (prevProps.match.params.id !== match.params.id) {
      getNearOffersData(offer.id);
      getComments(offer.id);
    }
  }

  setFavoriteStatus(offer: IOffer) {
    const { favoriteResponse, handleClickFavoriteButton } = this.props;

    if (!favoriteResponse) {
      handleClickFavoriteButton(offer.id, !offer.isFavorite);
    }
  }

  handleSubmitFeedback(feedback: IReviewFormSubmit, activeHotelId: string) {
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
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
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
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span
                        style={{ width: getStarsFromNum(offer.rate) + `%` }}
                      />
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

const mapStateToProps = (state: IRootApp, ownProps: any) => ({
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
