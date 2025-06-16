const btnGridSize = document.querySelector('#btn-grid-size');
const btnGridClear = document.querySelector('#btn-grid-clear');
const divsContainer = document.querySelector('#divs-container');

//set new grid
setNewGrid();


function changeCellColor(cell) {
    if(cell.style.backgroundColor) return;

    cell.style.backgroundColor = getRandomColor();
}

function changeOpacity(cell) {
    let currentOpacity = parseFloat(cell.style.opacity) || 0;
    if(currentOpacity < 1)
    {
        cell.style.opacity = currentOpacity + 0.1;
    }
    else
        return;
}

function getRandom(max) {
    return Math.random() * max;
}

function getRandomColor() {
    return `rgb(${getRandom(255)},${getRandom(255)},${getRandom(255)})`;
}

function removeTheGrid() {
    divsContainer.replaceChildren();
}

function clearTheGrid() {
    for(let row of divsContainer.children) {
        if(!(row instanceof HTMLElement)) continue;
        for(let cell of row.children) {
            if (cell instanceof HTMLElement) {
                cell.style.backgroundColor = "";
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
    gridCell.style.cssText = 
    `outline: 1px solid black;
    width: ${cellSize}px;
    height: ${cellSize}px;
    opacity:0.1;`;

    for (let index = 0; index < cellPerRow; index++) {
        //add a row
        const gridRowCopy = gridRow.cloneNode(false);
        gridRowCopy.id = `grid-row-${index}`;
        divsContainer.appendChild(gridRowCopy);

        //add cells to each new row
        for (let index = 0; index < cellPerRow; index++) {
            const gridCellCopy = gridCell.cloneNode(false);
            gridCellCopy.id = `grid-cell-${index}`;
            gridRowCopy.appendChild(gridCellCopy);
        }
    }
}

//mouse hover cell effect
divsContainer.addEventListener("mouseover",(e) => {
    if(!e.target.classList.contains("grid-cell")) return;
    changeCellColor(e.target);
    changeOpacity(e.target);
});

//change grid size
btnGridSize.addEventListener("click",changeGridSize); 
//clear the grid
btnGridClear.addEventListener("click",clearTheGrid); 




