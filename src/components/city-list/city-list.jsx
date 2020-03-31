import React from 'react';
import PropTypes from "prop-types";

const CityList = ({onChangeCity, activeCity, citiesNames}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesNames.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`${city === activeCity.name ? `tabs__item--active` : ``} locations__item-link tabs__item`}
              href="#"
              onClick={()=>{
                onChangeCity(city);
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
  activeCity: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    })
  }),
  onChangeCity: PropTypes.func.isRequired,
  citiesNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired
};

export default CityList;
