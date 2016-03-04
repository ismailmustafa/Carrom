describe("In Carrom Game Logic", function() {
  
  let coinSize = 1;
  let settings : {[setting : string] : number} = {
    "numCoins" : 19,
    "numBlack" : 9,
    "numWhite" : 9,
    "numQueen" : 1,
    "firstLayer" : 6,
    "secondLayer" : 12,
    "coinSize" : coinSize,
    "outerBoardWidth" : 40,
    "outerBoardHeight" : 40,
    "numberOfSides" : 6,
    "hexSize" : coinSize*2
  };

  // Test if board creation function places all coins at correct
  // locations on board
  function testInitialBoardState() {
    let coins = gameLogic.getInitialBoard(settings);
    
    let testCoordinates : Coordinate[] = [
      {xPos:20, yPos:20},
      {xPos:21, yPos:21.73205080756888},
      {xPos:22, yPos:23.464101615137753},
      {xPos:19, yPos:21.73205080756888},
      {xPos:18, yPos:23.464101615137753},
      {xPos:18, yPos:20},
      {xPos:16, yPos:20},
      {xPos:19, yPos:18.267949192431125},
      {xPos:18, yPos:16.535898384862247},
      {xPos:21, yPos:18.26794919243112},
      {xPos:22, yPos:16.535898384862247},
      {xPos:22, yPos:20},
      {xPos:24, yPos:20},
      {xPos:20, yPos:23.464101615137753},
      {xPos:17, yPos:21.732050807568875},
      {xPos:17, yPos:18.267949192431125},
      {xPos:20, yPos:16.535898384862247},
      {xPos:23, yPos:18.267949192431125},
      {xPos:23, yPos:21.732050807568875}
      ];
    
    for (let i = 0; i < coins.length; i++) {
      let xPosValidate = compare(testCoordinates[i].xPos, coins[i].coordinate.xPos);
      let yPosValidate = compare(testCoordinates[i].yPos, coins[i].coordinate.yPos);
      //console.log(coins[i].coordinate.xPos + " " + coins[i].coordinate.yPos);
      expect(xPosValidate).toBeTruthy();
      expect(yPosValidate).toBeTruthy();
      if (!xPosValidate || !yPosValidate) {
        throw new Error("\n||||||||||||||||||||||||||||||||||||||||||||||||||||||\n"
                         + "Failed on coin number " 
                         + i 
                         + ":\nActual coordinate:    {" 
                         + testCoordinates[i].xPos
                         + ", "
                         + testCoordinates[i].yPos
                         + "}\nGenerated coordinate: {" 
                         + coins[i].coordinate.xPos 
                         + ", " 
                         + coins[i].coordinate.yPos 
                         + "}"
                         + "\n||||||||||||||||||||||||||||||||||||||||||||||||||||||\n");
      }
    }
  }
  
  function compare(a : number, b : number): boolean {
    let absDiff = Math.abs(a - b);
    if (absDiff < 0.0001) return true;
    else return false;
  }
  
  it("should ensure that all coins are placed on correct initial positions", function() {
    testInitialBoardState();
  });
  
});
