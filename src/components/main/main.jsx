import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import CityList from "../city-list/city-list.jsx";
import MainInner from "../main-inner/main-inner.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import withActiveIndex from "../../hocs/withActiveIndex.jsx";

const CityListWrapper = withActiveIndex(CityList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {dataCards, onOfferClick, onChangeCity, city, onChangeFilterType, handleOfferHover, activePointId, activeFilter} = this.props;

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CityListWrapper onChangeCity = {onChangeCity} />

          {dataCards.length !== 0 ?
            <MainInner activeFilter = {activeFilter}
              activePointId = {activePointId}
              handleOfferHover = {handleOfferHover}
              onChangeFilterType = {onChangeFilterType}
              dataCards = {dataCards}
              onOfferClick = {onOfferClick}
              city = {city}/>
            :
            <MainEmpty/>
          }
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  dataCards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        }),
        class: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        cords: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
      })
  ).isRequired,
  onOfferClick: PropTypes.func,
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  onChangeFilterType: PropTypes.func.isRequired,
  handleOfferHover: PropTypes.func,
  activePointId: PropTypes.string,
  activeFilter: PropTypes.string.isRequired
};

export default Main;
