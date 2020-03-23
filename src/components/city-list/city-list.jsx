import React from 'react';
import PropTypes from "prop-types";

const CityList = ({onChangeCity, activeItemIndex, handleItemClick, citiesNames}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesNames.map((city, index) => (
          <li className="locations__item" key={city}>
            <a
              className={`${index === activeItemIndex ? `tabs__item--active` : ``} locations__item-link tabs__item`}
              href="#"
              onClick={()=>{
                onChangeCity(city);
                handleItemClick(index);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

CityList.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
  activeItemIndex: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  citiesNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired
};

export default CityList;
