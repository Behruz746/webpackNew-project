import "./index.scss";
import "./index.html";
import { mult, sum } from "./modules/calc";
import image from "./img/Screenshot_2023.07.05_19.55.47.208.png";

const imgEl = document.querySelector(".img");

const img = new Image();
img.src = image;

img.width = 300;
imgEl.append(img);

console.log(mult(2, 4));
console.log(sum(5, 10));
