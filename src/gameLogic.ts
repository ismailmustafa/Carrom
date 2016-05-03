type Board = Coin[];

interface BoardSize {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

interface Striker {
    xPos: number;
    yPos: number;
    diameter: number;
}

interface Coordinate {
  xPos : number;
  yPos : number;
}

interface Coin {
    coordinate : Coordinate;
    color: string;
    shouldRescale: Boolean;
}

interface PlayerIndex {
  player1: number,
  player2: number
}

interface GameScore {
  player1 : number,
  player2 : number
}

enum QueenCover {
  firstCheck,
  secondCheck,
  none
}



interface IState {
  board: Board,
  playerIndex: PlayerIndex,
  gameScore: GameScore,
  shouldCoverQueen: boolean,
  // queenCoverCheck: QueenCover,
  shouldFlipBoard: boolean,
  realFirstMove: boolean,
  currentMode: gameLogic.CurrentMode
}

interface PocketedCoinCount {
  black: number,
  white: number,
  pink: boolean
}

class Pair {
  fstVal : any;
  sndVal : any;
  constructor(fst : any, snd : any) {
    this.fstVal = fst;
    this.sndVal = snd;
  }
  get fst() {
    return this.fstVal;
  }
  get snd() {
    return this.sndVal;
  }
}

module gameLogic {
  export enum CurrentMode {
    Practice,
    PassAndPlay,
    Opponent,
    None
  }
  
  // game score global variable
  export let gameScoreGlobal : GameScore = {player1: 0, player2: 0};
  
  // Create all dimensions for board
  export function drawBoard(width: number, height: number) : Object {
    let size = width < height ? width : height;
    
    // Change these
    let outerBoardWidth = size;
    let outerBoardHeight = outerBoardWidth;
    
    let innerBoardWidth = (74.0/89.2)*outerBoardWidth;
    let innerBoardHeight = innerBoardWidth;

    let coinDiameter = (3.18 / 74.0) * innerBoardWidth;
    let strikerDiameter = (4.1/74.0) * innerBoardWidth;
    let startingCircleDiameter = (17.0 / 74.0) * innerBoardWidth;
    let borderThickness = (7.6 / 74.0) * innerBoardWidth;

    // Coin Pockets
    let coinPocketDiameter = (4.45 / 74.0) * innerBoardWidth;
    let coinPocketThickness = (0.15 / 74.0) * innerBoardWidth;
    let coinPocketTopLeftX = borderThickness + (coinPocketDiameter / 2);
    let coinPocketTopLeftY = borderThickness + (coinPocketDiameter / 2);

    let coinPocketTopRightX = borderThickness + innerBoardWidth - (coinPocketDiameter / 2);
    let coinPocketTopRightY = borderThickness + (coinPocketDiameter / 2);

    let coinPocketBottomLeftX = borderThickness + (coinPocketDiameter / 2);
    let coinPocketBottomLeftY = borderThickness + innerBoardHeight - (coinPocketDiameter / 2);

    let coinPocketBottomRightX = borderThickness + innerBoardWidth - (coinPocketDiameter / 2);
    let coinPocketBottomRightY = borderThickness + innerBoardHeight - (coinPocketDiameter / 2);
    
    // Diagonal Lines
    let diagonalLineTopLeftStartX = borderThickness + coinPocketDiameter + (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineTopLeftStartY = diagonalLineTopLeftStartX;
    let diagonalLineTopLeftEndX = diagonalLineTopLeftStartX + (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineTopLeftEndY = diagonalLineTopLeftEndX;

    let diagonalLineTopRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineTopRightStartY = diagonalLineTopLeftStartX;
    let diagonalLineTopRightEndX = diagonalLineTopRightStartX - (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineTopRightEndY = diagonalLineTopLeftEndX;

    let diagonalLineBottomRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineBottomRightStartY = diagonalLineBottomRightStartX;
    let diagonalLineBottomRightEndX = diagonalLineBottomRightStartX - (((26.70 / 74.0) * innerBoardWidth) / Math.sqrt(2));
    let diagonalLineBottomRightEndY = diagonalLineBottomRightEndX;

    let diagonalLineBottomLeftStartX = diagonalLineTopLeftStartX;
    let diagonalLineBottomLeftStartY = diagonalLineBottomRightStartX;
    let diagonalLineBottomLeftEndX = diagonalLineTopLeftEndX;
    let diagonalLineBottomLeftEndY = diagonalLineBottomRightEndX;

    let diagonalLineThickness = (0.15 / 74.0) * innerBoardWidth;
    
    // Outer and Inner striker circles (1 == leftmost, 2 == rightmost)
    //    Striker placement line measurements and striker circle properties
    let strikerPlacementLineLength = (47.0 / 74.0) * innerBoardWidth;
    let outerStrikerCircleDiameter = (3.18 / 74.0) * innerBoardWidth;
    let innerStrikerCircleDiameter = (2.45 / 74.0) * innerBoardWidth;
    let strikerPlacementLineLengthToCenterOfOuterStrikerCircles = strikerPlacementLineLength - outerStrikerCircleDiameter;
    let outerStrikerCircleThickness = (0.3 / 74.0) * innerBoardWidth;

    let strikerCircleTopLeft1X = borderThickness + (10.15 / 74.0) * innerBoardWidth + (outerStrikerCircleDiameter / 2);
    let strikerCircleTopLeft1Y = (outerBoardHeight / 2) - (strikerPlacementLineLengthToCenterOfOuterStrikerCircles / 2);
    let strikerCircleTopLeft2X = strikerCircleTopLeft1Y;
    let strikerCircleTopLeft2Y = strikerCircleTopLeft1X;

    let strikerCircleTopRight1X = outerBoardWidth - strikerCircleTopLeft2X;
    let strikerCircleTopRight1Y = strikerCircleTopLeft2Y;
    let strikerCircleTopRight2X = outerBoardWidth - strikerCircleTopLeft1X;
    let strikerCircleTopRight2Y = strikerCircleTopLeft1Y;

    let strikerCircleBottomRight1X = strikerCircleTopRight1X;
    let strikerCircleBottomRight1Y = outerBoardHeight - strikerCircleTopRight1Y;
    let strikerCircleBottomRight2X = strikerCircleTopRight2X;
    let strikerCircleBottomRight2Y = outerBoardHeight - strikerCircleTopRight2Y;

    let strikerCircleBottomLeft1X = strikerCircleTopLeft1X;
    let strikerCircleBottomLeft1Y = outerBoardHeight - strikerCircleTopLeft1Y;
    let strikerCircleBottomLeft2X = strikerCircleTopLeft2X;
    let strikerCircleBottomLeft2Y = outerBoardHeight - strikerCircleTopLeft2Y;
    
    // Outer striker placement lines
    let outerStrikerPlacementLineThickness = (0.3 / 74.0) * innerBoardWidth;
    let innerStrikerPlacementLineThickness = (0.15 / 74.0) * innerBoardWidth;

    let leftOuterStrikerPlacementLineStartX = borderThickness + (10.15 / 74.0) * innerBoardWidth;
    let leftOuterStrikerPlacementLineStartY = (outerBoardHeight / 2) - strikerPlacementLineLengthToCenterOfOuterStrikerCircles / 2;
    let leftOuterStrikerPlacementLineEndX = leftOuterStrikerPlacementLineStartX;
    let leftOuterStrikerPlacementLineEndY = outerBoardHeight - leftOuterStrikerPlacementLineStartY;

    let rightOuterStrikerPlacementLineStartX = outerBoardWidth - leftOuterStrikerPlacementLineStartX;
    let rightOuterStrikerPlacementLineStartY = leftOuterStrikerPlacementLineStartY;
    let rightOuterStrikerPlacementLineEndX = rightOuterStrikerPlacementLineStartX;
    let rightOuterStrikerPlacementLineEndY = leftOuterStrikerPlacementLineEndY;

    let topOuterStrikerPlacementLineStartX = leftOuterStrikerPlacementLineStartY;
    let topOuterStrikerPlacementLineStartY = leftOuterStrikerPlacementLineStartX;
    let topOuterStrikerPlacementLineEndX = outerBoardWidth - topOuterStrikerPlacementLineStartX;
    let topOuterStrikerPlacementLineEndY = topOuterStrikerPlacementLineStartY;

    let bottomOuterStrikerPlacementLineStartX = topOuterStrikerPlacementLineStartX;
    let bottomOuterStrikerPlacementLineStartY = outerBoardHeight - topOuterStrikerPlacementLineStartY;
    let bottomOuterStrikerPlacementLineEndX = topOuterStrikerPlacementLineEndX;
    let bottomOuterStrikerPlacementLineEndY = bottomOuterStrikerPlacementLineStartY;

    let innerStrikerPlacementLineOffset = outerStrikerCircleDiameter;
    
    // Inner corner circles
    let innerCornerCircleDiameter = (6.35 / 74.0) * innerBoardWidth;
    let innerCornerCircleThickness = (0.15 / 74.0) * innerBoardWidth;

    let innerCornerCircleTopLeftX = diagonalLineTopLeftEndX - (innerCornerCircleDiameter / 2) / Math.sqrt(2);
    let innerCornerCircleTopLeftY = innerCornerCircleTopLeftX;

    let innerCornerCircleTopRightX = outerBoardWidth - innerCornerCircleTopLeftX;
    let innerCornerCircleTopRightY = innerCornerCircleTopLeftY;

    let innerCornerCircleBottomRightX = innerCornerCircleTopRightX;
    let innerCornerCircleBottomRightY = outerBoardHeight - innerCornerCircleTopRightY;

    let innerCornerCircleBottomLeftX = innerCornerCircleTopLeftX;
    let innerCornerCircleBottomLeftY = outerBoardHeight - innerCornerCircleTopLeftY;

    let settings = {
      "numCoins": 19,
      "numBlack": 9,
      "numWhite": 9,
      "numQueen": 1,
      "firstLayer": 6,
      "secondLayer": 12,
      "coinDiameter": coinDiameter,
      "strikerDiameter" : strikerDiameter,
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
  
  const QUEENCOLOR = "pink";
  const COLOR1 = "black";
  const COLOR2 = "white";
  
  // Return initial board 
  export function getInitialBoard(gameSettings : {[setting : string] : number}): Board {
    let boardSize : BoardSize = getInitialSize(gameSettings);
    let board: Board = [];
    
    // set the position of hte queen
    // insert that qqueen into board
    let queenCoordinate : Coordinate = {xPos: boardSize.centerX,
                                        yPos: boardSize.centerY};
    let queen : Coin = {coordinate:queenCoordinate,
                        color:QUEENCOLOR,
                        shouldRescale: false
                      };

    // Initialize two layers
    let coins : Coin[] = [];
    coins.push(queen);
    let numberOfSides = 6;
    
    let color : boolean = false;
    let outerColor : boolean =  false;
    
    let circles : Coordinate[] = [];
    for (let i = 1; i <= gameSettings["numberOfSides"]; i++) {
      let c = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"]);
      let c2 = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"]*2);
      circles.push(c2);
      
      let coinColor = color ? COLOR1 : COLOR2;
      let outerCoinColor = outerColor ? COLOR1 : COLOR2;
      
      color = !color;
      coins.push(createCoin(gameSettings, c, coinColor)); 
      coins.push(createCoin(gameSettings, c2, outerCoinColor));
    }
    
    //color = false;
    outerColor = !outerColor;
    for (let i = 0; i < circles.length; i++) {
      let c : Coordinate = {xPos: (circles[i].xPos + circles[(i+1)%gameSettings["numberOfSides"]].xPos)/2.0,
                            yPos: (circles[i].yPos + circles[(i+1)%gameSettings["numberOfSides"]].yPos)/2.0};
      let coinColor = outerColor ? COLOR1 : COLOR2;
      
      coins.push(createCoin(gameSettings, c, coinColor)); 
    }
    return coins;
  }
  
  export function checkMoveOk(stateTransition: IStateTransition) : void {
  }

  function createCoin(gameSettings : {[setting : string] : number}, c : Coordinate, coinColor : string) : Coin {
    let coinCoordinate : Coordinate = {xPos:c.xPos,
                                   yPos:c.yPos};
    let coin : Coin = {coordinate:coinCoordinate,
                       color:coinColor,
                       shouldRescale: false
                      };
    return coin;
  }
  
  function getCoordinates(gameSettings : {[setting : string] : number}, centerX : number, centerY : number, index : number, hexSize : number) : Coordinate {
    
    let c : Coordinate = {xPos: centerX + hexSize * Math.cos(index * 2 * Math.PI / gameSettings["numberOfSides"]),
                          yPos: centerY + hexSize * Math.sin(index * 2 * Math.PI / gameSettings["numberOfSides"])};
    return c;
  }
  
  export function getInitialSize(gameSettings : {[setting : string] : number}): BoardSize {
      let boardSize : BoardSize = {width: gameSettings["outerBoardWidth"], 
                                   height: gameSettings["outerBoardHeight"],
                                   centerX: gameSettings["outerBoardWidth"]/2,
                                   centerY: gameSettings["outerBoardHeight"]/2};
      return boardSize;
  }

  export function getInitialState(gameSettings : {[setting : string] : number}): IState {
    return {
      // Location of all coins
      board: getInitialBoard(gameSettings),
      // specify player index
      playerIndex: {player1: 0, player2: 1},
      // Game score tracking
      gameScore: {player1: 0, player2: 0},
      // queen starts off as not pocketed
      shouldCoverQueen: false,
      // queenCoverCheck: QueenCover.none,
      shouldFlipBoard: true,
      realFirstMove: true,
      currentMode: CurrentMode.None
    };
  }
  
  export function createMove(stateBeforeMove: IState, stateAfterMove: IState, turnIndexBeforeMove: number, gameSettings: any): IMove {
    if (!stateBeforeMove) { // stateBeforeMove is null in a new match.
      stateBeforeMove = getInitialState(gameSettings);
    }
    
    let nextState = modifyStateForNextRound(stateBeforeMove, stateAfterMove);
    nextState.realFirstMove = false;
    let endMatchScores: number[];
    let turnIndexAfterMove: number;
    
    let pair : Pair = calculateScore(stateBeforeMove, stateAfterMove, turnIndexBeforeMove);
    let score : GameScore = pair.fst;
    gameScoreGlobal = score;
    nextState.gameScore = angular.copy(score);
    let turnShouldSwitch : boolean = pair.snd;
    
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
    return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: nextState};
  }
  
  // This function modifes the state in preperation for the next round
  export function modifyStateForNextRound(previousState : IState, currentState : IState) : IState {
    let newState = angular.copy(currentState);
    let pocketedCoinCount = getPocketedCoinCount(previousState, currentState);
    
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
        let queen : Coin = {coordinate:{xPos:0.5, yPos:0.5},
                            color: "pink",
                            shouldRescale:true};
        newState.board.push(queen);
      }
    }
    
    return newState;
  }
  
  // GAME RULES
  
  // Check if game is over
  export function gameIsOver(state : IState) : boolean {
    return state.board.length === 0;
  }
  
  // Check if queen has been pocketed
  export function queenPocketed(state : IState) : boolean {
    let queenFound : boolean = false;
    for (let i = 0; i < state.board.length; i++) {
      if (state.board[i].color === "pink") {
        queenFound = true;
      }
    }
    return !queenFound;
  }
  
  // Check if queen was pocketed in the most recent move
  export function queenJustPocketed(previousState : IState, currentState : IState) : boolean {
    return !queenPocketed(previousState) && queenPocketed(currentState);
  }
  
  // Calculate score given previous and current state. Also determine if turn should be switched
  export function calculateScore(previousState : IState, currentState : IState, playerIndex : number) : Pair {
    let pocketedCoinCount = getPocketedCoinCount(previousState, currentState);
    let gameScore : GameScore = angular.copy(currentState.gameScore);
    let turnShouldSwitch : boolean = true;
    // PLAYER 1
    if (playerIndex === 0) {
      if (previousState.shouldCoverQueen) {
        // Queen covered successfully
        if (coinsPocketed(pocketedCoinCount)) gameScore.player1 = gameScore.player1 + 5*pocketedCoinCount.black + 10*pocketedCoinCount.white;
        // Queen not covered successfully, so remove queen points (should return to board)
        else gameScore.player1 -= 25;
      }
      // No need to cover queen
      else gameScore.player1 = gameScore.player1 + 5*pocketedCoinCount.black + 10*pocketedCoinCount.white + (pocketedCoinCount.pink ? 25 : 0);
    }
    // PLAYER 2
    else if (playerIndex === 1) {
      if (previousState.shouldCoverQueen) {
        if (coinsPocketed(pocketedCoinCount)) gameScore.player2 = gameScore.player2 + 5*pocketedCoinCount.black + 10*pocketedCoinCount.white;
        else gameScore.player2 -= 25;
      }
      else gameScore.player2 = gameScore.player2 + 5*pocketedCoinCount.black + 10*pocketedCoinCount.white + (pocketedCoinCount.pink ? 25 : 0);
      
    }
    
    // Check if turn should switch
    if (coinsPocketed(pocketedCoinCount)) {
     turnShouldSwitch = false; 
    }
    
    let pair : Pair = new Pair(gameScore, turnShouldSwitch);
    return pair;
  }
  
  function coinsPocketed(pocketedCoinCount : PocketedCoinCount) : boolean {
    if (pocketedCoinCount.black > 0 || pocketedCoinCount.white > 0 || pocketedCoinCount.pink) {
     return true;
    }
    return false;
  }
  
  // Return all the coins that were pocketed in that turn
  export function getPocketedCoinCount(previousState: IState, currentState: IState) : PocketedCoinCount {
    let previousStateColors : any = [];
    let currentStateColors : any = [];
    let blackCountPreviousState : number = 0;
    let blackCountCurrentState : number = 0;
    let whiteCountPreviousState : number = 0;
    let whiteCountCurrentState : number = 0;
    let queenExistsPreviousState : boolean = false;
    let queenExistsCurrentState : boolean = false;
    for (let i = 0; i < previousState.board.length; i++) {
      if (previousState.board[i].color === "black") blackCountPreviousState++;
      if (previousState.board[i].color === "white") whiteCountPreviousState++;
      if (previousState.board[i].color === "pink") queenExistsPreviousState = true;
    }
    for (let i = 0; i < currentState.board.length; i++) {
      if (currentState.board[i].color === "black") blackCountCurrentState++;
      if (currentState.board[i].color === "white") whiteCountCurrentState++;
      if (currentState.board[i].color === "pink") queenExistsCurrentState = true;
    }
    let blackDiff = blackCountPreviousState - blackCountCurrentState;
    let whiteDiff = whiteCountPreviousState - whiteCountCurrentState;
    let pinkLost = queenExistsPreviousState && !queenExistsCurrentState;
    return {black: blackDiff, white: whiteDiff, pink: pinkLost};
  }
}
