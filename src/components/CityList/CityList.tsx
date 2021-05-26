import React from "react";
import { IPoint } from "../../types/offer";

export interface ICityList {
  citiesNames: string[];
  activeCity: {
    location: IPoint;
    name: string;
  };
  onChangeCity(city: string): void;
}

const CityList = ({ onChangeCity, activeCity, citiesNames }: ICityList) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesNames.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`${
                city === activeCity.name ? `tabs__item--active` : ``
              } locations__item-link tabs__item`}
              href="#"
              onClick={() => {
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

export default CityList;
