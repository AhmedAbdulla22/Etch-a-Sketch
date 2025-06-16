const divsContainer = document.querySelector('#divs-container');
//create 16x16 div grid
//create rows & cols
const gridRow = document.createElement("div");
gridRow.classList.add("grid-row");

const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

for (let index = 0; index < 16; index++) {
    //add a row
    const gridRowCopy = gridRow.cloneNode(false);
    gridRowCopy.id = `grid-row-${index}`;
    divsContainer.appendChild(gridRowCopy);

    //add 16 cell to each new row
    for (let index = 0; index < 16; index++) {
        const gridCellCopy = gridCell.cloneNode(false);
        gridCellCopy.id = `grid-cell-${index}`;
        gridRowCopy.appendChild(gridCellCopy);
    }
}





