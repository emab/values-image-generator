const html2canvas = require("html2canvas");
const { saveAs } = require("file-saver");

// Get the values
var VALUES = require("./values");

// Get each tab
var TABS = require("./html");

// Circle HTML codes
const BLUE_CIRCLE = `<img src="./circle.svg">`;
const RED_CIRCLE = `<img src="./circle-red.svg">`;

// Set current tab id
let currentTab = 1;

// Populate list on load
window.onload = () => {
  showTab(1);
  populateList();
};

// Populates the checkbox list of values
const populateList = () => {
  // Clear controls and table in case of reset
  document.getElementById("controls").innerHTML = "";
  document.getElementById("table").getElementsByTagName("tbody")[0].innerHTML =
    "";
  // Add each value
  Object.keys(VALUES).forEach((key) => {
    document.getElementById(
      "controls"
    ).innerHTML += `<div>${VALUES[key].text}<input type="checkbox" id="${key}" onclick="checkboxClick('${key}')"></div>`;
  });
};

// Adds/removes values from the diagram and table when a checkbox is clicked
const checkboxClick = (valueKey) => {
  const checkbox = document.getElementById(valueKey);
  const value = VALUES[valueKey];
  if (checkbox.checked) {
    insertCircle(value);
    addToTable(valueKey, value);
  } else {
    removeCircle(value);
    removeFromTable(valueKey, value);
  }
};

// Used for adding a custom value
const addNewValue = () => {
  const valueIsLimiting = document.getElementById("newValueLimiting").checked
    ? true
    : false;
  // Add (L) to the name if it limiting
  const valueName = valueIsLimiting
    ? document.getElementById("newValueName").value + " (L)"
    : document.getElementById("newValueName").value;
  const valueLevel = document.getElementById("newValueLevel").options[
    document.getElementById("newValueLevel").selectedIndex
  ].text;

  // If a value was entered
  if (valueName) {
    // Add this value to the list of values
    VALUES[valueName] = {
      text: valueName,
      limiting: valueIsLimiting,
      level: valueLevel,
    };

    // Add to the diagram and table
    insertCircle({ limiting: valueIsLimiting, level: valueLevel });
    addToTable(valueName, { text: valueName, level: valueLevel });

    // Add to the list of value checkboxes and make sure it is checked
    document.getElementById(
      "controls"
    ).innerHTML += `<div>${VALUES[valueName].text}<input type="checkbox" id="${valueName}" onclick="checkboxClick('${valueName}')"></div>`;
    document.getElementById(valueName).checked = true;

    // Reset the input
    document.getElementById("newValueLimiting").checked = false;
    document.getElementById("newValueName").value = null;
    document.getElementById("newValueLevel").selectedIndex = 0;
  }
};

// Adds a value to the table
const addToTable = (valueKey, value) => {
  const tableRef = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];
  const newRow = tableRef.insertRow();
  newRow.id = `tablerow-${valueKey}`;
  newRow.insertCell(0).appendChild(document.createTextNode(value.text));
  newRow.insertCell(1).appendChild(document.createTextNode(value.level));
};

// Removes a value from the table
const removeFromTable = (valueKey, value) => {
  value.limiting ? remRedCircle(value.level) : remBlueCircle(value.level);
  document.getElementById(`tablerow-${valueKey}`).remove();
};

// Inserts a circle into the diagram, colour depends on if it is a limiting value
const insertCircle = (value) => {
  if (value.limiting) {
    addRedCircle(value.level);
  } else {
    addBlueCircle(value.level);
  }
};

// Removes a circle from the diagram, colour depends on if it is a limiting value
const removeCircle = (value) => {
  if (value.limiting) {
    remRedCircle(value.level);
  } else {
    remBlueCircle(value.level);
  }
};

// Uses HTML2CANVAS to save the diagram and table to an image
const saveImage = () => {
  const divHeight = document.getElementById("modelHolderSmall").clientHeight;
  html2canvas(document.getElementById("modelHolderSmall"), {
    width: 415,
    height: divHeight + 10,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, "diagram.png", { type: "image/png" });
    });
  });
};

// Resets the page to default. Will keep this sessions added custom values
const reset = () => {
  const divs = document.getElementById("circleGrid").children;
  Array.from(divs).forEach((div) => {
    div.innerHTML = "";
  });
  populateList();
};

// General add circle method
const addCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML += circleType;
};

// General remove circle method
const remCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML = document
    .getElementById(id)
    .innerHTML.replace(circleType, "");
};

// Specific add/remove circle methods
const addBlueCircle = addCircle(BLUE_CIRCLE);
const addRedCircle = addCircle(RED_CIRCLE);
const remBlueCircle = remCircle(BLUE_CIRCLE);
const remRedCircle = remCircle(RED_CIRCLE);

const updateTab = (number) => {
  let tab = `tab${currentTab}`;
  TABS[tab] = document.getElementById("model").innerHTML;
  currentTab = number;
  showTab(number);
};

const showTab = (number) => {
  const holdingDiv = document.getElementById("model");
  switch (number) {
    case 1:
      holdingDiv.innerHTML = TABS.tab1;
      break;
    case 2:
      holdingDiv.innerHTML = TABS.tab2;
      break;
    case 3:
      holdingDiv.innerHTML = TABS.tab3;
      break;
  }
};
