import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { getStarsFromNum } from "../../utils";
import { Link } from "react-router-dom";
import { LINKS } from "../../const";

class Offer extends PureComponent {
  constructor(props) {
    super(props);
    this.setFavoriteStatus = this.setFavoriteStatus.bind(this);
  }

  setFavoriteStatus() {
    const { favoriteResponse, handleClickFavoriteButton, offer } = this.props;
    if (!favoriteResponse) {
      handleClickFavoriteButton(offer.id, !offer.isFavorite);
    }
  }

  render() {
    const {
      offer,
      handleOfferHover,
      onOfferClick,
      offersCssClasses,
    } = this.props;

    return (
      <article
        onMouseOver={() => {
          handleOfferHover(offer.id);
        }}
        onMouseLeave={() => {
          handleOfferHover(null);
        }}
        className={`${offersCssClasses.ITEM} place-card`}
      >
        {offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}

        <div
          className={`${offersCssClasses.IMAGE_WRAPPER} place-card__image-wrapper`}
        >
          <a href="#">
            <img
              className="place-card__image"
              src={offer.previewImage.src}
              width={`${offersCssClasses.IMAGE_SIZE.WIDTH}`}
              height={`${offersCssClasses.IMAGE_SIZE.HEIGHT}`}
              alt="Place image"
            />
          </a>
        </div>
        <div className={`${offersCssClasses.ITEM_INFO} place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              onClick={() => {
                this.setFavoriteStatus();
              }}
              className={`${
                offer.isFavorite ? `place-card__bookmark-button--active` : ``
              } place-card__bookmark-button button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: getStarsFromNum(offer.rate) + `%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2
            onClick={() => {
              onOfferClick(offer.id);
            }}
            className="place-card__name"
          >
            <Link to={LINKS.OFFER_DETAIL + `${offer.id}`}>{offer.name}</Link>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    );
  }
}

Offer.propTypes = {
  offer: PropTypes.shape({
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
    isFavorite: PropTypes.bool.isRequired,
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
  handleOfferHover: PropTypes.func.isRequired,
  onOfferClick: PropTypes.func.isRequired,
  isOfferDetailItem: PropTypes.bool,
  handleClickFavoriteButton: PropTypes.func.isRequired,
  favoriteResponse: PropTypes.bool,
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
};

export default Offer;
