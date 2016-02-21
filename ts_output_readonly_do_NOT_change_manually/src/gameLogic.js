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
    gameLogic.COINSIZE = 2;
    // Board dimensions
    gameLogic.BOARDWIDTH = 40;
    gameLogic.BOARDHEIGHT = 40;
    // Return initial board 
    function getInitialBoard() {
        var boardSize = getInitialSize();
        var board = [];
        // set the position of hte queen
        // insert that qqueen into board
        var queen = { xPos: boardSize.centerX,
            yPos: boardSize.centerY,
            size: gameLogic.COINSIZE,
            type: CoinType.Queen };
        board.push(queen);
        return board;
    }
    // Second ring
    //for (let j = 0; j < COLS; j++) {
    //    board[i][j] = '';
    //}
    function calculateFirstLayer(queen) {
        var coins = [];
        // Calculate first ring of coins
        var color = false;
        for (var i = 0; i < gameLogic.FIRSTLAYER; i++) {
            //let x = Math.cos(i*((2*Math.PI)/FIRSTLAYER)) * queen.size + BOARDWIDTH/2;
            //let y = Math.sin(i*((2*Math.PI)/FIRSTLAYER)) * queen.size + BOARDHEIGHT/2;
            var x = Math.cos(i * ((2 * Math.PI) / gameLogic.FIRSTLAYER)) + gameLogic.BOARDWIDTH / 2;
            var y = Math.sin(i * ((2 * Math.PI) / gameLogic.FIRSTLAYER)) + gameLogic.BOARDHEIGHT / 2;
            var coinType = color ? CoinType.Black : CoinType.White;
            color = !color;
            var coin = { xPos: x,
                yPos: y,
                size: gameLogic.COINSIZE,
                type: coinType };
            coins.push(coin);
        }
        return coins;
    }
    gameLogic.calculateFirstLayer = calculateFirstLayer;
    function compare(x, y) {
        if (Math.abs(x - y) < 0.00001)
            return true;
        else
            return false;
    }
    function sign(x) {
        if (x < 0)
            return -1;
        else
            return 1;
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