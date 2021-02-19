let characterSelectionPage = document.querySelector('.character-selection-page');
let characterSelectionImages = document.querySelectorAll('.character-selection-image');
let playerOneNameInput = document.querySelector('.player-one-name-input');
let playerTwoNameInput = document.querySelector('.player-two-name-input');
let playerOneColorChoices = document.querySelectorAll('.player-one-color-grid .color-box');
let playerTwoColorChoices = document.querySelectorAll('.player-two-color-grid .color-box');
let startGameBtn = document.querySelector('.start-game-btn');
let startGameBtnText = document.querySelector('.start-game-btn-text');
let gamePage = document.querySelector('.game-page');
let gamePageGridBoxes = document.querySelectorAll('.game-grid-box');
let playerOneGameBar = document.querySelector('.player-one-game-bar');
let playerTwoGameBar = document.querySelector('.player-two-game-bar');
let gameStatusText = document.querySelector('.game-status-text');
let endGameText = document.querySelector('.end-game-text');
let endGamePage = document.querySelector('.end-game-page');
let playAgainBtn = document.querySelector('.play-again-btn');
let chooseNewCharacterBtn = document.querySelector('.choose-new-characters-btn');


//VARIABLES//

let players = {
    one: {
        name: 'Player One',
        avatarLink: '',
        tokenColor: '',
        movesMade:'',
        score: 0,
        draw: function(event){
            let naught = document.createElement('div');
            naught.classList.add('naught');
            naught.style.borderColor = this.tokenColor;
            event.target.appendChild(naught);
        },
        update: function(event){
            this.movesMade += event.target.dataset.boxnumber;
        },

        colorSelection: function(event){
            players.one.tokenColor = event.target.style.background;
            for (let i = 0; i < playerOneColorChoices.length; i++){
                playerOneColorChoices[i].style.borderColor = 'lightgray';
            }
            event.target.style.borderColor = 'yellow';
        }
    },
    two:{
        name: 'Player Two',
        avatarLink: '',
        tokenColor: '',
        movesMade:'',
        score: 0,
        draw: function(event){
            let cross = document.createElement('div');
            cross.classList.add('cross');
            cross.style.background = this.tokenColor;
            event.target.appendChild(cross);
        },
        update: function(event){
            this.movesMade += event.target.dataset.boxnumber;
        },
        colorSelection: function(event){
            players.two.tokenColor = event.target.style.background;
            for (let i = 0; i < playerTwoColorChoices.length; i++){
                playerTwoColorChoices[i].style.borderColor = 'lightgray';
            }
            event.target.style.borderColor = 'yellow';
        }
    }
}

let activePlayer = players.one;

let movesCounter = 0;

let winningConditions = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'],
    ['3','5','7']
];


/////////////////////////////////////////////////////////////
//Functions

function characterSelectionPageSetup(){
    //show character selection page and hide everything else
    characterSelectionPage.style.display = 'block';
    characterSelectionPage.style.transform = 'scale(1)';
    characterSelectionPage.style.opacity = '1';
    gamePage.style.opacity = '0';
    gamePage.style.display = 'none';
    endGamePage.style.display = 'none';
}

function gamePageSetup(){
    //show game page and hide everything else

    characterSelectionPage.style.opacity = '0';
    setTimeout(function(){
        characterSelectionPage.style.display = 'none';
    }, 300);
   
    setTimeout(function(){
        gamePage.style.display = 'block';
        playerOneGameBar.style.background = players.one.avatarLink;
        playerTwoGameBar.style.background = players.two.avatarLink;
        endGamePage.style.display = 'none';
    }, 500);

    setTimeout(function(){
        gamePage.style.opacity = '1';
    }, 600);

    endGamePage.style.opacity = '0';
}

function endGamePageSetup(){
    //show end game page and hide everything else
    characterSelectionPage.style.display = 'none';
    characterSelectionPage.style.opacity= '0';
    endGamePage.style.display = 'block';
    setTimeout(function (){
        endGamePage.style.opacity = '1';
    }, 400);
}

function playGameSetup(){
    players.one.movesMade = '';
    players.two.movesMade = '';
    players.one.name = playerOneNameInput.value;
    players.two.name = playerTwoNameInput.value;
    playerOneGameBar.textContent = players.one.name + ' :' + String(players.one.score);
        playerTwoGameBar.textContent = players.two.name + ' :' + String(players.two.score);
    movesCounter = 0;
    gameStatusText.textContent = activePlayer.name + "'s turn";
    resetBoard();
    gamePageSetup();
}

//Character Selection Functions

function playerOneSelection(event){
    if (players.two.avatarLink != event.target.style.background){
        players.one.avatarLink = event.target.style.background;
        for (let i = 0; i < characterSelectionImages.length; i++){
            if(players.two.avatarLink != characterSelectionImages[i].style.background){
                characterSelectionImages[i].textContent = '';
                characterSelectionImages[i].style.boxShadow = 'none';
            }
        }
        event.target.textContent = 'Player One';
        event.target.style.boxShadow = 'inset 0px 0px 0px 4px dodgerblue';
        event.target.style.textShadow = '-1px 1px 0 dodgerblue, 1px 1px 0 dodgerblue, 1px -1px 0 dodgerblue, -1px -1px 0 dodgerblue';
    }
}

function playerTwoSelection(event){
    event.preventDefault();
    if (players.one.avatarLink != event.target.style.background){
        players.two.avatarLink = event.target.style.background;
        for (let i = 0; i < characterSelectionImages.length; i++){
            if(players.one.avatarLink != characterSelectionImages[i].style.background){
                characterSelectionImages[i].textContent = '';
                characterSelectionImages[i].style.boxShadow = 'none';
            }
        }
        event.target.textContent = 'Player Two';
        event.target.style.boxShadow = 'inset 0px 0px 0px 4px pink';
        event.target.style.textShadow = '-1px 1px 0 pink, 1px 1px 0 pink, 1px -1px 0 pink, -1px -1px 0 pink';
    }
}

function selectCharacterAgain(){
    players.one.score = 0;
    players.two.score = 0;
    characterSelectionPageSetup();
}

//Game Functions

function switchActivePlayer(){
    if (activePlayer === players.one){
        activePlayer = players.two;
        playerOneGameBar.classList.remove('flashing-animation');
        playerTwoGameBar.classList.add('flashing-animation');
    } else {
        activePlayer = players.one;
        playerOneGameBar.classList.add('flashing-animation');
        playerTwoGameBar.classList.remove('flashing-animation');
    }
}

function isWinner(){
    for (let i = 0; i < winningConditions.length; i++){
        if (activePlayer.movesMade.includes(winningConditions[i][0]) && activePlayer.movesMade.includes(winningConditions[i][1]) && activePlayer.movesMade.includes(winningConditions[i][2])){
            activePlayer.score++;
            endGameText.textContent = activePlayer.name + ' wins this round!'
            return true;
        }
    }
    return false;
}

function updateWinStatus(){
    if (isWinner()){
        playerOneGameBar.textContent = players.one.name + ' :' + String(players.one.score);
        playerTwoGameBar.textContent = players.two.name + ' :' + String(players.two.score);
        endGamePageSetup();
    } else if (movesCounter >= 9){
        endGamePageSetup();
        endGameText.textContent = 'Draw';
    }
}

function handleGameGridClick(event){

    if (event.target.dataset.clicked === 'false'){
        activePlayer.draw(event);
        activePlayer.update(event);
        movesCounter++;
        updateWinStatus();
        switchActivePlayer();
        event.target.dataset.clicked = 'true'
        gameStatusText.textContent = activePlayer.name + "'s turn";
    } else{
        gameStatusText.textContent = 'invalid square';
    }
}

//End Game Functions

function resetBoard(){
    for (let i = 0; i < gamePageGridBoxes.length; i++){
        if (gamePageGridBoxes[i].dataset.clicked==='true'){
            gamePageGridBoxes[i].removeChild(gamePageGridBoxes[i].firstChild);
        }
        gamePageGridBoxes[i].dataset.clicked='false';
    }
}

/////////////////////////////////////////////////////////////



//Runtime Code
//On start up show character selection page only
characterSelectionPageSetup();
playerOneGameBar.classList.add('flashing-animation');

//Character Selection

for (let i = 0; i < characterSelectionImages.length; i++){
    characterSelectionImages[i].addEventListener('click', playerOneSelection);
    characterSelectionImages[i].addEventListener('contextmenu', playerTwoSelection);
}

for (let i = 0; i < playerOneColorChoices.length; i++){
    playerOneColorChoices[i].addEventListener('click', players.one.colorSelection);
}

for (let i = 0; i < playerTwoColorChoices.length; i++){
    playerTwoColorChoices[i].addEventListener('click', players.two.colorSelection);
}

startGameBtn.addEventListener('click', function(){
    if (players.one.avatarLink != '' && players.two.avatarLink != '' && playerOneNameInput.value != '' && playerTwoNameInput.value != '' && startGameBtnText.textContent != '' && players.one.tokenColor != '' && players.two.tokenColor != ''){
        playGameSetup();
    } else{
        startGameBtnText.textContent = 'both players have to select a character, a colour and enter a name!';
    }
});


//Game

for (let i = 0; i < gamePageGridBoxes.length; i++){
    gamePageGridBoxes[i].addEventListener('click', handleGameGridClick)
}



//End Game

chooseNewCharacterBtn.addEventListener('click', selectCharacterAgain);

playAgainBtn.addEventListener('click', playGameSetup);