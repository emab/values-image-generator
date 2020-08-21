const html2canvas = require('html2canvas');
const { saveAs } = require('file-saver');

const BLUE_CIRCLE = `<img src="./circle.svg">`;
const RED_CIRCLE = `<img src="./circle-red.svg">`;

const addCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML += circleType;
};

const remCircle = (circleType) => (id) => {
  document.getElementById(id).innerHTML = document
    .getElementById(id)
    .innerHTML.replace(circleType, '');
};

const saveImage = () => {
  html2canvas(document.getElementById('model'), { height: 700, width: 465 }).then(
    (canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'diagram.png', { type: 'image/png' });
      });
    }
  );
};

const reset = () => {
  const divs = document.getElementById('circleGrid').children;
  Array.from(divs).forEach(div => {
    div.innerHTML = "";
  })
}

const addBlueCircle = addCircle(BLUE_CIRCLE);
const addRedCircle = addCircle(RED_CIRCLE);
const remBlueCircle = remCircle(BLUE_CIRCLE);
const remRedCircle = remCircle(RED_CIRCLE);
