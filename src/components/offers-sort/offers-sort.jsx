import React, {PureComponent} from "react";
import {OFFERS_SORT_ITEMS} from "../../const";
import PropTypes from "prop-types";

class OffersSort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSortItem: OFFERS_SORT_ITEMS[0]
    };
  }

  setActiveSortItem(sortItem) {
    this.setState({
      activeSortItem: sortItem
    });
  }

  render() {
    const {onChangeFilterType} = this.props;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0">
          {this.state.activeSortItem}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>

        <ul className="places__options places__options--custom places__options--opened">
          {
            OFFERS_SORT_ITEMS.map((sortItem, index) => (
              <li key={sortItem + index} className={`${this.state.activeSortItem === sortItem ? `places__option--active` : ``} places__option`} tabIndex="0" onClick={() => {
                this.setActiveSortItem(sortItem);
                onChangeFilterType(sortItem);
              }}>
                {sortItem}
              </li>
            ))
          }

        </ul>

        {
          // <select className="places__sorting-type visually-hidden" id="places-sorting">
          //         <option className="places__option" value="popular" selected="">Popular</option>
          //         <option className="places__option" value="to-high">Price: low to high</option>
          //         <option className="places__option" value="to-low">Price: high to low</option>
          //         <option className="places__option" value="top-rated">Top rated first</option>
          //       </select>
        }
      </form>
    );
  }
}

OffersSort.propTypes = {
  onChangeFilterType: PropTypes.func.isRequired
};

export default OffersSort;
