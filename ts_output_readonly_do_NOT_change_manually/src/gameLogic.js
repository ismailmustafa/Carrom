var CoinType;
(function (CoinType) {
    CoinType[CoinType["Queen"] = 0] = "Queen";
    CoinType[CoinType["Black"] = 1] = "Black";
    CoinType[CoinType["White"] = 2] = "White";
})(CoinType || (CoinType = {}));
var gameLogic;
(function (gameLogic) {
    // Coin counts
    gameLogic.NUMCOINS = 19;
    gameLogic.NUMBLACK = 9;
    gameLogic.NUMWHITE = 9;
    gameLogic.NUMQUEEN = 1;
    // Coin initializer properties
    gameLogic.FIRSTLAYER = 6;
    gameLogic.SECONDLAYER = 12;
    gameLogic.COINSIZE = 1;
    // Board dimensions
    gameLogic.BOARDWIDTH = 40;
    gameLogic.BOARDHEIGHT = 40;
    // Starting coin layer 
    gameLogic.NUMBEROFSIDES = 6;
    gameLogic.HEXSIZE = gameLogic.COINSIZE * 2;
    // Return initial board 
    function getInitialBoard() {
        var boardSize = getInitialSize();
        var board = [];
        // set the position of the queen
        // insert that qqueen into board
        var queen = { xPos: boardSize.centerX,
            yPos: boardSize.centerY,
            size: gameLogic.COINSIZE,
            type: CoinType.Queen };
        // Initialize two layers
        var coins = [];
        coins.push(queen);
        var numberOfSides = 6;
        var color = false;
        var circles = [];
        for (var i = 1; i <= gameLogic.NUMBEROFSIDES; i++) {
            var c = getCoordinates(boardSize.centerX, boardSize.centerY, i, gameLogic.HEXSIZE);
            var c2 = getCoordinates(boardSize.centerX, boardSize.centerY, i, gameLogic.HEXSIZE * 2);
            circles.push(c2);
            var coinType = color ? CoinType.Black : CoinType.White;
            color = !color;
            coins.push(createCoin(c, coinType));
            coins.push(createCoin(c2, coinType));
        }
        color = false;
        for (var i = 0; i < circles.length; i++) {
            var c = { xPos: (circles[i].xPos + circles[(i + 1) % gameLogic.NUMBEROFSIDES].xPos) / 2.0,
                yPos: (circles[i].yPos + circles[(i + 1) % gameLogic.NUMBEROFSIDES].yPos) / 2.0 };
            var coinType = color ? CoinType.Black : CoinType.White;
            color = !color;
            coins.push(createCoin(c, coinType));
        }
        return coins;
    }
    gameLogic.getInitialBoard = getInitialBoard;
    function createCoin(c, coinType) {
        var coin = { xPos: c.xPos,
            yPos: c.yPos,
            size: gameLogic.COINSIZE,
            type: coinType };
        return coin;
    }
    function getCoordinates(centerX, centerY, index, hexSize) {
        var c = { xPos: centerX + hexSize * Math.cos(index * 2 * Math.PI / gameLogic.NUMBEROFSIDES),
            yPos: centerY + hexSize * Math.sin(index * 2 * Math.PI / gameLogic.NUMBEROFSIDES) };
        return c;
    }
    function getInitialSize() {
        var boardSize = { width: gameLogic.BOARDWIDTH,
            height: gameLogic.BOARDHEIGHT,
            centerX: gameLogic.BOARDWIDTH / 2,
            centerY: gameLogic.BOARDHEIGHT / 2 };
        return boardSize;
    }
    gameLogic.getInitialSize = getInitialSize;
    function getInitialState() {
        return { board: getInitialBoard(), boardSize: getInitialSize() };
    }
    gameLogic.getInitialState = getInitialState;
})(gameLogic || (gameLogic = {}));
//# sourceMappingURL=gameLogic.js.map