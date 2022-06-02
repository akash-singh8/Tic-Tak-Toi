
// assuming that 1 represent X and 0 represent 0
let currText = 1;
let wins = false;
let boxArr = [[-1, -1 ,-1], [-1, -1, -1], [-1, -1, -1]];
let count = 0;

for (let i=0; i<9; i++){
    let currBox = document.querySelectorAll(".box")[i];
    currBox.addEventListener("click", function(){
        if (!wins && currBox.textContent.length == 0){
            let row = Math.floor(i/3), col = i%3;
            let audio = new Audio("items/ting.mp3");
            audio.play();
            if (currText){
                currBox.textContent = "X";
                boxArr[row][col] = "X";
                info.innerHTML = "2<sup>nd</sup> Player Turn";
            }
            else{
                currBox.textContent = "0";
                boxArr[row][col] = "0";
                info.innerHTML = "1<sup>st</sup> Player Turn";
            }
            currText = (currText)? 0 : 1;
            count++;
            checkWinner(row, col);
        }
    });
}

function checkWinner(row, col){
    if (count == 9){
        info.innerHTML = "Match Draws!";
        document.querySelector("#drawGif").style.display = "inline-block";
    }
    let curr = boxArr[row][col];
    // checking for row and column
    let checkWinRow = true, checkWinCol = true;
    for (let i=0; i<3; i++){
        if (boxArr[row][i] != curr) checkWinCol = false;
        if (boxArr[i][col] != curr) checkWinRow = false;
    }
    if (checkWinCol || checkWinRow) displayWinner(curr);
    else{
        // checking for left and right diagonal
        if (row == col){
            let leftDiag = true, rightDiag = true;
            for (let i=row-1, j=col-1; i>=0 && j>=0; i--, j--){
                if (boxArr[i][j] != curr) leftDiag = false;
            }

            for (let i=row+1, j=col+1; i<=2 && j<=2; i++, j++){
                if (boxArr[i][j] != curr) rightDiag = false;
            }

            if (leftDiag && rightDiag) displayWinner(curr);
        }
        if (row == 1 && col == 1 || row == 0 && col == 2 || row == 2 && col == 0){
            let leftDiag = true, rightDiag = true;
            for (let i=row+1, j=col-1; i<=2 && j>=0; i++, j--){
                if (boxArr[i][j] != curr) leftDiag = false;
            }

            for (let i=row-1, j=col+1; i>=0 && j<=2; i--, j++){
                if (boxArr[i][j] != curr) rightDiag = false;
            }

            if (leftDiag && rightDiag) displayWinner(curr);
        }
    }
}


function displayWinner(winText){
    if (winText == "X") info.innerHTML = "Player 1 Wins";
    else info.innerHTML = "Player 2 Wins";
    document.querySelector("#gif").style.display = "inline-block";
    let audio = new Audio("items/gameover.mp3");
    audio.play();
    count = 0;
    wins = true;
}


reset.addEventListener("click", function(){
    for (let i=0; i<9; i++){
        let currBox = document.querySelectorAll(".box")[i];
        currBox.textContent = "";
    }
    info.innerHTML = "1<sup>st</sup> Player Turn";
    document.querySelector("#gif").style.display = "none";
    document.querySelector("#drawGif").style.display = "none";
    boxArr = [[-1, -1 ,-1], [-1, -1, -1], [-1, -1, -1]];
    currText = 1;
    count = 0;
    wins = false;
})
