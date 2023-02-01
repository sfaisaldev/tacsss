/* code written by Sayed Faisal (sfaisal.dev) */

import "./styles.css";
import Picker from "vanilla-picker";
import interact from "interactjs";

document.getElementById("app").innerHTML = `
<h1>TACSSS</h1>
<h2>The Amazing CSS Shadow</h2>
<div><div class="object">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path id="circle" fill="none"
        d="
          M 25, 50
          a 25,25 0 1,1 50,0
          a 25,25 0 1,1 -50,0
          " />
  <text>
    <textPath href="#circle">
      TACSSS TACSSS
    </textPath>
  </text>

</svg>
</div></div>
<div id="color-picker"></div>
<div class="light"></div>
<textarea class="code"></textarea>
`;

var shadowX = 0.7;
var shadowY = 0.7;
var shadowBlur = 1;
var shadowColor = "47, 103, 118";
var shadowAlpha = 0.7;

var lightX = 0;
var lightY = 0;

const code = document.querySelector(".code");
const object = document.querySelector(".object");
const colorPickerBtn = document.querySelector("#color-picker");
var picker = new Picker({
  parent: colorPickerBtn,
  color: "#2f6776ff"
});
colorPickerBtn.style.background = "rgb(47, 103, 118)";
picker.onChange = function (color) {
  colorPickerBtn.style.background = color.rgbString;
  shadowColor = getRGB(color.rgbString);
  shadowAlpha = getAlpha(color.rgbaString);
  setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);

  if (lightOrDark(color.rgbString) === "light") {
    document.body.classList.add("darkmode");
  } else {
    document.body.classList.remove("darkmode");
  }
};

function getRGB(rgb) {
  var matches = rgb.match(/\((.*?)\)/);
  if (matches) {
    rgb = matches[1];
  } else {
    rgb = "0,0,0";
  }
  return rgb;
}
function getAlpha(rgba) {
  var alpha = 1;
  var matches = rgba.match(/\((.*?)\)/);
  if (matches) {
    rgba = matches[1];
    rgba = rgba.split(",");
    if (rgba.length === 4) {
      alpha = rgba[3];
    }
  }
  return alpha;
}
var shadowStyle = "";

setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);

function setShadow(
  object,
  type,
  shadowX,
  shadowY,
  shadowBlur,
  shadowColor,
  shadowAlpha
) {
  var shadowParm = [
    {
      shadowX: shadowX,
      shadowY: shadowY,
      shadowBlur: shadowBlur,
      shadowColor: shadowColor,
      shadowAlpha: shadowAlpha
    }
  ];

  shadowParm.push({
    shadowX: shadowX * 2,
    shadowY: shadowY * 2,
    shadowBlur: shadowBlur * 2,
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.1
  });

  shadowParm.push({
    shadowX: shadowX * 4,
    shadowY: shadowY * 4,
    shadowBlur: Number(shadowBlur) * 2 + Number(shadowBlur),
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.1
  });

  shadowParm.push({
    shadowX: Number(shadowX) * 4 + Number(shadowX) * 2 + Number(shadowX),
    shadowY: Number(shadowY) * 4 + Number(shadowY) * 2 + Number(shadowY),
    shadowBlur: shadowBlur * 5,
    shadowColor: shadowColor,
    shadowAlpha: shadowAlpha - 0.2
  });

  shadowStyle = type + "-shadow: ";
  for (var i = 0; i < shadowParm.length; i++) {
    shadowStyle +=
      Number(shadowParm[i].shadowX).toFixed(2) +
      "rem " +
      Number(shadowParm[i].shadowY).toFixed(2) +
      "rem " +
      Number(shadowParm[i].shadowBlur).toFixed(2) +
      "rem rgba(" +
      shadowParm[i].shadowColor +
      ", " +
      Number(shadowParm[i].shadowAlpha).toFixed(2);

    if (i === shadowParm.length - 1) {
      shadowStyle += ");";
    } else {
      shadowStyle += "), ";
    }
  }
  object.setAttribute("style", shadowStyle);
  code.value = shadowStyle;
}
const light = document.querySelector(".light");

interact(light).draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true
    })
  ],

  listeners: {
    move: dragMoveListener
  }
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  lightX = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  lightY = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + lightX + "px, " + lightY + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", lightX);
  target.setAttribute("data-y", lightY);

  setLight(object, "box", lightX, lightY, shadowColor, shadowAlpha);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
function setLight(
  object,
  shadowType,
  lightX,
  lightY,
  shadowColor,
  shadowAlpha
) {
  const objectX =
    object.getBoundingClientRect().left +
    window.scrollX +
    object.offsetWidth / 2;
  const objectY =
    object.getBoundingClientRect().top +
    window.scrollY +
    object.offsetHeight / 2;

  var defX = objectX - lightX;
  if (defX > 370) {
    defX = 370;
  } else if (defX < -370) {
    defX = -370;
  }

  var defY = objectY - lightY;
  if (defY > 370) {
    defY = 370;
  } else if (defY < -370) {
    defY = -370;
  }

  var finalX = defX / 250;
  var finalY = defY / 250;

  var forBlurX = finalX;
  var forBlurY = finalY;

  if (forBlurX < 0) {
    forBlurX *= -1;
  }
  if (forBlurY < 0) {
    forBlurY *= -1;
  }

  var finalBlur = (100 * forBlurX) / 70;
  if (forBlurY > forBlurX) {
    finalBlur = (100 * forBlurY) / 70;
  }
  if (finalBlur >= 0 && finalBlur < 0.5) {
    finalBlur = 0.5;
  }
  if (finalBlur < 0) {
    finalBlur = finalBlur * -1;
    if (finalBlur < 0.5) {
      finalBlur = 0.5;
    }
  }
  setShadow(
    object,
    shadowType,
    finalX.toFixed(2),
    finalY.toFixed(2),
    finalBlur.toFixed(2),
    shadowColor,
    shadowAlpha
  );
}

function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 150) {
    return "light";
  } else {
    return "dark";
  }
}
