import { CatType } from "./types";

const predefinedNames = [
  "Max",
  "Oscar",
  "Bella",
  "Coco",
  "Simba",
  "Willow",
  "Milo",
  "Leo",
  "Arya",
  "Charlie",
  "Loki",
  "Daisy",
  "Luna",
  "Shireen",
  "Lucy",
  "Pumpkin",
  "Stella",
  "Ollie",
  "Jax",
  "Lola",
  "Lana",
  "Oreo",
  "Grace",
];
const predefinedColors = [
  "rgba(0,0,0,0.1)",
  "rgba(0,0,0,0.2)",
  "rgba(0,0,0,0.3)",
  "rgba(0,0,0,0.4)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.7)",
  "rgba(0,0,0,0.8)",
  "rgba(0,0,0,0.9)",
  "black",
  "#7f1d1d",
  "#7c2d12",
  "#fbbf24",
  "#facc15",
  "#eab308",
  "#d97706",
  "#fef9c3",
  "#f97316",
  "#a16207",
  "#fde68a",
  "white",
];

let id = 0;

const getRandomCat = () =>
  ({
    id: id++,
    hasCollar: Math.random() < 0.5,
    name: predefinedNames[
      Math.trunc(Math.random() * 100) % predefinedNames.length
    ],
    color:
      predefinedColors[
        Math.trunc(Math.random() * 100) % predefinedColors.length
      ],
    age: `${(0.1 + Math.random() * 10).toFixed(1)} years old`,
    hungry: false,
    timeoutId: undefined,
  } as CatType);

export default getRandomCat;
