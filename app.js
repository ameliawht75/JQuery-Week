/*Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.*/


//this box on the grid
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

//this will represent if the click is X or O
let player1 = "X";
let player2 = "O";

//Winnter at 5 turns or more and can't have more than 9 turns
let turn = 0;
//need to know if a player has won to move ont he next round or not
let winner = false;

$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

//keep track of current player
let currentPlayer = '';

const winningOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8],
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],
    [box0, box4, box8], [box2, box4, box6]
];

const endGame = () => {
    console.log("Game Over");
    $('.box').css("pointer-events", "none");
    $('#p1').removeClass("bg-light border border-info");
    $('#p2').removeClass("bg-light border border-info");
};

const checkWinner = (currentPlayer, a, b, c) => { //was not showing name of player that won.  found solution on reddit.
    if (a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer) {
        winner = true;
        console.log(`Found winner, it's ${currentPlayer}!`);

        // Highlight winning cells
        a.removeClass('text-info bg-dark').addClass('text-dark bg-info');
        b.removeClass('text-info bg-dark').addClass('text-dark bg-info');
        c.removeClass('text-info bg-dark').addClass('text-dark bg-info');

        // Determine which player won
        let winningPlayer = currentPlayer === "X" ? "Player 1" : "Player 2";

        // Show alert with the correct winner
        $('#alertWinner').text(`Game Over... ${winningPlayer} Wins!`).show();

        endGame();
    }
};

const checkOutcomes = () => {
    winningOutcomes.forEach(outcome => checkWinner(currentPlayer, ...outcome)); //the way that the video instructed to do this the function was not checking properly.  found a different solution online.

    if(turn === 9 && winner === false) {
        endGame();
        $('#alertDraw').show();
    }
};



const startGame = () => {

    console.log('Start Game!');
    console.log(turn++);
    currentPlayer = player1;
    console.log(currentPlayer);

    $('#p1').addClass("bg-light border border-info");

    //show the start alert
    $('#alertStart').show();

    $('.box').on('click', function(){
        $('#alertStart').hide();

        $(this).text(currentPlayer);

        if(turn > 4) {
            //check winners
            console.log('winner???');
            checkOutcomes();
        }

        if(winner === false) {

            if(currentPlayer === player1) {
                currentPlayer = player2;
                console.log(turn++);
                $('#p2').addClass("bg-light border border-info");
                $('#p1').removeClass("bg-light border border-info");
            } else {
                currentPlayer = player1;
                console.log(turn++);
                $('#p1').addClass("bg-light border border-info");
                $('#p2').removeClass("bg-light border border-info");
            }
            
        }

    })

};

document.getElementById('startBtn').addEventListener('click', ()=> startGame());

document.getElementById('resetBtn').addEventListener('click', ()=> document.location.reload(true));