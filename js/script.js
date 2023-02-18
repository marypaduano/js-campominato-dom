console.log('campo minato')
const gridElement = document.querySelector('.grid')
const btnElement = document.querySelector('.btn-play')
const difficultSelect = document.getElementById('difficult').value
let bombs = [ 10, 24, 36, 2, 6, 13]
let cellElements
let numCell
let points = 0


btnElement.addEventListener('click', play)


//FUNCTION REC
function play() {
    reset()
    gridGenerate()
    bombs = bombsGenerate(16,1,numCell)
    cellElements = document.querySelectorAll('.cell')
    for (let i = 0; i < cellElements.length; i++) {
        const cell = cellElements[i]

        cell.addEventListener('click', onClick)
    }
}

function onClick(event) {
    const cell = event.target
    numCell = parseInt(cell.innerHTML)
    if (isBomb(numCell)){
        gameOver()
        cell.classList.add('cell-bomb')
    }else{
        points++
        cell.classList.add('cell-click')
    }
    cell.removeEventListener('click', onClick)
    
}

function reset() {
    gridElement.innerHTML = ''
}

function gridGenerate() {
    let sideGrid = 10
    // let numMines
// if(difficultSelect === 'easy'){
//     sideGrid = 7
//     numMines = 8
// }else if(difficultSelect === 'medium'){
//     sideGrid = 9
//     numMines = 12
// }else if (difficultSelect === 'hard'){
//     sideGrid = 10
//     numMines = 16
// }
    numCell = sideGrid ** 2



    for (let i = 0; i < numCell; i++) {
        let n = i + 1
        let divString = `<div class="cell" style="width: calc(100% / ${sideGrid});" >${n}</div>`
        gridElement.innerHTML += divString
    }
}

function bombsGenerate(numeroBombe, min, max){
    let arrayBombs = []
    while (arrayBombs.length < numeroBombe){
        const num = getRandomNum (min, max)
        if (!arrayBombs.includes(num)){
            arrayBombs.push(num)
        }
    }
    return arrayBombs
}

function isBomb(num){
    const result = bombs.includes(num)
    return result
}

function getRandomNum(min, max){
    min = Math.floor(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1 )+ min)
}

function gameOver(){
    for (let i = 0; i < cellElements.length; i++){
        const cell = cellElements[i]
        const numCell = parseInt(cell.innerHTML)
        if(isBomb(numCell)){
            cell.classList.add('cell-bomb')
        }
        cell.removeEventListener('click', onClick)
    }
} 