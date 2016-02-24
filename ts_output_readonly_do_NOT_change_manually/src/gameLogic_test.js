describe("In Carrom Game Logic", function () {
    function testInitialBoardState() {
        var boardSize = gameLogic.getInitialSize();
        var queen = { xPos: boardSize.centerX,
            yPos: boardSize.centerY,
            size: gameLogic.COINSIZE,
            type: CoinType.Queen };
        var coins = gameLogic.getInitialBoard();
        var testCoordinates = [];
        testCoordinates.push({ xPos: 0, yPos: 0 });
        testCoordinates.push({ xPos: 1, yPos: 1.73205080756888 });
        testCoordinates.push({ xPos: 2, yPos: 3.464101615137753 });
        testCoordinates.push({ xPos: 9, yPos: 1.73205080756888 });
        testCoordinates.push({ xPos: -2, yPos: 3.464101615137753 });
        testCoordinates.push({ xPos: -2, yPos: 0 });
        testCoordinates.push({ xPos: -4, yPos: 0 });
        testCoordinates.push({ xPos: -1, yPos: -1.732051 });
        testCoordinates.push({ xPos: -2, yPos: -3.4641017 });
        testCoordinates.push({ xPos: 1, yPos: -1.732051 });
        testCoordinates.push({ xPos: 2, yPos: -3.4641017 });
        testCoordinates.push({ xPos: 2, yPos: 0 });
        testCoordinates.push({ xPos: 4, yPos: 0 });
        testCoordinates.push({ xPos: 0, yPos: 3.464101615137753 });
        testCoordinates.push({ xPos: -3, yPos: 1.732050807568875 });
        testCoordinates.push({ xPos: -3, yPos: -1.732051 });
        testCoordinates.push({ xPos: 0, yPos: -3.4641017 });
        testCoordinates.push({ xPos: 3, yPos: -1.732051 });
        testCoordinates.push({ xPos: 3, yPos: 1.732050807568875 });
        var matchCount = 0;
        for (var i = 0; i < coins.length; i++) {
            var s = "circle(" + coins[i].xPos + ", " + coins[i].yPos + ",1)";
            console.log(s);
        }
    }
    function compare(a, b) {
        var absDiff = Math.abs(a - b);
        if (absDiff < 0.0001)
            return true;
        else
            return false;
    }
    function testSomeValue() {
        return 1;
    }
    it("should do something", function () {
        testInitialBoardState();
    });
});
//# sourceMappingURL=gameLogic_test.js.map