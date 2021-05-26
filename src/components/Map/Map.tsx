import React, { PureComponent, createRef, RefObject } from "react";
import leaflet from "leaflet";
import { IOffer, IPoint } from "../../types/offer";
import { mapConfig, titleLayerConfig } from "./map-config";

interface IMapState {
  city: [number, number];
  zoom: number;
  mapConfig: {
    center: [number, number];
    zoom: number;
    zoomControl: boolean;
    marker: boolean;
  };
}

interface IMapProps {
  nearMap: boolean;
  offers: IOffer[];
  activeOfferId: string;
  city: {
    name: string;
    location: IPoint;
  };
}

class Map extends PureComponent<IMapProps, IMapState> {
  mainMapRef: RefObject<HTMLElement>;
  icons: any;
  map: null | any;
  layerGroupStorage: null | any;

  constructor(props: IMapProps) {
    super(props);

    this.icons = {
      iconBlue: leaflet.icon(mapConfig.icons.blue),
      iconOrange: leaflet.icon(mapConfig.icons.orange),
    };

    this.mainMapRef = createRef();
    this.map = null;
    this.layerGroupStorage = null;
  }

  componentDidMount() {
    const { city } = this.props;
    const cityLocation = [city.location.latitude, city.location.longitude];

    if (this.mainMapRef.current) {
      this.map = leaflet.map(this.mainMapRef.current, mapConfig);
      this.map.setView(cityLocation, city.location.zoom);

      leaflet
        .tileLayer(titleLayerConfig.urlTemplate, titleLayerConfig.options)
        .addTo(this.map);

      this.layerGroupStorage = {
        map: this.map,
        layerGroup: leaflet.layerGroup().addTo(this.map),
      };

      this.updateMap();
    }
  }

  componentDidUpdate(prevState: any) {
    if (
      prevState.offers !== this.props.offers ||
      prevState.activeOfferId !== this.props.activeOfferId
    ) {
      const { layerGroup } = this.layerGroupStorage;
      const { city } = this.props;
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
    const { offers, activeOfferId } = this.props;
    const { layerGroup } = this.layerGroupStorage;

    offers.forEach((offer) => {
      const icon =
        activeOfferId && activeOfferId === offer.id
          ? this.icons.iconOrange
          : this.icons.iconBlue;

      leaflet.marker(offer.cords, { icon }).addTo(layerGroup);
    });
  }

  render() {
    return (
      <section
        ref={this.mainMapRef}
        className={`${
          this.props.nearMap ? `property__map` : `cities__map`
        } map`}
      />
    );
  }
}

export default Map;
