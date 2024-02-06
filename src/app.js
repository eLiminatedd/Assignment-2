const playerColor = 'red';

const cells = document.querySelectorAll('[data-cell]')
const newGameBtn = document.querySelector('.restart-btn')
newGameBtn.addEventListener('click', restartGame)

let userTurn = true;

startGame()

class NonPlayerCharacter {

    #color = 'green'
    #delayTime = 500

    async turn() {

        userTurn = false;
        await this.#delayTurn()

        const blankCells = Array.from(cells).filter(cell => cell.style.backgroundColor === '');

        if (blankCells.length > 0) {
            const pickedCell = this.#pickCell(blankCells)
            mark(pickedCell, this.#color)
            pickedCell.removeEventListener("click", handleClick, false)
            checkGameStatus();
            userTurn = true;
        } else {
            return
        }

    }

    #delayTurn() {
        return new Promise(resolve => setTimeout(resolve, this.#delayTime));
    }

    #pickCell(blankCells) {
        const index = Math.floor(Math.random() * blankCells.length)
        const cell = blankCells[index]
        return cell
    }


}

const computer = new NonPlayerCharacter

async function handleClick(e) {

    if (!userTurn) {
        return;
    }
    const cell = e.target
    mark(cell, playerColor)
    try {
        await computer.turn()
    } catch (error) {
        throw error
    }
    checkGameStatus();
}

function mark(cell, color) {
    cell.style.backgroundColor = color;
}

function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    })
}

function checkGameStatus() {
    let blankCells = Array.from(cells).filter(cell => cell.style.backgroundColor === '');
    if (blankCells.length === 0) {
        alert('Game Over!');
    }
}

function restartGame() {
    cells.forEach(cell => { cell.style.backgroundColor = '' })
    startGame()
    userTurn = true
}
