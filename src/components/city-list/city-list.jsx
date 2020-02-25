import React, {PureComponent} from 'react';
import {ActionCreator} from "../../reducer.js";
import {connect} from "react-redux";
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

  render() {
    const {onChangeCity, getCityOffers} = this.props;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  className="locations__item-link tabs__item"
                  href="#"
                  onClick={()=>{
                    onChangeCity(city);
                    getCityOffers(city);
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  getCityOffers(city) {
    dispatch(ActionCreator.getCityOffers(city));
  }
});

CityList.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
  getCityOffers: PropTypes.func.isRequired
};

export {CityList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
