import React, { PureComponent } from "react";
import Offer from "./Offer";
import { IOffer } from "../../types/offer";
import { IConstCss } from "../../types/const-css";

export interface IOfferListProps {
  isOfferDetailItem?: boolean;
  favoriteResponse?: boolean;
  cardsLength: number;
  offers: IOffer[];
  offersCssClasses: IConstCss;
  onOfferClick(firstArg: string): void;
  handleClickFavoriteButton(firstArg: string, secondArg: boolean): void;
  handleOfferHover(firstArg: string | null): void;
  setIdState?(firstArg: string | null): void;
}

class OfferList extends PureComponent<IOfferListProps, {}> {
  constructor(props: IOfferListProps) {
    super(props);

    this.setIdState = this.setIdState.bind(this);
  }

  setIdState(id: string | null) {
    if (!!this.props.handleOfferHover) {
      const { handleOfferHover } = this.props;

      handleOfferHover(id);
    }
  }

  render() {
    const {
      offers,
      onOfferClick,
      offersCssClasses,
      handleClickFavoriteButton,
      favoriteResponse,
      cardsLength,
    } = this.props;

    return (
      <div className={`${offersCssClasses.LIST} places__list`}>
        {offers.slice(0, cardsLength).map((offer) => (
          <Offer
            key={offer.id}
            offer={offer}
            handleOfferHover={this.setIdState}
            onOfferClick={onOfferClick}
            offersCssClasses={offersCssClasses}
            handleClickFavoriteButton={handleClickFavoriteButton}
            favoriteResponse={favoriteResponse}
          />
        ))}
      </div>
    );
  }
}

export default OfferList;
