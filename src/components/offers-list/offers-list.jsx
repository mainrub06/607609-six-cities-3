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
    const {dataCards, onOfferClick, offersCssClasses, handleClickFavoriteButton, favoriteResponse} = this.props;

    return (
      <div className={`${offersCssClasses.LIST} places__list`}>
        {dataCards.map((it) => (
          <Offer key={it.id}
            element={it}
            handleOfferHover={this.setIdState}
            onOfferClick={onOfferClick}
            offersCssClasses = {offersCssClasses}
            handleClickFavoriteButton = {handleClickFavoriteButton}
            favoriteResponse = {favoriteResponse}/>
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
        class: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func.isRequired,
  offersCssClasses: PropTypes.shape(),
  handleOfferHover: PropTypes.func.isRequired,
  activeItemIndex: PropTypes.number,
  handleItemClick: PropTypes.func,
  handleClickFavoriteButton: PropTypes.func,
  favoriteResponse: PropTypes.bool
};

export default OfferList;
