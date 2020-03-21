import React from "react";
import OffersSort from "../offers-sort/offers-sort.jsx";
import OfferList from "../offers-list/offers-list.jsx";
import MapMain from "../map/map.jsx";
import withActiveIndex from "../../hocs/withActiveIndex/withActiveIndex.jsx";
import PropTypes from "prop-types";

const OfferListWrapped = withActiveIndex(OfferList);

const MainInner = ({
  dataCards,
  onOfferClick,
  city,
  onChangeFilterType,
  handleOfferHover,
  activePointId,
  activeFilter,
  handleClickFavoriteButton,
  favoriteResponse,
  offersCssClasses
}) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {dataCards.length} places to stay in {city.name}
        </b>
        <OffersSort
          activeFilter={activeFilter}
          onChangeFilterType={onChangeFilterType}
        />

        {
          <OfferListWrapped
            offersCssClasses={offersCssClasses}
            onOfferClick={onOfferClick}
            dataCards={dataCards}
            handleOfferHover={handleOfferHover}
            favoriteResponse={favoriteResponse}
            handleClickFavoriteButton={handleClickFavoriteButton}
          />
        }
      </section>
      <div className="cities__right-section">
        {
          <MapMain
            city={city}
            activePointId={activePointId}
            points={dataCards}
          />
        }
      </div>
    </div>
  </div>
);

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
        class: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        cords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func,
  activeFilter: PropTypes.string.isRequired,
  activePointId: PropTypes.string,
  handleClickFavoriteButton: PropTypes.func.isRequired,
  favoriteResponse: PropTypes.bool,
  offersCssClasses: PropTypes.shape({
    LIST: PropTypes.string.isRequired,
    ITEM: PropTypes.string.isRequired,
    IMAGE_WRAPPER: PropTypes.string.isRequired,
    ITEM_INFO: PropTypes.string.isRequired,
    IMAGE_SIZE: PropTypes.shape({
      WIDTH: PropTypes.number.isRequired,
      HEIGHT: PropTypes.number.isRequired
    })
  })
};

export default MainInner;
