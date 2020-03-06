import React, {PureComponent} from "react";
import OffersSort from "../offers-sort/offers-sort.jsx";
import OfferList from "../offers-list/offers-list.jsx";
import MapMain from "../map/map.jsx";
import withActiveIndex from "../../hocs/withActiveIndex/withActiveIndex.jsx";
import PropTypes from "prop-types";

const OfferListWrapped = withActiveIndex(OfferList);

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
      activePointId,
      activeFilter
    } = this.props;

    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {dataCards.length} places to stay in {city.name}
            </b>
            <OffersSort activeFilter = {activeFilter} onChangeFilterType = {onChangeFilterType}/>

            {<OfferListWrapped handleOfferHover = {handleOfferHover} onOfferClick={onOfferClick} dataCards={dataCards} />}
          </section>
          <div className="cities__right-section">
            {<MapMain city = {city} activePointId = {activePointId} points={dataCards} />}
          </div>
        </div>
      </div>
    );
  }
}

MainInner.propTypes = {
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
        rate: PropTypes.number,
        cords: PropTypes.arrayOf(PropTypes.number)
      })
  ).isRequired,
  onOfferClick: PropTypes.func,
  city: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    })
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func,
  activeFilter: PropTypes.string.isRequired,
  activePointId: PropTypes.string
};

export default MainInner;
