import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class MapMain extends PureComponent {
  constructor(props) {
    super(props);

    this.city = [52.38333, 4.9]; // Amsterdam
    this.zoomMap = 12;

    this.mapConfig = {
      center: this.city,
      zoom: this.zoomMap,
      zoomControl: false,
      marker: true
    };
    this.iconConfig = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.mainMapRef = createRef();
    this.map = null;
  }

  componentDidMount() {
    const {points} = this.props;

    if (this.mainMapRef.current) {
      this.map = leaflet.map(this.mainMapRef.current, this.mapConfig);
      this.map.setView(this.city, this.zoomMap);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);


      points.forEach((point) => {
        leaflet
        .marker(point, this.iconConfig)
        .addTo(this.map);
      });
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <section ref={this.mainMapRef} className={`${this.props.nearMap ? `property__map` : `cities__map`} map`}/>
    );
  }
}

MapMain.propTypes = {
  points: PropTypes.arrayOf(
      PropTypes.arrayOf(
          PropTypes.number.isRequired
      ).isRequired
  ).isRequired,
  nearMap: PropTypes.bool
};

export default MapMain;
