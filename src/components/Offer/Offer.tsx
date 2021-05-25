import React, { PureComponent } from "react";
import { getStarsFromNum } from "../../utils";
import { Link } from "react-router-dom";
import { LINKS } from "../../const";
import { IOffer } from "../../types/offer";
import { IConstCss } from "../../types/const-css";

interface IProps {
  isOfferDetailItem: boolean;
  favoriteResponse: boolean;
  offer: IOffer;
  offersCssClasses: IConstCss;
  onOfferClick(firstArg: string): void;
  handleClickFavoriteButton(firstArg: string, secondArg: boolean): void;
  handleOfferHover(firstArg: string | null): void;
}

class Offer extends PureComponent<IProps, {}> {
  constructor(props: IProps) {
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
    const { offer, handleOfferHover, onOfferClick, offersCssClasses } =
      this.props;

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
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: getStarsFromNum(offer.rate) + `%` }} />
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

export default Offer;
