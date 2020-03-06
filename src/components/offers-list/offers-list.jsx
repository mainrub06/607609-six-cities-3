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
    const {dataCards, onOfferClick, isOfferDetailItem} = this.props;
    return (
      <div className={`${isOfferDetailItem ? `near-places__list` : `cities__places-list tabs__content`} places__list`}>
        {dataCards.map((it) => (
          <Offer key={it.id}
            element={it}
            handleOfferHover={this.setIdState}
            onOfferClick={onOfferClick}
            isOfferDetailItem = {isOfferDetailItem}/>
        ))}
      </div>
    );
  }
}

OfferList.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        img: PropTypes.shape({
          alt: PropTypes.string,
          src: PropTypes.string
        }),
        class: PropTypes.bool,
        type: PropTypes.string,
        rate: PropTypes.number
      })
  ).isRequired,
  onOfferClick: PropTypes.func.isRequired,
  isOfferDetailItem: PropTypes.bool,
  handleOfferHover: PropTypes.func.isRequired,
  activeItemIndex: PropTypes.number,
  handleItemClick: PropTypes.func
};

export default OfferList;
