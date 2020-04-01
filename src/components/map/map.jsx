import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.city = [52.38333, 4.9];
    this.zoomMap = 12;

    this.mapConfig = {
      center: this.city,
      zoom: this.zoomMap,
      zoomControl: false,
      marker: true
    };

    this.icons = {
      iconBlue: leaflet.icon({
        iconUrl: `/img/pin.svg`,
        iconSize: [30, 45]
      }),
      iconOrange: leaflet.icon({
        iconUrl: `/img/pin-active.svg`,
        iconSize: [30, 45]
      })
    };

    this.mainMapRef = createRef();
    this.map = null;
    this.layerGroupStorage = null;
  }

  componentDidMount() {
    const {city} = this.props;
    const cityLocation = [city.location.latitude, city.location.longitude];

    if (this.mainMapRef.current) {
      this.map = leaflet.map(this.mainMapRef.current, this.mapConfig);
      this.map.setView(cityLocation, city.location.zoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.layerGroupStorage = {map: this.map, layerGroup: leaflet.layerGroup().addTo(this.map)};

      this.updateMap();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.offers !== this.props.offers || prevState.activeOfferId !== this.props.activeOfferId) {

      const {layerGroup} = this.layerGroupStorage;
      const {city} = this.props;
      const cityLocation = [city.location.latitude, city.location.longitude];

      this.map.setView(cityLocation, city.location.zoom);

      layerGroup.clearLayers();
      this.updateMap();
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  updateMap() {
    const {offers, activeOfferId} = this.props;
    const {layerGroup} = this.layerGroupStorage;

    offers.forEach((offer) => {
      const icon = activeOfferId && activeOfferId === offer.id ? this.icons.iconOrange : this.icons.iconBlue;

      leaflet
      .marker(offer.cords, {icon})
      .addTo(layerGroup);
    });
  }

  render() {
    return (
      <section ref={this.mainMapRef} className={`${this.props.nearMap ? `property__map` : `cities__map`} map`}/>
    );
  }
}

Map.propTypes = {
  nearMap: PropTypes.bool,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string,
              src: PropTypes.string
            })
        ),
        previewImage: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired
        }).isRequired,
        isPremium: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        bedrooms: PropTypes.number,
        maxAdults: PropTypes.number,
        description: PropTypes.string,
        facilities: PropTypes.arrayOf(
            PropTypes.string
        ),
        isFavorite: PropTypes.bool,
        owner: PropTypes.shape({
          name: PropTypes.string,
          super: PropTypes.bool,
          img: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
          })
        }),
        city: PropTypes.shape({
          name: PropTypes.string,
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number
          })
        }),
        location: PropTypes.arrayOf(
            PropTypes.number
        )
      })
  ),
  activeOfferId: PropTypes.string,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    })
  })
};

export default Map;
