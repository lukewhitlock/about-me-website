const total = document.getElementById("total");
const patterns = {
    1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8]
};

let d1 = 0;
let d2 = 0;
let t = 0;

function roll () {
    d1 = Math.floor(Math.random() * 6) + 1;
    d2 = Math.floor(Math.random() * 6) + 1;
    t = d1 + d2;
    total.textContent = "Total: " + t;
    display(d1, 0);
    display(d2, 1);
}

function display (val, dieIndex) {
    const cell = document.querySelectorAll(".die")[dieIndex].querySelectorAll(".cell");
    cell.forEach(cell => cell.textContent = "");
    patterns[val].forEach(i => cell[i].textContent = "·");
}