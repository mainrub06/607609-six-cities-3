import React from "react";
import OffersSort from "../OffersSort/OffersSort.tsx";
import OfferList from "../OffersList/OffersList.tsx";
import Map from "../map/map.jsx";
import withActiveIndex from "../../hocs/with-active-index/with-active-index.tsx";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag.jsx";
import PropTypes from "prop-types";

const OfferListWrapped = withActiveIndex(OfferList);
const OffersSortWrapped = withActiveFlag(OffersSort);

const MainInner = ({
  offers,
  onOfferClick,
  activeCity,
  onChangeFilterType,
  handleOfferHover,
  activeOfferId,
  activeFilter,
  handleClickFavoriteButton,
  favoriteResponse,
  offersCssClasses,
}) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {activeCity.name}
        </b>
        <OffersSortWrapped
          activeFilter={activeFilter}
          onChangeFilterType={onChangeFilterType}
        />

        <OfferListWrapped
          offersCssClasses={offersCssClasses}
          onOfferClick={onOfferClick}
          offers={offers}
          handleOfferHover={handleOfferHover}
          favoriteResponse={favoriteResponse}
          handleClickFavoriteButton={handleClickFavoriteButton}
        />
      </section>
      <div className="cities__right-section">
        <Map city={activeCity} activeOfferId={activeOfferId} offers={offers} />
      </div>
    </div>
  </div>
);

MainInner.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          alt: PropTypes.string,
          src: PropTypes.string,
        })
      ),
      previewImage: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
      }).isRequired,
      isPremium: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      bedrooms: PropTypes.number,
      maxAdults: PropTypes.number,
      description: PropTypes.string,
      facilities: PropTypes.arrayOf(PropTypes.string),
      isFavorite: PropTypes.bool,
      owner: PropTypes.shape({
        name: PropTypes.string,
        super: PropTypes.bool,
        img: PropTypes.shape({
          src: PropTypes.string,
          alt: PropTypes.string,
        }),
      }),
      city: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          zoom: PropTypes.number,
        }),
      }),
      location: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  onOfferClick: PropTypes.func.isRequired,
  activeCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func,
  activeFilter: PropTypes.string.isRequired,
  activeOfferId: PropTypes.string,
  handleClickFavoriteButton: PropTypes.func.isRequired,
  favoriteResponse: PropTypes.bool,
  offersCssClasses: PropTypes.shape({
    LIST: PropTypes.string.isRequired,
    ITEM: PropTypes.string.isRequired,
    IMAGE_WRAPPER: PropTypes.string.isRequired,
    ITEM_INFO: PropTypes.string.isRequired,
    IMAGE_SIZE: PropTypes.shape({
      WIDTH: PropTypes.number.isRequired,
      HEIGHT: PropTypes.number.isRequired,
    }),
  }),
};

export default MainInner;
