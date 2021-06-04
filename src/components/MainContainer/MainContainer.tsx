import React from "react";
import OffersSort from "../OffersSort/OffersSort";
import OffersList from "../OffersList/OffersList";
import Map from "../Map/Map";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag";
import {ICity, IOffer} from "../../types/offer";
import {IConstCss} from "../../types/const-css";

const OffersSortWrapped = withActiveFlag(OffersSort);

interface IMainContainer {
  activeOfferId?: string;
  activeFilter: string;
  favoriteResponse: boolean;
  offers: IOffer[] | null;
  activeCity: ICity;
  offersCssClasses: IConstCss;
  onOfferClick(): void;
  onChangeFilterType(): void;
  handleOfferHover(): void;
  handleClickFavoriteButton(): void;
}

const MainContainer = ({
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
}: IMainContainer) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers && offers.length} places to stay in {activeCity.name}
        </b>
        <OffersSortWrapped
          activeFilter={activeFilter}
          onChangeFilterType={onChangeFilterType}
        />

        <OffersList
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

export default MainContainer;
