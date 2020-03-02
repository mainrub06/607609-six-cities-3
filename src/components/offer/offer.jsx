import React from "react";
import PropTypes from "prop-types";
import {getStarsFromNum} from "../../utils";

const Offer = ({element, handleOfferHover, onOfferClick, isOfferDetailItem}) => {
  return (
    <article onMouseOver={() => {
      handleOfferHover(element.id);
    }} onMouseLeave={()=> {
      handleOfferHover(null);
    }} className= {`${isOfferDetailItem ? `near-places__card` : `cities__place-card`} place-card`}>

      {!isOfferDetailItem &&
        <div className="place-card__mark">
          <span>{element.class}</span>
        </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={element.img.src} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{element.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getStarsFromNum(element.rate) + `%`}} ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 onClick={() => {
          onOfferClick(element.id);
        }} className="place-card__name">
          <a href="#">{element.name}</a>
        </h2>
        <p className="place-card__type">{element.type}</p>
      </div>
    </article>
  );
};

Offer.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    img: PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }),
    class: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
  }),
  handleOfferHover: PropTypes.func.isRequired,
  onOfferClick: PropTypes.func.isRequired,
  isOfferDetailItem: PropTypes.bool
};

export default Offer;
