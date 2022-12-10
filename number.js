const gameBoard = document.querySelector('.gameboard')
let score = 1;
let sequence = '';


document.querySelector('.button').addEventListener('click', function start() {
    this.removeEventListener('click', start)
    startRound();
}) 

const startRound = () => {
    emptyBoard();
    generateSequence();
    displaySequence(sequence);
    setTimeout(createQuestion, 4000)
}

const emptyBoard = () => {
    document.querySelectorAll('.content').forEach(item => {item.remove()})
}

const generateSequence = () => {
    let numsequence =[]
    for (i = 0; i < score; i++) {
        numsequence.push(Math.floor(Math.random()*10))
    }
    temp = numsequence.join('')
    sequence = temp.toString();
}

const displaySequence = (seq) => {
    const number = document.createElement('h1')
    number.classList = 'content'
    number.textContent = seq
    gameBoard.appendChild(number)
}

const createQuestion = () => {
    emptyBoard();
    const title = document.createElement('h2')
    title.classList = 'content'
    title.textContent = 'What was the number?'
    const action = document.createElement('h3')
    action.classList = 'content'
    action.textContent = 'Press enter to submit'
    gameBoard.appendChild(title)
    gameBoard.appendChild(action)
    const input = document.createElement('input')
    input.classList = 'input content'
    gameBoard.appendChild(input)
    const button = document.createElement('div')
    button.classList = 'content button'
    button.textContent = 'Submit'
    button.addEventListener('click', () => {
        results()
    })
    gameBoard.appendChild(button)
}


const results = () => {
    const input = document.querySelector('.input').value
    if (input == sequence) {
        createContinueScreen(sequence, input)
        score++;
    } else {
        createEndScreen(sequence, input)
        score = 1;
    }
}

const createContinueScreen = (sequence, input) => {
    emptyBoard();
    const number = document.createElement('h3')
    number.classList = 'content'
    number.textContent = 'Number'

    const orig = document.createElement('h2')
    orig.classList = 'content'
    orig.textContent = sequence

    const answer = document.createElement('h3')
    answer.classList = 'content'
    answer.textContent = 'Your Answer'
    
    const inputstring = document.createElement('h2')
    inputstring.classList = 'content'
    inputstring.textContent = input

    const level = document.createElement('h1')
    level.classList = 'content'
    level.textContent = 'Level ' + score

    const button = document.createElement('div')
    button.classList = 'button content'
    button.textContent = 'Continue'
    button.addEventListener('click', function start(){
        this.removeEventListener('click', start)
        startRound();
    })

    gameBoard.appendChild(number)
    gameBoard.appendChild(orig)
    gameBoard.appendChild(answer)
    gameBoard.appendChild(inputstring)
    gameBoard.appendChild(level)
    gameBoard.appendChild(button)

}

const createEndScreen = (sequence, input) => {
    emptyBoard();
    const number = document.createElement('h3')
    number.classList = 'content'
    number.textContent = 'Number'

    const orig = document.createElement('h2')
    orig.classList = 'content'
    orig.textContent = sequence

    const answer = document.createElement('h3')
    answer.classList = 'content'
    answer.textContent = 'Your Answer'
    
    const inputstring = document.createElement('h2')
    inputstring.classList = 'content fail'
    inputstring.textContent = input

    const level = document.createElement('h1')
    level.classList = 'content'
    level.textContent = 'Level ' + score

    const button = document.createElement('div')
    button.classList = 'button content'
    button.textContent = 'Restart'
    button.addEventListener('click', function start(){
        this.removeEventListener('click', start)
        startRound();
    })

    gameBoard.appendChild(number)
    gameBoard.appendChild(orig)
    gameBoard.appendChild(answer)
    gameBoard.appendChild(inputstring)
    gameBoard.appendChild(level)
    gameBoard.appendChild(button)

}