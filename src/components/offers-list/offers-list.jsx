import React, { PureComponent } from "react";
import Offer from "../offer/offer.jsx";
import PropTypes from "prop-types";

// const OfferList = ({dataCards, onOfferClick, handleOfferHover, isOfferDetailItem, handleItemClick}) => {
//   return (
//     <div className={`${isOfferDetailItem ? `near-places__list` : `cities__places-list tabs__content`} places__list`}>
//       {dataCards.map((it) => (
//         <Offer key={it.id}
//           element={it}
//           handleOfferHover={handleOfferHover}
//           onOfferClick={onOfferClick}
//           isOfferDetailItem = {isOfferDetailItem}
//           handleItemClick = {handleItemClick}/>
//       ))}
//     </div>
//   );
// };

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
  }

  setIdState(id) {
    if (this.props.handleOfferHover) {
      const {handleOfferHover} = this.props;

      handleOfferHover(id);
    }
  }

  render() {
    const {dataCards, onOfferClick, handleOfferHover, isOfferDetailItem, handleItemClick} = this.props;
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
  };
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
  handleOfferHover: PropTypes.func.isRequired,
  activeItemIndex: PropTypes.number,
  handleItemClick: PropTypes.func
};

export default OfferList;
