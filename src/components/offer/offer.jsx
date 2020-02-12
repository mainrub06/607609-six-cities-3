import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Offer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {element, handleOfferHover} = this.props;

    return (
      <article onMouseOver={handleOfferHover} className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
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
              <span style= {{width: ` 80%`}} ></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{element.name}</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    );
  }
}

Offer.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    img: PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  }),
  handleOfferHover: PropTypes.func
};

export default Offer;
