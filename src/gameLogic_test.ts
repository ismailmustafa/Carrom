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
  
  // Use this function to generate arbitrary state
  function generateState(numBlack: number, numWhite: number, includeQueen: boolean, whiteScore: number, blackScore: number, setShouldCoverQueen: boolean) : IState {
    
    // Coins
    let allCoins : Board = [];
    for (let i = 0; i < numBlack; i++) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "black", shouldRescale: false});
    for (let i = 0; i < numWhite; i++) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "white", shouldRescale: false});
    if (includeQueen) allCoins.push({coordinate: {xPos: 0, yPos: 0}, color: "pink", shouldRescale: false});
    
    // Player index
    let playerIndex : PlayerIndex = {player1: 0, player2: 1};
    
    // Game score
    let gameScore =  {player1: whiteScore, player2: blackScore};
    
    // Set if queen is pocketed
    let shouldCoverQueen = setShouldCoverQueen;
    
    return {board: allCoins, playerIndex: playerIndex, gameScore: gameScore, shouldCoverQueen: shouldCoverQueen, shouldFlipBoard: true, realFirstMove:true, currentMode: "None"};
  }
  
  // Test initial board state
  it("should ensure that all coins are placed on correct initial positions", function() {
    testInitialBoardState();
  });
  
  // Test if queen is pocketed
  it("should ensure that we can tell when the queen is pocketed", function() {
    let stateWithQueen = generateState(5,5,true,0,0,false);
    let stateWithoutQueen = generateState(5,5,false,0,0, false);
    if (gameLogic.queenPocketed(stateWithQueen)) { 
      throw new Error("'queenPocketed' returned true even though queen was on the board");
    }
    if (!gameLogic.queenPocketed(stateWithoutQueen)) {
      throw new Error("'queenPocketed' returned false even though queen was pocketed");
    } 
  });
  
  // Test if queen was just pocketed
  it("should ensure that we can tell that queen was JUST pocketed", function() {
    let stateWithQueen = generateState(5,5,true,0,0,false);
    let stateWithoutQueen = generateState(5,5,false,0,0, false);
    if (!gameLogic.queenJustPocketed(stateWithQueen, stateWithoutQueen)) { 
      throw new Error("'queenJustPocketed' returned false even though the queen was just pocketed");
    }
    if (gameLogic.queenJustPocketed(stateWithQueen, stateWithQueen)) { 
      throw new Error("'queenJustPocketed' returned true even though the queen was not just pocketed");
    }
    if (gameLogic.queenJustPocketed(stateWithoutQueen, stateWithoutQueen)) { 
      throw new Error("'queenJustPocketed' returned true even though the queen was not present in both states");
    }
    if (gameLogic.queenJustPocketed(stateWithoutQueen, stateWithQueen)) { 
      throw new Error("'queenJustPocketed' returned true even though the queen was returned to the board");
    }
  });
  
  // Test if game is over
  it("should ensure that we can tell when the game is over", function() {
    let emptyState = generateState(0,0,false,0,0,false);
    let nonEmptyState = generateState(5,5,true,0,0,false);
    if (!gameLogic.gameIsOver(emptyState)) {
      throw new Error("'gameIsOver' returned false when the board was supposed to be over");
    }
    if (gameLogic.gameIsOver(nonEmptyState)) {
      throw new Error("'gameIsOver' returned true when there were still coins on the board");
    }
  });
  
  // Test if calculate score works
  it("should ensure that score calculation is correct", function() {
    
    // Player1 SHOOTS BLACK IN
    let previousState1 = generateState(5,5,true,0,0,false);
    let currentState1 = generateState(4,5,true,0,0,false);
    let pair1 = gameLogic.calculateScore(previousState1, currentState1, 0);
    currentState1.gameScore = pair1.fst;
    let turnShouldSwitch1 = pair1.snd;
    // Test if score matches
    if (!angular.equals(currentState1.gameScore,{player1: 5, player2: 0})) {
      console.log("previous:", previousState1.gameScore, "current:", currentState1.gameScore);
      throw new Error("player1 shoots black in");
    }
    if (turnShouldSwitch1) {
      throw new Error("player1 shot black in. That means that the turn should NOT switch");
    }
    
    // Player2 SHOOTS BLACK IN
    let previousState2 = generateState(5,5,true,0,0,false);
    let currentState2 = generateState(4,5,true,0,0,false);
    let pair2 = gameLogic.calculateScore(previousState2, currentState2, 1);
    currentState2.gameScore = pair2.fst;
    let turnShouldSwitch2 = pair2.snd; 
    // Test if score matches
    if (!angular.equals(currentState2.gameScore, {player1: 0, player2: 5})) {
      console.log("previous:", previousState2.gameScore, "current:", currentState2.gameScore);
      throw new Error("player2 shoots black in");
    }
    if (turnShouldSwitch2) {
      throw new Error("player2 shot black in. That means that the turn should NOT switch");
    }
    
    // Player1 SHOOTS WHITE IN
    let previousState3 = generateState(5,5,true,0,0,false);
    let currentState3 = generateState(5,4,true,0,0,false);
    let pair3 = gameLogic.calculateScore(previousState3, currentState3, 0);
    currentState3.gameScore = pair3.fst;
    let turnShouldSwitch3 = pair3.snd;
    // Test if score matches
    if (!angular.equals(currentState3.gameScore, {player1: 10, player2: 0})) {
      console.log("previous:", previousState3.gameScore, "current:", currentState3.gameScore);
      throw new Error("player1 shoots white in");
    }
    if (turnShouldSwitch3) {
      throw new Error("player1 shot white in. That means that the turn should NOT switch");
    }
    
    // Player2 SHOOTS WHITE IN
    let previousState4 = generateState(5,5,true,0,0,false);
    let currentState4 = generateState(5,4,true,0,0,false);
    let pair4 = gameLogic.calculateScore(previousState4, currentState4, 1);
    currentState4.gameScore = pair4.fst;
    let turnShouldSwitch4 = pair4.snd;
    // Test if score matches
    if (!angular.equals(currentState4.gameScore, {player1: 0, player2: 10})) {
      console.log("previous:", previousState4.gameScore, "current:", currentState4.gameScore);
      throw new Error("player2 shoots white in");
    }
    if (turnShouldSwitch4) {
      throw new Error("player2 shot white in. That means that the turn should NOT switch");
    }
    
    // Player1 SHOOTS QUEEN IN
    let previousState5 = generateState(5,5,true,0,0,false);
    let currentState5 = generateState(5,5,false,0,0,true);
    let pair5 = gameLogic.calculateScore(previousState5, currentState5, 0);
    currentState5.gameScore = pair5.fst;
    let turnShouldSwitch5 = pair5.snd;
    // Test if score matches
    if (!angular.equals(currentState5.gameScore, {player1: 25, player2: 0})) {
      console.log("previous:", previousState5.gameScore, "current:", currentState5.gameScore);
      throw new Error("player1 shoots queen in");
    }
    if (turnShouldSwitch5) {
      throw new Error("player1 shot the queen in. That means that the turn should NOT switch");
    }
    
    // Player2 SHOOTS QUEEN IN
    let previousState6 = generateState(5,5,true,0,0,false);
    let currentState6 = generateState(5,5,false,0,0,true);
    let pair6 = gameLogic.calculateScore(previousState6, currentState6, 1);
    currentState6.gameScore = pair6.fst;
    let turnShouldSwitch6 = pair6.snd;
    // Test if score matches
    if (!angular.equals(currentState6.gameScore, {player1: 0, player2: 25})) {
      console.log("previous:", previousState6.gameScore, "current:", currentState6.gameScore);
      throw new Error("player2 shoots queen in");
    }
    if (turnShouldSwitch6) {
      throw new Error("player2 shot the queen in. That means that the turn should NOT switch");
    }
    
    // player1 COVERS QUEEN SUCCESSFULLY
    let previousState7 = generateState(5,5,false,25,0,true);
    let currentState7 = generateState(5,4,false,25,0,false);
    let pair7 = gameLogic.calculateScore(previousState7, currentState7, 0);
    currentState7.gameScore = pair7.fst;
    let turnShouldSwitch7 = pair7.snd;
    // Test if score matches
    if (!angular.equals(currentState7.gameScore, {player1: 35, player2: 0})) {
      console.log("previous:", previousState7.gameScore, "current:", currentState7.gameScore);
      throw new Error("player1 covers queen successfully");
    }
    if (turnShouldSwitch7) {
      throw new Error("player1 covered the queen. That means that the turn should NOT switch");
    }
    
    // player1 COVERS QUEEN UN-SUCCESSFULLY
    let previousState8 = generateState(5,5,false,25,0,true);
    let currentState8 = generateState(5,5,false,25,0,false);
    let pair8 = gameLogic.calculateScore(previousState8, currentState8, 0);
    currentState8.gameScore = pair8.fst;
    let turnShouldSwitch8 = pair8.snd;
    // Test if score matches
    if (!angular.equals(currentState8.gameScore, {player1: 0, player2: 0})) {
      console.log("previous:", previousState8.gameScore, "current:", currentState8.gameScore);
      throw new Error("player1 covers queen unsuccessfully");
    }
    if (!turnShouldSwitch8) {
      throw new Error("player1 failed to cover the queen. That means that the turn SHOULD switch");
    }
    
    // player2 COVERS QUEEN SUCCESSFULLY
    let previousState9 = generateState(5,5,false,0,25,true);
    let currentState9 = generateState(5,4,false,0,25,false);
    let pair9 = gameLogic.calculateScore(previousState9, currentState9, 1);
    currentState9.gameScore = pair9.fst;
    let turnShouldSwitch9 = pair9.snd;
    // Test if score matches
    if (!angular.equals(currentState9.gameScore, {player1: 0, player2: 35})) {
      console.log("previous:", previousState9.gameScore, "current:", currentState9.gameScore);
      throw new Error("player2 covers queen successfully");
    }
    if (turnShouldSwitch9) {
      throw new Error("player2 covered the queen. That means that the turn should NOT switch");
    }
    
    // player2 COVERS QUEEN UN-SUCCESSFULLY
    let previousState10 = generateState(5,5,false,0,25,true);
    let currentState10 = generateState(5,5,false,0,25,false);
    let pair10 = gameLogic.calculateScore(previousState10, currentState10, 1);
    currentState10.gameScore = pair10.fst;
    let turnShouldSwitch10 = pair10.snd;
    // Test if score matches
    if (!angular.equals(currentState10.gameScore, {player1: 0, player2: 0})) {
      console.log("previous:", previousState10.gameScore, "current:", currentState10.gameScore);
      throw new Error("player2 covers queen unsuccessfully");
    }
    if (!turnShouldSwitch10) {
      throw new Error("player2 failed to cover the queen. That means that the turn SHOULD switch");
    }
  });
  
  // Test if pocketed coins are calculated correctly
  it("should ensure that pocketed coins are calculate correctly", function() {
    let previousState = generateState(5,5,true,0,0,false);
    let currentState = generateState(4,2,true,0,0,false);
    let pocketedCoinCount : PocketedCoinCount = gameLogic.getPocketedCoinCount(previousState, currentState);
    let blackCount = 0;
    let whiteCount = 0;
    let queenPocketed = false;
    if (pocketedCoinCount.black !== 1 || pocketedCoinCount.white !== 3 || pocketedCoinCount.pink) {
      throw new Error("'getPocketedCoins' function returning wrong pocketed coins");
    }
  });
  
  // Test if state is being modified correctly in preperation of next round
  // it("should ensure that state is being modified correctly for next round", function() {
  //   let previousState = generateState(5,5,false,0,0,true);
  //   let currentState = generateState(4,5,false,0,0,true);
  //   let modifiedState = gameLogic.modifyStateForNextRound(previousState, currentState);
  //   if (modifiedState.shouldCoverQueen === true) {
  //     throw new Error("modified state should set 'shouldCoverQueen' to false");
  //   }
  //   if (!gameLogic.queenPocketed(modifiedState)) {
  //     throw new Error("queen should not be on the board. It was correctly covered");
  //   }
    
  //   let previousState2 = generateState(5,5,false,0,0,true);
  //   let currentState2 = generateState(5,5,false,0,0,true);
  //   let modifiedState2 = gameLogic.modifyStateForNextRound(previousState2, currentState2);
  //   if (modifiedState2.shouldCoverQueen === true) {
  //     throw new Error("modified state 2 should set 'shouldCoverQueen' to false");
  //   }
  //   if (gameLogic.queenPocketed(modifiedState2)) {
  //     throw new Error("queen should be on the board. The player failed to correctly cover it");
  //   }
  // });
});
