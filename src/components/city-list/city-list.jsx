import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

class CityList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeLink: 0
    };
  }

  setActiveLink(count) {
    this.setState({
      activeLink: count
    });
  }

  render() {
    const {onChangeCity, getCityOffers} = this.props;
    let activeLink = this.state.activeLink;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city, count) => (
              <li className="locations__item" key={city}>
                <a
                  className={`${count === activeLink ? `tabs__item--active` : ``} locations__item-link tabs__item`}
                  href="#"
                  onClick={()=>{
                    onChangeCity(city);
                    getCityOffers(city);
                    this.setActiveLink(count);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>);
  }
}

CityList.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
  getCityOffers: PropTypes.func.isRequired
};

export default CityList;
