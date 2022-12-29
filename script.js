
const canvas = document.querySelector('.canvas');
const gridLine = document.querySelector('.gridLine');
const clearButton = document.querySelector('.clear');
const eraser = document.querySelector('#eraser');
const demo = document.querySelector('#demo');
const slider = document.querySelector('.slider');
const colorPicker = document.querySelector('#colorpicker');
const random = document.querySelector('#random');
const goBlack = document.querySelector("#Progressively Black");
let cell = [];
let color = '#000000';

// set window restart defaults
window.addEventListener("load", startup);
function startup() {
    makeGrid(25);
    colorPicker.value = "#000000";
    slider.value = 25;
}

// Eraser
eraser.addEventListener("click", () => {
    color = '#ffffff';
    removeRandomListener();
    eraser.classList.add('buttondown');
    random.classList.remove('buttondown');
    }
)


// change color picker color
colorPicker.addEventListener("input", (e) => {
    color = e.target.value;
    removeRandomListener();
    random.classList.remove('buttondown');
    eraser.classList.remove('buttondown');
});

// random colors
random.addEventListener('click', () => {
    random.classList.add('buttondown');
    eraser.classList.remove('buttondown');
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("mouseover", generateRandomColor);
    }
});

function generateRandomColor() {
    color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Slider settings
slider.onchange = (e) => changeGrid(e.target.value);

function changeGrid(value) {
    demo.innerHTML = `${value} x ${value}`;
    canvas.innerHTML = '';
    if (gridLine.textContent === "Grid Lines On") {
        makeGrid(value);
    }
    else {
        makeGrid(value);
        canvas.style.gap= '1px';
    }
}

// Remove event listeners
function removeRandomListener() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("mouseover", generateRandomColor);
    }
}

// Button for grid lines on/off
gridLine.textContent = "Grid Lines On";
gridLine.addEventListener('click', () => {
    if (gridLine.textContent === "Grid Lines On") {
        gridLine.textContent = "Grid Lines Off";
        canvas.style.gap = '1px';
    }
    else {
        gridLine.textContent = "Grid Lines On";
        canvas.style.gap = '0px';
    }
});

// Clear canvas
clearButton.addEventListener('click', () => {
    for (let i = 0; i < cell.length; i++) {
        cell[i].style.backgroundColor = "white";
    };
})

// make a grid of size width
function makeGrid(width) {
    for (let i = 0; i < width * width; i++) {
        cell[i] = document.createElement('div');
        cell[i].classList.add('cell');
        canvas.appendChild(cell[i]);
    }
    canvas.style.cssText = `display: grid; grid-template-columns: repeat(${width}, auto); background-color: gray;`;

    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("mouseover", () =>
        {cell[i].style.backgroundColor = `${color}`});
    }
}
