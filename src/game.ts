// interface SupportedLanguages { en: string, iw: string};
// interface Translations {
//   [index: string]: SupportedLanguages;
// }

module game {

  enum RotateDirection {
    Left,
    Right
  }

  export let state: IState;
  export let board: Board;

  export let settings: { [setting: string]: number };

  export function drawBoard(width: number, height: number) {
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

    settings = {
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
  
  export let _engine: any, _objectsInMotion = 0, clickPromise : any,
             _world : any, _sceneWidth : any, _sceneHeight : any;
  export let defaultCategory = 0x0001,
             removedCategory = 0x0002,
             movableCategory = 0x0003;


  export function updateScene() {

    var c = (<any>$("canvas")).get(0);
    
    var width = (<any>$(<any>window)).width();
    var height = (<any>$(<any>window)).height();
    
    var size = width <= height ? width : height;

    _sceneWidth = size;
    _sceneHeight = size;

    var boundsMax = _engine.world.bounds.max,
      renderOptions = _engine.render.options,
      canvas = _engine.render.canvas;

    boundsMax.x = size;
    boundsMax.y = size;

    canvas.width = renderOptions.width = size;
    canvas.height = renderOptions.height = size;

  };

  export function fullscreen() {
    var _fullscreenElement = _engine.render.canvas;

    if (!document.fullscreenElement && !(<any>document).mozFullScreenElement && !document.webkitFullscreenElement) {
      if (_fullscreenElement.requestFullscreen) {
        _fullscreenElement.requestFullscreen();
      } else if (_fullscreenElement.mozRequestFullScreen) {
        _fullscreenElement.mozRequestFullScreen();
      } else if (_fullscreenElement.webkitRequestFullscreen) {
        _fullscreenElement.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
      }
    }
  };

  export function drawObjects(){

    var offset = 1;
    
    var width = _sceneWidth;
    var height = _sceneHeight;

    Matter.World.add(_engine.world, [
      Matter.Bodies.rectangle(width/2, -offset, width + 2 * offset, settings["borderThickness"]*2, <any>{
        isStatic: true,
        render: { fillStyle: 'black', strokeStyle: 'black'}
      }),
      Matter.Bodies.rectangle(width/2, height + offset, width + 2 * offset, settings["borderThickness"]*2, <any>{
        isStatic: true,
        render: { fillStyle: 'black', strokeStyle: 'black'}
      }),
      Matter.Bodies.rectangle(width + offset, height/2, settings["borderThickness"]*2, height + 2 * offset, <any>{
        isStatic: true,
        render: { fillStyle: 'black', strokeStyle: 'black'}
      }),
      Matter.Bodies.rectangle(-offset, height/2, settings["borderThickness"]*2, height + 2 * offset, <any>{
        isStatic: true,
        render: { fillStyle: 'black', strokeStyle: 'black'}
      })
    ]);

    drawBoard(width, height);

    state = gameLogic.getInitialState(settings);
    board = state.board;

    let circles : any = [];

    for (var i = 0; i < board.length; i++) {
      
      circles.push(Matter.Bodies.circle(board[i].coordinate.xPos, board[i].coordinate.yPos, board[i].diameter / 2.0, <any>{
        isStatic: false,
        // isSleeping: true,
        collisionFilter: {
          mask: defaultCategory
        },
        restitution: 1,
        render: { fillStyle: board[i].color, strokeStyle: 'black' },
        label: 'Coin'
      }));
    }

    // Add boards pockets 
    var pocket1 = Matter.Bodies.circle(settings["coinPocketTopLeftX"], settings["coinPocketTopLeftY"], settings["coinPocketDiameter"]/2, <any>{
         isStatic: true,
         restitution: 1,
         collisionFilter: {
            mask: defaultCategory
         },
         render: { fillStyle: 'grey', strokeStyle: 'black' },
         label: 'Pocket'
      });
      
      var pocket2 = Matter.Bodies.circle(settings["coinPocketTopRightX"], settings["coinPocketTopRightY"], settings["coinPocketDiameter"]/2, <any>{
         isStatic: true,
         restitution: 1,
         collisionFilter: {
            mask: defaultCategory
         },
         render: { fillStyle: 'grey', strokeStyle: 'black' },
         label: 'Pocket'
      });
      
      var pocket3 = Matter.Bodies.circle(settings["coinPocketBottomLeftX"], settings["coinPocketBottomRightY"], settings["coinPocketDiameter"]/2, <any>{
         isStatic: true,
         restitution: 1,
         collisionFilter: {
            mask: defaultCategory
         },
         render: { fillStyle: 'grey', strokeStyle: 'black' },
         label: 'Pocket'
      });
      
      var pocket4 = Matter.Bodies.circle(settings["coinPocketBottomRightX"], settings["coinPocketBottomRightY"], settings["coinPocketDiameter"]/2, <any>{
         isStatic: true,
         restitution: 1,
         collisionFilter: {
            mask: defaultCategory
         },
         render: { fillStyle: 'grey', strokeStyle: 'black' },
         label: 'Pocket'
      });
      
      // Constrain striker horizontally
      var strikerCenterX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
      var strikerCenterY = settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);
      
      var strikerCircle = Matter.Bodies.circle(strikerCenterX, strikerCenterY, settings["strikerDiameter"]/2, <any>{
         isStatic: false,
         restitution: 1,
         angle: (6.0*Math.PI)/4.0,
         collisionFilter: {
           category: defaultCategory
         },
         render: { fillStyle: 'blue', strokeStyle: 'black' },
         label: 'Striker'
      });

      
    Matter.World.add(_engine.world, circles);

    Matter.World.add(_engine.world, [pocket1,pocket2,pocket3,pocket4,strikerCircle]);

  }

  export function init() {

    // create a Matter.js engine
    _engine = Matter.Engine.create(document.getElementById("gameArea"), <any>{
      render: {
        options: {
          label: 'Engine',
          showAngleIndicator: true,
          gravity: {
            x: 0,
            y: 0
          }
        }
      }
    });
    
    _engine.world.gravity.y = 0;
    _engine.world.gravity.x = 0;

    _objectsInMotion = 0;

    updateScene();

    drawBoard(_sceneWidth, _sceneHeight);

    drawObjects();
    
    // Background image
    var renderOptions = _engine.render.options;
    renderOptions.background = 'imgs/carromBackground.png';
    renderOptions.showAngleIndicator = false;
    renderOptions.wireframes = true;

    // var mouseConstraint = (<any>Matter.MouseConstraint).create(_engine, { collisionFilter: { mask: removedCategory } } );
    // Matter.World.add(_engine.world, mouseConstraint);
    
    Matter.Engine.run(_engine);
    // var mouseConstraint = (<any>Matter.MouseConstraint).create(_engine);

    Matter.Events.on(_engine.render, 'afterRender', function() {
      var context = _engine.render.context,
        bodies = Matter.Composite.allBodies(_engine.world)

      var striker = getStriker();
      var startPoint = { x: striker.position.x, y: striker.position.y },
        endPoint = {
          x: striker.position.x + 32.0 * Math.cos(striker.angle), 
          y: striker.position.y + 32.0 * Math.sin(striker.angle)
        };

      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);
      
      context.strokeStyle = 'red';
      context.lineWidth = 5.5;
      context.stroke();

    });

    Matter.Events.on(_engine, 'collisionEnd', function(event) {
      handlePocketCollision(event);
    });
    

    function handlePocketCollision(event : any) {
      var pairs = event.pairs;

      // change object colours to show those starting a collision
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
       
        if (pair.bodyA.label == "Pocket" && pair.bodyB.label == "Coin"){
          pair.bodyB.collisionFilter.mask = removedCategory;
          (<any>Matter.World).remove(_engine.world, pair.bodyB);
          
        } else if (pair.bodyB.label == "Pocket" && pair.bodyA.label == "Coin") {
          pair.bodyA.collisionFilter.mask = removedCategory;
          (<any>Matter.World).remove(_engine.world, pair.bodyA);
        }
      }  
    }

    for (var i = 0; i < _engine.world.bodies.length; i++) {
      Matter.Events.on(_engine.world.bodies[i], 'sleepStart sleepEnd', function(event) {
        var body = this;
        // console.log('body id', body.id, 'sleeping:', body.isSleeping);
        _objectsInMotion += body.isSleeping ? 1 : -1;
        // console.log('num objects: ', _objectsInMotion);

        if (_engine.world.bodies.length == _objectsInMotion){
          console.log("World is Static");
        }

      });
    }


  }

  export function getStriker() : Matter.Body {
    for (let body in _engine.world.bodies) {
      if (_engine.world.bodies[body].label == "Striker") {
        return _engine.world.bodies[body];
      }
    }
  }
  
  // Reset the position of the striker relative to the current player
  export function resetStrikerPosition() {
    var strikerCenterX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
    var strikerCenterY = settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);
    Matter.Body.setPosition(getStriker(), {x:strikerCenterX, y:strikerCenterY});
  }

  var translationFactor = 15;

  export function mouseUp(dir: string) {
    $interval.cancel(clickPromise);
  };

  export function mouseDown(dir: string) {
    clickPromise = $interval(function() {
      if (dir === "left")
        game.leftClick();
      else if (dir === "right")
        game.rightClick();
      else if (dir === "leftRotate")
        game.leftRotate();
      else if (dir === "rightRotate")
        game.rightRotate();
    }, 100);
  };

  // Move the striker left
  export function leftClick(){
    var posX = getStriker().position.x;
    var leftGuard = settings["bottomOuterStrikerPlacementLineStartX"];
    if ((posX - translationFactor) > leftGuard) {
      Matter.Body.translate(getStriker(), { x: -translationFactor, y: 0 });
    }
    else {
      var newTranslationFactor = posX - leftGuard;
      Matter.Body.translate(getStriker(), { x: -newTranslationFactor, y: 0 });
    }
  }

  // Move the striker right
  export function rightClick(){
    console.log("rightClick");
    var posX = getStriker().position.x;
    var rightGuard = settings["bottomOuterStrikerPlacementLineEndX"];
    if (posX + translationFactor < rightGuard) {
      Matter.Body.translate(getStriker(), { x: translationFactor, y: 0 });
    }
    else {
      var newTranslationFactor = Math.abs(rightGuard - posX);
      Matter.Body.translate(getStriker(), { x: newTranslationFactor, y: 0 });
    }
  }

  export function leftRotate(){
    rotate(RotateDirection.Left);
  }

  export function rotate(direction: RotateDirection) {
    var striker = getStriker();
    
    var deltaAngle = (direction == RotateDirection.Left) ? -0.1 : 0.1;

    var newAngle = (striker.angle + deltaAngle) % (2 * Math.PI);
    var diff = 0.0;

    if (newAngle < striker.angle) {
      diff = newAngle;
      Matter.Body.setAngle(striker, diff);
    }
    else {
      diff = Math.abs(newAngle - striker.angle);
      Matter.Body.rotate(striker, diff);
    }
  }

  export function rightRotate(){
    rotate(RotateDirection.Right);
  }

  export function shootClick(){

    var striker = getStriker();
    var position = {
        x: striker.position.x + 1.0 * Math.cos(striker.angle),
        y: striker.position.y + 1.0 * Math.sin(striker.angle)
      };

    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      { x: 0.1 * Math.cos(striker.angle), y: 0.1 * Math.sin(striker.angle) })

    _engine.enableSleeping = true;
  }
}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function() {
    $rootScope['game'] = game;
    game.init();
  });
