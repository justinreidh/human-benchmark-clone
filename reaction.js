const gameBoard = document.querySelector('.gameboard')
let startTime, endTime;
let runningTotals = []

const generateAvg = (arr) => {
    let total = 0;
    for (i=0; i<5;i++) {
        total += arr[i]
    }
    return Math.round(total / 5)
}

const startGame = () => {
    removeClick();
    makeWaitScreen();
    gameEventClick(); 
}

const beginGame = () => {
    gameBoard.addEventListener('click', startGame)
}

beginGame();

const turnGreen = () => {
    emptyBoard();
    gameBoard.removeAttribute('id')
    gameBoard.id = 'greenscreen'
    const desc = document.createElement('h1')
    desc.textContent = 'Click!'
    desc.classList = 'content'
    gameBoard.appendChild(desc)
    startTime = new Date();
}

const turnBlue = () => {
    gameBoard.removeAttribute('id')
}

const calculateWait = () => {
    return Math.round((Math.random() * 4000) + 1000)
}

const emptyBoard = () => {
    document.querySelectorAll('.content').forEach(item => {item.remove()})
}

const makeWaitScreen = () => {
    emptyBoard();
    gameBoard.id = 'redscreen'
    const desc = document.createElement('h1')
    desc.textContent = 'Wait for green'
    desc.classList = 'content'
    gameBoard.appendChild(desc)
}

const removeClick = () => {
    gameBoard.removeEventListener('click', startGame);
}

const gameEventClick = () => {
    let time = calculateWait()
    const timeoutID = setTimeout(turnGreen, time) 
    gameBoard.addEventListener('click', function track() {
        if (gameBoard.id == 'redscreen') {
            tooSoon();
            clearTimeout(timeoutID);
            this.removeEventListener('click', track)
            beginGame();
        } else {
            endTime = new Date()
            let timeDiff = endTime - startTime;
            runningTotals.push(timeDiff)
            if (runningTotals.length == 5) {
                let avg = generateAvg(runningTotals);
                this.removeEventListener('click', track)
                finished(avg)
            } else {
            endScreen(timeDiff);
            this.removeEventListener('click', track)
            beginGame(); }
        }
    })
}

const tooSoon = () => {
    emptyBoard();
    gameBoard.removeAttribute('id')
    const title = document.createElement('h1')
    title.textContent = 'Too soon!'
    title.classList = 'content'
    const desc = document.createElement('p')
    desc.textContent = 'Click to try again.'
    desc.classList = 'content'

    gameBoard.appendChild(title)
    gameBoard.appendChild(desc)
}

const endScreen = (milliseconds) => {
    emptyBoard();
    gameBoard.removeAttribute('id')
    const title = document.createElement('h1')
    title.classList= 'content'
    title.textContent = milliseconds + ' ms'
    const desc = document.createElement('p')
    desc.textContent = 'Click to keep going.'
    desc.classList = 'content'

    gameBoard.appendChild(title)
    gameBoard.appendChild(desc)
}

const finished = (milliseconds) => {
    emptyBoard();
    gameBoard.removeAttribute('id')
    runningTotals = []
    const name = document.createElement('p')
    name.classList = 'content'
    name.textContent = 'Reaction Time Test'
    const title = document.createElement('h1')
    title.classList= 'content'
    title.textContent = milliseconds + ' ms'
    const restart = document.createElement('p')
    restart.classList = 'content'
    restart.textContent = 'Click anywhere to try again.'
    gameBoard.appendChild(name)
    gameBoard.appendChild(title)
    gameBoard.appendChild(restart)

    beginGame()
}

