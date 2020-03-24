import React from "react";
import {OFFERS_SORT_ITEMS} from "../../const";
import PropTypes from "prop-types";

const OffersSort = ({onChangeFilterType, activeFilter, isActiveFlag, handleItemChange}) => (
  <form className="places__sorting" action="#" method="get" onMouseLeave = {() => handleItemChange(false)} onMouseEnter = {() => handleItemChange(true)}>
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0">
      {activeFilter}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>

    <ul className={`places__options places__options--custom ${isActiveFlag ? `places__options--opened` : ``}`}>
      {
        OFFERS_SORT_ITEMS.map((sortItem, index) => (
          <li key={sortItem + index} className={`${activeFilter === sortItem ? `places__option--active` : ``} places__option`} tabIndex="0" onClick={() => {
            onChangeFilterType(sortItem);
          }}>
            {sortItem}
          </li>
        ))
      }
    </ul>
  </form>
);

OffersSort.propTypes = {
  onChangeFilterType: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  isActiveFlag: PropTypes.bool.isRequired,
  handleItemChange: PropTypes.func.isRequired
};

export default OffersSort;
