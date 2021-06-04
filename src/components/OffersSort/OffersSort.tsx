import React from "react";
import { OFFERS_SORT_ITEMS } from "../../const";

interface IOffersSort {
  activeFilter: string;
  isActiveFlag?: boolean;
  onChangeFilterType(firstArg: string): void;
  handleItemChange?(firstArg: boolean): void;
}

const OffersSort = ({
  onChangeFilterType,
  activeFilter,
  isActiveFlag,
  handleItemChange,
}: IOffersSort) => {
  const onMouseLeave = () => handleItemChange && handleItemChange(false);
  const onMouseEnter = () => handleItemChange && handleItemChange(true);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
      {activeFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>

      <ul
        className={`places__options places__options--custom ${
          isActiveFlag ? `places__options--opened` : ``
        }`}
      >
        {OFFERS_SORT_ITEMS.map((sortItem, index) => (
          <li
            key={sortItem + index}
            className={`${
              activeFilter === sortItem ? `places__option--active` : ``
            } places__option`}
            tabIndex={0}
            onClick={() => {
              onChangeFilterType(sortItem);
            }}
          >
            {sortItem}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersSort;
