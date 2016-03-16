// interface SupportedLanguages { en: string, iw: string};
// interface Translations {
//   [index: string]: SupportedLanguages;
// }

module game {
  export let state : IState;
  export let board : Board;
 
  export let settings : {[setting : string] : number};
  
  export function drawBoard(width : number, height : number){
    let size = width < height ? width : height;
    
     // Change these
    let innerBoardWidth = size;
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
    let innerStrikerPlacementLineThickness = (0.15/74.0)*innerBoardWidth;
    
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
    
    let innerStrikerPlacementLineOffset = outerStrikerCircleDiameter;
    
    // Inner corner circles
    let innerCornerCircleDiameter = (6.35/74.0)*innerBoardWidth;
    let innerCornerCircleThickness = (0.15/74.0)*innerBoardWidth;
    
    let innerCornerCircleTopLeftX = diagonalLineTopLeftEndX - (innerCornerCircleDiameter/2)/Math.sqrt(2);
    let innerCornerCircleTopLeftY = innerCornerCircleTopLeftX;
    
    let innerCornerCircleTopRightX = outerBoardWidth - innerCornerCircleTopLeftX;
    let innerCornerCircleTopRightY = innerCornerCircleTopLeftY;
    
    let innerCornerCircleBottomRightX = innerCornerCircleTopRightX;
    let innerCornerCircleBottomRightY = outerBoardHeight - innerCornerCircleTopRightY;
    
    let innerCornerCircleBottomLeftX = innerCornerCircleTopLeftX;
    let innerCornerCircleBottomLeftY = outerBoardHeight - innerCornerCircleTopLeftY;
    
    settings = {
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
      "innerStrikerPlacementLineThickness" : innerStrikerPlacementLineThickness,
      "innerStrikerPlacementLineOffset" : innerStrikerPlacementLineOffset,
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
      "bottomOuterStrikerPlacementLineEndY" : bottomOuterStrikerPlacementLineEndY,
      "innerCornerCircleDiameter" : innerCornerCircleDiameter,
      "innerCornerCircleThickness" : innerCornerCircleThickness,
      "innerCornerCircleTopLeftX" : innerCornerCircleTopLeftX,
      "innerCornerCircleTopLeftY" : innerCornerCircleTopLeftY,
      "innerCornerCircleTopRightX" : innerCornerCircleTopRightX,
      "innerCornerCircleTopRightY" : innerCornerCircleTopRightY,
      "innerCornerCircleBottomRightX" : innerCornerCircleBottomRightX,
      "innerCornerCircleBottomRightY" : innerCornerCircleBottomRightY,
      "innerCornerCircleBottomLeftX" : innerCornerCircleBottomLeftX,
      "innerCornerCircleBottomLeftY" : innerCornerCircleBottomLeftY
    };
  }
  
  // export function init() {

  //   // resizeGameAreaService.setWidthToHeight(1);
  //   var heightOutput = window.innerHeight;
  //   var widthOutput = window.innerWidth;
      
  //   drawBoard(widthOutput, heightOutput);
  //   state = gameLogic.getInitialState(settings);
  //   board = state.board;
    
  //   window.onresize = function(){
  //     var heightOutput = window.innerHeight;
  //     var widthOutput = window.innerWidth;
      
  //     document.getElementById("gameArea").offsetHeight;
  //     document.getElementById("gameArea").offsetWidth;
      
  //     $rootScope.$apply(function () {
  //       drawBoard(widthOutput, heightOutput);
  //       state = gameLogic.getInitialState(settings);
  //       board = state.board;
  //     });
  //   }
  // } 
  
  export function init() {

      var Engine = Matter.Engine,
          World = Matter.World,
          Bodies = Matter.Bodies;

      // create a Matter.js engine
      var engine = Engine.create(document.getElementById("gameArea"));

      var c = (<any>$("#gameArea canvas")).get(0);

      var _sceneWidth = c.width;
      var _sceneHeight = c.height;


      drawBoard(_sceneWidth, _sceneHeight);

      console.log(settings["outerBoardWidth"]);

      var offset = 10;
      var _borderWidth =
          console.log(_sceneWidth, _sceneHeight);



      var widthOffset = (_sceneWidth - settings["outerBoardWidth"]) / 2.0;
      var heightOffset = (_sceneHeight - settings["outerBoardHeight"]) / 2.0;

      var topBorder = Bodies.rectangle((settings["outerBoardWidth"] / 2.0) + widthOffset,
          (settings["borderThickness"] / 2.0) - heightOffset,
          settings["outerBoardWidth"],
          settings["borderThickness"],
          { isStatic: true });
      console.log(settings["innerBoardHeight"]);
      var bottomBorder = Bodies.rectangle((settings["outerBoardWidth"] / 2.0) + widthOffset,
          (settings["borderThickness"] / 2.0) - heightOffset + settings["innerBoardHeight"],
                                settings["outerBoardWidth"],
                                settings["borderThickness"],
                                { isStatic: true });

    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [bottomBorder]);

    // run the engine
    Engine.run(engine);

  }

}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {
    $rootScope['game'] = game;
    
    game.init();

  });
