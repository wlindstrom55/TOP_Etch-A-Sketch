let mode = "picker"; //picker by default
let mouseDown = false; 
let selectedButton = document.querySelector('#picker');

document.body.onmouseup = () => (mouseDown = false);
document.body.onmousedown = () => (mouseDown = true);

const mainDiv = document.querySelector('.main');
const colorPicker = document.querySelector('#color');
const slider = document.querySelector('#sizeSlider');
const sliderText = document.querySelector('#sizeText');

function createGrid(size) {
    const canvas = document.createElement('div');
    canvas.classList.add('canvas');
    canvas.style.backgroundColor = 'lightgrey'; 
    mainDiv.append(canvas); 
    for (let i = 0; i < size * size; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            canvas.append(pixel); 
    }
    //these style manips set the size of the grid evenly by size var
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function removeCanvas() {
    const canvas = document.querySelector('.canvas');
    canvas.remove();
}

function makeCanvas() {
    if (size > 100) return; //if size > 100 then stop.
    if (isNaN(size)) return; //if size is null, then stop.
    removeCanvas(); //clear canvas before starting anew
    createGrid(size);
    getPixels();
}

function getPixels() { //adds event listeners to pixels here
    pixels = document.querySelectorAll('.pixel'); //select all pixel class

    pixels.forEach((pixel) => { //for each pixel, add the following event listeners
        pixel.addEventListener("mouseover", changePixel); 
        pixel.addEventListener("mousedown", changePixel);
        pixel.addEventListener("click", changePixel);
    });
}

function changePixel(e) {
    if (e.type == 'mouseover' && !mouseDown) return; //if event is mouseover but mouse is up, stop
    e.target.style.backgroundColor = getColor(); //otherwise run getcolor() to change div color
}

function getColor() {
    if (mode === "picker") { //if picker mode, set pixel to colorPicker val
        return `${colorPicker.value}`;
      } else if (mode === "random") { //otherwise random
        return randomRGB();
      } else if (mode === "eraser") {//otherwise 'erase' (set to white)
        return "lightgrey";
      }
}

function randomRGB() {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
  
    return `rgb(${r},${g},${b})`;
  }
  
  function changeMode(btn) {
    selectedButton.classList.toggle("selected"); //changes selected button to selected class
    mode = `${btn.id}`;
    console.log(mode);
    selectedButton = btn;
    btn.classList.toggle("selected");
  }
  
  // Slider
  let size = slider.value;
  
  sliderText.innerHTML = `Size: ${size} x ${size}`;
  
  slider.oninput = function () { //on sizeSlider input change, run anon function 
    sliderText.innerHTML = `Size: ${this.value} x ${this.value}`; //changes text to approp vals
    size = this.value; //set size = new slider value
    makeCanvas(); //clear canvas, create new one
  };
  
  createGrid(16);
  getPixels(); //set event listeners to pixels