export const mapConfig = {
  center: [52.38333, 4.9] as [number, number],
  zoom: 12 as number,
  zoomControl: false as boolean,
  marker: true as boolean,
  icons: {
    blue: {
      iconUrl: `/img/pin.svg` as string,
      iconSize: [30, 45] as [number, number],
    },
    orange: {
      iconUrl: `/img/pin-active.svg` as string,
      iconSize: [30, 45] as [number, number],
    },
  },
};

export const titleLayerConfig = {
  options: {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  },
  urlTemplate: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
};
