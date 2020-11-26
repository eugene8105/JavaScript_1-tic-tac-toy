
var hPlayer = [];
var hCount = 0;

var cPlayer = [];
var cCount = 0;


var present = 0;
var winer = false;

$(document).ready(function () {
    const totalRows = 3;
    const totalCols = 3;
    const totalSquares = totalRows * totalCols;

    const winningSet = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    createBoard();

    $("#reset").click(resetGame);

    function humanPlayerTurn() {

        // what square was clicked?
        var chosenSquare = $(this);

        // get the row and col info from the data attributes
        var chosenRow = chosenSquare.data("row");
        var chosenCol = chosenSquare.data("col");

        console.log(`Human player chose row ${chosenRow} col ${chosenCol}`);

        var squareOccupied = chosenSquare.hasClass("human-player")
            || chosenSquare.hasClass("computer-player");

        if (!squareOccupied) {
            console.log("It was free");
            // Give the square a CSS class
            chosenSquare.addClass("human-player");
            chosenSquare.html(`X`);
            // assign number to a human player aray
            hPlayer[hCount] = assignHuman(chosenRow, chosenCol);

            hCount++;
            // checking if player won
            if (checkWiner(hPlayer)) {
                var winMessage = "<h1>You WON!</h1>";
                endOfTheGame(winMessage);
            }
            if ((hCount !== 5) && (checkWiner(hPlayer) === false)) {
                computerPlayerTurn();
            }
        }
        // checking if it's a tie
        if (hCount === 5) {
            var tieMessage = "<h1>It's a tie!</h1>";
            endOfTheGame(tieMessage);
        }
    }
    function computerPlayerTurn() {
        var squareOccupied = false;
        var chosenSquare;

        do {
            // pick a random square number
            var randomSquareNum = Math.floor(Math.random() * totalSquares);
            console.log("Computer player chose square #" + randomSquareNum);

            // select the chosen square
            chosenSquare = $(".square").eq(randomSquareNum);
            // checking if square is free
            if (chosenSquare.hasClass("computer-player")
                || chosenSquare.hasClass("human-player")) {
                squareOccupied = true;
                console.log("It was already taken!");
            } else {
                squareOccupied = false;
                console.log("It was free");
            }

        } while (squareOccupied);

        // give the square a CSS class
        chosenSquare.addClass("computer-player");

        chosenSquare.html(`0`);

        cPlayer[cCount] = randomSquareNum;

        cCount++;
        console.log(`Assigned Computer choice - ${randomSquareNum}.`);
        // checking computer set for a winning set
        if (checkWiner(cPlayer)) {
            var winMessage = "<h1>Computer WON!</h1>";
            endOfTheGame(winMessage);
        }
    }

    // creating a message on the screen when game is over
    function endOfTheGame(message){
        $("#win").html(message);
        $("span").off();
        console.log(message);
    }
    // assigning a value to the user array from selected square
    function assignHuman(row, col) {
        var chosenNumber = 0;
        if (row === 1 && col === 1) {
            chosenNumber = 0;
        } else if (row === 1 && col === 2) {
            chosenNumber = 1;
        } else if (row === 1 && col === 3) {
            chosenNumber = 2;
        } else if (row === 2 && col === 1) {
            chosenNumber = 3;
        } else if (row === 2 && col === 2) {
            chosenNumber = 4;
        } else if (row === 2 && col === 3) {
            chosenNumber = 5;
        } else if (row === 3 && col === 1) {
            chosenNumber = 6;
        } else if (row === 3 && col === 2) {
            chosenNumber = 7;
        } else if (row === 3 && col === 3) {
            chosenNumber = 8;
        }
        return chosenNumber;
    }
    // checking if a winer
    function checkWiner(setToCheck) {
        for (var item of winningSet) {
            for (var i = 0; i < item.length; i++) {
                if (setToCheck.includes(item[i])) {
                    present++;
                }
            }
            if (present === 3) {
                winer = true;
                break;
            }
            present = 0;
        }
        return winer;
    }
    // creating a board
    function createBoard() {
        // How big can each square be?
        // Add 2 to allow for one square's worth of padding on either side
        var squareWidth = Math.round(window.innerWidth / (totalCols + 2));
        console.log("width: " + squareWidth);
        var squareHeight = Math.round(window.innerHeight / (totalRows + 2));
        console.log("height: " + squareHeight);

        // Choose the smaller of the two dimensions so both height and width
        // will fit in the viewport and still be a square
        var bestDimension = Math.min(squareWidth, squareHeight);
        console.log("Squares should be: " + bestDimension);

        // store the board div in a variable
        var gameBoardDiv = $("#board");

        // loop to print rows of squares
        for (var rowNum = 1; rowNum <= totalRows; rowNum++) {
            // Create a new row
            var rowOfSquares = $("<div>");
            // give the row the class of "row" (for Bootstrap)
            rowOfSquares.addClass("row justify-content-center");
            // add the row to the gameboard
            gameBoardDiv.append(rowOfSquares);

            // loop to print the squares in each row
            for (var colNum = 1; colNum <= totalCols; colNum++) {
                // create an empty element to be a square on the board
                var square = $("<span>");
                // give the square its row number as data
                square.data("row", rowNum);
                // give the square its column number as data
                square.data("col", colNum);
                // set the width and height of the square
                square.width(bestDimension);
                square.height(bestDimension);
                // give the square the class of "square" to make it inline-block
                square.addClass("square");
                // make the square run a function when clicked
                square.click(humanPlayerTurn);
                // add the square to the current row
                rowOfSquares.append(square);
            }
        }
    }
    // reseting a game
    function resetGame() {
        hPlayer = [0, 0, 0, 0, 0];
        hCount = 0;

        cPlayer = [0, 0, 0, 0, 0];
        cCount = 0;
        location.reload(true);
        // win;
        // $(".container").html("");
    }

});