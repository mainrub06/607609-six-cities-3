import React, {PureComponent} from "react";
import Offer from "../offer/offer.jsx";
import PropTypes from "prop-types";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.setIdState = this.setIdState.bind(this);
  }

  setIdState(id) {
    if (this.props.handleOfferHover) {
      const {handleOfferHover} = this.props;

      handleOfferHover(id);
    }
  }

  render() {
    const {dataCards, onOfferClick, offersCssClasses, handleClickFavoriteButton, favoriteResponse, cardsLength} = this.props;

    return (
      <div className={`${offersCssClasses.LIST} places__list`}>
        {dataCards.slice(0, cardsLength).map((hotel) => (
          <Offer key={hotel.id}
            element={hotel}
            handleOfferHover={this.setIdState}
            onOfferClick={onOfferClick}
            offersCssClasses = {offersCssClasses}
            handleClickFavoriteButton = {handleClickFavoriteButton}
            favoriteResponse = {favoriteResponse}
          />
        ))}
      </div>
    );
  }
}

OfferList.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        }),
        isPremium: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func,
  activeItemIndex: PropTypes.number,
  handleItemClick: PropTypes.func,
  handleClickFavoriteButton: PropTypes.func,
  favoriteResponse: PropTypes.bool,
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
  cardsLength: PropTypes.number
};

export default OfferList;
