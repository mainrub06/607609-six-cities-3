import React, {PureComponent} from "react";
import Offer from "../offer/offer.jsx";
import PropTypes from "prop-types";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null
    };
    this.handleOfferHover = this.handleOfferHover.bind(this);
  }

  handleOfferHover(id = null) {
    this.setState({
      activeOfferId: id
    });
  }

  render() {
    const {dataCards, onOfferClick} = this.props;
    return (
      <div className={`${this.props.offerDetail ? `near-places__list` : `cities__places-list tabs__content`} places__list`}>
        {dataCards.map((it) => (
          <Offer key={it.id} element={it} handleOfferHover={this.handleOfferHover} onOfferClick={onOfferClick} offerDetail = {this.props.offerDetail}/>
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
  offerDetail: PropTypes.bool
};

export default OfferList;
