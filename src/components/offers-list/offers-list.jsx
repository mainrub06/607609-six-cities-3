import React, { PureComponent } from "react";
import Offer from "../Offer/Offer.tsx";
import PropTypes from "prop-types";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.setIdState = this.setIdState.bind(this);
  }

  setIdState(id) {
    if (this.props.handleOfferHover) {
      const { handleOfferHover } = this.props;

      handleOfferHover(id);
    }
  }

  render() {
    const {
      offers,
      onOfferClick,
      offersCssClasses,
      handleClickFavoriteButton,
      favoriteResponse,
      cardsLength,
    } = this.props;

    return (
      <div className={`${offersCssClasses.LIST} places__list`}>
        {offers.slice(0, cardsLength).map((offer) => (
          <Offer
            key={offer.id}
            offer={offer}
            handleOfferHover={this.setIdState}
            onOfferClick={onOfferClick}
            offersCssClasses={offersCssClasses}
            handleClickFavoriteButton={handleClickFavoriteButton}
            favoriteResponse={favoriteResponse}
          />
        ))}
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
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
      HEIGHT: PropTypes.number.isRequired,
    }),
  }),
  cardsLength: PropTypes.number,
};

export default OfferList;
