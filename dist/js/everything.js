var QueenCover;
(function (QueenCover) {
    QueenCover[QueenCover["firstCheck"] = 0] = "firstCheck";
    QueenCover[QueenCover["secondCheck"] = 1] = "secondCheck";
    QueenCover[QueenCover["none"] = 2] = "none";
})(QueenCover || (QueenCover = {}));
var Pair = (function () {
    function Pair(fst, snd) {
        this.fstVal = fst;
        this.sndVal = snd;
    }
    Object.defineProperty(Pair.prototype, "fst", {
        get: function () {
            return this.fstVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pair.prototype, "snd", {
        get: function () {
            return this.sndVal;
        },
        enumerable: true,
        configurable: true
    });
    return Pair;
})();
var gameLogic;
(function (gameLogic) {
    // export enum CurrentMode {
    //   Practice,
    //   PassAndPlay,
    //   Opponent,
    //   None
    // }
    // game score global variable
    gameLogic.gameScoreGlobal = { player1: 0, player2: 0 };
    // Create all dimensions for board
    function drawBoard(width, height) {
        var size = width < height ? width : height;
        // Change these
        var outerBoardWidth = size;
        var outerBoardHeight = outerBoardWidth;
        var innerBoardWidth = (74.0 / 89.2) * outerBoardWidth;
        var innerBoardHeight = innerBoardWidth;
        var coinDiameter = (3.18 / 74.0) * innerBoardWidth;
        var strikerDiameter = (4.1 / 74.0) * innerBoardWidth;
        var startingCircleDiameter = (17.0 / 74.0) * innerBoardWidth;
        var borderThickness = (7.6 / 74.0) * innerBoardWidth;
        // Coin Pockets
        var coinPocketDiameter = (4.45 / 74.0) * innerBoardWidth;
        var coinPocketThickness = (0.15 / 74.0) * innerBoardWidth;
        var coinPocketTopLeftX = borderThickness + (coinPocketDiameter / 2);
        var coinPocketTopLeftY = borderThickness + (coinPocketDiameter / 2);
        var coinPocketTopRightX = borderThickness + innerBoardWidth - (coinPocketDiameter / 2);
        var coinPocketTopRightY = borderThickness + (coinPocketDiameter / 2);
        var coinPocketBottomLeftX = borderThickness + (coinPocketDiameter / 2);
        var coinPocketBottomLeftY = borderThickness + innerBoardHeight - (coinPocketDiameter / 2);
        var coinPocketBottomRightX = borderThickness + innerBoardWidth - (coinPocketDiameter / 2);
        var coinPocketBottomRightY = borderThickness + innerBoardHeight - (coinPocketDiameter / 2);
        // Diagonal Lines
        var diagonalLineTopLeftStartX = borderThickness + coinPocketDiameter + (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineTopLeftStartY = diagonalLineTopLeftStartX;
        var diagonalLineTopLeftEndX = diagonalLineTopLeftStartX + (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineTopLeftEndY = diagonalLineTopLeftEndX;
        var diagonalLineTopRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineTopRightStartY = diagonalLineTopLeftStartX;
        var diagonalLineTopRightEndX = diagonalLineTopRightStartX - (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineTopRightEndY = diagonalLineTopLeftEndX;
        var diagonalLineBottomRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineBottomRightStartY = diagonalLineBottomRightStartX;
        var diagonalLineBottomRightEndX = diagonalLineBottomRightStartX - (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
        var diagonalLineBottomRightEndY = diagonalLineBottomRightEndX;
        var diagonalLineBottomLeftStartX = diagonalLineTopLeftStartX;
        var diagonalLineBottomLeftStartY = diagonalLineBottomRightStartX;
        var diagonalLineBottomLeftEndX = diagonalLineTopLeftEndX;
        var diagonalLineBottomLeftEndY = diagonalLineBottomRightEndX;
        var diagonalLineThickness = (0.15 / 74.0) * innerBoardWidth;
        // Outer and Inner striker circles (1 == leftmost, 2 == rightmost)
        //    Striker placement line measurements and striker circle properties
        var strikerPlacementLineLength = (47.0 / 74.0) * innerBoardWidth;
        var outerStrikerCircleDiameter = (3.18 / 74.0) * innerBoardWidth;
        var innerStrikerCircleDiameter = (2.45 / 74.0) * innerBoardWidth;
        var strikerPlacementLineLengthToCenterOfOuterStrikerCircles = strikerPlacementLineLength - outerStrikerCircleDiameter;
        var outerStrikerCircleThickness = (0.3 / 74.0) * innerBoardWidth;
        var strikerCircleTopLeft1X = borderThickness + (10.15 / 74.0) * innerBoardWidth + (outerStrikerCircleDiameter / 2);
        var strikerCircleTopLeft1Y = (outerBoardHeight / 2) - (strikerPlacementLineLengthToCenterOfOuterStrikerCircles / 2);
        var strikerCircleTopLeft2X = strikerCircleTopLeft1Y;
        var strikerCircleTopLeft2Y = strikerCircleTopLeft1X;
        var strikerCircleTopRight1X = outerBoardWidth - strikerCircleTopLeft2X;
        var strikerCircleTopRight1Y = strikerCircleTopLeft2Y;
        var strikerCircleTopRight2X = outerBoardWidth - strikerCircleTopLeft1X;
        var strikerCircleTopRight2Y = strikerCircleTopLeft1Y;
        var strikerCircleBottomRight1X = strikerCircleTopRight1X;
        var strikerCircleBottomRight1Y = outerBoardHeight - strikerCircleTopRight1Y;
        var strikerCircleBottomRight2X = strikerCircleTopRight2X;
        var strikerCircleBottomRight2Y = outerBoardHeight - strikerCircleTopRight2Y;
        var strikerCircleBottomLeft1X = strikerCircleTopLeft1X;
        var strikerCircleBottomLeft1Y = outerBoardHeight - strikerCircleTopLeft1Y;
        var strikerCircleBottomLeft2X = strikerCircleTopLeft2X;
        var strikerCircleBottomLeft2Y = outerBoardHeight - strikerCircleTopLeft2Y;
        // Outer striker placement lines
        var outerStrikerPlacementLineThickness = (0.3 / 74.0) * innerBoardWidth;
        var innerStrikerPlacementLineThickness = (0.15 / 74.0) * innerBoardWidth;
        var leftOuterStrikerPlacementLineStartX = borderThickness + (10.15 / 74.0) * innerBoardWidth;
        var leftOuterStrikerPlacementLineStartY = (outerBoardHeight / 2) - strikerPlacementLineLengthToCenterOfOuterStrikerCircles / 2;
        var leftOuterStrikerPlacementLineEndX = leftOuterStrikerPlacementLineStartX;
        var leftOuterStrikerPlacementLineEndY = outerBoardHeight - leftOuterStrikerPlacementLineStartY;
        var rightOuterStrikerPlacementLineStartX = outerBoardWidth - leftOuterStrikerPlacementLineStartX;
        var rightOuterStrikerPlacementLineStartY = leftOuterStrikerPlacementLineStartY;
        var rightOuterStrikerPlacementLineEndX = rightOuterStrikerPlacementLineStartX;
        var rightOuterStrikerPlacementLineEndY = leftOuterStrikerPlacementLineEndY;
        var topOuterStrikerPlacementLineStartX = leftOuterStrikerPlacementLineStartY;
        var topOuterStrikerPlacementLineStartY = leftOuterStrikerPlacementLineStartX;
        var topOuterStrikerPlacementLineEndX = outerBoardWidth - topOuterStrikerPlacementLineStartX;
        var topOuterStrikerPlacementLineEndY = topOuterStrikerPlacementLineStartY;
        var bottomOuterStrikerPlacementLineStartX = topOuterStrikerPlacementLineStartX;
        var bottomOuterStrikerPlacementLineStartY = outerBoardHeight - topOuterStrikerPlacementLineStartY;
        var bottomOuterStrikerPlacementLineEndX = topOuterStrikerPlacementLineEndX;
        var bottomOuterStrikerPlacementLineEndY = bottomOuterStrikerPlacementLineStartY;
        var innerStrikerPlacementLineOffset = outerStrikerCircleDiameter;
        // Inner corner circles
        var innerCornerCircleDiameter = (6.35 / 74.0) * innerBoardWidth;
        var innerCornerCircleThickness = (0.15 / 74.0) * innerBoardWidth;
        var innerCornerCircleTopLeftX = diagonalLineTopLeftEndX - (innerCornerCircleDiameter / 2) / Math.sqrt(2);
        var innerCornerCircleTopLeftY = innerCornerCircleTopLeftX;
        var innerCornerCircleTopRightX = outerBoardWidth - innerCornerCircleTopLeftX;
        var innerCornerCircleTopRightY = innerCornerCircleTopLeftY;
        var innerCornerCircleBottomRightX = innerCornerCircleTopRightX;
        var innerCornerCircleBottomRightY = outerBoardHeight - innerCornerCircleTopRightY;
        var innerCornerCircleBottomLeftX = innerCornerCircleTopLeftX;
        var innerCornerCircleBottomLeftY = outerBoardHeight - innerCornerCircleTopLeftY;
        var settings = {
            "numCoins": 19,
            "numBlack": 9,
            "numWhite": 9,
            "numQueen": 1,
            "firstLayer": 6,
            "secondLayer": 12,
            "coinDiameter": coinDiameter,
            "strikerDiameter": strikerDiameter,
            "innerBoardWidth": innerBoardWidth,
            "innerBoardHeight": innerBoardHeight,
            "outerBoardWidth": outerBoardWidth,
            "outerBoardHeight": outerBoardHeight,
            "numberOfSides": 6,
            "hexSize": (coinDiameter / 2) * 2,
            "startingCircleDiameter": startingCircleDiameter,
            "boardCenterX": outerBoardWidth / 2.0,
            "boardCenterY": outerBoardHeight / 2.0,
            "borderThickness": borderThickness,
            "coinPocketDiameter": coinPocketDiameter,
            "coinPocketThickness": coinPocketThickness,
            "coinPocketTopLeftX": coinPocketTopLeftX,
            "coinPocketTopLeftY": coinPocketTopLeftY,
            "coinPocketTopRightX": coinPocketTopRightX,
            "coinPocketTopRightY": coinPocketTopRightY,
            "coinPocketBottomLeftX": coinPocketBottomLeftX,
            "coinPocketBottomLeftY": coinPocketBottomLeftY,
            "coinPocketBottomRightX": coinPocketBottomRightX,
            "coinPocketBottomRightY": coinPocketBottomRightY,
            "diagonalLineTopLeftStartX": diagonalLineTopLeftStartX,
            "diagonalLineTopLeftStartY": diagonalLineTopLeftStartY,
            "diagonalLineTopLeftEndX": diagonalLineTopLeftEndX,
            "diagonalLineTopLeftEndY": diagonalLineTopLeftEndY,
            "diagonalLineTopRightStartX": diagonalLineTopRightStartX,
            "diagonalLineTopRightStartY": diagonalLineTopRightStartY,
            "diagonalLineTopRightEndX": diagonalLineTopRightEndX,
            "diagonalLineTopRightEndY": diagonalLineTopRightEndY,
            "diagonalLineBottomRightStartX": diagonalLineBottomRightStartX,
            "diagonalLineBottomRightStartY": diagonalLineBottomRightStartY,
            "diagonalLineBottomRightEndX": diagonalLineBottomRightEndX,
            "diagonalLineBottomRightEndY": diagonalLineBottomRightEndY,
            "diagonalLineBottomLeftStartX": diagonalLineBottomLeftStartX,
            "diagonalLineBottomLeftStartY": diagonalLineBottomLeftStartY,
            "diagonalLineBottomLeftEndX": diagonalLineBottomLeftEndX,
            "diagonalLineBottomLeftEndY": diagonalLineBottomLeftEndY,
            "diagonalLineThickness": diagonalLineThickness,
            "outerStrikerCircleDiameter": outerStrikerCircleDiameter,
            "innerStrikerCircleDiameter": innerStrikerCircleDiameter,
            "outerStrikerCircleThickness": outerStrikerCircleThickness,
            "strikerCircleTopLeft1X": strikerCircleTopLeft1X,
            "strikerCircleTopLeft1Y": strikerCircleTopLeft1Y,
            "strikerCircleTopLeft2X": strikerCircleTopLeft2X,
            "strikerCircleTopLeft2Y": strikerCircleTopLeft2Y,
            "strikerCircleTopRight1X": strikerCircleTopRight1X,
            "strikerCircleTopRight1Y": strikerCircleTopRight1Y,
            "strikerCircleTopRight2X": strikerCircleTopRight2X,
            "strikerCircleTopRight2Y": strikerCircleTopRight2Y,
            "strikerCircleBottomRight1X": strikerCircleBottomRight1X,
            "strikerCircleBottomRight1Y": strikerCircleBottomRight1Y,
            "strikerCircleBottomRight2X": strikerCircleBottomRight2X,
            "strikerCircleBottomRight2Y": strikerCircleBottomRight2Y,
            "strikerCircleBottomLeft1X": strikerCircleBottomLeft1X,
            "strikerCircleBottomLeft1Y": strikerCircleBottomLeft1Y,
            "strikerCircleBottomLeft2X": strikerCircleBottomLeft2X,
            "strikerCircleBottomLeft2Y": strikerCircleBottomLeft2Y,
            "outerStrikerPlacementLineThickness": outerStrikerPlacementLineThickness,
            "innerStrikerPlacementLineThickness": innerStrikerPlacementLineThickness,
            "innerStrikerPlacementLineOffset": innerStrikerPlacementLineOffset,
            "leftOuterStrikerPlacementLineStartX": leftOuterStrikerPlacementLineStartX,
            "leftOuterStrikerPlacementLineStartY": leftOuterStrikerPlacementLineStartY,
            "leftOuterStrikerPlacementLineEndX": leftOuterStrikerPlacementLineEndX,
            "leftOuterStrikerPlacementLineEndY": leftOuterStrikerPlacementLineEndY,
            "rightOuterStrikerPlacementLineStartX": rightOuterStrikerPlacementLineStartX,
            "rightOuterStrikerPlacementLineStartY": rightOuterStrikerPlacementLineStartY,
            "rightOuterStrikerPlacementLineEndX": rightOuterStrikerPlacementLineEndX,
            "rightOuterStrikerPlacementLineEndY": rightOuterStrikerPlacementLineEndY,
            "topOuterStrikerPlacementLineStartX": topOuterStrikerPlacementLineStartX,
            "topOuterStrikerPlacementLineStartY": topOuterStrikerPlacementLineStartY,
            "topOuterStrikerPlacementLineEndX": topOuterStrikerPlacementLineEndX,
            "topOuterStrikerPlacementLineEndY": topOuterStrikerPlacementLineEndY,
            "bottomOuterStrikerPlacementLineStartX": bottomOuterStrikerPlacementLineStartX,
            "bottomOuterStrikerPlacementLineStartY": bottomOuterStrikerPlacementLineStartY,
            "bottomOuterStrikerPlacementLineEndX": bottomOuterStrikerPlacementLineEndX,
            "bottomOuterStrikerPlacementLineEndY": bottomOuterStrikerPlacementLineEndY,
            "innerCornerCircleDiameter": innerCornerCircleDiameter,
            "innerCornerCircleThickness": innerCornerCircleThickness,
            "innerCornerCircleTopLeftX": innerCornerCircleTopLeftX,
            "innerCornerCircleTopLeftY": innerCornerCircleTopLeftY,
            "innerCornerCircleTopRightX": innerCornerCircleTopRightX,
            "innerCornerCircleTopRightY": innerCornerCircleTopRightY,
            "innerCornerCircleBottomRightX": innerCornerCircleBottomRightX,
            "innerCornerCircleBottomRightY": innerCornerCircleBottomRightY,
            "innerCornerCircleBottomLeftX": innerCornerCircleBottomLeftX,
            "innerCornerCircleBottomLeftY": innerCornerCircleBottomLeftY
        };
        return settings;
    }
    gameLogic.drawBoard = drawBoard;
    var QUEENCOLOR = "pink";
    var COLOR1 = "black";
    var COLOR2 = "white";
    // Return initial board 
    function getInitialBoard(gameSettings) {
        var boardSize = getInitialSize(gameSettings);
        var board = [];
        // set the position of hte queen
        // insert that qqueen into board
        var queenCoordinate = { xPos: boardSize.centerX,
            yPos: boardSize.centerY };
        var queen = { coordinate: queenCoordinate,
            color: QUEENCOLOR,
            shouldRescale: false
        };
        // Initialize two layers
        var coins = [];
        coins.push(queen);
        var numberOfSides = 6;
        var color = false;
        var outerColor = false;
        var circles = [];
        for (var i = 1; i <= gameSettings["numberOfSides"]; i++) {
            var c = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"]);
            var c2 = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"] * 2);
            circles.push(c2);
            var coinColor = color ? COLOR1 : COLOR2;
            var outerCoinColor = outerColor ? COLOR1 : COLOR2;
            color = !color;
            coins.push(createCoin(gameSettings, c, coinColor));
            coins.push(createCoin(gameSettings, c2, outerCoinColor));
        }
        //color = false;
        outerColor = !outerColor;
        for (var i = 0; i < circles.length; i++) {
            var c = { xPos: (circles[i].xPos + circles[(i + 1) % gameSettings["numberOfSides"]].xPos) / 2.0,
                yPos: (circles[i].yPos + circles[(i + 1) % gameSettings["numberOfSides"]].yPos) / 2.0 };
            var coinColor = outerColor ? COLOR1 : COLOR2;
            coins.push(createCoin(gameSettings, c, coinColor));
        }
        return coins;
    }
    gameLogic.getInitialBoard = getInitialBoard;
    function checkMoveOk(stateTransition) {
    }
    gameLogic.checkMoveOk = checkMoveOk;
    function createCoin(gameSettings, c, coinColor) {
        var coinCoordinate = { xPos: c.xPos,
            yPos: c.yPos };
        var coin = { coordinate: coinCoordinate,
            color: coinColor,
            shouldRescale: false
        };
        return coin;
    }
    function getCoordinates(gameSettings, centerX, centerY, index, hexSize) {
        var c = { xPos: centerX + hexSize * Math.cos(index * 2 * Math.PI / gameSettings["numberOfSides"]),
            yPos: centerY + hexSize * Math.sin(index * 2 * Math.PI / gameSettings["numberOfSides"]) };
        return c;
    }
    function getInitialSize(gameSettings) {
        var boardSize = { width: gameSettings["outerBoardWidth"],
            height: gameSettings["outerBoardHeight"],
            centerX: gameSettings["outerBoardWidth"] / 2,
            centerY: gameSettings["outerBoardHeight"] / 2 };
        return boardSize;
    }
    gameLogic.getInitialSize = getInitialSize;
    function getInitialState(gameSettings) {
        return {
            // Location of all coins
            board: getInitialBoard(gameSettings),
            // specify player index
            playerIndex: { player1: 0, player2: 1 },
            // Game score tracking
            gameScore: { player1: 0, player2: 0 },
            // queen starts off as not pocketed
            shouldCoverQueen: false,
            // queenCoverCheck: QueenCover.none,
            shouldFlipBoard: true,
            realFirstMove: true
        };
    }
    gameLogic.getInitialState = getInitialState;
    function createMove(stateBeforeMove, stateAfterMove, turnIndexBeforeMove, gameSettings) {
        if (!stateBeforeMove) {
            stateBeforeMove = getInitialState(gameSettings);
        }
        var nextState = modifyStateForNextRound(stateBeforeMove, stateAfterMove);
        nextState.realFirstMove = false;
        var endMatchScores;
        var turnIndexAfterMove;
        var pair = calculateScore(stateBeforeMove, stateAfterMove, turnIndexBeforeMove);
        var score = pair.fst;
        gameLogic.gameScoreGlobal = score;
        nextState.gameScore = angular.copy(score);
        var turnShouldSwitch = pair.snd;
        if (gameIsOver(nextState)) {
            endMatchScores = [score.player1, score.player2];
            turnIndexAfterMove = -1;
        }
        else {
            if (turnShouldSwitch) {
                turnIndexAfterMove = 1 - turnIndexBeforeMove;
                nextState.shouldFlipBoard = true;
            }
            else {
                turnIndexAfterMove = turnIndexBeforeMove;
                nextState.shouldFlipBoard = false;
            }
            endMatchScores = null;
        }
        return { endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: nextState };
    }
    gameLogic.createMove = createMove;
    // This function modifes the state in preperation for the next round
    function modifyStateForNextRound(previousState, currentState) {
        var newState = angular.copy(currentState);
        var pocketedCoinCount = getPocketedCoinCount(previousState, currentState);
        // Account for covering queen
        if (queenJustPocketed(previousState, currentState)) {
            newState.shouldCoverQueen = true;
            console.log("--------------------------------------------------------------------------------------------------------------QUEEN WAS JUST POCKETED");
        }
        // Modify state to account for covering the queen
        if (previousState.shouldCoverQueen) {
            newState.shouldCoverQueen = false;
            // if (previousState.queenCoverCheck === QueenCover.none) {
            //   newState.queenCoverCheck = QueenCover.firstCheck;
            // }
            // else if (previousState.queenCoverCheck === QueenCover.firstCheck) {
            //   newState.queenCoverCheck = QueenCover.secondCheck;
            // }
            // else if (previousState.queenCoverCheck === QueenCover.secondCheck) {
            //   newState.queenCoverCheck = QueenCover.none;
            //   newState.shouldCoverQueen = false;
            // }
            // No coins pocketed to cover the queen so we place the queen on the center of the board
            if (!coinsPocketed(pocketedCoinCount)) {
                console.log("-----------------------------------------------------------------------------------------------------------------------UEEN BEING PLACED BACK ON THE BOARD");
                // First we find the queen
                var queen = { coordinate: { xPos: 0.5, yPos: 0.5 },
                    color: "pink",
                    shouldRescale: true };
                newState.board.push(queen);
            }
        }
        return newState;
    }
    gameLogic.modifyStateForNextRound = modifyStateForNextRound;
    // GAME RULES
    // Check if game is over
    function gameIsOver(state) {
        return state.board.length === 0;
    }
    gameLogic.gameIsOver = gameIsOver;
    // Check if queen has been pocketed
    function queenPocketed(state) {
        var queenFound = false;
        for (var i = 0; i < state.board.length; i++) {
            if (state.board[i].color === "pink") {
                queenFound = true;
            }
        }
        return !queenFound;
    }
    gameLogic.queenPocketed = queenPocketed;
    // Check if queen was pocketed in the most recent move
    function queenJustPocketed(previousState, currentState) {
        return !queenPocketed(previousState) && queenPocketed(currentState);
    }
    gameLogic.queenJustPocketed = queenJustPocketed;
    // Calculate score given previous and current state. Also determine if turn should be switched
    function calculateScore(previousState, currentState, playerIndex) {
        var pocketedCoinCount = getPocketedCoinCount(previousState, currentState);
        var gameScore = angular.copy(currentState.gameScore);
        var turnShouldSwitch = true;
        // PLAYER 1
        if (playerIndex === 0) {
            if (previousState.shouldCoverQueen) {
                // Queen covered successfully
                if (coinsPocketed(pocketedCoinCount))
                    gameScore.player1 = gameScore.player1 + 5 * pocketedCoinCount.black + 10 * pocketedCoinCount.white;
                else
                    gameScore.player1 -= 25;
            }
            else
                gameScore.player1 = gameScore.player1 + 5 * pocketedCoinCount.black + 10 * pocketedCoinCount.white + (pocketedCoinCount.pink ? 25 : 0);
        }
        else if (playerIndex === 1) {
            if (previousState.shouldCoverQueen) {
                if (coinsPocketed(pocketedCoinCount))
                    gameScore.player2 = gameScore.player2 + 5 * pocketedCoinCount.black + 10 * pocketedCoinCount.white;
                else
                    gameScore.player2 -= 25;
            }
            else
                gameScore.player2 = gameScore.player2 + 5 * pocketedCoinCount.black + 10 * pocketedCoinCount.white + (pocketedCoinCount.pink ? 25 : 0);
        }
        // Check if turn should switch
        if (coinsPocketed(pocketedCoinCount)) {
            turnShouldSwitch = false;
        }
        var pair = new Pair(gameScore, turnShouldSwitch);
        return pair;
    }
    gameLogic.calculateScore = calculateScore;
    function coinsPocketed(pocketedCoinCount) {
        if (pocketedCoinCount.black > 0 || pocketedCoinCount.white > 0 || pocketedCoinCount.pink) {
            return true;
        }
        return false;
    }
    // Return all the coins that were pocketed in that turn
    function getPocketedCoinCount(previousState, currentState) {
        var previousStateColors = [];
        var currentStateColors = [];
        var blackCountPreviousState = 0;
        var blackCountCurrentState = 0;
        var whiteCountPreviousState = 0;
        var whiteCountCurrentState = 0;
        var queenExistsPreviousState = false;
        var queenExistsCurrentState = false;
        for (var i = 0; i < previousState.board.length; i++) {
            if (previousState.board[i].color === "black")
                blackCountPreviousState++;
            if (previousState.board[i].color === "white")
                whiteCountPreviousState++;
            if (previousState.board[i].color === "pink")
                queenExistsPreviousState = true;
        }
        for (var i = 0; i < currentState.board.length; i++) {
            if (currentState.board[i].color === "black")
                blackCountCurrentState++;
            if (currentState.board[i].color === "white")
                whiteCountCurrentState++;
            if (currentState.board[i].color === "pink")
                queenExistsCurrentState = true;
        }
        var blackDiff = blackCountPreviousState - blackCountCurrentState;
        var whiteDiff = whiteCountPreviousState - whiteCountCurrentState;
        var pinkLost = queenExistsPreviousState && !queenExistsCurrentState;
        return { black: blackDiff, white: whiteDiff, pink: pinkLost };
    }
    gameLogic.getPocketedCoinCount = getPocketedCoinCount;
})(gameLogic || (gameLogic = {}));
//# sourceMappingURL=gameLogic.js.map
;
Event;
;
var game;
(function (game) {
    function getTranslations() {
        return {
            "CARROM_RULES_TITLE": {
                "en": "Rules of Carrom",
                "zh": "卡罗姆规则",
                "hi": "कैरम के नियम"
            },
            "CARROM_RULES_SLIDE1": {
                "en": "You and your opponent take turns to flick the striker to get as many of the coins into the four corner pockets as possible.",
                "zh": "你和你的对手轮流轻弹前锋尽可能多的硬币就可以进入四个角落的口袋越好",
                "hi": "आप और अपने प्रतिद्वंद्वी ले स्ट्राइकर झटका करने के लिए संभव के रूप में चार कोने जेब में सिक्के के रूप में कई पाने के लिए बदल जाता है।"
            },
            "CARROM_RULES_SLIDE2": {
                "en": "A Black coin is worth 5 points, a White is worth 10 and the Queen (pink) is worth 25.",
                "zh": "黑色的硬币是值得5分，怀特是价值10和王后（粉红色）是值得25",
                "hi": "एक काले सिक्का 5 अंक के लायक है , एक व्हाइट 10 के लायक है और रानी (गुलाबी ), 25 के लायक है।"
            },
            "CARROM_RULES_SLIDE3": {
                "en": "If you hit a coin in, you get to repeat you turn. If you hit the Queen in you must get another coin in to cover the Queen otherwise it is returned to the board.",
                "zh": "如果你在打一个硬币，你要重复你打开。如果你打的女王，你必须得到另一个硬币支付，否则返回到主板上的女王。",
                "hi": "आप में एक सिक्का मारा, तो आप आप बारी दोहराने के लिए मिलता है। अगर आप रानी मारा आप रानी अन्यथा यह बोर्ड के लिए वापस आ रहा है को कवर करने के लिए एक और सिक्का मिलनी चाहिए में ।"
            },
            "CARROM_CLOSE": {
                "en": "Close",
                "zh": "继续游戏",
                "hi": "बंद करे"
            },
        };
    }
    (function (RotateDirection) {
        RotateDirection[RotateDirection["Left"] = 0] = "Left";
        RotateDirection[RotateDirection["Right"] = 1] = "Right";
    })(game.RotateDirection || (game.RotateDirection = {}));
    var RotateDirection = game.RotateDirection;
    // ALL INITIAL VARIABLES
    game.currentUpdateUI = null;
    game.didMakeMove = false;
    game.state = null;
    game.isHelpModalShown = false;
    game.currentMode = "None";
    game.settings = undefined;
    game.enableButtons = true;
    game.centerOfBoard = undefined;
    game.gameScore = { player1: 0, player2: 0 };
    game.playerInfo = undefined;
    // Engine initial variables
    game._objectsInMotion = 0;
    game.defaultCategory = 0x0001, game.removedCategory = 0x0002, game.movableCategory = 0x0003;
    function updateScene() {
        var c = $("canvas").get(0);
        var width = $(window).width();
        var height = $(window).height();
        var size = width <= height ? width : height;
        game._sceneWidth = size;
        game._sceneHeight = size;
        var boundsMax = game._engine.world.bounds.max, renderOptions = game._engine.render.options, canvas = game._engine.render.canvas;
        boundsMax.x = size;
        boundsMax.y = size;
        canvas.width = renderOptions.width = size;
        canvas.height = renderOptions.height = size;
    }
    game.updateScene = updateScene;
    ;
    // Takes in a board to draw and a flag specifying if the board should be drawn mirrored.
    // If undefined is passed in for the board, the initial state is drawn. If undefined is
    // passd in for "shouldMirrorBoard", then it defaults to false.
    function drawObjects(currentBoard, shouldMirrorBoard) {
        if (currentBoard == undefined) {
            game.state = gameLogic.getInitialState(game.settings);
            currentBoard = game.state.board;
        }
        if (shouldMirrorBoard == undefined) {
            shouldMirrorBoard = false;
        }
        var offset = 1;
        var width = game._sceneWidth;
        var height = game._sceneHeight;
        // Create borders and add them
        Matter.World.add(game._engine.world, [
            Matter.Bodies.rectangle(width / 2, -offset, width + 2 * offset, game.settings["borderThickness"] * 2, { isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black' } }),
            Matter.Bodies.rectangle(width / 2, height + offset, width + 2 * offset, game.settings["borderThickness"] * 2, { isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black' } }),
            Matter.Bodies.rectangle(width + offset, height / 2, game.settings["borderThickness"] * 2, height + 2 * offset, { isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black' } }),
            Matter.Bodies.rectangle(-offset, height / 2, game.settings["borderThickness"] * 2, height + 2 * offset, { isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black' } })
        ]);
        // Create coins
        var circles = [];
        for (var i = 0; i < currentBoard.length; i++) {
            var xCoord, yCoord;
            if (currentBoard[i].shouldRescale) {
                xCoord = currentBoard[i].coordinate.xPos * game.settings["outerBoardWidth"];
                yCoord = currentBoard[i].coordinate.yPos * game.settings["outerBoardHeight"];
            }
            else {
                xCoord = currentBoard[i].coordinate.xPos;
                yCoord = currentBoard[i].coordinate.yPos;
            }
            // Mirror the board
            if (shouldMirrorBoard) {
                xCoord = game.settings["outerBoardWidth"] - xCoord;
                yCoord = game.settings["outerBoardHeight"] - yCoord;
            }
            circles.push(Matter.Bodies.circle(xCoord, yCoord, game.settings["coinDiameter"] / 2.0, { isStatic: false, collisionFilter: { mask: game.defaultCategory }, restitution: 1, frictionAir: 0.02, render: { fillStyle: currentBoard[i].color, strokeStyle: 'black' }, label: 'Coin' }));
        }
        Matter.World.add(game._engine.world, circles); // add coins
        // Create pockets and add them
        Matter.World.add(game._engine.world, [
            Matter.Bodies.circle(game.settings["coinPocketTopLeftX"], game.settings["coinPocketTopLeftY"], game.settings["coinPocketDiameter"] / 2, { isStatic: true, restitution: 1, collisionFilter: { mask: game.defaultCategory }, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket' }),
            Matter.Bodies.circle(game.settings["coinPocketTopRightX"], game.settings["coinPocketTopRightY"], game.settings["coinPocketDiameter"] / 2, { isStatic: true, restitution: 1, collisionFilter: { mask: game.defaultCategory }, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket' }),
            Matter.Bodies.circle(game.settings["coinPocketBottomLeftX"], game.settings["coinPocketBottomRightY"], game.settings["coinPocketDiameter"] / 2, { isStatic: true, restitution: 1, collisionFilter: { mask: game.defaultCategory }, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket' }),
            Matter.Bodies.circle(game.settings["coinPocketBottomRightX"], game.settings["coinPocketBottomRightY"], game.settings["coinPocketDiameter"] / 2, { isStatic: true, restitution: 1, collisionFilter: { mask: game.defaultCategory }, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket' })
        ]);
        // Constrain striker horizontally
        var strikerX = (game.settings["bottomOuterStrikerPlacementLineStartX"] + game.settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
        var strikerY = game.settings["bottomOuterStrikerPlacementLineStartY"] - (game.settings["innerStrikerPlacementLineOffset"] / 2);
        // Add striker circle
        Matter.World.add(game._engine.world, Matter.Bodies.circle(strikerX, strikerY, game.settings["strikerDiameter"] / 2, { isStatic: false, restitution: 1, angle: (6.0 * Math.PI) / 4.0, collisionFilter: { category: game.defaultCategory }, render: { fillStyle: 'blue', strokeStyle: 'black' }, label: 'Striker' }));
    }
    game.drawObjects = drawObjects;
    // This gets called after every move
    function updateUI(params) {
        game.playerInfo = angular.copy(params.playersInfo);
        // update score
        game.gameScore = angular.copy(gameLogic.gameScoreGlobal);
        // Set center of board 
        if (game.centerOfBoard === undefined && game.settings !== undefined) {
            game.centerOfBoard = { xPos: game.settings["outerBoardWidth"] / 2, yPos: game.settings["outerBoardHeight"] / 2 };
        }
        // SET CURRENT MODE
        if (params.playMode === "passAndPlay") {
            game.currentMode = "PassAndPlay";
        }
        else if (params.playMode === "playAgainstTheComputer") {
            game.currentMode = "Practice";
        }
        else {
            game.currentMode = "Opponent";
        }
        game.didMakeMove = false;
        game.currentUpdateUI = params;
        game.state = params.move.stateAfterMove;
        $timeout(handleStateUpdate, 500);
    }
    game.updateUI = updateUI;
    game.firstTimePlayer1 = true;
    game.firstTimePlayer2 = true;
    function handleStateUpdate() {
        // Make sure to draw on both screens
        if (game.currentMode === "Opponent" && game.currentUpdateUI.yourPlayerIndex !== -2) {
            // Player one always goes first
            if (yourPlayerIndex() === 0 && game.firstTimePlayer1) {
                game.firstTimePlayer1 = false;
                updateInitialUI(undefined);
                console.log("first player turn first time");
            }
            else if (yourPlayerIndex() === 1 && game.firstTimePlayer2) {
                game.firstTimePlayer2 = false;
                if (game.state.realFirstMove) {
                    console.log("-----------------------real first move not set to false");
                    updateInitialUI(undefined);
                }
                else
                    updateInitialUI(game.state);
                console.log("second player turn first time");
            }
        }
        // Draw initially for both computer and pass and play
        if (isFirstMove() && isMyTurn()) {
            updateInitialUI(undefined);
            makeComputerMove();
        }
        // HANDLE REDRAWING FOR OTHER TWO MODES (opponent + passAndPlay)
        if (game.currentMode === "PassAndPlay" && game.currentUpdateUI.yourPlayerIndex !== -2) {
            setBoardState(game.state);
        }
        else if (game.currentMode === "Opponent" && game.currentUpdateUI.yourPlayerIndex !== -2) {
            // Only redraw and invert for current player
            if (isMyTurn()) {
                setBoardState(game.state);
            }
        }
    }
    function isFirstMove() {
        return !game.currentUpdateUI.move.stateAfterMove;
    }
    function yourPlayerIndex() {
        return game.currentUpdateUI.yourPlayerIndex;
    }
    function isComputer() {
        return game.currentUpdateUI.playersInfo[game.currentUpdateUI.yourPlayerIndex].playerId === '';
    }
    function isComputerTurn() {
        return isMyTurn() && isComputer();
    }
    function isHumanTurn() {
        return isMyTurn() && !isComputer();
    }
    function isMyTurn() {
        return !game.didMakeMove &&
            game.currentUpdateUI.move.turnIndexAfterMove >= 0 &&
            game.currentUpdateUI.yourPlayerIndex === game.currentUpdateUI.move.turnIndexAfterMove; // it's my turn
    }
    function init() {
        translate.setTranslations(getTranslations());
        translate.setLanguage('en');
        // resizeGameAreaService.setWidthToHeight(1);
        moveService.setGame({
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            checkMoveOk: gameLogic.checkMoveOk,
            updateUI: updateUI
        });
    }
    game.init = init;
    // This should be only called once
    function updateInitialUI(stateToDraw) {
        // create a Matter.js engine
        game._engine = Matter.Engine.create(document.getElementById("gameArea"), {
            render: {
                options: {
                    label: 'Engine',
                    showAngleIndicator: true,
                    gravity: {
                        x: 0,
                        y: 0
                    }
                }
            },
            timing: {
                timestamp: 0,
                timeScale: 1
            }
        });
        game._engine.world.gravity.y = 0;
        game._engine.world.gravity.x = 0;
        game._objectsInMotion = 0;
        // BE SURE TO COMMENT OUT
        var mouseConstraint = Matter.MouseConstraint.create(game._engine);
        mouseConstraint.collisionFilter.mask = game.removedCategory;
        Matter.World.add(game._engine.world, mouseConstraint);
        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            var mouseDownPostion = event.mouse.mousedownPosition;
            var mousePosition = event.mouse.position;
            var strikerPosition = getStriker().position;
            if (mousePosition.y < (strikerPosition.y + (1.5 * game.settings["strikerDiameter"]))) {
                var posX = mousePosition.x;
                if (posX < strikerPosition.x) {
                    // Moving Left
                    if (!isHumanTurn())
                        return;
                    var leftGuard = game.settings["bottomOuterStrikerPlacementLineStartX"];
                    if (posX > leftGuard)
                        Matter.Body.translate(getStriker(), { x: posX - strikerPosition.x, y: 0 });
                }
                else if (posX > strikerPosition.x) {
                    // Moving Right
                    if (!isHumanTurn())
                        return;
                    var rightGuard = game.settings["bottomOuterStrikerPlacementLineEndX"];
                    if (posX < rightGuard)
                        Matter.Body.translate(getStriker(), { x: posX - strikerPosition.x, y: 0 });
                }
            }
            else {
                // mouse drag below the striker.
                var posX = mousePosition.x;
                var horizontalDistance = strikerPosition.x - posX;
                var verticalDistance = strikerPosition.y - mousePosition.y;
                var angle = Math.atan2(verticalDistance, horizontalDistance);
                game._renderLength = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance);
                Matter.Body.setAngle(getStriker(), angle);
            }
        });
        Matter.Events.on(mouseConstraint, 'mouseup', function (event) {
            var mouseupPosition = event.mouse.mouseupPosition;
            var strikerPosition = getStriker().position;
            if (mouseupPosition.y > (strikerPosition.y + game.settings["strikerDiameter"])) {
                shootClick();
                game._renderLength = 0;
            }
        });
        updateScene();
        game.settings = gameLogic.drawBoard(game._sceneWidth, game._sceneHeight);
        if (stateToDraw === undefined)
            drawObjects(undefined, undefined);
        else
            drawObjects(stateToDraw.board, stateToDraw.shouldFlipBoard);
        // Background image
        var renderOptions = game._engine.render.options;
        renderOptions.background = 'imgs/carromBackground.png';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;
        renderOptions.showDebug = false;
        Matter.Engine.run(game._engine);
        game._globalSize = game._sceneWidth < game._sceneHeight ? game._sceneWidth : game._sceneHeight;
        Matter.Events.on(game._engine.render, 'afterRender', function () {
            var context = game._engine.render.context, bodies = Matter.Composite.allBodies(game._engine.world);
            var striker = getStriker();
            if (striker != undefined) {
                var startPoint = { x: striker.position.x, y: striker.position.y }, endPoint = {
                    x: striker.position.x + (game._renderLength) * Math.cos(striker.angle),
                    y: striker.position.y + (game._renderLength) * Math.sin(striker.angle)
                };
                var isWorldStatic = true;
                for (var bodyId in game._engine.world.bodies) {
                    if (game._engine.world.bodies[bodyId].motion != 0) {
                        isWorldStatic = false;
                    }
                }
                var strikerCenterX = (game.settings["bottomOuterStrikerPlacementLineStartX"] + game.settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
                var strikerCenterY = game.settings["bottomOuterStrikerPlacementLineStartY"] - (game.settings["innerStrikerPlacementLineOffset"] / 2);
                var strikerCenterComputerX = (game.settings["bottomOuterStrikerPlacementLineStartX"] + game.settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
                var strikerCenterComputerY = game.settings["outerBoardHeight"] - (game.settings["bottomOuterStrikerPlacementLineStartY"] - (game.settings["innerStrikerPlacementLineOffset"] / 2));
                /// Update check if striker is in reset position.
                var leftGuard = game.settings["bottomOuterStrikerPlacementLineStartX"];
                var rightGuard = game.settings["bottomOuterStrikerPlacementLineEndX"];
                if (isWorldStatic && isMyTurn())
                    drawGuideLines(context, startPoint, endPoint);
            }
        });
        function drawGuideLines(context, startPoint, endPoint) {
            context.globalAlpha = 0.5;
            context.beginPath();
            context.setLineDash([3]);
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(endPoint.x, endPoint.y);
            context.strokeStyle = 'red';
            context.lineWidth = 5.5;
            context.stroke();
            context.setLineDash([]);
        }
        Matter.Events.on(game._engine, 'collisionEnd', function (event) {
            handlePocketCollision(event);
        });
        function handlePocketCollision(event) {
            var pairs = event.pairs;
            // change object colours to show those starting a collision
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                if (pair.bodyA.label == "Pocket" && pair.bodyB.label == "Coin") {
                    pair.bodyB.collisionFilter.mask = game.removedCategory;
                    Matter.World.remove(game._engine.world, pair.bodyB);
                }
                else if (pair.bodyB.label == "Pocket" && pair.bodyA.label == "Coin") {
                    pair.bodyA.collisionFilter.mask = game.removedCategory;
                    Matter.World.remove(game._engine.world, pair.bodyA);
                }
            }
        }
        addSleepEventToEngineBodies();
    }
    game.updateInitialUI = updateInitialUI;
    function addSleepEventToEngineBodies() {
        for (var i = 0; i < game._engine.world.bodies.length; i++) {
            Matter.Events.on(game._engine.world.bodies[i], 'sleepStart', function (event) {
                var body = this;
                game._objectsInMotion += body.isSleeping ? 1 : 0;
                var isWorldStatic = true;
                for (var bodyId in game._engine.world.bodies) {
                    if (!game._engine.world.bodies[bodyId].isSleeping) {
                        isWorldStatic = false;
                    }
                }
                if (isWorldStatic) {
                    var currentState = getBoardState();
                    var nextMove = gameLogic.createMove(game.state, currentState, game.currentUpdateUI.move.turnIndexAfterMove, game.settings);
                    moveService.makeMove(nextMove);
                    game._engine.enableSleeping = false;
                    // Handle next turn for practice
                    $timeout(handlePracticeMode, 1000);
                }
            });
        }
    }
    game.addSleepEventToEngineBodies = addSleepEventToEngineBodies;
    // Handle next turn
    function handlePracticeMode() {
        // Practice
        if (game.currentMode === "Practice") {
            resetStrikerPosition();
            makeComputerMove();
        }
    }
    game.handlePracticeMode = handlePracticeMode;
    function getStriker() {
        for (var body in game._engine.world.bodies) {
            if (game._engine.world.bodies[body].label == "Striker") {
                return game._engine.world.bodies[body];
            }
        }
    }
    game.getStriker = getStriker;
    // Reset the position of the striker relative to the current player
    function resetStrikerPosition() {
        if (!isHumanTurn())
            return;
        var strikerCenterX = (game.settings["bottomOuterStrikerPlacementLineStartX"] + game.settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
        var strikerCenterY = game.settings["bottomOuterStrikerPlacementLineStartY"] - (game.settings["innerStrikerPlacementLineOffset"] / 2);
        var striker = getStriker();
        Matter.Body.setPosition(striker, { x: strikerCenterX, y: strikerCenterY });
        Matter.Body.setAngle(striker, (6.0 * Math.PI) / 4.0);
        for (var body in game._engine.world.bodies) {
            if (game._engine.world.bodies[body].label != "Pocket") {
                Matter.Sleeping.set(game._engine.world.bodies[body], false);
            }
        }
    }
    game.resetStrikerPosition = resetStrikerPosition;
    // Set striker position to top for computer
    function resetStrikerPositionForComputer() {
        if (!isComputerTurn())
            return;
        var strikerCenterX = (game.settings["bottomOuterStrikerPlacementLineStartX"] + game.settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
        var strikerCenterY = game.settings["outerBoardHeight"] - (game.settings["bottomOuterStrikerPlacementLineStartY"] - (game.settings["innerStrikerPlacementLineOffset"] / 2));
        var striker = getStriker();
        Matter.Body.setPosition(striker, { x: strikerCenterX, y: strikerCenterY });
        Matter.Body.setAngle(striker, 0.5 * Math.PI);
        for (var body in game._engine.world.bodies) {
            if (game._engine.world.bodies[body].label != "Pocket") {
                Matter.Sleeping.set(game._engine.world.bodies[body], false);
            }
        }
    }
    game.resetStrikerPositionForComputer = resetStrikerPositionForComputer;
    var translationFactor = 15;
    // Move the striker left
    function leftClick() {
        if (!isHumanTurn())
            return;
        var posX = getStriker().position.x;
        var leftGuard = game.settings["bottomOuterStrikerPlacementLineStartX"];
        if ((posX - translationFactor) > leftGuard)
            Matter.Body.translate(getStriker(), { x: -translationFactor, y: 0 });
        else {
            var newTranslationFactor = posX - leftGuard;
            Matter.Body.translate(getStriker(), { x: -newTranslationFactor, y: 0 });
        }
    }
    game.leftClick = leftClick;
    // Move the striker right
    function rightClick() {
        if (!isHumanTurn())
            return;
        var posX = getStriker().position.x;
        var rightGuard = game.settings["bottomOuterStrikerPlacementLineEndX"];
        if (posX + translationFactor < rightGuard)
            Matter.Body.translate(getStriker(), { x: translationFactor, y: 0 });
        else {
            var newTranslationFactor = Math.abs(rightGuard - posX);
            Matter.Body.translate(getStriker(), { x: newTranslationFactor, y: 0 });
        }
    }
    game.rightClick = rightClick;
    // Rotate the striker left
    function leftRotate() {
        if (!isHumanTurn())
            return;
        rotate(RotateDirection.Left);
    }
    game.leftRotate = leftRotate;
    // Rotate the striker right
    function rightRotate() {
        if (!isHumanTurn())
            return;
        rotate(RotateDirection.Right);
    }
    game.rightRotate = rightRotate;
    // Generic rotate function
    function rotate(direction) {
        var striker = getStriker();
        var deltaAngle = (direction == RotateDirection.Left) ? -0.1 : 0.1;
        var newAngle = (striker.angle + deltaAngle) % (2 * Math.PI);
        var diff = 0.0;
        if (newAngle < striker.angle) {
            diff = newAngle;
            Matter.Body.setAngle(striker, diff);
        }
        else {
            diff = Math.abs(newAngle - striker.angle);
            Matter.Body.rotate(striker, diff);
        }
    }
    game.rotate = rotate;
    // Create the current state of the board
    function getBoardState() {
        var allCoins = [];
        for (var i = 0; i < game._engine.world.bodies.length; i++) {
            var currentCoin = game._engine.world.bodies[i];
            if (currentCoin.label == "Coin") {
                var newCoin = { coordinate: { xPos: currentCoin.position.x / game.settings["outerBoardWidth"], yPos: currentCoin.position.y / game.settings["outerBoardHeight"] }, color: currentCoin.render.fillStyle, shouldRescale: true };
                allCoins.push(newCoin);
            }
        }
        var returnedState = { board: allCoins, playerIndex: angular.copy(game.state.playerIndex), gameScore: angular.copy(game.state.gameScore), shouldCoverQueen: game.state.shouldCoverQueen, shouldFlipBoard: game.state.shouldFlipBoard, realFirstMove: game.state.realFirstMove };
        return returnedState;
    }
    game.getBoardState = getBoardState;
    // Redraw the board with the new state
    function setBoardState(state) {
        Matter.World.clear(game._engine.world, false);
        var newBoard = state.board;
        if (state.shouldFlipBoard)
            drawObjects(newBoard, true);
        else
            drawObjects(newBoard, false);
        addSleepEventToEngineBodies();
    }
    game.setBoardState = setBoardState;
    // Shoot the striker
    function shootClick() {
        if (!isHumanTurn())
            return;
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (game.didMakeMove)
            return;
        game.didMakeMove = true;
        var striker = getStriker();
        var position = {
            x: striker.position.x + 1.0 * Math.cos(striker.angle),
            y: striker.position.y + 1.0 * Math.sin(striker.angle)
        };
        // console.log(_renderLength);
        var force = game._renderLength / game._globalSize * 0.1;
        Matter.Body.applyForce(striker, { x: position.x, y: position.y }, {
            x: force * striker.mass * Math.cos(striker.angle),
            y: force * striker.mass * Math.sin(striker.angle)
        });
        game._engine.enableSleeping = true;
    }
    game.shootClick = shootClick;
    // Simulate computer move 
    function makeComputerMove() {
        if (!isComputerTurn())
            return;
        resetStrikerPositionForComputer();
        $timeout(makeComputerMoveHelper, 1000);
    }
    game.makeComputerMove = makeComputerMove;
    function makeComputerMoveHelper() {
        var move = aiService.randomMove();
        // Do translation move
        for (var i = 0; i < move.translationCount; i++) {
            if (move.translationDirection == Direction.Left)
                leftClick();
            else
                rightClick();
        }
        // Do angle turn
        for (var i = 0; i < move.angleTurnCount; i++) {
            if (move.angleDirection == Direction.Left)
                rotate(RotateDirection.Left);
            else
                rotate(RotateDirection.Right);
        }
        // Same as shoot click, but without human limitation
        if (game.didMakeMove)
            return;
        game.didMakeMove = true;
        var striker = getStriker();
        var position = {
            x: striker.position.x + 1.0 * Math.cos(striker.angle),
            y: striker.position.y + 1.0 * Math.sin(striker.angle)
        };
        var force = 0.05;
        Matter.Body.applyForce(striker, { x: position.x, y: position.y }, {
            x: (game._globalSize / document.documentElement.clientWidth) * force * striker.mass * Math.cos(striker.angle),
            y: (game._globalSize / document.documentElement.clientHeight) * force * striker.mass * Math.sin(striker.angle)
        });
        game._engine.enableSleeping = true;
    }
    game.makeComputerMoveHelper = makeComputerMoveHelper;
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    game.init();
});
//# sourceMappingURL=game.js.map
;
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
})(Direction || (Direction = {}));
var aiService;
(function (aiService) {
    function randomMove() {
        // Calculate translation count
        var tc = Math.floor(Math.random() * 10);
        // Calculate translation direction
        var td;
        if (Math.random() < 0.5)
            td = Direction.Left;
        else
            td = Direction.Right;
        // Calculate angle turn count
        var atc = Math.floor(Math.random() * 15);
        // Calculate angle direction
        var ad;
        if (Math.random() < 0.5)
            ad = Direction.Left;
        else
            ad = Direction.Right;
        return {
            translationCount: tc,
            translationDirection: td,
            angleTurnCount: atc,
            angleDirection: ad
        };
    }
    aiService.randomMove = randomMove;
})(aiService || (aiService = {}));
//# sourceMappingURL=aiService.js.map
;
/**
* matter-js 0.9.1 by @liabru 2016-02-15
* http://brm.io/matter-js/
* License MIT
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Matter=e()}}(function(){return function e(t,o,n){function i(s,a){if(!o[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=o[s]={exports:{}};t[s][0].call(d.exports,function(e){var o=t[s][1][e];return i(o?o:e)},d,d.exports,e,t,o,n)}return o[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Sleeping"),a=(e("../render/Render"),e("../core/Common")),l=e("../geometry/Bounds"),c=e("../geometry/Axes");!function(){n._inertiaScale=4,n._nextCollidingGroupId=1,
n._nextNonCollidingGroupId=-1,n._nextCategory=1,n.create=function(t){var o={id:a.nextId(),type:"body",label:"Body",parts:[],angle:0,vertices:i.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0},lineWidth:1.5}},n=a.extend(o,t);return e(n,t),n},n.nextGroup=function(e){return e?n._nextNonCollidingGroupId--:n._nextCollidingGroupId++},n.nextCategory=function(){return n._nextCategory=n._nextCategory<<1,n._nextCategory};var e=function(e,t){n.set(e,{bounds:e.bounds||l.create(e.vertices),positionPrev:e.positionPrev||r.clone(e.position),anglePrev:e.anglePrev||e.angle,
vertices:e.vertices,parts:e.parts||[e],isStatic:e.isStatic,isSleeping:e.isSleeping,parent:e.parent||e}),i.rotate(e.vertices,e.angle,e.position),c.rotate(e.axes,e.angle),l.update(e.bounds,e.vertices,e.velocity),n.set(e,{axes:t.axes||e.axes,area:t.area||e.area,mass:t.mass||e.mass,inertia:t.inertia||e.inertia});var o=e.isStatic?"#eeeeee":a.choose(["#556270","#4ECDC4","#C7F464","#FF6B6B","#C44D58"]),s=a.shadeColor(o,-20);e.render.fillStyle=e.render.fillStyle||o,e.render.strokeStyle=e.render.strokeStyle||s,e.render.sprite.xOffset+=-(e.bounds.min.x-e.position.x)/(e.bounds.max.x-e.bounds.min.x),e.render.sprite.yOffset+=-(e.bounds.min.y-e.position.y)/(e.bounds.max.y-e.bounds.min.y)};n.set=function(e,t,o){var i;"string"==typeof t&&(i=t,t={},t[i]=o);for(i in t)if(o=t[i],t.hasOwnProperty(i))switch(i){case"isStatic":n.setStatic(e,o);break;case"isSleeping":s.set(e,o);break;case"mass":n.setMass(e,o);break;case"density":n.setDensity(e,o);break;case"inertia":n.setInertia(e,o);break;case"vertices":n.setVertices(e,o);
break;case"position":n.setPosition(e,o);break;case"angle":n.setAngle(e,o);break;case"velocity":n.setVelocity(e,o);break;case"angularVelocity":n.setAngularVelocity(e,o);break;case"parts":n.setParts(e,o);break;default:e[i]=o}},n.setStatic=function(e,t){for(var o=0;o<e.parts.length;o++){var n=e.parts[o];n.isStatic=t,t&&(n.restitution=0,n.friction=1,n.mass=n.inertia=n.density=1/0,n.inverseMass=n.inverseInertia=0,n.positionPrev.x=n.position.x,n.positionPrev.y=n.position.y,n.anglePrev=n.angle,n.angularVelocity=0,n.speed=0,n.angularSpeed=0,n.motion=0)}},n.setMass=function(e,t){e.mass=t,e.inverseMass=1/e.mass,e.density=e.mass/e.area},n.setDensity=function(e,t){n.setMass(e,t*e.area),e.density=t},n.setInertia=function(e,t){e.inertia=t,e.inverseInertia=1/e.inertia},n.setVertices=function(e,t){t[0].body===e?e.vertices=t:e.vertices=i.create(t,e),e.axes=c.fromVertices(e.vertices),e.area=i.area(e.vertices),n.setMass(e,e.density*e.area);var o=i.centre(e.vertices);i.translate(e.vertices,o,-1),n.setInertia(e,n._inertiaScale*i.inertia(e.vertices,e.mass)),
i.translate(e.vertices,e.position),l.update(e.bounds,e.vertices,e.velocity)},n.setParts=function(e,o,r){var s;for(o=o.slice(0),e.parts.length=0,e.parts.push(e),e.parent=e,s=0;s<o.length;s++){var a=o[s];a!==e&&(a.parent=e,e.parts.push(a))}if(1!==e.parts.length){if(r="undefined"!=typeof r?r:!0){var l=[];for(s=0;s<o.length;s++)l=l.concat(o[s].vertices);i.clockwiseSort(l);var c=i.hull(l),d=i.centre(c);n.setVertices(e,c),i.translate(e.vertices,d)}var u=t(e);e.area=u.area,e.parent=e,e.position.x=u.centre.x,e.position.y=u.centre.y,e.positionPrev.x=u.centre.x,e.positionPrev.y=u.centre.y,n.setMass(e,u.mass),n.setInertia(e,u.inertia),n.setPosition(e,u.centre)}},n.setPosition=function(e,t){var o=r.sub(t,e.position);e.positionPrev.x+=o.x,e.positionPrev.y+=o.y;for(var n=0;n<e.parts.length;n++){var s=e.parts[n];s.position.x+=o.x,s.position.y+=o.y,i.translate(s.vertices,o),l.update(s.bounds,s.vertices,e.velocity)}},n.setAngle=function(e,t){var o=t-e.angle;e.anglePrev+=o;for(var n=0;n<e.parts.length;n++){
var s=e.parts[n];s.angle+=o,i.rotate(s.vertices,o,e.position),c.rotate(s.axes,o),l.update(s.bounds,s.vertices,e.velocity),n>0&&r.rotateAbout(s.position,o,e.position,s.position)}},n.setVelocity=function(e,t){e.positionPrev.x=e.position.x-t.x,e.positionPrev.y=e.position.y-t.y,e.velocity.x=t.x,e.velocity.y=t.y,e.speed=r.magnitude(e.velocity)},n.setAngularVelocity=function(e,t){e.anglePrev=e.angle-t,e.angularVelocity=t,e.angularSpeed=Math.abs(e.angularVelocity)},n.translate=function(e,t){n.setPosition(e,r.add(e.position,t))},n.rotate=function(e,t){n.setAngle(e,e.angle+t)},n.scale=function(e,o,r,s){for(var a=0;a<e.parts.length;a++){var d=e.parts[a];i.scale(d.vertices,o,r,e.position),d.axes=c.fromVertices(d.vertices),e.isStatic||(d.area=i.area(d.vertices),n.setMass(d,e.density*d.area),i.translate(d.vertices,{x:-d.position.x,y:-d.position.y}),n.setInertia(d,i.inertia(d.vertices,d.mass)),i.translate(d.vertices,{x:d.position.x,y:d.position.y})),l.update(d.bounds,d.vertices,e.velocity)}if(!e.isStatic){
var u=t(e);e.area=u.area,n.setMass(e,u.mass),n.setInertia(e,u.inertia)}},n.update=function(e,t,o,n){var s=Math.pow(t*o*e.timeScale,2),a=1-e.frictionAir*o*e.timeScale,d=e.position.x-e.positionPrev.x,u=e.position.y-e.positionPrev.y;e.velocity.x=d*a*n+e.force.x/e.mass*s,e.velocity.y=u*a*n+e.force.y/e.mass*s,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.position.x+=e.velocity.x,e.position.y+=e.velocity.y,e.angularVelocity=(e.angle-e.anglePrev)*a*n+e.torque/e.inertia*s,e.anglePrev=e.angle,e.angle+=e.angularVelocity,e.speed=r.magnitude(e.velocity),e.angularSpeed=Math.abs(e.angularVelocity);for(var p=0;p<e.parts.length;p++){var v=e.parts[p];i.translate(v.vertices,e.velocity),p>0&&(v.position.x+=e.velocity.x,v.position.y+=e.velocity.y),0!==e.angularVelocity&&(i.rotate(v.vertices,e.angularVelocity,e.position),c.rotate(v.axes,e.angularVelocity),p>0&&r.rotateAbout(v.position,e.angularVelocity,e.position,v.position)),l.update(v.bounds,v.vertices,e.velocity)}},n.applyForce=function(e,t,o){
e.force.x+=o.x,e.force.y+=o.y;var n={x:t.x-e.position.x,y:t.y-e.position.y};e.torque+=n.x*o.y-n.y*o.x};var t=function(e){for(var t={mass:0,area:0,inertia:0,centre:{x:0,y:0}},o=1===e.parts.length?0:1;o<e.parts.length;o++){var n=e.parts[o];t.mass+=n.mass,t.area+=n.area,t.inertia+=n.inertia,t.centre=r.add(t.centre,r.mult(n.position,n.mass!==1/0?n.mass:1))}return t.centre=r.div(t.centre,t.mass!==1/0?t.mass:e.parts.length),t}}()},{"../core/Common":14,"../core/Sleeping":20,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27,"../render/Render":29}],2:[function(e,t,o){var n={};t.exports=n;var i=e("../core/Events"),r=e("../core/Common"),s=e("./Body");!function(){n.create=function(e){return r.extend({id:r.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite"},e)},n.setModified=function(e,t,o,i){if(e.isModified=t,o&&e.parent&&n.setModified(e.parent,t,o,i),i)for(var r=0;r<e.composites.length;r++){var s=e.composites[r];
n.setModified(s,t,o,i)}},n.add=function(e,t){var o=[].concat(t);i.trigger(e,"beforeAdd",{object:t});for(var s=0;s<o.length;s++){var a=o[s];switch(a.type){case"body":if(a.parent!==a){r.log("Composite.add: skipped adding a compound body part (you must add its parent instead)","warn");break}n.addBody(e,a);break;case"constraint":n.addConstraint(e,a);break;case"composite":n.addComposite(e,a);break;case"mouseConstraint":n.addConstraint(e,a.constraint)}}return i.trigger(e,"afterAdd",{object:t}),e},n.remove=function(e,t,o){var r=[].concat(t);i.trigger(e,"beforeRemove",{object:t});for(var s=0;s<r.length;s++){var a=r[s];switch(a.type){case"body":n.removeBody(e,a,o);break;case"constraint":n.removeConstraint(e,a,o);break;case"composite":n.removeComposite(e,a,o);break;case"mouseConstraint":n.removeConstraint(e,a.constraint)}}return i.trigger(e,"afterRemove",{object:t}),e},n.addComposite=function(e,t){return e.composites.push(t),t.parent=e,n.setModified(e,!0,!0,!1),e},n.removeComposite=function(e,t,o){
var i=r.indexOf(e.composites,t);if(-1!==i&&(n.removeCompositeAt(e,i),n.setModified(e,!0,!0,!1)),o)for(var s=0;s<e.composites.length;s++)n.removeComposite(e.composites[s],t,!0);return e},n.removeCompositeAt=function(e,t){return e.composites.splice(t,1),n.setModified(e,!0,!0,!1),e},n.addBody=function(e,t){return e.bodies.push(t),n.setModified(e,!0,!0,!1),e},n.removeBody=function(e,t,o){var i=r.indexOf(e.bodies,t);if(-1!==i&&(n.removeBodyAt(e,i),n.setModified(e,!0,!0,!1)),o)for(var s=0;s<e.composites.length;s++)n.removeBody(e.composites[s],t,!0);return e},n.removeBodyAt=function(e,t){return e.bodies.splice(t,1),n.setModified(e,!0,!0,!1),e},n.addConstraint=function(e,t){return e.constraints.push(t),n.setModified(e,!0,!0,!1),e},n.removeConstraint=function(e,t,o){var i=r.indexOf(e.constraints,t);if(-1!==i&&n.removeConstraintAt(e,i),o)for(var s=0;s<e.composites.length;s++)n.removeConstraint(e.composites[s],t,!0);return e},n.removeConstraintAt=function(e,t){return e.constraints.splice(t,1),n.setModified(e,!0,!0,!1),
e},n.clear=function(e,t,o){if(o)for(var i=0;i<e.composites.length;i++)n.clear(e.composites[i],t,!0);return t?e.bodies=e.bodies.filter(function(e){return e.isStatic}):e.bodies.length=0,e.constraints.length=0,e.composites.length=0,n.setModified(e,!0,!0,!1),e},n.allBodies=function(e){for(var t=[].concat(e.bodies),o=0;o<e.composites.length;o++)t=t.concat(n.allBodies(e.composites[o]));return t},n.allConstraints=function(e){for(var t=[].concat(e.constraints),o=0;o<e.composites.length;o++)t=t.concat(n.allConstraints(e.composites[o]));return t},n.allComposites=function(e){for(var t=[].concat(e.composites),o=0;o<e.composites.length;o++)t=t.concat(n.allComposites(e.composites[o]));return t},n.get=function(e,t,o){var i,r;switch(o){case"body":i=n.allBodies(e);break;case"constraint":i=n.allConstraints(e);break;case"composite":i=n.allComposites(e).concat(e)}return i?(r=i.filter(function(e){return e.id.toString()===t.toString()}),0===r.length?null:r[0]):null},n.move=function(e,t,o){return n.remove(e,t),
n.add(o,t),e},n.rebase=function(e){for(var t=n.allBodies(e).concat(n.allConstraints(e)).concat(n.allComposites(e)),o=0;o<t.length;o++)t[o].id=r.nextId();return n.setModified(e,!0,!0,!1),e},n.translate=function(e,t,o){for(var i=o?n.allBodies(e):e.bodies,r=0;r<i.length;r++)s.translate(i[r],t);return n.setModified(e,!0,!0,!1),e},n.rotate=function(e,t,o,i){for(var r=Math.cos(t),a=Math.sin(t),l=i?n.allBodies(e):e.bodies,c=0;c<l.length;c++){var d=l[c],u=d.position.x-o.x,p=d.position.y-o.y;s.setPosition(d,{x:o.x+(u*r-p*a),y:o.y+(u*a+p*r)}),s.rotate(d,t)}return n.setModified(e,!0,!0,!1),e},n.scale=function(e,t,o,i,r){for(var a=r?n.allBodies(e):e.bodies,l=0;l<a.length;l++){var c=a[l],d=c.position.x-i.x,u=c.position.y-i.y;s.setPosition(c,{x:i.x+d*t,y:i.y+u*o}),s.scale(c,t,o)}return n.setModified(e,!0,!0,!1),e}}()},{"../core/Common":14,"../core/Events":16,"./Body":1}],3:[function(e,t,o){var n={};t.exports=n;var i=e("./Composite"),r=(e("../constraint/Constraint"),e("../core/Common"));!function(){n.create=function(e){
var t=i.create(),o={label:"World",gravity:{x:0,y:1,scale:.001},bounds:{min:{x:-(1/0),y:-(1/0)},max:{x:1/0,y:1/0}}};return r.extend(t,o,e)}}()},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(e,t,o){var n={};t.exports=n,function(){n.create=function(e){return{id:n.id(e),vertex:e,normalImpulse:0,tangentImpulse:0}},n.id=function(e){return e.body.id+"_"+e.index}}()},{}],5:[function(e,t,o){var n={};t.exports=n;var i=e("./SAT"),r=e("./Pair"),s=e("../geometry/Bounds");!function(){n.collisions=function(e,t){for(var o=[],a=t.pairs.table,l=0;l<e.length;l++){var c=e[l][0],d=e[l][1];if((!c.isStatic&&!c.isSleeping||!d.isStatic&&!d.isSleeping)&&n.canCollide(c.collisionFilter,d.collisionFilter)&&s.overlaps(c.bounds,d.bounds))for(var u=c.parts.length>1?1:0;u<c.parts.length;u++)for(var p=c.parts[u],v=d.parts.length>1?1:0;v<d.parts.length;v++){var f=d.parts[v];if(p===c&&f===d||s.overlaps(p.bounds,f.bounds)){var y,m=r.id(p,f),g=a[m];y=g&&g.isActive?g.collision:null;var x=i.collides(p,f,y);
x.collided&&o.push(x)}}}return o},n.canCollide=function(e,t){return e.group===t.group&&0!==e.group?e.group>0:0!==(e.mask&t.category)&&0!==(t.mask&e.category)}}()},{"../geometry/Bounds":24,"./Pair":7,"./SAT":11}],6:[function(e,t,o){var n={};t.exports=n;var i=e("./Pair"),r=e("./Detector"),s=e("../core/Common");!function(){n.create=function(e){var t={controller:n,detector:r.collisions,buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return s.extend(t,e)},n.update=function(o,n,i,r){var s,p,v,f,y,m=i.world,g=o.buckets,x=!1;for(s=0;s<n.length;s++){var h=n[s];if((!h.isSleeping||r)&&!(h.bounds.max.x<0||h.bounds.min.x>m.bounds.width||h.bounds.max.y<0||h.bounds.min.y>m.bounds.height)){var b=t(o,h);if(!h.region||b.id!==h.region.id||r){(!h.region||r)&&(h.region=b);var S=e(b,h.region);for(p=S.startCol;p<=S.endCol;p++)for(v=S.startRow;v<=S.endRow;v++){y=a(p,v),f=g[y];var C=p>=b.startCol&&p<=b.endCol&&v>=b.startRow&&v<=b.endRow,w=p>=h.region.startCol&&p<=h.region.endCol&&v>=h.region.startRow&&v<=h.region.endRow;
!C&&w&&w&&f&&d(o,f,h),(h.region===b||C&&!w||r)&&(f||(f=l(g,y)),c(o,f,h))}h.region=b,x=!0}}}x&&(o.pairsList=u(o))},n.clear=function(e){e.buckets={},e.pairs={},e.pairsList=[]};var e=function(e,t){var n=Math.min(e.startCol,t.startCol),i=Math.max(e.endCol,t.endCol),r=Math.min(e.startRow,t.startRow),s=Math.max(e.endRow,t.endRow);return o(n,i,r,s)},t=function(e,t){var n=t.bounds,i=Math.floor(n.min.x/e.bucketWidth),r=Math.floor(n.max.x/e.bucketWidth),s=Math.floor(n.min.y/e.bucketHeight),a=Math.floor(n.max.y/e.bucketHeight);return o(i,r,s,a)},o=function(e,t,o,n){return{id:e+","+t+","+o+","+n,startCol:e,endCol:t,startRow:o,endRow:n}},a=function(e,t){return e+","+t},l=function(e,t){var o=e[t]=[];return o},c=function(e,t,o){for(var n=0;n<t.length;n++){var r=t[n];if(!(o.id===r.id||o.isStatic&&r.isStatic)){var s=i.id(o,r),a=e.pairs[s];a?a[2]+=1:e.pairs[s]=[o,r,1]}}t.push(o)},d=function(e,t,o){t.splice(s.indexOf(t,o),1);for(var n=0;n<t.length;n++){var r=t[n],a=i.id(o,r),l=e.pairs[a];l&&(l[2]-=1)}},u=function(e){
var t,o,n=[];t=s.keys(e.pairs);for(var i=0;i<t.length;i++)o=e.pairs[t[i]],o[2]>0?n.push(o):delete e.pairs[t[i]];return n}}()},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(e,t,o){var n={};t.exports=n;var i=e("./Contact");!function(){n.create=function(e,t){var o=e.bodyA,i=e.bodyB,r=e.parentA,s=e.parentB,a={id:n.id(o,i),bodyA:o,bodyB:i,contacts:{},activeContacts:[],separation:0,isActive:!0,timeCreated:t,timeUpdated:t,inverseMass:r.inverseMass+s.inverseMass,friction:Math.min(r.friction,s.friction),frictionStatic:Math.max(r.frictionStatic,s.frictionStatic),restitution:Math.max(r.restitution,s.restitution),slop:Math.max(r.slop,s.slop)};return n.update(a,e,t),a},n.update=function(e,t,o){var r=e.contacts,s=t.supports,a=e.activeContacts,l=t.parentA,c=t.parentB;if(e.collision=t,e.inverseMass=l.inverseMass+c.inverseMass,e.friction=Math.min(l.friction,c.friction),e.frictionStatic=Math.max(l.frictionStatic,c.frictionStatic),e.restitution=Math.max(l.restitution,c.restitution),e.slop=Math.max(l.slop,c.slop),
a.length=0,t.collided){for(var d=0;d<s.length;d++){var u=s[d],p=i.id(u),v=r[p];v?a.push(v):a.push(r[p]=i.create(u))}e.separation=t.depth,n.setActive(e,!0,o)}else e.isActive===!0&&n.setActive(e,!1,o)},n.setActive=function(e,t,o){t?(e.isActive=!0,e.timeUpdated=o):(e.isActive=!1,e.activeContacts.length=0)},n.id=function(e,t){return e.id<t.id?e.id+"_"+t.id:t.id+"_"+e.id}}()},{"./Contact":4}],8:[function(e,t,o){var n={};t.exports=n;var i=e("./Pair"),r=e("../core/Common");!function(){var e=1e3;n.create=function(e){return r.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},e)},n.update=function(e,t,o){var n,s,a,l,c=e.list,d=e.table,u=e.collisionStart,p=e.collisionEnd,v=e.collisionActive,f=[];for(u.length=0,p.length=0,v.length=0,l=0;l<t.length;l++)n=t[l],n.collided&&(s=i.id(n.bodyA,n.bodyB),f.push(s),a=d[s],a?(a.isActive?v.push(a):u.push(a),i.update(a,n,o)):(a=i.create(n,o),d[s]=a,u.push(a),c.push(a)));for(l=0;l<c.length;l++)a=c[l],a.isActive&&-1===r.indexOf(f,a.id)&&(i.setActive(a,!1,o),
p.push(a))},n.removeOld=function(t,o){var n,i,r,s,a=t.list,l=t.table,c=[];for(s=0;s<a.length;s++)n=a[s],i=n.collision,i.bodyA.isSleeping||i.bodyB.isSleeping?n.timeUpdated=o:o-n.timeUpdated>e&&c.push(s);for(s=0;s<c.length;s++)r=c[s]-s,n=a[r],delete l[n.id],a.splice(r,1)},n.clear=function(e){return e.table={},e.list.length=0,e.collisionStart.length=0,e.collisionActive.length=0,e.collisionEnd.length=0,e}}()},{"../core/Common":14,"./Pair":7}],9:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vector"),r=e("./SAT"),s=e("../geometry/Bounds"),a=e("../factory/Bodies"),l=e("../geometry/Vertices");!function(){n.ray=function(e,t,o,n){n=n||1e-100;for(var l=i.angle(t,o),c=i.magnitude(i.sub(t,o)),d=.5*(o.x+t.x),u=.5*(o.y+t.y),p=a.rectangle(d,u,c,n,{angle:l}),v=[],f=0;f<e.length;f++){var y=e[f];if(s.overlaps(y.bounds,p.bounds))for(var m=1===y.parts.length?0:1;m<y.parts.length;m++){var g=y.parts[m];if(s.overlaps(g.bounds,p.bounds)){var x=r.collides(g,p);if(x.collided){x.body=x.bodyA=x.bodyB=y,
v.push(x);break}}}}return v},n.region=function(e,t,o){for(var n=[],i=0;i<e.length;i++){var r=e[i],a=s.overlaps(r.bounds,t);(a&&!o||!a&&o)&&n.push(r)}return n},n.point=function(e,t){for(var o=[],n=0;n<e.length;n++){var i=e[n];if(s.contains(i.bounds,t))for(var r=1===i.parts.length?0:1;r<i.parts.length;r++){var a=i.parts[r];if(s.contains(a.bounds,t)&&l.contains(a.vertices,t)){o.push(i);break}}}return o}}()},{"../factory/Bodies":21,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27,"./SAT":11}],10:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Common"),a=e("../geometry/Bounds");!function(){n._restingThresh=4,n._restingThreshTangent=6,n._positionDampen=.9,n._positionWarming=.8,n._frictionNormalMultiplier=5,n.preSolvePosition=function(e){var t,o,n;for(t=0;t<e.length;t++)o=e[t],o.isActive&&(n=o.activeContacts.length,o.collision.parentA.totalContacts+=n,o.collision.parentB.totalContacts+=n)},n.solvePosition=function(e,t){
var o,i,s,a,l,c,d,u,p,v=r._temp[0],f=r._temp[1],y=r._temp[2],m=r._temp[3];for(o=0;o<e.length;o++)i=e[o],i.isActive&&(s=i.collision,a=s.parentA,l=s.parentB,c=s.normal,d=r.sub(r.add(l.positionImpulse,l.position,v),r.add(a.positionImpulse,r.sub(l.position,s.penetration,f),y),m),i.separation=r.dot(c,d));for(o=0;o<e.length;o++)i=e[o],!i.isActive||i.separation<0||(s=i.collision,a=s.parentA,l=s.parentB,c=s.normal,p=(i.separation-i.slop)*t,(a.isStatic||l.isStatic)&&(p*=2),a.isStatic||a.isSleeping||(u=n._positionDampen/a.totalContacts,a.positionImpulse.x+=c.x*p*u,a.positionImpulse.y+=c.y*p*u),l.isStatic||l.isSleeping||(u=n._positionDampen/l.totalContacts,l.positionImpulse.x-=c.x*p*u,l.positionImpulse.y-=c.y*p*u))},n.postSolvePosition=function(e){for(var t=0;t<e.length;t++){var o=e[t];if(o.totalContacts=0,0!==o.positionImpulse.x||0!==o.positionImpulse.y){for(var s=0;s<o.parts.length;s++){var l=o.parts[s];i.translate(l.vertices,o.positionImpulse),a.update(l.bounds,l.vertices,o.velocity),l.position.x+=o.positionImpulse.x,
l.position.y+=o.positionImpulse.y}o.positionPrev.x+=o.positionImpulse.x,o.positionPrev.y+=o.positionImpulse.y,r.dot(o.positionImpulse,o.velocity)<0?(o.positionImpulse.x=0,o.positionImpulse.y=0):(o.positionImpulse.x*=n._positionWarming,o.positionImpulse.y*=n._positionWarming)}}},n.preSolveVelocity=function(e){var t,o,n,i,s,a,l,c,d,u,p,v,f,y,m=r._temp[0],g=r._temp[1];for(t=0;t<e.length;t++)if(n=e[t],n.isActive)for(i=n.activeContacts,s=n.collision,a=s.parentA,l=s.parentB,c=s.normal,d=s.tangent,o=0;o<i.length;o++)u=i[o],p=u.vertex,v=u.normalImpulse,f=u.tangentImpulse,(0!==v||0!==f)&&(m.x=c.x*v+d.x*f,m.y=c.y*v+d.y*f,a.isStatic||a.isSleeping||(y=r.sub(p,a.position,g),a.positionPrev.x+=m.x*a.inverseMass,a.positionPrev.y+=m.y*a.inverseMass,a.anglePrev+=r.cross(y,m)*a.inverseInertia),l.isStatic||l.isSleeping||(y=r.sub(p,l.position,g),l.positionPrev.x-=m.x*l.inverseMass,l.positionPrev.y-=m.y*l.inverseMass,l.anglePrev-=r.cross(y,m)*l.inverseInertia))},n.solveVelocity=function(e,t){for(var o=t*t,i=r._temp[0],a=r._temp[1],l=r._temp[2],c=r._temp[3],d=r._temp[4],u=r._temp[5],p=0;p<e.length;p++){
var v=e[p];if(v.isActive){var f=v.collision,y=f.parentA,m=f.parentB,g=f.normal,x=f.tangent,h=v.activeContacts,b=1/h.length;y.velocity.x=y.position.x-y.positionPrev.x,y.velocity.y=y.position.y-y.positionPrev.y,m.velocity.x=m.position.x-m.positionPrev.x,m.velocity.y=m.position.y-m.positionPrev.y,y.angularVelocity=y.angle-y.anglePrev,m.angularVelocity=m.angle-m.anglePrev;for(var S=0;S<h.length;S++){var C=h[S],w=C.vertex,A=r.sub(w,y.position,a),B=r.sub(w,m.position,l),P=r.add(y.velocity,r.mult(r.perp(A),y.angularVelocity),c),M=r.add(m.velocity,r.mult(r.perp(B),m.angularVelocity),d),k=r.sub(P,M,u),I=r.dot(g,k),T=r.dot(x,k),V=Math.abs(T),R=s.sign(T),E=(1+v.restitution)*I,_=s.clamp(v.separation+I,0,1)*n._frictionNormalMultiplier,O=T,L=1/0;V>v.friction*v.frictionStatic*_*o&&(L=V,O=s.clamp(v.friction*R*o,-L,L));var W=r.cross(A,g),F=r.cross(B,g),D=b/(y.inverseMass+m.inverseMass+y.inverseInertia*W*W+m.inverseInertia*F*F);if(E*=D,O*=D,0>I&&I*I>n._restingThresh*o)C.normalImpulse=0;else{var q=C.normalImpulse;
C.normalImpulse=Math.min(C.normalImpulse+E,0),E=C.normalImpulse-q}if(T*T>n._restingThreshTangent*o)C.tangentImpulse=0;else{var N=C.tangentImpulse;C.tangentImpulse=s.clamp(C.tangentImpulse+O,-L,L),O=C.tangentImpulse-N}i.x=g.x*E+x.x*O,i.y=g.y*E+x.y*O,y.isStatic||y.isSleeping||(y.positionPrev.x+=i.x*y.inverseMass,y.positionPrev.y+=i.y*y.inverseMass,y.anglePrev+=r.cross(A,i)*y.inverseInertia),m.isStatic||m.isSleeping||(m.positionPrev.x-=i.x*m.inverseMass,m.positionPrev.y-=i.y*m.inverseMass,m.anglePrev-=r.cross(B,i)*m.inverseInertia)}}}}}()},{"../core/Common":14,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],11:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../geometry/Vector");!function(){n.collides=function(t,n,s){var a,l,c,d,u=s,p=!1;if(u){var v=t.parent,f=n.parent,y=v.speed*v.speed+v.angularSpeed*v.angularSpeed+f.speed*f.speed+f.angularSpeed*f.angularSpeed;p=u&&u.collided&&.2>y,d=u}else d={collided:!1,bodyA:t,bodyB:n};if(u&&p){var m=d.axisBody,g=m===t?n:t,x=[m.axes[u.axisNumber]];
if(c=e(m.vertices,g.vertices,x),d.reused=!0,c.overlap<=0)return d.collided=!1,d}else{if(a=e(t.vertices,n.vertices,t.axes),a.overlap<=0)return d.collided=!1,d;if(l=e(n.vertices,t.vertices,n.axes),l.overlap<=0)return d.collided=!1,d;a.overlap<l.overlap?(c=a,d.axisBody=t):(c=l,d.axisBody=n),d.axisNumber=c.axisNumber}d.bodyA=t.id<n.id?t:n,d.bodyB=t.id<n.id?n:t,d.collided=!0,d.normal=c.axis,d.depth=c.overlap,d.parentA=d.bodyA.parent,d.parentB=d.bodyB.parent,t=d.bodyA,n=d.bodyB,r.dot(d.normal,r.sub(n.position,t.position))>0&&(d.normal=r.neg(d.normal)),d.tangent=r.perp(d.normal),d.penetration={x:d.normal.x*d.depth,y:d.normal.y*d.depth};var h=o(t,n,d.normal),b=d.supports||[];if(b.length=0,i.contains(t.vertices,h[0])&&b.push(h[0]),i.contains(t.vertices,h[1])&&b.push(h[1]),b.length<2){var S=o(n,t,r.neg(d.normal));i.contains(n.vertices,S[0])&&b.push(S[0]),b.length<2&&i.contains(n.vertices,S[1])&&b.push(S[1])}return b.length<1&&(b=[h[0]]),d.supports=b,d};var e=function(e,o,n){for(var i,s,a=r._temp[0],l=r._temp[1],c={
overlap:Number.MAX_VALUE},d=0;d<n.length;d++){if(s=n[d],t(a,e,s),t(l,o,s),i=Math.min(a.max-l.min,l.max-a.min),0>=i)return c.overlap=i,c;i<c.overlap&&(c.overlap=i,c.axis=s,c.axisNumber=d)}return c},t=function(e,t,o){for(var n=r.dot(t[0],o),i=n,s=1;s<t.length;s+=1){var a=r.dot(t[s],o);a>i?i=a:n>a&&(n=a)}e.min=n,e.max=i},o=function(e,t,o){for(var n,i,s,a,l=Number.MAX_VALUE,c=r._temp[0],d=t.vertices,u=e.position,p=0;p<d.length;p++)i=d[p],c.x=i.x-u.x,c.y=i.y-u.y,n=-r.dot(o,c),l>n&&(l=n,s=i);var v=s.index-1>=0?s.index-1:d.length-1;i=d[v],c.x=i.x-u.x,c.y=i.y-u.y,l=-r.dot(o,c),a=i;var f=(s.index+1)%d.length;return i=d[f],c.x=i.x-u.x,c.y=i.y-u.y,n=-r.dot(o,c),l>n&&(a=i),[s,a]}}()},{"../geometry/Vector":26,"../geometry/Vertices":27}],12:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Sleeping"),a=e("../geometry/Bounds"),l=e("../geometry/Axes"),c=e("../core/Common");!function(){var e=1e-6,t=.001;n.create=function(t){var o=t;o.bodyA&&!o.pointA&&(o.pointA={
x:0,y:0}),o.bodyB&&!o.pointB&&(o.pointB={x:0,y:0});var n=o.bodyA?r.add(o.bodyA.position,o.pointA):o.pointA,i=o.bodyB?r.add(o.bodyB.position,o.pointB):o.pointB,s=r.magnitude(r.sub(n,i));o.length=o.length||s||e;var a={visible:!0,lineWidth:2,strokeStyle:"#666"};return o.render=c.extend(a,o.render),o.id=o.id||c.nextId(),o.label=o.label||"Constraint",o.type="constraint",o.stiffness=o.stiffness||1,o.angularStiffness=o.angularStiffness||0,o.angleA=o.bodyA?o.bodyA.angle:o.angleA,o.angleB=o.bodyB?o.bodyB.angle:o.angleB,o},n.solveAll=function(e,t){for(var o=0;o<e.length;o++)n.solve(e[o],t)},n.solve=function(o,n){var i=o.bodyA,s=o.bodyB,a=o.pointA,l=o.pointB;i&&!i.isStatic&&(o.pointA=r.rotate(a,i.angle-o.angleA),o.angleA=i.angle),s&&!s.isStatic&&(o.pointB=r.rotate(l,s.angle-o.angleB),o.angleB=s.angle);var c=a,d=l;if(i&&(c=r.add(i.position,a)),s&&(d=r.add(s.position,l)),c&&d){var u=r.sub(c,d),p=r.magnitude(u);0===p&&(p=e);var v=(p-o.length)/p,f=r.div(u,p),y=r.mult(u,.5*v*o.stiffness*n*n);if(!(Math.abs(1-p/o.length)<t*n)){
var m,g,x,h,b,S,C,w;i&&!i.isStatic?(x={x:c.x-i.position.x+y.x,y:c.y-i.position.y+y.y},i.velocity.x=i.position.x-i.positionPrev.x,i.velocity.y=i.position.y-i.positionPrev.y,i.angularVelocity=i.angle-i.anglePrev,m=r.add(i.velocity,r.mult(r.perp(x),i.angularVelocity)),b=r.dot(x,f),C=i.inverseMass+i.inverseInertia*b*b):(m={x:0,y:0},C=i?i.inverseMass:0),s&&!s.isStatic?(h={x:d.x-s.position.x-y.x,y:d.y-s.position.y-y.y},s.velocity.x=s.position.x-s.positionPrev.x,s.velocity.y=s.position.y-s.positionPrev.y,s.angularVelocity=s.angle-s.anglePrev,g=r.add(s.velocity,r.mult(r.perp(h),s.angularVelocity)),S=r.dot(h,f),w=s.inverseMass+s.inverseInertia*S*S):(g={x:0,y:0},w=s?s.inverseMass:0);var A=r.sub(g,m),B=r.dot(f,A)/(C+w);B>0&&(B=0);var P,M={x:f.x*B,y:f.y*B};i&&!i.isStatic&&(P=r.cross(x,M)*i.inverseInertia*(1-o.angularStiffness),i.constraintImpulse.x-=y.x,i.constraintImpulse.y-=y.y,i.constraintImpulse.angle+=P,i.position.x-=y.x,i.position.y-=y.y,i.angle+=P),s&&!s.isStatic&&(P=r.cross(h,M)*s.inverseInertia*(1-o.angularStiffness),
s.constraintImpulse.x+=y.x,s.constraintImpulse.y+=y.y,s.constraintImpulse.angle-=P,s.position.x+=y.x,s.position.y+=y.y,s.angle-=P)}}},n.postSolveAll=function(e){for(var t=0;t<e.length;t++){var o=e[t],n=o.constraintImpulse;if(0!==n.x||0!==n.y||0!==n.angle){s.set(o,!1);for(var c=0;c<o.parts.length;c++){var d=o.parts[c];i.translate(d.vertices,n),c>0&&(d.position.x+=n.x,d.position.y+=n.y),0!==n.angle&&(i.rotate(d.vertices,n.angle,o.position),l.rotate(d.axes,n.angle),c>0&&r.rotateAbout(d.position,n.angle,o.position,d.position)),a.update(d.bounds,d.vertices,o.velocity)}n.angle=0,n.x=0,n.y=0}}}}()},{"../core/Common":14,"../core/Sleeping":20,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],13:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../core/Sleeping"),s=e("../core/Mouse"),a=e("../core/Events"),l=e("../collision/Detector"),c=e("./Constraint"),d=e("../body/Composite"),u=e("../core/Common"),p=e("../geometry/Bounds");
!function(){n.create=function(t,o){var i=(t?t.mouse:null)||(o?o.mouse:null);i||(t&&t.render&&t.render.canvas?i=s.create(t.render.canvas):(i=s.create(),u.log("MouseConstraint.create: options.mouse was undefined, engine.render.canvas was undefined, may not function as expected","warn")));var r=c.create({label:"Mouse Constraint",pointA:i.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),l={type:"mouseConstraint",mouse:i,body:null,constraint:r,collisionFilter:{category:1,mask:4294967295,group:0}},p=u.extend(l,o);return a.on(t,"tick",function(){var o=d.allBodies(t.world);n.update(p,o),e(p)}),p},n.update=function(e,t){var o=e.mouse,n=e.constraint,s=e.body;if(0===o.button){if(n.bodyB)r.set(n.bodyB,!1),n.pointA=o.position;else for(var c=0;c<t.length;c++)if(s=t[c],p.contains(s.bounds,o.position)&&l.canCollide(s.collisionFilter,e.collisionFilter))for(var d=s.parts.length>1?1:0;d<s.parts.length;d++){var u=s.parts[d];if(i.contains(u.vertices,o.position)){
n.pointA=o.position,n.bodyB=e.body=s,n.pointB={x:o.position.x-s.position.x,y:o.position.y-s.position.y},n.angleB=s.angle,r.set(s,!1),a.trigger(e,"startdrag",{mouse:o,body:s});break}}}else n.bodyB=e.body=null,n.pointB=null,s&&a.trigger(e,"enddrag",{mouse:o,body:s})};var e=function(e){var t=e.mouse,o=t.sourceEvents;o.mousemove&&a.trigger(e,"mousemove",{mouse:t}),o.mousedown&&a.trigger(e,"mousedown",{mouse:t}),o.mouseup&&a.trigger(e,"mouseup",{mouse:t}),s.clearSourceEvents(t)}}()},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":18,"../core/Sleeping":20,"../geometry/Bounds":24,"../geometry/Vertices":27,"./Constraint":12}],14:[function(e,t,o){var n={};t.exports=n,function(){n._nextId=0,n._seed=0,n.extend=function(e,t){var o,i,r;"boolean"==typeof t?(o=2,r=t):(o=1,r=!0),i=Array.prototype.slice.call(arguments,o);for(var s=0;s<i.length;s++){var a=i[s];if(a)for(var l in a)r&&a[l]&&a[l].constructor===Object?e[l]&&e[l].constructor!==Object?e[l]=a[l]:(e[l]=e[l]||{},
n.extend(e[l],r,a[l])):e[l]=a[l]}return e},n.clone=function(e,t){return n.extend({},t,e)},n.keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var o in e)t.push(o);return t},n.values=function(e){var t=[];if(Object.keys){for(var o=Object.keys(e),n=0;n<o.length;n++)t.push(e[o[n]]);return t}for(var i in e)t.push(e[i]);return t},n.shadeColor=function(e,t){var o=parseInt(e.slice(1),16),n=Math.round(2.55*t),i=(o>>16)+n,r=(o>>8&255)+n,s=(255&o)+n;return"#"+(16777216+65536*(255>i?1>i?0:i:255)+256*(255>r?1>r?0:r:255)+(255>s?1>s?0:s:255)).toString(16).slice(1)},n.shuffle=function(e){for(var t=e.length-1;t>0;t--){var o=Math.floor(n.random()*(t+1)),i=e[t];e[t]=e[o],e[o]=i}return e},n.choose=function(e){return e[Math.floor(n.random()*e.length)]},n.isElement=function(e){try{return e instanceof HTMLElement}catch(t){return"object"==typeof e&&1===e.nodeType&&"object"==typeof e.style&&"object"==typeof e.ownerDocument}},n.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e);
},n.clamp=function(e,t,o){return t>e?t:e>o?o:e},n.sign=function(e){return 0>e?-1:1},n.now=function(){var e=window.performance||{};return e.now=function(){return e.now||e.webkitNow||e.msNow||e.oNow||e.mozNow||function(){return+new Date}}(),e.now()},n.random=function(t,o){return t="undefined"!=typeof t?t:0,o="undefined"!=typeof o?o:1,t+e()*(o-t)},n.colorToNumber=function(e){return e=e.replace("#",""),3==e.length&&(e=e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)),parseInt(e,16)},n.log=function(e,t){if(console&&console.log&&console.warn)switch(t){case"warn":console.warn("Matter.js:",e);break;case"error":console.log("Matter.js:",e)}},n.nextId=function(){return n._nextId++},n.indexOf=function(e,t){if(e.indexOf)return e.indexOf(t);for(var o=0;o<e.length;o++)if(e[o]===t)return o;return-1};var e=function(){return n._seed=(9301*n._seed+49297)%233280,n._seed/233280}}()},{}],15:[function(e,t,o){var n={};t.exports=n;var i=e("../body/World"),r=e("./Sleeping"),s=e("../collision/Resolver"),a=e("../render/Render"),l=e("../collision/Pairs"),c=(e("./Metrics"),
e("../collision/Grid")),d=e("./Events"),u=e("../body/Composite"),p=e("../constraint/Constraint"),v=e("./Common"),f=e("../body/Body");!function(){n.create=function(e,t){t=v.isElement(e)?t:e,e=v.isElement(e)?e:null;var o={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],timing:{timestamp:0,timeScale:1},broadphase:{controller:c}},n=v.extend(o,t);if(e||n.render){var r={element:e,controller:a};n.render=v.extend(r,n.render)}return n.render&&n.render.controller&&(n.render=n.render.controller.create(n.render)),n.world=i.create(n.world),n.pairs=l.create(),n.broadphase=n.broadphase.controller.create(n.broadphase),n.metrics=n.metrics||{extended:!1},n},n.update=function(n,i,a){i=i||1e3/60,a=a||1;var c,v=n.world,f=n.timing,y=n.broadphase,m=[];f.timestamp+=i*f.timeScale;var g={timestamp:f.timestamp};d.trigger(n,"beforeUpdate",g);var x=u.allBodies(v),h=u.allConstraints(v);for(n.enableSleeping&&r.update(x,f.timeScale),t(x,v.gravity),o(x,i,f.timeScale,a,v.bounds),
c=0;c<n.constraintIterations;c++)p.solveAll(h,f.timeScale);p.postSolveAll(x),y.controller?(v.isModified&&y.controller.clear(y),y.controller.update(y,x,n,v.isModified),m=y.pairsList):m=x;var b=y.detector(m,n),S=n.pairs,C=f.timestamp;for(l.update(S,b,C),l.removeOld(S,C),n.enableSleeping&&r.afterCollisions(S.list,f.timeScale),S.collisionStart.length>0&&d.trigger(n,"collisionStart",{pairs:S.collisionStart}),s.preSolvePosition(S.list),c=0;c<n.positionIterations;c++)s.solvePosition(S.list,f.timeScale);for(s.postSolvePosition(x),s.preSolveVelocity(S.list),c=0;c<n.velocityIterations;c++)s.solveVelocity(S.list,f.timeScale);return S.collisionActive.length>0&&d.trigger(n,"collisionActive",{pairs:S.collisionActive}),S.collisionEnd.length>0&&d.trigger(n,"collisionEnd",{pairs:S.collisionEnd}),e(x),v.isModified&&u.setModified(v,!1,!1,!0),d.trigger(n,"afterUpdate",g),n},n.merge=function(e,t){if(v.extend(e,t),t.world){e.world=t.world,n.clear(e);for(var o=u.allBodies(e.world),i=0;i<o.length;i++){var s=o[i];
r.set(s,!1),s.id=v.nextId()}}},n.clear=function(e){var t=e.world;l.clear(e.pairs);var o=e.broadphase;if(o.controller){var n=u.allBodies(t);o.controller.clear(o),o.controller.update(o,n,e,!0)}};var e=function(e){for(var t=0;t<e.length;t++){var o=e[t];o.force.x=0,o.force.y=0,o.torque=0}},t=function(e,t){var o="undefined"!=typeof t.scale?t.scale:.001;if((0!==t.x||0!==t.y)&&0!==o)for(var n=0;n<e.length;n++){var i=e[n];i.isStatic||i.isSleeping||(i.force.y+=i.mass*t.y*o,i.force.x+=i.mass*t.x*o)}},o=function(e,t,o,n,i){for(var r=0;r<e.length;r++){var s=e[r];s.isStatic||s.isSleeping||f.update(s,t,o,n)}}}()},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":29,"./Common":14,"./Events":16,"./Metrics":17,"./Sleeping":20}],16:[function(e,t,o){var n={};t.exports=n;var i=e("./Common");!function(){n.on=function(e,t,o){for(var n,i=t.split(" "),r=0;r<i.length;r++)n=i[r],e.events=e.events||{},
e.events[n]=e.events[n]||[],e.events[n].push(o);return o},n.off=function(e,t,o){if(!t)return void(e.events={});"function"==typeof t&&(o=t,t=i.keys(e.events).join(" "));for(var n=t.split(" "),r=0;r<n.length;r++){var s=e.events[n[r]],a=[];if(o&&s)for(var l=0;l<s.length;l++)s[l]!==o&&a.push(s[l]);e.events[n[r]]=a}},n.trigger=function(e,t,o){var n,r,s,a;if(e.events){o||(o={}),n=t.split(" ");for(var l=0;l<n.length;l++)if(r=n[l],s=e.events[r]){a=i.clone(o,!1),a.name=r,a.source=e;for(var c=0;c<s.length;c++)s[c].apply(e,[a])}}}}()},{"./Common":14}],17:[function(e,t,o){},{"../body/Composite":2,"./Common":14}],18:[function(e,t,o){var n={};t.exports=n;var i=e("../core/Common");!function(){n.create=function(t){var o={};return t||i.log("Mouse.create: element was undefined, defaulting to document.body","warn"),o.element=t||document.body,o.absolute={x:0,y:0},o.position={x:0,y:0},o.mousedownPosition={x:0,y:0},o.mouseupPosition={x:0,y:0},o.offset={x:0,y:0},o.scale={x:1,y:1},o.wheelDelta=0,o.button=-1,o.pixelRatio=o.element.getAttribute("data-pixel-ratio")||1,
o.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},o.mousemove=function(t){var n=e(t,o.element,o.pixelRatio),i=t.changedTouches;i&&(o.button=0,t.preventDefault()),o.absolute.x=n.x,o.absolute.y=n.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.sourceEvents.mousemove=t},o.mousedown=function(t){var n=e(t,o.element,o.pixelRatio),i=t.changedTouches;i?(o.button=0,t.preventDefault()):o.button=t.button,o.absolute.x=n.x,o.absolute.y=n.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.mousedownPosition.x=o.position.x,o.mousedownPosition.y=o.position.y,o.sourceEvents.mousedown=t},o.mouseup=function(t){var n=e(t,o.element,o.pixelRatio),i=t.changedTouches;i&&t.preventDefault(),o.button=-1,o.absolute.x=n.x,o.absolute.y=n.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.mouseupPosition.x=o.position.x,o.mouseupPosition.y=o.position.y,
o.sourceEvents.mouseup=t},o.mousewheel=function(e){o.wheelDelta=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),e.preventDefault()},n.setElement(o,o.element),o},n.setElement=function(e,t){e.element=t,t.addEventListener("mousemove",e.mousemove),t.addEventListener("mousedown",e.mousedown),t.addEventListener("mouseup",e.mouseup),t.addEventListener("mousewheel",e.mousewheel),t.addEventListener("DOMMouseScroll",e.mousewheel),t.addEventListener("touchmove",e.mousemove),t.addEventListener("touchstart",e.mousedown),t.addEventListener("touchend",e.mouseup)},n.clearSourceEvents=function(e){e.sourceEvents.mousemove=null,e.sourceEvents.mousedown=null,e.sourceEvents.mouseup=null,e.sourceEvents.mousewheel=null,e.wheelDelta=0},n.setOffset=function(e,t){e.offset.x=t.x,e.offset.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y},n.setScale=function(e,t){e.scale.x=t.x,e.scale.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y;
};var e=function(e,t,o){var n,i,r=t.getBoundingClientRect(),s=document.documentElement||document.body.parentNode||document.body,a=void 0!==window.pageXOffset?window.pageXOffset:s.scrollLeft,l=void 0!==window.pageYOffset?window.pageYOffset:s.scrollTop,c=e.changedTouches;return c?(n=c[0].pageX-r.left-a,i=c[0].pageY-r.top-l):(n=e.pageX-r.left-a,i=e.pageY-r.top-l),{x:n/(t.clientWidth/t.width*o),y:i/(t.clientHeight/t.height*o)}}}()},{"../core/Common":14}],19:[function(e,t,o){var n={};t.exports=n;var i=e("./Events"),r=e("./Engine"),s=e("./Common");!function(){var e,t;"undefined"!=typeof window&&(e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(function(){e(s.now())},1e3/60)},t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),n.create=function(e){var t={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,
frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},o=s.extend(t,e);return o.delta=o.delta||1e3/o.fps,o.deltaMin=o.deltaMin||1e3/o.fps,o.deltaMax=o.deltaMax||1e3/(.5*o.fps),o.fps=1e3/o.delta,o},n.run=function(t,o){return"undefined"!=typeof t.positionIterations&&(o=t,t=n.create()),function i(r){t.frameRequestId=e(i),r&&t.enabled&&n.tick(t,o,r)}(),t},n.tick=function(e,t,o){var n,s=t.timing,a=1,l={timestamp:s.timestamp};i.trigger(e,"beforeTick",l),i.trigger(t,"beforeTick",l),e.isFixed?n=e.delta:(n=o-e.timePrev||e.delta,e.timePrev=o,e.deltaHistory.push(n),e.deltaHistory=e.deltaHistory.slice(-e.deltaSampleSize),n=Math.min.apply(null,e.deltaHistory),n=n<e.deltaMin?e.deltaMin:n,n=n>e.deltaMax?e.deltaMax:n,a=n/e.delta,e.delta=n),0!==e.timeScalePrev&&(a*=s.timeScale/e.timeScalePrev),0===s.timeScale&&(a=0),e.timeScalePrev=s.timeScale,e.correction=a,e.frameCounter+=1,o-e.counterTimestamp>=1e3&&(e.fps=e.frameCounter*((o-e.counterTimestamp)/1e3),e.counterTimestamp=o,
e.frameCounter=0),i.trigger(e,"tick",l),i.trigger(t,"tick",l),t.world.isModified&&t.render&&t.render.controller&&t.render.controller.clear&&t.render.controller.clear(t.render),i.trigger(e,"beforeUpdate",l),r.update(t,n,a),i.trigger(e,"afterUpdate",l),t.render&&t.render.controller&&(i.trigger(e,"beforeRender",l),i.trigger(t,"beforeRender",l),t.render.controller.world(t),i.trigger(e,"afterRender",l),i.trigger(t,"afterRender",l)),i.trigger(e,"afterTick",l),i.trigger(t,"afterTick",l)},n.stop=function(e){t(e.frameRequestId)},n.start=function(e,t){n.run(e,t)}}()},{"./Common":14,"./Engine":15,"./Events":16}],20:[function(e,t,o){var n={};t.exports=n;var i=e("./Events");!function(){n._motionWakeThreshold=.18,n._motionSleepThreshold=.08,n._minBias=.9,n.update=function(e,t){for(var o=t*t*t,i=0;i<e.length;i++){var r=e[i],s=r.speed*r.speed+r.angularSpeed*r.angularSpeed;if(0===r.force.x&&0===r.force.y){var a=Math.min(r.motion,s),l=Math.max(r.motion,s);r.motion=n._minBias*a+(1-n._minBias)*l,r.sleepThreshold>0&&r.motion<n._motionSleepThreshold*o?(r.sleepCounter+=1,
r.sleepCounter>=r.sleepThreshold&&n.set(r,!0)):r.sleepCounter>0&&(r.sleepCounter-=1)}else n.set(r,!1)}},n.afterCollisions=function(e,t){for(var o=t*t*t,i=0;i<e.length;i++){var r=e[i];if(r.isActive){var s=r.collision,a=s.bodyA.parent,l=s.bodyB.parent;if(!(a.isSleeping&&l.isSleeping||a.isStatic||l.isStatic)&&(a.isSleeping||l.isSleeping)){var c=a.isSleeping&&!a.isStatic?a:l,d=c===a?l:a;!c.isStatic&&d.motion>n._motionWakeThreshold*o&&n.set(c,!1)}}}},n.set=function(e,t){var o=e.isSleeping;t?(e.isSleeping=!0,e.sleepCounter=e.sleepThreshold,e.positionImpulse.x=0,e.positionImpulse.y=0,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.anglePrev=e.angle,e.speed=0,e.angularSpeed=0,e.motion=0,o||i.trigger(e,"sleepStart")):(e.isSleeping=!1,e.sleepCounter=0,o&&i.trigger(e,"sleepEnd"))}}()},{"./Events":16}],21:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vertices"),r=e("../core/Common"),s=e("../body/Body"),a=e("../geometry/Bounds"),l=e("../geometry/Vector");!function(){n.rectangle=function(e,t,o,n,a){
a=a||{};var l={label:"Rectangle Body",position:{x:e,y:t},vertices:i.fromPath("L 0 0 L "+o+" 0 L "+o+" "+n+" L 0 "+n)};if(a.chamfer){var c=a.chamfer;l.vertices=i.chamfer(l.vertices,c.radius,c.quality,c.qualityMin,c.qualityMax),delete a.chamfer}return s.create(r.extend({},l,a))},n.trapezoid=function(e,t,o,n,a,l){l=l||{},a*=.5;var c,d=(1-2*a)*o,u=o*a,p=u+d,v=p+u;c=.5>a?"L 0 0 L "+u+" "+-n+" L "+p+" "+-n+" L "+v+" 0":"L 0 0 L "+p+" "+-n+" L "+v+" 0";var f={label:"Trapezoid Body",position:{x:e,y:t},vertices:i.fromPath(c)};if(l.chamfer){var y=l.chamfer;f.vertices=i.chamfer(f.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete l.chamfer}return s.create(r.extend({},f,l))},n.circle=function(e,t,o,i,s){i=i||{};var a={label:"Circle Body",circleRadius:o};s=s||25;var l=Math.ceil(Math.max(10,Math.min(s,o)));return l%2===1&&(l+=1),n.polygon(e,t,l,o,r.extend({},a,i))},n.polygon=function(e,t,o,a,l){if(l=l||{},3>o)return n.circle(e,t,a,l);for(var c=2*Math.PI/o,d="",u=.5*c,p=0;o>p;p+=1){var v=u+p*c,f=Math.cos(v)*a,y=Math.sin(v)*a;
d+="L "+f.toFixed(3)+" "+y.toFixed(3)+" "}var m={label:"Polygon Body",position:{x:e,y:t},vertices:i.fromPath(d)};if(l.chamfer){var g=l.chamfer;m.vertices=i.chamfer(m.vertices,g.radius,g.quality,g.qualityMin,g.qualityMax),delete l.chamfer}return s.create(r.extend({},m,l))},n.fromVertices=function(e,t,o,n,c,d,u){var p,v,f,y,m,g,x,h,b;for(n=n||{},v=[],c="undefined"!=typeof c?c:!1,d="undefined"!=typeof d?d:.01,u="undefined"!=typeof u?u:10,window.decomp||r.log("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.","warn"),r.isArray(o[0])||(o=[o]),h=0;h<o.length;h+=1)if(y=o[h],f=i.isConvex(y),f||!window.decomp)y=f?i.clockwiseSort(y):i.hull(y),v.push({position:{x:e,y:t},vertices:y});else{var S=new decomp.Polygon;for(m=0;m<y.length;m++)S.vertices.push([y[m].x,y[m].y]);S.makeCCW(),d!==!1&&S.removeCollinearPoints(d);var C=S.quickDecomp();for(m=0;m<C.length;m++){var w=C[m],A=[];for(g=0;g<w.vertices.length;g++)A.push({x:w.vertices[g][0],y:w.vertices[g][1]
});u>0&&i.area(A)<u||v.push({position:i.centre(A),vertices:A})}}for(m=0;m<v.length;m++)v[m]=s.create(r.extend(v[m],n));if(c){var B=5;for(m=0;m<v.length;m++){var P=v[m];for(g=m+1;g<v.length;g++){var M=v[g];if(a.overlaps(P.bounds,M.bounds)){var k=P.vertices,I=M.vertices;for(x=0;x<P.vertices.length;x++)for(b=0;b<M.vertices.length;b++){var T=l.magnitudeSquared(l.sub(k[(x+1)%k.length],I[b])),V=l.magnitudeSquared(l.sub(k[x],I[(b+1)%I.length]));B>T&&B>V&&(k[x].isInternal=!0,I[b].isInternal=!0)}}}}}return v.length>1?(p=s.create(r.extend({parts:v.slice(0)},n)),s.setPosition(p,{x:e,y:t}),p):v[0]}}()},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":24,"../geometry/Vector":26,"../geometry/Vertices":27}],22:[function(e,t,o){var n={};t.exports=n;var i=e("../body/Composite"),r=e("../constraint/Constraint"),s=e("../core/Common"),a=e("../body/Body"),l=e("./Bodies");!function(){n.stack=function(e,t,o,n,r,s,l){for(var c,d=i.create({label:"Stack"}),u=e,p=t,v=0,f=0;n>f;f++){for(var y=0,m=0;o>m;m++){
var g=l(u,p,m,f,c,v);if(g){var x=g.bounds.max.y-g.bounds.min.y,h=g.bounds.max.x-g.bounds.min.x;x>y&&(y=x),a.translate(g,{x:.5*h,y:.5*x}),u=g.bounds.max.x+r,i.addBody(d,g),c=g,v+=1}else u+=r}p+=y+s,u=e}return d},n.chain=function(e,t,o,n,a,l){for(var c=e.bodies,d=1;d<c.length;d++){var u=c[d-1],p=c[d],v=u.bounds.max.y-u.bounds.min.y,f=u.bounds.max.x-u.bounds.min.x,y=p.bounds.max.y-p.bounds.min.y,m=p.bounds.max.x-p.bounds.min.x,g={bodyA:u,pointA:{x:f*t,y:v*o},bodyB:p,pointB:{x:m*n,y:y*a}},x=s.extend(g,l);i.addConstraint(e,r.create(x))}return e.label+=" Chain",e},n.mesh=function(e,t,o,n,a){var l,c,d,u,p,v=e.bodies;for(l=0;o>l;l++){for(c=1;t>c;c++)d=v[c-1+l*t],u=v[c+l*t],i.addConstraint(e,r.create(s.extend({bodyA:d,bodyB:u},a)));if(l>0)for(c=0;t>c;c++)d=v[c+(l-1)*t],u=v[c+l*t],i.addConstraint(e,r.create(s.extend({bodyA:d,bodyB:u},a))),n&&c>0&&(p=v[c-1+(l-1)*t],i.addConstraint(e,r.create(s.extend({bodyA:p,bodyB:u},a)))),n&&t-1>c&&(p=v[c+1+(l-1)*t],i.addConstraint(e,r.create(s.extend({bodyA:p,bodyB:u
},a))))}return e.label+=" Mesh",e},n.pyramid=function(e,t,o,i,r,s,l){return n.stack(e,t,o,i,r,s,function(t,n,s,c,d,u){var p=Math.min(i,Math.ceil(o/2)),v=d?d.bounds.max.x-d.bounds.min.x:0;if(!(c>p)){c=p-c;var f=c,y=o-1-c;if(!(f>s||s>y)){1===u&&a.translate(d,{x:(s+(o%2===1?1:-1))*v,y:0});var m=d?s*v:0;return l(e+m+s*r,n,s,c,d,u)}}})},n.newtonsCradle=function(e,t,o,n,s){for(var a=i.create({label:"Newtons Cradle"}),c=0;o>c;c++){var d=1.9,u=l.circle(e+c*(n*d),t+s,n,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),p=r.create({pointA:{x:e+c*(n*d),y:t},bodyB:u});i.addBody(a,u),i.addConstraint(a,p)}return a},n.car=function(e,t,o,n,s){var c=a.nextGroup(!0),d=-20,u=.5*-o+d,p=.5*o-d,v=0,f=i.create({label:"Car"}),y=l.trapezoid(e,t,o,n,.3,{collisionFilter:{group:c},friction:.01,chamfer:{radius:10}}),m=l.circle(e+u,t+v,s,{collisionFilter:{group:c},friction:.8,density:.01}),g=l.circle(e+p,t+v,s,{collisionFilter:{group:c},friction:.8,density:.01}),x=r.create({bodyA:y,pointA:{x:u,y:v},bodyB:m,
stiffness:.2}),h=r.create({bodyA:y,pointA:{x:p,y:v},bodyB:g,stiffness:.2});return i.addBody(f,y),i.addBody(f,m),i.addBody(f,g),i.addConstraint(f,x),i.addConstraint(f,h),f},n.softBody=function(e,t,o,i,r,a,c,d,u,p){u=s.extend({inertia:1/0},u),p=s.extend({stiffness:.4},p);var v=n.stack(e,t,o,i,r,a,function(e,t){return l.circle(e,t,d,u)});return n.mesh(v,o,i,c,p),v.label="Soft Body",v}}()},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":21}],23:[function(e,t,o){var n={};t.exports=n;var i=e("../geometry/Vector"),r=e("../core/Common");!function(){n.fromVertices=function(e){for(var t={},o=0;o<e.length;o++){var n=(o+1)%e.length,s=i.normalise({x:e[n].y-e[o].y,y:e[o].x-e[n].x}),a=0===s.y?1/0:s.x/s.y;a=a.toFixed(3).toString(),t[a]=s}return r.values(t)},n.rotate=function(e,t){if(0!==t)for(var o=Math.cos(t),n=Math.sin(t),i=0;i<e.length;i++){var r,s=e[i];r=s.x*o-s.y*n,s.y=s.x*n+s.y*o,s.x=r}}}()},{"../core/Common":14,"../geometry/Vector":26}],24:[function(e,t,o){
var n={};t.exports=n,function(){n.create=function(e){var t={min:{x:0,y:0},max:{x:0,y:0}};return e&&n.update(t,e),t},n.update=function(e,t,o){e.min.x=1/0,e.max.x=-(1/0),e.min.y=1/0,e.max.y=-(1/0);for(var n=0;n<t.length;n++){var i=t[n];i.x>e.max.x&&(e.max.x=i.x),i.x<e.min.x&&(e.min.x=i.x),i.y>e.max.y&&(e.max.y=i.y),i.y<e.min.y&&(e.min.y=i.y)}o&&(o.x>0?e.max.x+=o.x:e.min.x+=o.x,o.y>0?e.max.y+=o.y:e.min.y+=o.y)},n.contains=function(e,t){return t.x>=e.min.x&&t.x<=e.max.x&&t.y>=e.min.y&&t.y<=e.max.y},n.overlaps=function(e,t){return e.min.x<=t.max.x&&e.max.x>=t.min.x&&e.max.y>=t.min.y&&e.min.y<=t.max.y},n.translate=function(e,t){e.min.x+=t.x,e.max.x+=t.x,e.min.y+=t.y,e.max.y+=t.y},n.shift=function(e,t){var o=e.max.x-e.min.x,n=e.max.y-e.min.y;e.min.x=t.x,e.max.x=t.x+o,e.min.y=t.y,e.max.y=t.y+n}}()},{}],25:[function(e,t,o){var n={};t.exports=n;e("../geometry/Bounds");!function(){n.pathToVertices=function(t,o){var n,i,r,s,a,l,c,d,u,p,v,f,y=[],m=0,g=0,x=0;o=o||15;var h=function(e,t,o){var n=o%2===1&&o>1;
if(!u||e!=u.x||t!=u.y){u&&n?(v=u.x,f=u.y):(v=0,f=0);var i={x:v+e,y:f+t};(n||!u)&&(u=i),y.push(i),g=v+e,x=f+t}},b=function(e){var t=e.pathSegTypeAsLetter.toUpperCase();if("Z"!==t){switch(t){case"M":case"L":case"T":case"C":case"S":case"Q":g=e.x,x=e.y;break;case"H":g=e.x;break;case"V":x=e.y}h(g,x,e.pathSegType)}};for(e(t),r=t.getTotalLength(),l=[],n=0;n<t.pathSegList.numberOfItems;n+=1)l.push(t.pathSegList.getItem(n));for(c=l.concat();r>m;){if(p=t.getPathSegAtLength(m),a=l[p],a!=d){for(;c.length&&c[0]!=a;)b(c.shift());d=a}switch(a.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":s=t.getPointAtLength(m),h(s.x,s.y,0)}m+=o}for(n=0,i=c.length;i>n;++n)b(c[n]);return y};var e=function(e){for(var t,o,n,i,r,s,a=e.pathSegList,l=0,c=0,d=a.numberOfItems,u=0;d>u;++u){var p=a.getItem(u),v=p.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(v))"x"in p&&(l=p.x),"y"in p&&(c=p.y);else switch("x1"in p&&(n=l+p.x1),"x2"in p&&(r=l+p.x2),"y1"in p&&(i=c+p.y1),"y2"in p&&(s=c+p.y2),"x"in p&&(l+=p.x),
"y"in p&&(c+=p.y),v){case"m":a.replaceItem(e.createSVGPathSegMovetoAbs(l,c),u);break;case"l":a.replaceItem(e.createSVGPathSegLinetoAbs(l,c),u);break;case"h":a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l),u);break;case"v":a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c),u);break;case"c":a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l,c,n,i,r,s),u);break;case"s":a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l,c,r,s),u);break;case"q":a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l,c,n,i),u);break;case"t":a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l,c),u);break;case"a":a.replaceItem(e.createSVGPathSegArcAbs(l,c,p.r1,p.r2,p.angle,p.largeArcFlag,p.sweepFlag),u);break;case"z":case"Z":l=t,c=o}("M"==v||"m"==v)&&(t=l,o=c)}}}()},{"../geometry/Bounds":24}],26:[function(e,t,o){var n={};t.exports=n,function(){n.create=function(e,t){return{x:e||0,y:t||0}},n.clone=function(e){return{x:e.x,y:e.y}},n.magnitude=function(e){return Math.sqrt(e.x*e.x+e.y*e.y)},n.magnitudeSquared=function(e){
return e.x*e.x+e.y*e.y},n.rotate=function(e,t){var o=Math.cos(t),n=Math.sin(t);return{x:e.x*o-e.y*n,y:e.x*n+e.y*o}},n.rotateAbout=function(e,t,o,n){var i=Math.cos(t),r=Math.sin(t);n||(n={});var s=o.x+((e.x-o.x)*i-(e.y-o.y)*r);return n.y=o.y+((e.x-o.x)*r+(e.y-o.y)*i),n.x=s,n},n.normalise=function(e){var t=n.magnitude(e);return 0===t?{x:0,y:0}:{x:e.x/t,y:e.y/t}},n.dot=function(e,t){return e.x*t.x+e.y*t.y},n.cross=function(e,t){return e.x*t.y-e.y*t.x},n.cross3=function(e,t,o){return(t.x-e.x)*(o.y-e.y)-(t.y-e.y)*(o.x-e.x)},n.add=function(e,t,o){return o||(o={}),o.x=e.x+t.x,o.y=e.y+t.y,o},n.sub=function(e,t,o){return o||(o={}),o.x=e.x-t.x,o.y=e.y-t.y,o},n.mult=function(e,t){return{x:e.x*t,y:e.y*t}},n.div=function(e,t){return{x:e.x/t,y:e.y/t}},n.perp=function(e,t){return t=t===!0?-1:1,{x:t*-e.y,y:t*e.x}},n.neg=function(e){return{x:-e.x,y:-e.y}},n.angle=function(e,t){return Math.atan2(t.y-e.y,t.x-e.x)},n._temp=[n.create(),n.create(),n.create(),n.create(),n.create(),n.create()]}()},{}],27:[function(e,t,o){
var n={};t.exports=n;var i=e("../geometry/Vector"),r=e("../core/Common");!function(){n.create=function(e,t){for(var o=[],n=0;n<e.length;n++){var i=e[n],r={x:i.x,y:i.y,index:n,body:t,isInternal:!1};o.push(r)}return o},n.fromPath=function(e,t){var o=/L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi,i=[];return e.replace(o,function(e,t,o){i.push({x:parseFloat(t),y:parseFloat(o)})}),n.create(i,t)},n.centre=function(e){for(var t,o,r,s=n.area(e,!0),a={x:0,y:0},l=0;l<e.length;l++)r=(l+1)%e.length,t=i.cross(e[l],e[r]),o=i.mult(i.add(e[l],e[r]),t),a=i.add(a,o);return i.div(a,6*s)},n.mean=function(e){for(var t={x:0,y:0},o=0;o<e.length;o++)t.x+=e[o].x,t.y+=e[o].y;return i.div(t,e.length)},n.area=function(e,t){for(var o=0,n=e.length-1,i=0;i<e.length;i++)o+=(e[n].x-e[i].x)*(e[n].y+e[i].y),n=i;return t?o/2:Math.abs(o)/2},n.inertia=function(e,t){for(var o,n,r=0,s=0,a=e,l=0;l<a.length;l++)n=(l+1)%a.length,o=Math.abs(i.cross(a[n],a[l])),r+=o*(i.dot(a[n],a[n])+i.dot(a[n],a[l])+i.dot(a[l],a[l])),s+=o;return t/6*(r/s);
},n.translate=function(e,t,o){var n;if(o)for(n=0;n<e.length;n++)e[n].x+=t.x*o,e[n].y+=t.y*o;else for(n=0;n<e.length;n++)e[n].x+=t.x,e[n].y+=t.y;return e},n.rotate=function(e,t,o){if(0!==t){for(var n=Math.cos(t),i=Math.sin(t),r=0;r<e.length;r++){var s=e[r],a=s.x-o.x,l=s.y-o.y;s.x=o.x+(a*n-l*i),s.y=o.y+(a*i+l*n)}return e}},n.contains=function(e,t){for(var o=0;o<e.length;o++){var n=e[o],i=e[(o+1)%e.length];if((t.x-n.x)*(i.y-n.y)+(t.y-n.y)*(n.x-i.x)>0)return!1}return!0},n.scale=function(e,t,o,r){if(1===t&&1===o)return e;r=r||n.centre(e);for(var s,a,l=0;l<e.length;l++)s=e[l],a=i.sub(s,r),e[l].x=r.x+a.x*t,e[l].y=r.y+a.y*o;return e},n.chamfer=function(e,t,o,n,s){t=t||[8],t.length||(t=[t]),o="undefined"!=typeof o?o:-1,n=n||2,s=s||14;for(var a=[],l=0;l<e.length;l++){var c=e[l-1>=0?l-1:e.length-1],d=e[l],u=e[(l+1)%e.length],p=t[l<t.length?l:t.length-1];if(0!==p){var v=i.normalise({x:d.y-c.y,y:c.x-d.x}),f=i.normalise({x:u.y-d.y,y:d.x-u.x}),y=Math.sqrt(2*Math.pow(p,2)),m=i.mult(r.clone(v),p),g=i.normalise(i.mult(i.add(v,f),.5)),x=i.sub(d,i.mult(g,y)),h=o;
-1===o&&(h=1.75*Math.pow(p,.32)),h=r.clamp(h,n,s),h%2===1&&(h+=1);for(var b=Math.acos(i.dot(v,f)),S=b/h,C=0;h>C;C++)a.push(i.add(i.rotate(m,S*C),x))}else a.push(d)}return a},n.clockwiseSort=function(e){var t=n.mean(e);return e.sort(function(e,o){return i.angle(t,e)-i.angle(t,o)}),e},n.isConvex=function(e){var t,o,n,i,r=0,s=e.length;if(3>s)return null;for(t=0;s>t;t++)if(o=(t+1)%s,n=(t+2)%s,i=(e[o].x-e[t].x)*(e[n].y-e[o].y),i-=(e[o].y-e[t].y)*(e[n].x-e[o].x),0>i?r|=1:i>0&&(r|=2),3===r)return!1;return 0!==r?!0:null},n.hull=function(e){var t,o,n=[],r=[];for(e=e.slice(0),e.sort(function(e,t){var o=e.x-t.x;return 0!==o?o:e.y-t.y}),o=0;o<e.length;o++){for(t=e[o];r.length>=2&&i.cross3(r[r.length-2],r[r.length-1],t)<=0;)r.pop();r.push(t)}for(o=e.length-1;o>=0;o--){for(t=e[o];n.length>=2&&i.cross3(n[n.length-2],n[n.length-1],t)<=0;)n.pop();n.push(t)}return n.pop(),r.pop(),n.concat(r)}}()},{"../core/Common":14,"../geometry/Vector":26}],28:[function(e,t,o){var n=t.exports={};n.version="master",n.Body=e("../body/Body"),
n.Composite=e("../body/Composite"),n.World=e("../body/World"),n.Contact=e("../collision/Contact"),n.Detector=e("../collision/Detector"),n.Grid=e("../collision/Grid"),n.Pairs=e("../collision/Pairs"),n.Pair=e("../collision/Pair"),n.Query=e("../collision/Query"),n.Resolver=e("../collision/Resolver"),n.SAT=e("../collision/SAT"),n.Constraint=e("../constraint/Constraint"),n.MouseConstraint=e("../constraint/MouseConstraint"),n.Common=e("../core/Common"),n.Engine=e("../core/Engine"),n.Events=e("../core/Events"),n.Mouse=e("../core/Mouse"),n.Runner=e("../core/Runner"),n.Sleeping=e("../core/Sleeping"),n.Bodies=e("../factory/Bodies"),n.Composites=e("../factory/Composites"),n.Axes=e("../geometry/Axes"),n.Bounds=e("../geometry/Bounds"),n.Svg=e("../geometry/Svg"),n.Vector=e("../geometry/Vector"),n.Vertices=e("../geometry/Vertices"),n.Render=e("../render/Render"),n.RenderPixi=e("../render/RenderPixi"),n.World.add=n.Composite.add,n.World.remove=n.Composite.remove,n.World.addComposite=n.Composite.addComposite,
n.World.addBody=n.Composite.addBody,n.World.addConstraint=n.Composite.addConstraint,n.World.clear=n.Composite.clear,n.Engine.run=n.Runner.run},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Metrics":17,"../core/Mouse":18,"../core/Runner":19,"../core/Sleeping":20,"../factory/Bodies":21,"../factory/Composites":22,"../geometry/Axes":23,"../geometry/Bounds":24,"../geometry/Svg":25,"../geometry/Vector":26,"../geometry/Vertices":27,"../render/Render":29,"../render/RenderPixi":30}],29:[function(e,t,o){var n={};t.exports=n;var i=e("../core/Common"),r=e("../body/Composite"),s=e("../geometry/Bounds"),a=e("../core/Events"),l=e("../collision/Grid"),c=e("../geometry/Vector");
!function(){n.create=function(t){var o={controller:n,element:null,canvas:null,mouse:null,options:{width:800,height:600,pixelRatio:1,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},r=i.extend(o,t);return r.canvas&&(r.canvas.width=r.options.width||r.canvas.width,r.canvas.height=r.options.height||r.canvas.height),r.canvas=r.canvas||e(r.options.width,r.options.height),r.context=r.canvas.getContext("2d"),r.textures={},r.bounds=r.bounds||{min:{x:0,y:0},max:{x:r.canvas.width,y:r.canvas.height}},1!==r.options.pixelRatio&&n.setPixelRatio(r,r.options.pixelRatio),i.isElement(r.element)?r.element.appendChild(r.canvas):i.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),
r},n.setPixelRatio=function(e,o){var n=e.options,i=e.canvas;"auto"===o&&(o=t(i)),n.pixelRatio=o,i.setAttribute("data-pixel-ratio",o),i.width=n.width*o,i.height=n.height*o,i.style.width=n.width+"px",i.style.height=n.height+"px",e.context.scale(o,o)},n.world=function(e){var t,o=e.render,i=e.world,u=o.canvas,p=o.context,v=o.options,f=r.allBodies(i),y=r.allConstraints(i),m=v.wireframes?v.wireframeBackground:v.background,g=[],x=[],h={timestamp:e.timing.timestamp};if(a.trigger(o,"beforeRender",h),o.currentBackground!==m&&d(o,m),p.globalCompositeOperation="source-in",p.fillStyle="transparent",p.fillRect(0,0,u.width,u.height),p.globalCompositeOperation="source-over",v.hasBounds){var b=o.bounds.max.x-o.bounds.min.x,S=o.bounds.max.y-o.bounds.min.y,C=b/v.width,w=S/v.height;for(t=0;t<f.length;t++){var A=f[t];s.overlaps(A.bounds,o.bounds)&&g.push(A)}for(t=0;t<y.length;t++){var B=y[t],P=B.bodyA,M=B.bodyB,k=B.pointA,I=B.pointB;P&&(k=c.add(P.position,B.pointA)),M&&(I=c.add(M.position,B.pointB)),k&&I&&(s.contains(o.bounds,k)||s.contains(o.bounds,I))&&x.push(B);
}p.scale(1/C,1/w),p.translate(-o.bounds.min.x,-o.bounds.min.y)}else x=y,g=f;!v.wireframes||e.enableSleeping&&v.showSleeping?n.bodies(e,g,p):(v.showConvexHulls&&n.bodyConvexHulls(e,g,p),n.bodyWireframes(e,g,p)),v.showBounds&&n.bodyBounds(e,g,p),(v.showAxes||v.showAngleIndicator)&&n.bodyAxes(e,g,p),v.showPositions&&n.bodyPositions(e,g,p),v.showVelocity&&n.bodyVelocity(e,g,p),v.showIds&&n.bodyIds(e,g,p),v.showSeparations&&n.separations(e,e.pairs.list,p),v.showCollisions&&n.collisions(e,e.pairs.list,p),v.showVertexNumbers&&n.vertexNumbers(e,g,p),v.showMousePosition&&n.mousePosition(e,o.mouse,p),n.constraints(x,p),v.showBroadphase&&e.broadphase.controller===l&&n.grid(e,e.broadphase,p),v.showDebug&&n.debug(e,p),v.hasBounds&&p.setTransform(v.pixelRatio,0,0,v.pixelRatio,0,0),a.trigger(o,"afterRender",h)},n.debug=function(e,t){var o=t,n=e.world,i=e.render,s=e.metrics,a=i.options,l=(r.allBodies(n),"    ");if(e.timing.timestamp-(i.debugTimestamp||0)>=500){var c="";s.timing&&(c+="fps: "+Math.round(s.timing.fps)+l),
i.debugString=c,i.debugTimestamp=e.timing.timestamp}if(i.debugString){o.font="12px Arial",a.wireframes?o.fillStyle="rgba(255,255,255,0.5)":o.fillStyle="rgba(0,0,0,0.5)";for(var d=i.debugString.split("\n"),u=0;u<d.length;u++)o.fillText(d[u],50,50+18*u)}},n.constraints=function(e,t){for(var o=t,n=0;n<e.length;n++){var i=e[n];if(i.render.visible&&i.pointA&&i.pointB){var r=i.bodyA,s=i.bodyB;r?(o.beginPath(),o.moveTo(r.position.x+i.pointA.x,r.position.y+i.pointA.y)):(o.beginPath(),o.moveTo(i.pointA.x,i.pointA.y)),s?o.lineTo(s.position.x+i.pointB.x,s.position.y+i.pointB.y):o.lineTo(i.pointB.x,i.pointB.y),o.lineWidth=i.render.lineWidth,o.strokeStyle=i.render.strokeStyle,o.stroke()}}},n.bodyShadows=function(e,t,o){for(var n=o,i=e.render,r=0;r<t.length;r++){var s=t[r];if(s.render.visible){if(s.circleRadius)n.beginPath(),n.arc(s.position.x,s.position.y,s.circleRadius,0,2*Math.PI),n.closePath();else{n.beginPath(),n.moveTo(s.vertices[0].x,s.vertices[0].y);for(var a=1;a<s.vertices.length;a++)n.lineTo(s.vertices[a].x,s.vertices[a].y);
n.closePath()}var l=s.position.x-.5*i.options.width,c=s.position.y-.2*i.options.height,d=Math.abs(l)+Math.abs(c);n.shadowColor="rgba(0,0,0,0.15)",n.shadowOffsetX=.05*l,n.shadowOffsetY=.05*c,n.shadowBlur=1+12*Math.min(1,d/1e3),n.fill(),n.shadowColor=null,n.shadowOffsetX=null,n.shadowOffsetY=null,n.shadowBlur=null}}},n.bodies=function(e,t,n){var i,r,s,a,l=n,c=e.render,d=c.options,u=d.showInternalEdges||!d.wireframes;for(s=0;s<t.length;s++)if(i=t[s],i.render.visible)for(a=i.parts.length>1?1:0;a<i.parts.length;a++)if(r=i.parts[a],r.render.visible){if(d.showSleeping&&i.isSleeping?l.globalAlpha=.5*r.render.opacity:1!==r.render.opacity&&(l.globalAlpha=r.render.opacity),r.render.sprite&&r.render.sprite.texture&&!d.wireframes){var p=r.render.sprite,v=o(c,p.texture);l.translate(r.position.x,r.position.y),l.rotate(r.angle),l.drawImage(v,v.width*-p.xOffset*p.xScale,v.height*-p.yOffset*p.yScale,v.width*p.xScale,v.height*p.yScale),l.rotate(-r.angle),l.translate(-r.position.x,-r.position.y)}else{if(r.circleRadius)l.beginPath(),
l.arc(r.position.x,r.position.y,r.circleRadius,0,2*Math.PI);else{l.beginPath(),l.moveTo(r.vertices[0].x,r.vertices[0].y);for(var f=1;f<r.vertices.length;f++)!r.vertices[f-1].isInternal||u?l.lineTo(r.vertices[f].x,r.vertices[f].y):l.moveTo(r.vertices[f].x,r.vertices[f].y),r.vertices[f].isInternal&&!u&&l.moveTo(r.vertices[(f+1)%r.vertices.length].x,r.vertices[(f+1)%r.vertices.length].y);l.lineTo(r.vertices[0].x,r.vertices[0].y),l.closePath()}d.wireframes?(l.lineWidth=1,l.strokeStyle="#bbb"):(l.fillStyle=r.render.fillStyle,l.lineWidth=r.render.lineWidth,l.strokeStyle=r.render.strokeStyle,l.fill()),l.stroke()}l.globalAlpha=1}},n.bodyWireframes=function(e,t,o){var n,i,r,s,a,l=o,c=e.render.options.showInternalEdges;for(l.beginPath(),r=0;r<t.length;r++)if(n=t[r],n.render.visible)for(a=n.parts.length>1?1:0;a<n.parts.length;a++){for(i=n.parts[a],l.moveTo(i.vertices[0].x,i.vertices[0].y),s=1;s<i.vertices.length;s++)!i.vertices[s-1].isInternal||c?l.lineTo(i.vertices[s].x,i.vertices[s].y):l.moveTo(i.vertices[s].x,i.vertices[s].y),
i.vertices[s].isInternal&&!c&&l.moveTo(i.vertices[(s+1)%i.vertices.length].x,i.vertices[(s+1)%i.vertices.length].y);l.lineTo(i.vertices[0].x,i.vertices[0].y)}l.lineWidth=1,l.strokeStyle="#bbb",l.stroke()},n.bodyConvexHulls=function(e,t,o){var n,i,r,s=o;for(s.beginPath(),i=0;i<t.length;i++)if(n=t[i],n.render.visible&&1!==n.parts.length){for(s.moveTo(n.vertices[0].x,n.vertices[0].y),r=1;r<n.vertices.length;r++)s.lineTo(n.vertices[r].x,n.vertices[r].y);s.lineTo(n.vertices[0].x,n.vertices[0].y)}s.lineWidth=1,s.strokeStyle="rgba(255,255,255,0.2)",s.stroke()},n.vertexNumbers=function(e,t,o){var n,i,r,s=o;for(n=0;n<t.length;n++){var a=t[n].parts;for(r=a.length>1?1:0;r<a.length;r++){var l=a[r];for(i=0;i<l.vertices.length;i++)s.fillStyle="rgba(255,255,255,0.2)",s.fillText(n+"_"+i,l.position.x+.8*(l.vertices[i].x-l.position.x),l.position.y+.8*(l.vertices[i].y-l.position.y))}}},n.mousePosition=function(e,t,o){var n=o;n.fillStyle="rgba(255,255,255,0.8)",n.fillText(t.position.x+"  "+t.position.y,t.position.x+5,t.position.y-5);
},n.bodyBounds=function(e,t,o){var n=o,i=e.render,r=i.options;n.beginPath();for(var s=0;s<t.length;s++){var a=t[s];if(a.render.visible)for(var l=t[s].parts,c=l.length>1?1:0;c<l.length;c++){var d=l[c];n.rect(d.bounds.min.x,d.bounds.min.y,d.bounds.max.x-d.bounds.min.x,d.bounds.max.y-d.bounds.min.y)}}r.wireframes?n.strokeStyle="rgba(255,255,255,0.08)":n.strokeStyle="rgba(0,0,0,0.1)",n.lineWidth=1,n.stroke()},n.bodyAxes=function(e,t,o){var n,i,r,s,a=o,l=e.render,c=l.options;for(a.beginPath(),i=0;i<t.length;i++){var d=t[i],u=d.parts;if(d.render.visible)if(c.showAxes)for(r=u.length>1?1:0;r<u.length;r++)for(n=u[r],s=0;s<n.axes.length;s++){var p=n.axes[s];a.moveTo(n.position.x,n.position.y),a.lineTo(n.position.x+20*p.x,n.position.y+20*p.y)}else for(r=u.length>1?1:0;r<u.length;r++)for(n=u[r],s=0;s<n.axes.length;s++)a.moveTo(n.position.x,n.position.y),a.lineTo((n.vertices[0].x+n.vertices[n.vertices.length-1].x)/2,(n.vertices[0].y+n.vertices[n.vertices.length-1].y)/2)}c.wireframes?a.strokeStyle="indianred":(a.strokeStyle="rgba(0,0,0,0.8)",
a.globalCompositeOperation="overlay"),a.lineWidth=1,a.stroke(),a.globalCompositeOperation="source-over"},n.bodyPositions=function(e,t,o){var n,i,r,s,a=o,l=e.render,c=l.options;for(a.beginPath(),r=0;r<t.length;r++)if(n=t[r],n.render.visible)for(s=0;s<n.parts.length;s++)i=n.parts[s],a.arc(i.position.x,i.position.y,3,0,2*Math.PI,!1),a.closePath();for(c.wireframes?a.fillStyle="indianred":a.fillStyle="rgba(0,0,0,0.5)",a.fill(),a.beginPath(),r=0;r<t.length;r++)n=t[r],n.render.visible&&(a.arc(n.positionPrev.x,n.positionPrev.y,2,0,2*Math.PI,!1),a.closePath());a.fillStyle="rgba(255,165,0,0.8)",a.fill()},n.bodyVelocity=function(e,t,o){var n=o;n.beginPath();for(var i=0;i<t.length;i++){var r=t[i];r.render.visible&&(n.moveTo(r.position.x,r.position.y),n.lineTo(r.position.x+2*(r.position.x-r.positionPrev.x),r.position.y+2*(r.position.y-r.positionPrev.y)))}n.lineWidth=3,n.strokeStyle="cornflowerblue",n.stroke()},n.bodyIds=function(e,t,o){var n,i,r=o;for(n=0;n<t.length;n++)if(t[n].render.visible){var s=t[n].parts;
for(i=s.length>1?1:0;i<s.length;i++){var a=s[i];r.font="12px Arial",r.fillStyle="rgba(255,255,255,0.5)",r.fillText(a.id,a.position.x+10,a.position.y-10)}}},n.collisions=function(e,t,o){var n,i,r,s,a=o,l=e.render.options;for(a.beginPath(),r=0;r<t.length;r++)if(n=t[r],n.isActive)for(i=n.collision,s=0;s<n.activeContacts.length;s++){var c=n.activeContacts[s],d=c.vertex;a.rect(d.x-1.5,d.y-1.5,3.5,3.5)}for(l.wireframes?a.fillStyle="rgba(255,255,255,0.7)":a.fillStyle="orange",a.fill(),a.beginPath(),r=0;r<t.length;r++)if(n=t[r],n.isActive&&(i=n.collision,n.activeContacts.length>0)){var u=n.activeContacts[0].vertex.x,p=n.activeContacts[0].vertex.y;2===n.activeContacts.length&&(u=(n.activeContacts[0].vertex.x+n.activeContacts[1].vertex.x)/2,p=(n.activeContacts[0].vertex.y+n.activeContacts[1].vertex.y)/2),i.bodyB===i.supports[0].body||i.bodyA.isStatic===!0?a.moveTo(u-8*i.normal.x,p-8*i.normal.y):a.moveTo(u+8*i.normal.x,p+8*i.normal.y),a.lineTo(u,p)}l.wireframes?a.strokeStyle="rgba(255,165,0,0.7)":a.strokeStyle="orange",
a.lineWidth=1,a.stroke()},n.separations=function(e,t,o){var n,i,r,s,a,l=o,c=e.render.options;for(l.beginPath(),a=0;a<t.length;a++)if(n=t[a],n.isActive){i=n.collision,r=i.bodyA,s=i.bodyB;var d=1;s.isStatic||r.isStatic||(d=.5),s.isStatic&&(d=0),l.moveTo(s.position.x,s.position.y),l.lineTo(s.position.x-i.penetration.x*d,s.position.y-i.penetration.y*d),d=1,s.isStatic||r.isStatic||(d=.5),r.isStatic&&(d=0),l.moveTo(r.position.x,r.position.y),l.lineTo(r.position.x+i.penetration.x*d,r.position.y+i.penetration.y*d)}c.wireframes?l.strokeStyle="rgba(255,165,0,0.5)":l.strokeStyle="orange",l.stroke()},n.grid=function(e,t,o){var n=o,r=e.render.options;r.wireframes?n.strokeStyle="rgba(255,180,0,0.1)":n.strokeStyle="rgba(255,180,0,0.5)",n.beginPath();for(var s=i.keys(t.buckets),a=0;a<s.length;a++){var l=s[a];if(!(t.buckets[l].length<2)){var c=l.split(",");n.rect(.5+parseInt(c[0],10)*t.bucketWidth,.5+parseInt(c[1],10)*t.bucketHeight,t.bucketWidth,t.bucketHeight)}}n.lineWidth=1,n.stroke()},n.inspector=function(e,t){
var o,n=e.engine,i=e.selected,r=n.render,s=r.options;if(s.hasBounds){var a=r.bounds.max.x-r.bounds.min.x,l=r.bounds.max.y-r.bounds.min.y,c=a/r.options.width,d=l/r.options.height;t.scale(1/c,1/d),t.translate(-r.bounds.min.x,-r.bounds.min.y)}for(var u=0;u<i.length;u++){var p=i[u].data;switch(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle="rgba(255,165,0,0.9)",t.setLineDash([1,2]),p.type){case"body":o=p.bounds,t.beginPath(),t.rect(Math.floor(o.min.x-3),Math.floor(o.min.y-3),Math.floor(o.max.x-o.min.x+6),Math.floor(o.max.y-o.min.y+6)),t.closePath(),t.stroke();break;case"constraint":var v=p.pointA;p.bodyA&&(v=p.pointB),t.beginPath(),t.arc(v.x,v.y,10,0,2*Math.PI),t.closePath(),t.stroke()}t.setLineDash([]),t.translate(-.5,-.5)}null!==e.selectStart&&(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle="rgba(255,165,0,0.6)",t.fillStyle="rgba(255,165,0,0.1)",o=e.selectBounds,t.beginPath(),t.rect(Math.floor(o.min.x),Math.floor(o.min.y),Math.floor(o.max.x-o.min.x),Math.floor(o.max.y-o.min.y)),t.closePath(),
t.stroke(),t.fill(),t.translate(-.5,-.5)),s.hasBounds&&t.setTransform(1,0,0,1,0,0)};var e=function(e,t){var o=document.createElement("canvas");return o.width=e,o.height=t,o.oncontextmenu=function(){return!1},o.onselectstart=function(){return!1},o},t=function(e){var t=e.getContext("2d"),o=window.devicePixelRatio||1,n=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return o/n},o=function(e,t){var o=e.textures[t];return o?o:(o=e.textures[t]=new Image,o.src=t,o)},d=function(e,t){var o=t;/(jpg|gif|png)$/.test(t)&&(o="url("+t+")"),e.canvas.style.background=o,e.canvas.style.backgroundSize="contain",e.currentBackground=t}}()},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":24,"../geometry/Vector":26}],30:[function(e,t,o){var n={};t.exports=n;var i=e("../body/Composite"),r=e("../core/Common");!function(){n.create=function(e){var t={controller:n,
element:null,canvas:null,renderer:null,container:null,spriteContainer:null,pixiOptions:null,options:{width:800,height:600,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1}},o=r.extend(t,e),i=!o.options.wireframes&&"transparent"===o.options.background;return o.pixiOptions=o.pixiOptions||{view:o.canvas,transparent:i,antialias:!0,backgroundColor:e.background},o.renderer=o.renderer||new PIXI.WebGLRenderer(o.options.width,o.options.height,o.pixiOptions),o.container=o.container||new PIXI.Container,o.spriteContainer=o.spriteContainer||new PIXI.Container,o.canvas=o.canvas||o.renderer.view,o.bounds=o.bounds||{min:{x:0,y:0},max:{x:o.options.width,y:o.options.height}},o.textures={},o.sprites={},o.primitives={},o.container.addChild(o.spriteContainer),r.isElement(o.element)?o.element.appendChild(o.canvas):r.log('No "render.element" passed, "render.canvas" was not inserted into document.',"warn"),
o.canvas.oncontextmenu=function(){return!1},o.canvas.onselectstart=function(){return!1},o},n.clear=function(e){for(var t=e.container,o=e.spriteContainer;t.children[0];)t.removeChild(t.children[0]);for(;o.children[0];)o.removeChild(o.children[0]);var n=e.sprites["bg-0"];e.textures={},e.sprites={},e.primitives={},e.sprites["bg-0"]=n,n&&t.addChildAt(n,0),e.container.addChild(e.spriteContainer),e.currentBackground=null,t.scale.set(1,1),t.position.set(0,0)},n.setBackground=function(e,t){if(e.currentBackground!==t){var n=t.indexOf&&-1!==t.indexOf("#"),i=e.sprites["bg-0"];if(n){var s=r.colorToNumber(t);e.renderer.backgroundColor=s,i&&e.container.removeChild(i)}else if(!i){var a=o(e,t);i=e.sprites["bg-0"]=new PIXI.Sprite(a),i.position.x=0,i.position.y=0,e.container.addChildAt(i,0)}e.currentBackground=t}},n.world=function(e){var t,o=e.render,r=e.world,s=o.renderer,a=o.container,l=o.options,c=i.allBodies(r),d=i.allConstraints(r),u=[];l.wireframes?n.setBackground(o,l.wireframeBackground):n.setBackground(o,l.background);
var p=o.bounds.max.x-o.bounds.min.x,v=o.bounds.max.y-o.bounds.min.y,f=p/o.options.width,y=v/o.options.height;if(l.hasBounds){for(t=0;t<c.length;t++){var m=c[t];m.render.sprite.visible=Bounds.overlaps(m.bounds,o.bounds)}for(t=0;t<d.length;t++){var g=d[t],x=g.bodyA,h=g.bodyB,b=g.pointA,S=g.pointB;x&&(b=Vector.add(x.position,g.pointA)),h&&(S=Vector.add(h.position,g.pointB)),b&&S&&(Bounds.contains(o.bounds,b)||Bounds.contains(o.bounds,S))&&u.push(g)}a.scale.set(1/f,1/y),a.position.set(-o.bounds.min.x*(1/f),-o.bounds.min.y*(1/y))}else u=d;for(t=0;t<c.length;t++)n.body(e,c[t]);for(t=0;t<u.length;t++)n.constraint(e,u[t]);s.render(a)},n.constraint=function(e,t){var o=e.render,n=t.bodyA,i=t.bodyB,s=t.pointA,a=t.pointB,l=o.container,c=t.render,d="c-"+t.id,u=o.primitives[d];return u||(u=o.primitives[d]=new PIXI.Graphics),c.visible&&t.pointA&&t.pointB?(-1===r.indexOf(l.children,u)&&l.addChild(u),u.clear(),u.beginFill(0,0),u.lineStyle(c.lineWidth,r.colorToNumber(c.strokeStyle),1),n?u.moveTo(n.position.x+s.x,n.position.y+s.y):u.moveTo(s.x,s.y),
i?u.lineTo(i.position.x+a.x,i.position.y+a.y):u.lineTo(a.x,a.y),void u.endFill()):void u.clear()},n.body=function(o,n){var i=o.render,s=n.render;if(s.visible)if(s.sprite&&s.sprite.texture){var a="b-"+n.id,l=i.sprites[a],c=i.spriteContainer;l||(l=i.sprites[a]=e(i,n)),-1===r.indexOf(c.children,l)&&c.addChild(l),l.position.x=n.position.x,l.position.y=n.position.y,l.rotation=n.angle,l.scale.x=s.sprite.xScale||1,l.scale.y=s.sprite.yScale||1}else{var d="b-"+n.id,u=i.primitives[d],p=i.container;u||(u=i.primitives[d]=t(i,n),u.initialAngle=n.angle),-1===r.indexOf(p.children,u)&&p.addChild(u),u.position.x=n.position.x,u.position.y=n.position.y,u.rotation=n.angle-u.initialAngle}};var e=function(e,t){var n=t.render,i=n.sprite.texture,r=o(e,i),s=new PIXI.Sprite(r);return s.anchor.x=t.render.sprite.xOffset,s.anchor.y=t.render.sprite.yOffset,s},t=function(e,t){var o,n=t.render,i=e.options,s=new PIXI.Graphics,a=r.colorToNumber(n.fillStyle),l=r.colorToNumber(n.strokeStyle),c=r.colorToNumber(n.strokeStyle),d=r.colorToNumber("#bbb"),u=r.colorToNumber("#CD5C5C");
s.clear();for(var p=t.parts.length>1?1:0;p<t.parts.length;p++){o=t.parts[p],i.wireframes?(s.beginFill(0,0),s.lineStyle(1,d,1)):(s.beginFill(a,1),s.lineStyle(n.lineWidth,l,1)),s.moveTo(o.vertices[0].x-t.position.x,o.vertices[0].y-t.position.y);for(var v=1;v<o.vertices.length;v++)s.lineTo(o.vertices[v].x-t.position.x,o.vertices[v].y-t.position.y);s.lineTo(o.vertices[0].x-t.position.x,o.vertices[0].y-t.position.y),s.endFill(),(i.showAngleIndicator||i.showAxes)&&(s.beginFill(0,0),i.wireframes?s.lineStyle(1,u,1):s.lineStyle(1,c),s.moveTo(o.position.x-t.position.x,o.position.y-t.position.y),s.lineTo((o.vertices[0].x+o.vertices[o.vertices.length-1].x)/2-t.position.x,(o.vertices[0].y+o.vertices[o.vertices.length-1].y)/2-t.position.y),s.endFill())}return s},o=function(e,t){var o=e.textures[t];return o||(o=e.textures[t]=PIXI.Texture.fromImage(t)),o}}()},{"../body/Composite":2,"../core/Common":14}]},{},[28])(28)});