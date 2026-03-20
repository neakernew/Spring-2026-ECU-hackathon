/**
 * Bugs fixed with ChatGPT
 * https://chatgpt.com/c/69bd492d-0090-832f-ad51-0a7719ae78d5
 * Animation created using ChatGPT
 */
let scoreComputer = 0;
let playerScore= 0;

const choice = ["rock", "paper", "scissors"];
let computerOption = null;
let userOption = null;

const targetElement = document.getElementById("decision");
const UserOptionContainer = document.getElementById('options');

const optionsData = [
    {id: 'OptA', text: "Rock", value: 'rock'},
    {id: 'OptB', text: "Paper", value: 'paper'},
    {id: 'OptC', text: "Scissors", value: 'scissors'}
];

optionsData.forEach(option => {
    const button = document.createElement('button');
    button.id = option.id;
    button.value = option.value;
    button.innerText = option.text;
   
    button.addEventListener('click', () => {
        userOption = button.value;
        choiceAnimation(userOption);
    });

    UserOptionContainer.appendChild(button);
});

function getButtons(){
    return document.querySelectorAll("#options button");
}

function updateScore(){
    document.getElementById("comScore").textContent = scoreComputer;
    document.getElementById("userScore").textContent = playerScore;

    sessionStorage.setItem("comScore", scoreComputer);
    sessionStorage.setItem("userScore", playerScore);
}

function computerChoice(){
    const index = Math.floor(Math.random() * choice.length);
    computerOption = choice[index];
}

function compareOptions(){
    let winOrLose = getMatchup(computerOption, userOption);

    if (winOrLose === 0){
        targetElement.textContent = `You chose ${userOption}. The computer picked ${computerOption}. You win!`;
        playerScore++;
        updateScore();
    }
    else if (winOrLose === 2){
        targetElement.textContent= `You chose ${userOption}. The computer picked ${computerOption}. You lost.`;
        scoreComputer++;
        updateScore();
    }
    else if (winOrLose === 1){
         targetElement.textContent = `You chose ${userOption}. The computer picked ${computerOption}. It's a tie!`;
    }
}

function getMatchup(computerOption, userOption){
    const rules = {
        rock: { scissors: 2, rock: 1, paper: 0},
        paper: { scissors: 0, rock: 2, paper: 1},
        scissors: { scissors: 1, rock: 0, paper: 2},
    };

    return rules[computerOption]?.[userOption];
}

function disableButtons(){
    getButtons().forEach(button => button.disabled = true);
}

function enableButtons(){
    getButtons().forEach(button => button.disabled = false);
}

function wait(ms){
    return new Promise(resolve =>setTimeout(resolve, ms));
}

function fadeOutMainImages() {
    document.querySelectorAll("#images img").forEach(img => {
        img.classList.add("fade-out");
    });
}

function resetMainImages() {
    document.querySelectorAll("#images img").forEach(img => {
        img.classList.remove("fade-out");
    });
}

function showRevealImages(playerChoice, computerChoiceValue) {
    const reveal = document.getElementById("reveal");
    const playerReveal = document.getElementById("playerReveal");
    const computerReveal = document.getElementById("computerReveal");

    playerReveal.src = `${playerChoice}.png`;
    playerReveal.alt = playerChoice;

    computerReveal.src = `${computerChoiceValue}.png`;
    computerReveal.alt = computerChoiceValue;

    reveal.classList.remove("hidden");
}

function hideRevealImages() {
    const reveal = document.getElementById("reveal");
    const playerReveal = document.getElementById("playerReveal");
    const computerReveal = document.getElementById("computerReveal");

    reveal.classList.add("hidden");
    playerReveal.src = "";
    computerReveal.src = "";
}

function resetBoard(){
   hideRevealImages();
   resetMainImages();
}

async function choiceAnimation(userOption){
    disableButtons();
    targetElement.textContent = "";

    computerChoice();

    fadeOutMainImages();
    await wait(600);

    document.getElementById("images").classList.add("hidden");
    showRevealImages(userOption, computerOption);

    await wait(900);

    compareOptions();

    await wait(1400);

    hideRevealImages();
    document.getElementById("images").classList.remove("hidden");
    resetMainImages();
    enableButtons();
}

updateScore();