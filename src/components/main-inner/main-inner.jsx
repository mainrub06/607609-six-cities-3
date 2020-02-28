import React, {PureComponent} from "react";
import OffersSort from "../offers-sort/offers-sort.jsx";
import OfferList from "../offers-list/offers-list.jsx";
import MapMain from "../map/map.jsx";
import PropTypes from "prop-types";

class MainInner extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dataCards,
      onOfferClick,
      city,
      onChangeFilterType,
      handleOfferHover,
      activePointId
    } = this.props;

    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {dataCards.length} places to stay in {city}
            </b>
            <OffersSort onChangeFilterType = {onChangeFilterType}/>

            {<OfferList handleOfferHover = {handleOfferHover} onOfferClick={onOfferClick} dataCards={dataCards} />}
          </section>
          <div className="cities__right-section">
            {<MapMain activePointId = {activePointId} points={dataCards} />}
          </div>
        </div>
      </div>
    );
  }
}

MainInner.propTypes = {
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
        rate: PropTypes.number.isRequired,
        cords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func,
  city: PropTypes.string.isRequired,
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func.isRequired
};

export default MainInner;
