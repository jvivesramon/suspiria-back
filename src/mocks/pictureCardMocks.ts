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

export const pictureCardMock: PictureCardStructure = {
  id: "1234",
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
