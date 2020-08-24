const html2canvas = require("html2canvas");
const { saveAs } = require("file-saver");

var VALUES = require("./values");

const BLUE_CIRCLE = `<img src="./circle.svg">`;
const RED_CIRCLE = `<img src="./circle-red.svg">`;

window.onload = () => {
  populateList();
};

const populateList = () => {
  Object.keys(VALUES).forEach((key) => {
    document.getElementById(
      "controls"
    ).innerHTML += `<div>${VALUES[key].text}<input type="checkbox" id="${key}" onclick="checkboxClick('${key}')"></div>`;
  });
};

const checkboxClick = (valueKey) => {
  const checkbox = document.getElementById(valueKey);
  const value = VALUES[valueKey];
  const tableRef = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];
  if (checkbox.checked == true) {
    value.limiting ? addRedCircle(value.level) : addBlueCircle(value.level);
    const newRow = tableRef.insertRow();
    newRow.id = `tablerow-${valueKey}`;
    newRow.insertCell(0).appendChild(document.createTextNode(value.text));
    newRow.insertCell(1).appendChild(document.createTextNode(value.level));
  } else {
    value.limiting ? remRedCircle(value.level) : remBlueCircle(value.level);
    document.getElementById(`tablerow-${valueKey}`).remove();
  }
};

const addCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML += circleType;
};

const remCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML = document
    .getElementById(id)
    .innerHTML.replace(circleType, "");
};

const saveImage = () => {
  html2canvas(document.getElementById("modelHolderSmall")).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, "diagram.png", { type: "image/png" });
    });
  });
};

const reset = () => {
  const divs = document.getElementById("circleGrid").children;
  Array.from(divs).forEach((div) => {
    div.innerHTML = "";
  });
};

const addBlueCircle = addCircle(BLUE_CIRCLE);
const addRedCircle = addCircle(RED_CIRCLE);
const remBlueCircle = remCircle(BLUE_CIRCLE);
const remRedCircle = remCircle(RED_CIRCLE);
