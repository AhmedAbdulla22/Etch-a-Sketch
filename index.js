const btnGridSize = document.querySelector('#btn-grid-size');
const btnGridClear = document.querySelector('#btn-grid-clear');
const gridContainer = document.querySelector('#grid-container');

//set new grid
setNewGrid();


function changeCellColor(cell) {
    if(cell.classList.contains("hovered")) return;

    cell.style.backgroundColor = getRandomColor();
    cell.classList.add("hovered");
}

function getRandom(max) {
    return Math.random() * max;
}

function getRandomColor() {
    return `rgba(${getRandom(255)},${getRandom(255)},${getRandom(255)},0)`;
}

function increaseOpacity(cell) {
    let hoverCount = parseInt(cell.dataset.hoverCount);
    const bgColor = window.getComputedStyle(cell).backgroundColor;
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/);

    //if alpha exist and not undefined
    if(match && match[4]) {
        const r = match[1];
        const g = match[2];
        const b = match[3];
        const oldAlpha = parseFloat(match[4]) || 0;
        const newAlpha = Math.min(oldAlpha + 0.1,1);
        cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
    }
}

function increaseHoverCount(cell) {
    let hoverCount = parseInt(cell.dataset.hoverCount) || 0;

    if(hoverCount === 10) return;

    //increaseHoverCount and update it
    hoverCount++;
    cell.dataset.hoverCount = hoverCount.toString();
}

function removeTheGrid() {
    gridContainer.replaceChildren();
}

function clearTheGrid() {
    for(let row of gridContainer.children) {
        if(!(row instanceof HTMLElement)) continue;
        for(let cell of row.children) {
            if (cell instanceof HTMLElement) {
                cell.style.backgroundColor = "";
                cell.classList.remove("hovered");
            }
        }
    }
}

function changeGridSize() {
    let numOfCellsPerSide = Number(prompt("number of squares per side for the new grid\nrange:16-100"));
    
    //constraint
    if(numOfCellsPerSide > 100) {
        numOfCellsPerSide = 100;
    } else if (numOfCellsPerSide < 10) {
        numOfCellsPerSide = 16;
    }

    //remove current grid
    removeTheGrid();

    setNewGrid(numOfCellsPerSide);
}

function setNewGrid(cellPerRow = 16) {
    //create div grid (16x16 default) per side
    //create rows & cols
    const gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");

    const gridSize = 600;
    const cellSize = Math.floor(gridSize / cellPerRow);
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridCell.dataset.hoverCount = "0";
    gridCell.style.cssText = 
    `outline: 1px solid gray;
    width: ${cellSize}px;
    height: ${cellSize}px;`;

    for (let index = 0; index < cellPerRow; index++) {
        //add a row
        const gridRowCopy = gridRow.cloneNode(false);
        gridRowCopy.id = `grid-row-${index}`;
        gridContainer.appendChild(gridRowCopy);

        //add cells to each new row
        for (let index = 0; index < cellPerRow; index++) {
            const gridCellCopy = gridCell.cloneNode(false);
            gridCellCopy.id = `grid-cell-${index}`;
            gridRowCopy.appendChild(gridCellCopy);
        }
    }
}

//mouse hover cell effect
gridContainer.addEventListener("mouseover",(e) => {
    if(!e.target.classList.contains("grid-cell")) return;
    changeCellColor(e.target);
    increaseHoverCount(e.target);
    increaseOpacity(e.target);
});

//change grid size
btnGridSize.addEventListener("click",changeGridSize); 
//clear the grid
btnGridClear.addEventListener("click",clearTheGrid); 




