import { Types } from "mongoose";
import {
  type PictureCardBodyStructure,
  type PictureCardListStructure,
  type PictureCardStructure,
} from "../server/types.js";

export const newPictureMock: PictureCardBodyStructure = {
  pictureData: {
    title: "Girl with a Pearl Earring",
    creationDate: "1667",
    author: "Johannes Vermeer",
    movement: "baroque",
  },
  image: "https://google.com",
  description:
    "The painting features a striking contrast between the vibrant blue of the turban worn by the girl and her delicate, pale complexion. The blue exudes a sense of depth and richness, while the softness of her skin creates a subtle yet captivating visual balance. These colors, carefully chosen and skillfully applied, contribute to the overall allure and intrigue of the artwork.",
  temperatureColor: {
    warm: false,
    cold: false,
    mixed: false,
  },
  colors: {
    colorFirst: "#ffffff",
    colorSecond: "#f8f8ff",
    colorThird: "#f5deb3",
    colorFourth: "#ffe0bd",
    colorFifth: "#003399",
    colorSixth: "#0000ff",
  },

  user: new Types.ObjectId(),
};

export const pictureUpdatedMock = {
  id: "6488fa0b99c6d65f58f91eb9",
  pictureData: {
    title: "The Couple",
    author: "Judit Vives",
    movement: "Digital Art Illustration",
    creationDate: "2021",
  },
  image: "https://i.ibb.co/0nzc9pS/the-couple.webp",
  description:
    "The colors in this illustration evoke a captivating atmosphere of tension and intrigue. The contrasting dark tones and vibrant accents highlight the power dynamics and emotional detachment within the depicted couple's relationship. Through the symbolism of black and the dynamic touches of color, the composition conveys a narrative of dominance and disconnection.",
  temperatureColor: {
    warm: false,
    cold: true,
    mixed: false,
  },
  colors: {
    colorFirst: "#d7cbbf",
    colorSecond: "#dfbc09",
    colorThird: "#bb4335",
    colorFourth: "#6c8590",
    colorFifth: "#7b6957",
    colorSixth: "#09090a",
  },
  user: new Types.ObjectId(),
};

export const pictureCardMock: PictureCardStructure = {
  id: "6488fa0b99c6d65f58f91eb9",
  ...newPictureMock,
};

export const pictureListMock: PictureCardListStructure = {
  pictures: [pictureCardMock],
};

export const initialtemperatureColorState = {
  warm: false,
  cold: false,
  mixed: false,
};
