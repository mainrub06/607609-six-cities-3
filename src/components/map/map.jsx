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

    this.icons = {
      iconBlue: leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 45]
      }),
      iconOrange: leaflet.icon({
        iconUrl: `img/pin-active.svg`,
        iconSize: [30, 45]
      })
    };

    this.mainMapRef = createRef();
    this.map = null;
    this.layerGroup = null;
  }

  componentDidMount() {
    if (this.mainMapRef.current) {
      this.map = leaflet.map(this.mainMapRef.current, this.mapConfig);
      this.map.setView(this.city, this.zoomMap);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.layerGroup = {map: this.map, layerGroup: leaflet.layerGroup().addTo(this.map)};

      this.updateMap();
    }
  }

  componentDidUpdate(prevProps) {
    const {points, activePointId} = this.props;
    const {layerGroup} = this.layerGroup;
    const getActivePoint = points.find((point) => point.id === activePointId);

    if (getActivePoint) {
      layerGroup.clearLayers();
      this.updateMap();
    }
  }

  updateMap() {
    const {points, activePointId} = this.props;
    const {layerGroup} = this.layerGroup;

    points.forEach((point) => {
      const icon = activePointId && activePointId === point.id ? this.icons.iconOrange : this.icons.iconBlue;

      leaflet
      .marker(point.cords, {icon})
      .addTo(layerGroup);
    });
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
  nearMap: PropTypes.bool,
  points: PropTypes.arrayOf(
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
        cords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      })
  ).isRequired,
  activePointId: PropTypes.string
};

export default MapMain;
