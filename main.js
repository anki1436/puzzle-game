const puzzleContainer = document.querySelector("#game-container")
const puzzle = [];
// const win =[1,2,3,4,5,6,7,8,9]

loadPuzzle()
randomPuzzle()
renderPuzzle()
userInput()




// console.log(puzzle);

function getRow(pos) {
    return Math.ceil(pos / 3)
}

function getCol(pos) {
    const col = pos % 3
    if (col === 0) {
        return 3
    }
    return col
}

function loadPuzzle() {
    for (let i = 1; i <= 3 * 3; i++) {
        puzzle.push({
            value: i,
            position: i,
            x: (getCol(i) - 1) * 100,
            y: (getRow(i) - 1) * 100,
            disabled: false,
        })
    }
}

function renderPuzzle() {
    puzzleContainer.innerHTML = ""
    for (let puzzleItem of puzzle) {
        if (puzzleItem.disabled)
         continue
        puzzleContainer.innerHTML += `
            <div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
                ${puzzleItem.value}
            </div>
        `
    }

}

function randomPuzzle() {
    const randomNumber = getRandomNumber()
    // console.log(randomNumber)
    let i = 0
    for (let puzzleItem of puzzle) {
        puzzleItem.value = randomNumber[i]
        i++
    }

    const puzzleWithValueOf9 = puzzle.find((item) => item.value === 3 * 3)
    puzzleWithValueOf9.disabled = true
    // console.log(puzzle)
}

function getRandomNumber() {
    const values = []
    for (let i = 1; i <= 3 * 3; i++) {
        values.push(i)
    }

    const randomNumber = values.sort(() => .5 -  Math.random());
    return randomNumber
}

function userInput() {
    document.addEventListener("keydown", handleKeyDown)
}

function handleKeyDown(e) {
    // console.log(e.key)
    switch (e.key) {
        case "ArrowLeft":
            moveRight();
            checkAnswer();

            break
        case "ArrowRight":
            moveLeft();
            checkAnswer()


            break
        case "ArrowUp":
            moveDown()
            checkAnswer()

            break
        case "ArrowDown":
            moveUp()
            checkAnswer()

            break
    }
    renderPuzzle()
}

function moveLeft() {
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    if (rightPuzzle) {
        swapPositions(emptyPuzzle, rightPuzzle, true)
    }
}
function moveRight() {
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()
    if (leftPuzzle) {
        swapPositions(emptyPuzzle, leftPuzzle, true)
    }
}
function moveUp() {
    const emptyPuzzle = getEmptyPuzzle()
    const belowPuzzle = getBelowPuzzle()
    if (belowPuzzle) {
        swapPositions(emptyPuzzle, belowPuzzle, false)
    }
}
function moveDown() {
    const emptyPuzzle = getEmptyPuzzle()
    const abovePuzzle = getAbovePuzzle()
    if (abovePuzzle) {
        swapPositions(emptyPuzzle, abovePuzzle, false)
    }
}

function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
    // position swapping
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp

    // x position swapping

    if (isX) {
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp
    } else {
        // must be y
        temp = firstPuzzle.y
        firstPuzzle.y = secondPuzzle.y
        secondPuzzle.y = temp
    }
}

function getRightPuzzle() {
    /* get the puzzle just right to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle()
    const isRightEdge = getCol(emptyPuzzle.position) === 3
    if (isRightEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
    return puzzle
}
function getLeftPuzzle() {
    /* get the puzzle just left to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle()
    const isLeftEdge = getCol(emptyPuzzle.position) === 1
    if (isLeftEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
    return puzzle
}
function getAbovePuzzle() {
    /* get the puzzle just above to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle()
    const isTopEdge = getRow(emptyPuzzle.position) === 1
    if (isTopEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 3)
    return puzzle
}
function getBelowPuzzle() {
    /* get the puzzle just below to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle()
    const isBottomEdge = getRow(emptyPuzzle.position) === 3
    if (isBottomEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 3)
    return puzzle
}

function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled)
}

function getPuzzleByPos(pos) {
    return puzzle.find((item) => item.position === pos)
}
// console.log(puzzle.value)


function checkAnswer(){
    // let val=puzzle.value,pos=puzzle.position;
    // console.table(puzzle.value)


    // puzzle.forEach(ele => {
    //     let  val= ele.value;
    //     let pos= ele.position
    //     console.log(val, pos)   
    //     if(val==pos){
    //         console.log("hey")
    //     }
      
    //   } )
    
        //   puzzle.every((element, index) => {
        //     if (element === win[index]) {
        //       return true;
        //       alert("game done")
        //     }
      
        //     return;
        //   });
        let winner = puzzle.every((item) => item.value === item.position);
        console.log(winner)
        if (winner==true){
            alert("game win")
        }
        else{
            console.log("carryon")
            // console.table(puzzle);

        }

        }
      
  
// console.table(win)
console.table(puzzle);