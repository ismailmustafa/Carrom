describe("In Carrom Game Logic", function() {

  function testInitialBoardState() {
    let boardSize : BoardSize = gameLogic.getInitialSize();
    let queen : Coin = {xPos:boardSize.centerX,
                        yPos:boardSize.centerY,
                        size:gameLogic.COINSIZE,
                        type:CoinType.Queen};
    let coins = gameLogic.getInitialBoard();
    
    let testCoordinates : Coordinate[] = [];
    testCoordinates.push({xPos: 0, yPos: 0});
    testCoordinates.push({xPos: 1, yPos: 1.73205080756888});
    testCoordinates.push({xPos: 2, yPos: 3.464101615137753});
    testCoordinates.push({xPos: 9, yPos: 1.73205080756888});
    testCoordinates.push({xPos: -2, yPos: 3.464101615137753});
    testCoordinates.push({xPos: -2, yPos: 0});
    testCoordinates.push({xPos: -4, yPos: 0});
    testCoordinates.push({xPos: -1, yPos: -1.732051});
    testCoordinates.push({xPos: -2, yPos: -3.4641017});
    testCoordinates.push({xPos: 1, yPos: -1.732051});
    testCoordinates.push({xPos: 2, yPos: -3.4641017});
    testCoordinates.push({xPos: 2, yPos: 0});
    testCoordinates.push({xPos: 4, yPos: 0});
    testCoordinates.push({xPos: 0, yPos: 3.464101615137753});
    testCoordinates.push({xPos: -3, yPos: 1.732050807568875});
    testCoordinates.push({xPos: -3, yPos: -1.732051});
    testCoordinates.push({xPos: 0, yPos: -3.4641017});
    testCoordinates.push({xPos: 3, yPos: -1.732051});
    testCoordinates.push({xPos: 3, yPos: 1.732050807568875});
    
    let matchCount : number = 0;
    for (let i = 0; i < coins.length; i++) {
      let s = "circle(" + coins[i].xPos + ", " + coins[i].yPos + ",1)";
      console.log(s);
    }
  }
  
  function compare(a : number, b : number): boolean {
    let absDiff = Math.abs(a - b);
    if (absDiff < 0.0001) return true;
    else return false;
  }
  
  function testSomeValue(): number {
    return 1;
  }
  
  it("should do something", function() {
    testInitialBoardState();
  });
  
});