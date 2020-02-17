const PLACE_DETAIL_MOCK = [
  {
    id: `0221552`,
    name: `Beautiful & luxurious apartment at great location`,
    price: `100`,
    photos: [
      {
        alt: `ap-1`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-2`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-3`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-4`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-5`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-6`,
        src: `img/apartment-03.jpg`
      }
    ],
    class: `Premium`,
    type: `room`,
    rate: 3.2,
    rooms: 2,
    guests: 2,
    facilities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
    owner: {
      name: `Mr. Anderson`,
      img: {
        src: `img/avatar-max.jpg`,
        alt: `Mr. Anderson Avatar`
      },
      super: true
    },
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    ]
  },
  {
    id: `5464564`,
    name: `Wood and stone place`,
    price: `120`,
    photos: [
      {
        alt: `ap-1`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-2`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-3`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-4`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-5`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-6`,
        src: `img/apartment-03.jpg`
      }
    ],
    class: `Premium`,
    type: `apartment`,
    rate: 4,
    rooms: 5,
    guests: 5,
    facilities: [`Wifi`, `Heating`, `Cable TV`],
    owner: {
      name: `Mr. Anderson`,
      img: {
        src: `img/avatar-max.jpg`,
        alt: `Mr. Anderson Avatar`
      },
      super: false
    },
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    ]
  },
  {
    id: `4589512`,
    name: `Radisson SAS`,
    price: `210`,
    photos: [
      {
        alt: `ap-1`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-2`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-3`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-4`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-5`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-6`,
        src: `img/apartment-03.jpg`
      }
    ],
    class: `Premium`,
    type: `hotel`,
    rate: 3.6,
    rooms: 9,
    guests: 6,
    facilities: [`Wifi`, `Cable TV`, `Wifi`, `Heating`, `Kitchen`, `Cable TV`],
    owner: {
      name: `Mr. Anderson`,
      img: {
        src: `img/avatar-max.jpg`,
        alt: `Mr. Anderson Avatar`
      },
      super: false
    },
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    ]
  },
  {
    id: `7513497`,
    name: `Hilton palace`,
    price: `400`,
    photos: [
      {
        alt: `ap-1`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-2`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-3`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-4`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-5`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-6`,
        src: `img/apartment-03.jpg`
      }
    ],
    class: `Premium`,
    type: `hotel`,
    rate: 4.5,
    rooms: 26,
    guests: 52,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`,
      `Cable TV`,
      `Wifi`,
      `Heating`,
      `Kitchen`,
      `Cable TV`
    ],
    owner: {
      name: `Mr. Anderson`,
      img: {
        src: `img/avatar-max.jpg`,
        alt: `Mr. Anderson Avatar`
      },
      super: true
    },
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    ]
  },
  {
    id: `9431675`,
    name: `Bungalo`,
    price: `9`,
    photos: [
      {
        alt: `ap-1`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-2`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-3`,
        src: `img/apartment-03.jpg`
      },
      {
        alt: `ap-4`,
        src: `img/apartment-01.jpg`
      },
      {
        alt: `ap-5`,
        src: `img/apartment-02.jpg`
      },
      {
        alt: `ap-6`,
        src: `img/apartment-02.jpg`
      }
    ],
    class: `Premium`,
    type: `house`,
    rate: 0.5,
    rooms: 1,
    guests: 1,
    facilities: [`Cookies`, `Cable TV`],
    owner: {
      name: `Mr. Anderson`,
      img: {
        src: `img/avatar-max.jpg`,
        alt: `Mr. Anderson Avatar`
      },
      super: true
    },
    description: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    ]
  }
];

export default PLACE_DETAIL_MOCK;
