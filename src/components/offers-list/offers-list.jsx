import React, {PureComponent} from "react";
import Offer from "../offer/offer.jsx";
import PropTypes from "prop-types";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {dataCards, onOfferClick, handleOfferHover} = this.props;
    return (
      <div className={`${this.props.isOfferDetailItem ? `near-places__list` : `cities__places-list tabs__content`} places__list`}>
        {dataCards.map((it) => (
          <Offer key={it.id} element={it} handleOfferHover={handleOfferHover} onOfferClick={onOfferClick} isOfferDetailItem = {this.props.isOfferDetailItem}/>
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
        class: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func.isRequired,
  isOfferDetailItem: PropTypes.bool,
  handleOfferHover: PropTypes.func.isRequired
};

export default OfferList;
