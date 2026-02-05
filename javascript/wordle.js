const text = document.getElementById("wordletext");
const input = document.getElementById("wordleinput");
const wordle = document.getElementById("wordle");
const rows = wordle.querySelectorAll(".row");
const startButton = document.getElementById("wordlestart");
const enterButton = document.getElementById("wordleenter");
const winningWords =
["Hello", "Guess", "Yummy", "Ramen", "White", "Smith", "Sushi", "Sleep", "Sound", "Quota", 
"Ghost", "Input", "Value", "Bread", "Dough", "Laugh", "Phone", "Apply", "Radio", "Crane",
"Slain", "Plane", "Plain", "Beige", "Brown", "Biten", "Hertz", "Trash", "Pound", "Punch",
"Jello", "Mound", "Mount", "Valet", "Vapor", "Hinge", "Wedge", "String", "Feint", "Large",
"Ghoul", "Bring", "Typed", "Sloth", "Crass", "Round", "Fancy", "Facet", "Rabid", "Eagle"];

let numGuesses = 0;
let goalWord = "";
let goalLetters = [];
let wordleGameActive = true;

input.disabled = true;

startButton.addEventListener("click", start);
enterButton.addEventListener("click", guess)
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        guess();
});


function start () {
    goalWord = winningWords[Math.floor(Math.random() * winningWords.length)]
    goalLetters = goalWord.toUpperCase().split("");
    numGuesses = 0;
    wordleGameActive = true;
    startButton.textContent = "Reset";
    text.textContent = "Type Your Guess!";
    input.disabled = false;
    for (let i = 0; i < 6; i++) {
        const cell = rows[i].querySelectorAll(".cell");
        for (let j = 0; j < 5; j++) {
            cell[j].textContent = "";
            cell[j].style.backgroundColor = "darkGrey";
        }
    }
}

function guess () {
    if (wordleGameActive === false)
        return;
    if (numGuesses === 6) {
        text.textContent = "No Guesses Left";
        input.value = "";
        return;
    }
    const val = input.value;
    if (val.length !== 5) {
        text.textContent = "Must Be Exactly 5 Letters";
        input.value = "";
        return;
    }
    numGuesses++;
    const letters = val.split("");
    const cells = rows[numGuesses - 1].querySelectorAll(".cell");
    let goalLettersTemp = goalLetters.slice();
    text.textContent = "" + (6 - numGuesses) + " Guesses Remaining";
    for (let i = 0; i < 5; i++) {
        cells[i].textContent = letters[i].toUpperCase();
        if (cells[i].textContent === goalLettersTemp[i]) {
            cells[i].style.backgroundColor = "green";
            goalLettersTemp[i] = null;
        }
    }
    for (let i = 0; i < 5; i++) {
        if (cells[i].style.backgroundColor === "green") continue;
        cells[i].textContent = letters[i].toUpperCase();
        if (goalLettersTemp.includes(cells[i].textContent)) {
            cells[i].style.backgroundColor = "yellow";
            for (let j = 0; j < 5; j++) {
                if (goalLettersTemp[j] === cells[i].textContent) {
                    goalLettersTemp[j] = null;
                    break;
                }
            }
        }
    }
    input.value = "";
    check(cells);
}

function check (cells) {
    for (let i = 0; i < 5; i++) {
        if (cells[i].textContent !== goalLetters[i])
            return;
    }
    wordleGameActive = false;
    text.textContent = "You Win!";
    input.disabled = true;
}