// interface SupportedLanguages { en: string, iw: string};
// interface Translations {
//   [index: string]: SupportedLanguages;
// }

module game {
  export let a = "adsd";
  export let state : IState;
  export let board : Board;
  
  // Change these
  let innerBoardWidth = 800;
  let innerBoardHeight = innerBoardWidth;
  
  let coinDiameter = (3.18/74.0) * innerBoardWidth;
  let startingCircleDiameter = (17.0/74.0)*innerBoardWidth;
  let borderThickness = (7.6/74.0) * innerBoardWidth;
  let outerBoardWidth = innerBoardWidth + 2*borderThickness;
  let outerBoardHeight = innerBoardHeight + 2*borderThickness;
  
  // Coin Pockets
  let coinPocketDiameter = (4.45/74.0) * innerBoardWidth;
  let coinPocketThickness = (0.15/74.0) * innerBoardWidth;
  let coinPocketTopLeftX = borderThickness + (coinPocketDiameter/2);
  let coinPocketTopLeftY = borderThickness + (coinPocketDiameter/2);
  
  let coinPocketTopRightX = borderThickness + innerBoardWidth - (coinPocketDiameter/2);
  let coinPocketTopRightY = borderThickness + (coinPocketDiameter/2);
  
  let coinPocketBottomLeftX = borderThickness + (coinPocketDiameter/2);
  let coinPocketBottomLeftY = borderThickness + innerBoardHeight - (coinPocketDiameter/2);
  
  let coinPocketBottomRightX = borderThickness + innerBoardWidth - (coinPocketDiameter/2);
  let coinPocketBottomRightY = borderThickness + innerBoardHeight - (coinPocketDiameter/2);
  
  // Diagonal Lines
  let diagonalLineTopLeftStartX = borderThickness + coinPocketDiameter + (((5.0/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineTopLeftStartY = diagonalLineTopLeftStartX;
  let diagonalLineTopLeftEndX = diagonalLineTopLeftStartX + (((26.70/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineTopLeftEndY = diagonalLineTopLeftEndX;
  
  let diagonalLineTopRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineTopRightStartY = diagonalLineTopLeftStartX;
  let diagonalLineTopRightEndX = diagonalLineTopRightStartX - (((26.70/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineTopRightEndY = diagonalLineTopLeftEndX;
  
  let diagonalLineBottomRightStartX = outerBoardWidth - borderThickness - coinPocketDiameter - (((5.0/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineBottomRightStartY = diagonalLineBottomRightStartX;
  let diagonalLineBottomRightEndX = diagonalLineBottomRightStartX - (((26.70/74.0)*innerBoardWidth)/Math.sqrt(2));
  let diagonalLineBottomRightEndY = diagonalLineBottomRightEndX;
  
  let diagonalLineBottomLeftStartX = diagonalLineTopLeftStartX;
  let diagonalLineBottomLeftStartY = diagonalLineBottomRightStartX;
  let diagonalLineBottomLeftEndX = diagonalLineTopLeftEndX;
  let diagonalLineBottomLeftEndY = diagonalLineBottomRightEndX;
  
  let diagonalLineThickness = (0.15/74.0)*innerBoardWidth;
  
  // Outer and Inner striker circles (1 == leftmost, 2 == rightmost)
  //    Striker placement line measurements and striker circle properties
  let strikerPlacementLineLength = (47.0/74.0) * innerBoardWidth;
  let outerStrikerCircleDiameter = (3.18/74.0) * innerBoardWidth;
  let innerStrikerCircleDiameter = (2.45/74.0) * innerBoardWidth;
  let strikerPlacementLineLengthToCenterOfOuterStrikerCircles = strikerPlacementLineLength - outerStrikerCircleDiameter;
  let outerStrikerCircleThickness = (0.3/74.0) * innerBoardWidth;
  
  let strikerCircleTopLeft1X = borderThickness + (10.15/74.0)*innerBoardWidth + (outerStrikerCircleDiameter/2);
  let strikerCircleTopLeft1Y = (outerBoardHeight/2) - (strikerPlacementLineLengthToCenterOfOuterStrikerCircles/2);
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
  let outerStrikerPlacementLineThickness = (0.3/74.0)*innerBoardWidth;
  
  let leftOuterStrikerPlacementLineStartX = borderThickness + (10.15/74.0)*innerBoardWidth;
  let leftOuterStrikerPlacementLineStartY = (outerBoardHeight/2) - strikerPlacementLineLengthToCenterOfOuterStrikerCircles/2; 
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
  
  export let settings : {[setting : string] : number} = {
    "numCoins" : 19,
    "numBlack" : 9,
    "numWhite" : 9,
    "numQueen" : 1,
    "firstLayer" : 6,
    "secondLayer" : 12,
    "coinDiameter" : coinDiameter,
    "innerBoardWidth" : innerBoardWidth,
    "innerBoardHeight" : innerBoardHeight,
    "outerBoardWidth" : outerBoardWidth,
    "outerBoardHeight" : outerBoardHeight,
    "numberOfSides" : 6,
    "hexSize" : (coinDiameter/2)*2,
    "startingCircleDiameter" : startingCircleDiameter,
    "boardCenterX" : outerBoardWidth/2.0,
    "boardCenterY": outerBoardHeight/2.0,
    "borderThickness" : borderThickness,
    "coinPocketDiameter" : coinPocketDiameter,
    "coinPocketThickness" : coinPocketThickness,
    "coinPocketTopLeftX" : coinPocketTopLeftX,
    "coinPocketTopLeftY" : coinPocketTopLeftY,
    "coinPocketTopRightX" : coinPocketTopRightX,
    "coinPocketTopRightY" : coinPocketTopRightY,
    "coinPocketBottomLeftX" : coinPocketBottomLeftX,
    "coinPocketBottomLeftY" : coinPocketBottomLeftY,
    "coinPocketBottomRightX" : coinPocketBottomRightX,
    "coinPocketBottomRightY" : coinPocketBottomRightY,
    "diagonalLineTopLeftStartX" : diagonalLineTopLeftStartX,
    "diagonalLineTopLeftStartY" : diagonalLineTopLeftStartY,
    "diagonalLineTopLeftEndX" : diagonalLineTopLeftEndX,
    "diagonalLineTopLeftEndY" : diagonalLineTopLeftEndY,
    "diagonalLineTopRightStartX" : diagonalLineTopRightStartX,
    "diagonalLineTopRightStartY" : diagonalLineTopRightStartY,
    "diagonalLineTopRightEndX" : diagonalLineTopRightEndX,
    "diagonalLineTopRightEndY" : diagonalLineTopRightEndY,
    "diagonalLineBottomRightStartX" : diagonalLineBottomRightStartX,
    "diagonalLineBottomRightStartY" : diagonalLineBottomRightStartY,
    "diagonalLineBottomRightEndX" : diagonalLineBottomRightEndX,
    "diagonalLineBottomRightEndY" : diagonalLineBottomRightEndY,
    "diagonalLineBottomLeftStartX" : diagonalLineBottomLeftStartX,
    "diagonalLineBottomLeftStartY" : diagonalLineBottomLeftStartY,
    "diagonalLineBottomLeftEndX" : diagonalLineBottomLeftEndX,
    "diagonalLineBottomLeftEndY" : diagonalLineBottomLeftEndY,
    "diagonalLineThickness" : diagonalLineThickness,
    "outerStrikerCircleDiameter" : outerStrikerCircleDiameter,
    "innerStrikerCircleDiameter" : innerStrikerCircleDiameter,
    "outerStrikerCircleThickness" : outerStrikerCircleThickness,
    "strikerCircleTopLeft1X" : strikerCircleTopLeft1X,
    "strikerCircleTopLeft1Y" : strikerCircleTopLeft1Y,
    "strikerCircleTopLeft2X" : strikerCircleTopLeft2X,
    "strikerCircleTopLeft2Y" : strikerCircleTopLeft2Y,
    "strikerCircleTopRight1X" : strikerCircleTopRight1X,
    "strikerCircleTopRight1Y" : strikerCircleTopRight1Y,
    "strikerCircleTopRight2X" : strikerCircleTopRight2X,
    "strikerCircleTopRight2Y" : strikerCircleTopRight2Y,
    "strikerCircleBottomRight1X" : strikerCircleBottomRight1X,
    "strikerCircleBottomRight1Y" : strikerCircleBottomRight1Y,
    "strikerCircleBottomRight2X" : strikerCircleBottomRight2X,
    "strikerCircleBottomRight2Y" : strikerCircleBottomRight2Y,
    "strikerCircleBottomLeft1X" : strikerCircleBottomLeft1X,
    "strikerCircleBottomLeft1Y" : strikerCircleBottomLeft1Y,
    "strikerCircleBottomLeft2X" : strikerCircleBottomLeft2X,
    "strikerCircleBottomLeft2Y" : strikerCircleBottomLeft2Y,
    "outerStrikerPlacementLineThickness" : outerStrikerPlacementLineThickness,
    "leftOuterStrikerPlacementLineStartX" : leftOuterStrikerPlacementLineStartX,
    "leftOuterStrikerPlacementLineStartY" : leftOuterStrikerPlacementLineStartY,
    "leftOuterStrikerPlacementLineEndX" : leftOuterStrikerPlacementLineEndX, 
    "leftOuterStrikerPlacementLineEndY" : leftOuterStrikerPlacementLineEndY,
    "rightOuterStrikerPlacementLineStartX" : rightOuterStrikerPlacementLineStartX,
    "rightOuterStrikerPlacementLineStartY" : rightOuterStrikerPlacementLineStartY,
    "rightOuterStrikerPlacementLineEndX" : rightOuterStrikerPlacementLineEndX, 
    "rightOuterStrikerPlacementLineEndY" : rightOuterStrikerPlacementLineEndY,
    "topOuterStrikerPlacementLineStartX" : topOuterStrikerPlacementLineStartX,
    "topOuterStrikerPlacementLineStartY" : topOuterStrikerPlacementLineStartY,
    "topOuterStrikerPlacementLineEndX" : topOuterStrikerPlacementLineEndX, 
    "topOuterStrikerPlacementLineEndY" : topOuterStrikerPlacementLineEndY,
    "bottomOuterStrikerPlacementLineStartX" : bottomOuterStrikerPlacementLineStartX,
    "bottomOuterStrikerPlacementLineStartY" : bottomOuterStrikerPlacementLineStartY,
    "bottomOuterStrikerPlacementLineEndX" : bottomOuterStrikerPlacementLineEndX, 
    "bottomOuterStrikerPlacementLineEndY" : bottomOuterStrikerPlacementLineEndY 
  };
  
  export function init() {
    resizeGameAreaService.setWidthToHeight(1);
    state = gameLogic.getInitialState(settings);
    board = state.board;
    console.log(board);
  } 
  
}
//   // I export all variables to make it easy to debug in the browser by
//   // simply typing in the console:
//   // game.state
//   export let animationEnded = false;
//   export let canMakeMove = false;
//   export let isComputerTurn = false;
//   export let move: IMove = null;
//   export let state: IState = null;
//   export let isHelpModalShown: boolean = false;

//   export function init() {
//     translate.setTranslations(getTranslations());
//     translate.setLanguage('en');
//     log.log("Translation of 'RULES_OF_TICTACTOE' is " + translate('RULES_OF_TICTACTOE'));
//     resizeGameAreaService.setWidthToHeight(1);
//     moveService.setGame({
//       minNumberOfPlayers: 2,
//       maxNumberOfPlayers: 2,
//       checkMoveOk: gameLogic.checkMoveOk,
//       updateUI: updateUI
//     });

//     // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
//     document.addEventListener("animationend", animationEndedCallback, false); // standard
//     document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
//     document.addEventListener("oanimationend", animationEndedCallback, false); // Opera

//     let w: any = window;
//     if (w["HTMLInspector"]) {
//       setInterval(function () {
//         w["HTMLInspector"].inspect({
//           excludeRules: ["unused-classes", "script-placement"],
//         });
//       }, 3000);
//     }
//   }

//   function getTranslations(): Translations {
//     return {
//       RULES_OF_TICTACTOE: {
//         en: "Rules of BattleTetris",
//         iw: "חוקי המשחק",
//       },
//       RULES_SLIDE1: {
//         en: "You and your opponent take turns to mark the grid in an empty spot. The first mark is X, then O, then X, then O, etc.",
//         iw: "אתה והיריב מסמנים איקס או עיגול כל תור",
//       },
//       RULES_SLIDE2: {
//         en: "The first to mark a whole row, column or diagonal wins.",
//         iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
//       },
//       CLOSE:  {
//         en: "Close",
//         iw: "סגור",
//       },
//     };
//   }

//   function animationEndedCallback() {
//     $rootScope.$apply(function () {
//       log.info("Animation ended");
//       animationEnded = true;
//       sendComputerMove();
//     });
//   }

//   function sendComputerMove() {
//     if (!isComputerTurn) {
//       return;
//     }
//     isComputerTurn = false; // to make sure the computer can only move once.
//     moveService.makeMove(aiService.findComputerMove(move));
//   }

//   function updateUI(params: IUpdateUI): void {
//     log.info("Game got updateUI:", params);
//     animationEnded = false;
//     move = params.move;
//     state = move.stateAfterMove;
//     if (!state) {
//       state = gameLogic.getInitialState();
//     }
//     canMakeMove = move.turnIndexAfterMove >= 0 && // game is ongoing
//       params.yourPlayerIndex === move.turnIndexAfterMove; // it's my turn

//     // Is it the computer's turn?
//     isComputerTurn = canMakeMove &&
//         params.playersInfo[params.yourPlayerIndex].playerId === '';
//     if (isComputerTurn) {
//       // To make sure the player won't click something and send a move instead of the computer sending a move.
//       canMakeMove = false;
//       // We calculate the AI move only after the animation finishes,
//       // because if we call aiService now
//       // then the animation will be paused until the javascript finishes.
//       if (!state.delta) {
//         // This is the first move in the match, so
//         // there is not going to be an animation, so
//         // call sendComputerMove() now (can happen in ?onlyAIs mode)
//         sendComputerMove();
//       }
//     }
//   }

//   export function cellClicked(row: number, col: number): void {
//     log.info("Clicked on cell:", row, col);
//     if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
//       throw new Error("Throwing the error because URL has '?throwException'");
//     }
//     if (!canMakeMove) {
//       return;
//     }
//     try {
//       let nextMove = gameLogic.createMove(
//           state, row, col, move.turnIndexAfterMove);
//       canMakeMove = false; // to prevent making another move
//       moveService.makeMove(nextMove);
//     } catch (e) {
//       log.info(["Cell is already full in position:", row, col]);
//       return;
//     }
//   }

//   export function shouldShowImage(row: number, col: number): boolean {
//     let cell = state.board[row][col];
//     return cell !== "";
//   }

//   export function isPieceX(row: number, col: number): boolean {
//     return state.board[row][col] === 'X';
//   }

//   export function isPieceO(row: number, col: number): boolean {
//     return state.board[row][col] === 'O';
//   }

//   export function shouldSlowlyAppear(row: number, col: number): boolean {
//     return !animationEnded &&
//         state.delta &&
//         state.delta.row === row && state.delta.col === col;
//   }

//   export function clickedOnModal(evt: Event) {
//     if (evt.target === evt.currentTarget) {
//       evt.preventDefault();
//       evt.stopPropagation();
//       isHelpModalShown = false;
//     }
//     return true;
//   }
// }

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {
    $rootScope['game'] = game;
    game.init();
  });
  
