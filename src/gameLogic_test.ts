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
  
  // Helper function to fuzzy compare two floats
  function compare(a : number, b : number): boolean {
    let absDiff = Math.abs(a - b);
    if (absDiff < 0.0001) return true;
    else return false;
  }
  
//   interface IState {
//     board: Board,
//     playerColor: PlayerColor,
//     gameScore: GameScore
// }

// {
//       // Location of all coins
//       board: getInitialBoard(gameSettings),
//       // Relation between player index and color
//       playerColor: {
//         player1: {
//           color: Color.Nothing,
//           index: 0
//         },
//         player2: {
//           color: Color.Nothing,
//           index: 0
//         }
//       },
//       // Game score tracking
//       gameScore: {White: 0, Black: 0}
//     };
  
  // Use this function to generate arbitrary state
  function generateState(numBlack: number, numWhite: number, includeQueen: boolean, whiteScore: number, blackScore: number) : IState {
    
    // Coins
    let allCoins : Board = [];
    for (let i = 0; i < numBlack; i++) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "black", shouldRescale: false});
    for (let i = 0; i < numWhite; i++) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "white", shouldRescale: false});
    if (includeQueen) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "pink", shouldRescale: false});
    
    // Player color
    let playerIndex : PlayerIndex = {player1: 0, player2: 1};
    
    // Game score
    let gameScore =  {player1: whiteScore, player2: blackScore};
    
    return {board: allCoins, playerIndex: playerIndex, gameScore: gameScore};
  }
  
  // Test initial board state
  it("should ensure that all coins are placed on correct initial positions", function() {
    testInitialBoardState();
  });
  
  // Test if queen is pocketed
  it("should ensure that we can tell when the queen is pocketed", function() {
    let stateWithQueen = generateState(5,5,true,0,0);
    let stateWithoutQueen = generateState(5,5,false,0,0);
    if (gameLogic.queenPocketed(stateWithQueen)) { 
      throw new Error("'queenPocketed' returned true even though queen was on the board");
    }
    if (!gameLogic.queenPocketed(stateWithoutQueen)) {
      throw new Error("'queenPocketed' returned false even though queen was pocketed");
    } 
  });
  
  // Test if game is over
  it("should ensure that we can tell when the game is over", function() {
    let emptyState = generateState(0,0,false,0,0);
    let nonEmptyState = generateState(5,5,true,0,0);
    if (!gameLogic.gameIsOver(emptyState)) {
      throw new Error("'gameIsOver' returned false when the board was supposed to be over");
    }
    if (gameLogic.gameIsOver(nonEmptyState)) {
      throw new Error("'gameIsOver' returned true when there were still coins on the board");
    }
  });
  
});
