import React, {PureComponent} from "react";
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
      city
    } = this.props;
    const points = dataCards.map((it) => it.cords);

    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {dataCards.length} places to stay in {city}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex="0"
                >
                  Popular
                </li>
                <li className="places__option" tabIndex="0">
                  Price: low to high
                </li>
                <li className="places__option" tabIndex="0">
                  Price: high to low
                </li>
                <li className="places__option" tabIndex="0">
                  Top rated first
                </li>
              </ul>

              {/* <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" selected="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select> */}
            </form>

            {<OfferList onOfferClick={onOfferClick} dataCards={dataCards} />}
          </section>
          <div className="cities__right-section">
            {<MapMain points={points} />}
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
  city: PropTypes.string.isRequired
};

export default MainInner;
