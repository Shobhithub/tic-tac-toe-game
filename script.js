const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById(restart);


let currentPlayer = "X";
let running=true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,8]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

function cellClicked(){
    if(this.innerText !=="" || !running){
        return;
    }
    this.innerText = currentPlayer;
    checkWinner();
}

function checkWinner(){
    let won = false;

    for(let pattern of winPatterns){
        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;

        if(a===""||b===""||c===""){
            continue;
        }
        if(a===b && b===c){
            won=true;
            break;
        }
    }
    if(won){
        statusText.innerText = `Player ${currentPlayer} wins`;
        running =  false;
    }
    else if ([...cells].every(cell => cell.innerText !== "")) {
        statusText.innerText = "It's a Draw";
        running = false;
    } else {
        changePlayer();
    }
}

function changePlayer(){
    currentPlayer=(currentPlayer==="X")?"O":"X" ;
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}


restartBtn.addEventListener("click",restartGame);

function restartGame(){
    currentPlayer="X";
    running=true;
    statusText.innerText =`Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.innerText="";
    });
}