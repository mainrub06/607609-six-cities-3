import React, {PureComponent} from "react";
import Offer from "../offer/offer.jsx";
import PropTypes from "prop-types";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: ""
    };
  }

  handleOfferHover(e) {

    console.log(e)
  }

  render() {
    const {dataCards} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {dataCards.map(it => (
          <Offer key={it.id} element={it} handleOfferHover={this.handleOfferHover}/>
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
      })
    })
  ).isRequired
};

export default OfferList;
