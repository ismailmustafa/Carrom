Event

interface SupportedLanguages {
  en: string, hi: string,
  zh: string
};

interface Translations {
  [index: string]: SupportedLanguages;
}

module game {

  function getTranslations(): Translations {
    return {
      "CARROM_RULES_TITLE": {
        "en": "Rules of Carrom",
        "zh": "卡罗姆规则",
        "hi": "कैरम के नियम"
      },
      "CARROM_RULES_SLIDE1": {
        "en": "You and your opponent take turns to flick the striker to get as many of the coins into the four corner pockets as possible.",
        "zh": "你和你的对手轮流轻弹前锋尽可能多的硬币就可以进入四个角落的口袋越好",
        "hi": "आप और अपने प्रतिद्वंद्वी ले स्ट्राइकर झटका करने के लिए संभव के रूप में चार कोने जेब में सिक्के के रूप में कई पाने के लिए बदल जाता है।"
      },
      "CARROM_RULES_SLIDE2": {
        "en": "A Black coin is worth 5 points, a White is worth 10 and the Queen (pink) is worth 25.",
        "zh": "黑色的硬币是值得5分，怀特是价值10和王后（粉红色）是值得25",
        "hi": "एक काले सिक्का 5 अंक के लायक है , एक व्हाइट 10 के लायक है और रानी (गुलाबी ), 25 के लायक है।"
      },
      "CARROM_RULES_SLIDE3": {
        "en": "If you hit a coin in, you get to repeat you turn. If you hit the Queen in you must get another coin in to cover the Queen otherwise it is returned to the board.",
        "zh": "如果你在打一个硬币，你要重复你打开。如果你打的女王，你必须得到另一个硬币支付，否则返回到主板上的女王。",
        "hi": "आप में एक सिक्का मारा, तो आप आप बारी दोहराने के लिए मिलता है। अगर आप रानी मारा आप रानी अन्यथा यह बोर्ड के लिए वापस आ रहा है को कवर करने के लिए एक और सिक्का मिलनी चाहिए में ।"
      },
      "CARROM_CLOSE": {
        "en": "Close",
        "zh": "继续游戏",
        "hi": "बंद करे"
      },
    };
  }
  
  export enum RotateDirection {
    Left,
    Right
  }
  
  // ALL INITIAL VARIABLES
  export let currentUpdateUI: IUpdateUI = null;
  export let didMakeMove: boolean = false;
  export let state: IState = null;
  export let isHelpModalShown: boolean = false;
  export let currentMode : string = "None";
  export let settings : any = undefined;
  export let enableButtons: boolean = true;
  export let centerOfBoard : Coordinate = undefined;
  export let gameScore : GameScore = {player1: 0, player2: 0};
  export let playerInfo: any = undefined;

  // Engine initial variables
  export let _engine: any, _objectsInMotion = 0, clickPromise : any,
             _world : any, _sceneWidth : any, _sceneHeight : any,
             _globalSize: any, _renderLength : any;
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

  // Takes in a board to draw and a flag specifying if the board should be drawn mirrored.
  // If undefined is passed in for the board, the initial state is drawn. If undefined is
  // passd in for "shouldMirrorBoard", then it defaults to false.
  export function drawObjects(currentBoard : Board, shouldMirrorBoard : Boolean) {
    
    if (currentBoard == undefined) {
      state = gameLogic.getInitialState(settings);
      currentBoard = state.board;
    }
    
    if (shouldMirrorBoard == undefined) {
      shouldMirrorBoard = false;
    }

    var offset = 1;
    
    var width = _sceneWidth;
    var height = _sceneHeight;

    // Create borders and add them
    Matter.World.add(_engine.world, [
      Matter.Bodies.rectangle(width/2, -offset, width + 2 * offset, settings["borderThickness"]*2, <any>{isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black'}}),
      Matter.Bodies.rectangle(width/2, height + offset, width + 2 * offset, settings["borderThickness"]*2, <any>{isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black'}}),
      Matter.Bodies.rectangle(width + offset, height/2, settings["borderThickness"]*2, height + 2 * offset, <any>{isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black'}}),
      Matter.Bodies.rectangle(-offset, height/2, settings["borderThickness"]*2, height + 2 * offset, <any>{isStatic: true, render: { fillStyle: 'black', strokeStyle: 'black'}})
    ]);
    
    // Create coins
    let circles : any = [];
    for (var i = 0; i < currentBoard.length; i++) {
      var xCoord : number, yCoord : number;
      if (currentBoard[i].shouldRescale) {
        xCoord = currentBoard[i].coordinate.xPos * settings["outerBoardWidth"];
        yCoord = currentBoard[i].coordinate.yPos * settings["outerBoardHeight"];
      }
      else {
        xCoord = currentBoard[i].coordinate.xPos;
        yCoord = currentBoard[i].coordinate.yPos; 
      }
      // Mirror the board
      if (shouldMirrorBoard) {
        xCoord = settings["outerBoardWidth"] - xCoord;
        yCoord = settings["outerBoardHeight"] - yCoord;
      }
      circles.push(Matter.Bodies.circle(xCoord, yCoord, settings["coinDiameter"] / 2.0, <any>{ isStatic: false, collisionFilter: { mask: defaultCategory }, restitution: 1, frictionAir: 0.02, render: { fillStyle: currentBoard[i].color, strokeStyle: 'black' }, label: 'Coin' }));
    }
    Matter.World.add(_engine.world, circles); // add coins

    // Create pockets and add them
    Matter.World.add(_engine.world, [
      Matter.Bodies.circle(settings["coinPocketTopLeftX"], settings["coinPocketTopLeftY"], settings["coinPocketDiameter"]/2, <any>{isStatic: true, restitution: 1, collisionFilter: {mask: defaultCategory}, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket'}),
      Matter.Bodies.circle(settings["coinPocketTopRightX"], settings["coinPocketTopRightY"], settings["coinPocketDiameter"]/2, <any>{isStatic: true, restitution: 1, collisionFilter: {mask: defaultCategory}, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket'}),
      Matter.Bodies.circle(settings["coinPocketBottomLeftX"], settings["coinPocketBottomRightY"], settings["coinPocketDiameter"]/2, <any>{isStatic: true, restitution: 1, collisionFilter: {mask: defaultCategory}, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket'}),
      Matter.Bodies.circle(settings["coinPocketBottomRightX"], settings["coinPocketBottomRightY"], settings["coinPocketDiameter"]/2, <any>{isStatic: true, restitution: 1, collisionFilter: {mask: defaultCategory}, render: { fillStyle: 'grey', strokeStyle: 'black' }, label: 'Pocket'})
    ]);
    
    // Constrain striker horizontally
    var strikerX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
    var strikerY = settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);
    
    // Add striker circle
    Matter.World.add(_engine.world, Matter.Bodies.circle(strikerX, strikerY, settings["strikerDiameter"]/2, <any>{isStatic: false, restitution: 1, angle: (6.0*Math.PI)/4.0, collisionFilter: {category: defaultCategory}, render: { fillStyle:'blue', strokeStyle:'black' }, label:'Striker'}));
  }

  // This gets called after every move
  export function updateUI(params : IUpdateUI) : void {
    
    playerInfo = angular.copy(params.playersInfo);
    // update score
    gameScore = angular.copy(gameLogic.gameScoreGlobal);
    
    // Set center of board 
    if (centerOfBoard === undefined && settings !== undefined) {
      centerOfBoard = {xPos: settings["outerBoardWidth"]/2, yPos: settings["outerBoardHeight"]/2};
    }
    
    // SET CURRENT MODE
    if (params.playMode === "passAndPlay") {
      currentMode = "PassAndPlay";
    }
    else if (params.playMode === "playAgainstTheComputer") {
      currentMode = "Practice";
    }
    else {
      currentMode = "Opponent";
    }
    
    didMakeMove = false;
    currentUpdateUI = params;
    state = params.move.stateAfterMove;
    
    
    $timeout(handleStateUpdate, 500);
  }
  
  export let firstTimePlayer1 = true;
  export let firstTimePlayer2 = true;
  function handleStateUpdate() {
    // Make sure to draw on both screens
    if (currentMode === "Opponent" && currentUpdateUI.yourPlayerIndex !== -2) {
      // Player one always goes first
      if (yourPlayerIndex() === 0 && firstTimePlayer1) {
        firstTimePlayer1 = false;
        updateInitialUI(undefined);
        console.log("first player turn first time");
      }
      else if (yourPlayerIndex() === 1 && firstTimePlayer2) {
        firstTimePlayer2 = false;
        if (state.realFirstMove) {
          console.log("-----------------------real first move not set to false");
          updateInitialUI(undefined);
        }
        else updateInitialUI(state);
        console.log("second player turn first time");
      }
    }
    
    // Draw initially for both computer and pass and play
    if (isFirstMove() && isMyTurn()) {
      updateInitialUI(undefined);
      makeComputerMove();
    }
    // HANDLE REDRAWING FOR OTHER TWO MODES (opponent + passAndPlay)
    if (currentMode === "PassAndPlay" && currentUpdateUI.yourPlayerIndex !== -2) {
      setBoardState(state);
    }
    else if (currentMode === "Opponent" && currentUpdateUI.yourPlayerIndex !== -2) {
      // Only redraw and invert for current player
      if (isMyTurn()) {
        setBoardState(state);
      }
    }
  }
  
  
  function isFirstMove() {
    return !currentUpdateUI.move.stateAfterMove;
  }
  
  function yourPlayerIndex() {
    return currentUpdateUI.yourPlayerIndex;
  }
  
  function isComputer() {
    return currentUpdateUI.playersInfo[currentUpdateUI.yourPlayerIndex].playerId === '';
  }
  
  function isComputerTurn() {
    return isMyTurn() && isComputer();
  }
  
  function isHumanTurn() {
    return isMyTurn() && !isComputer();
  }
  
  function isMyTurn() {

    return !didMakeMove && // you can only make one move per updateUI.
      currentUpdateUI.move.turnIndexAfterMove >= 0 && // game is ongoing
      currentUpdateUI.yourPlayerIndex === currentUpdateUI.move.turnIndexAfterMove; // it's my turn
  }

  export function init() {
    translate.setTranslations(getTranslations());
    translate.setLanguage('en');
    // resizeGameAreaService.setWidthToHeight(1);
    moveService.setGame({
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      checkMoveOk: gameLogic.checkMoveOk,
      updateUI: updateUI
    });
  }
  
  // This should be only called once
  export function updateInitialUI(stateToDraw : IState) {
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
      },
      timing: {
        timestamp: 0,
        timeScale: 1
      }
    });
    _engine.world.gravity.y = 0;
    _engine.world.gravity.x = 0;
    _objectsInMotion = 0;

    // BE SURE TO COMMENT OUT
    var mouseConstraint = (<any>Matter.MouseConstraint).create(_engine);
    mouseConstraint.collisionFilter.mask = removedCategory;    
    
    Matter.World.add(_engine.world, mouseConstraint);
    
    Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
      
      var mouseDownPostion = event.mouse.mousedownPosition;
            
      var mousePosition = event.mouse.position;

      var strikerPosition = getStriker().position;

      if (mousePosition.y < (strikerPosition.y + (1.5 * settings["strikerDiameter"]))) {

        var posX = mousePosition.x;

        if (posX < strikerPosition.x) {
          // Moving Left

          if (!isHumanTurn()) return;

          
          var leftGuard = settings["bottomOuterStrikerPlacementLineStartX"];

          if (posX  > leftGuard) 
            Matter.Body.translate(getStriker(), { x: posX - strikerPosition.x, y: 0 });

        } else if (posX > strikerPosition.x) {
          // Moving Right

          if (!isHumanTurn()) return;
          
          var rightGuard = settings["bottomOuterStrikerPlacementLineEndX"];

          if (posX < rightGuard) 
            Matter.Body.translate(getStriker(), { x: posX - strikerPosition.x, y: 0 });

        } 
      } else {
        // mouse drag below the striker.

        var posX = mousePosition.x;
        var horizontalDistance = strikerPosition.x - posX;
        var verticalDistance = strikerPosition.y - mousePosition.y;

        var angle = Math.atan2(verticalDistance, horizontalDistance);
        
        _renderLength = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance);
        Matter.Body.setAngle(getStriker(), angle);

      }
    });


    Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
      var mouseupPosition = event.mouse.mouseupPosition;
      var strikerPosition = getStriker().position;

      if (mouseupPosition.y > (strikerPosition.y + settings["strikerDiameter"])) {
        shootClick();
        _renderLength = 0;  
      }
      
    });

    updateScene();

    settings = gameLogic.drawBoard(_sceneWidth, _sceneHeight);
    
    if (stateToDraw === undefined) drawObjects(undefined, undefined);
    else drawObjects(stateToDraw.board, stateToDraw.shouldFlipBoard);

    // Background image
    var renderOptions = _engine.render.options;
    renderOptions.background = 'imgs/carromBackground.png';
    renderOptions.showAngleIndicator = false;
    renderOptions.wireframes = false;
    renderOptions.showDebug = false;

    Matter.Engine.run(_engine);

    _globalSize = _sceneWidth < _sceneHeight ? _sceneWidth : _sceneHeight;


    Matter.Events.on(_engine.render, 'afterRender', function() {
      var context = _engine.render.context,
        bodies = Matter.Composite.allBodies(_engine.world)

      var striker = getStriker();
      if (striker != undefined) {
        var startPoint = { x: striker.position.x, y: striker.position.y },
          endPoint = {
            x: striker.position.x + (_renderLength) * Math.cos(striker.angle),
            y: striker.position.y + (_renderLength) * Math.sin(striker.angle)
          };

        var isWorldStatic = true;

        for (let bodyId in _engine.world.bodies) {
          if (_engine.world.bodies[bodyId].motion != 0) {
            isWorldStatic = false;
          }
        }

        var strikerCenterX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
        var strikerCenterY = settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);

        var strikerCenterComputerX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
        var strikerCenterComputerY = settings["outerBoardHeight"] - (settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2));

        /// Update check if striker is in reset position.
        var leftGuard = settings["bottomOuterStrikerPlacementLineStartX"];
        var rightGuard = settings["bottomOuterStrikerPlacementLineEndX"];

        if(isWorldStatic && isMyTurn())
          drawGuideLines(context, startPoint, endPoint);
      }
    });

    function drawGuideLines(context: any, startPoint: any, endPoint: any){
      context.globalAlpha = 0.5;
      context.beginPath();
      context.setLineDash([3]);
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);

      context.strokeStyle = 'red';
      context.lineWidth = 5.5;
      context.stroke();
      context.setLineDash([]);
    }

    Matter.Events.on(_engine, 'collisionEnd', function(event) {
      handlePocketCollision(event);
    });

    function handlePocketCollision(event: any) {
      var pairs = event.pairs;

      // change object colours to show those starting a collision
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        if (pair.bodyA.label == "Pocket" && pair.bodyB.label == "Coin") {
          pair.bodyB.collisionFilter.mask = removedCategory;
          (<any>Matter.World).remove(_engine.world, pair.bodyB);

        } else if (pair.bodyB.label == "Pocket" && pair.bodyA.label == "Coin") {
          pair.bodyA.collisionFilter.mask = removedCategory;
          (<any>Matter.World).remove(_engine.world, pair.bodyA);
        }
      }
    }
    addSleepEventToEngineBodies();
  }
  
  export function addSleepEventToEngineBodies() {
    for (var i = 0; i < _engine.world.bodies.length; i++) {
      Matter.Events.on(_engine.world.bodies[i], 'sleepStart', function(event) {
        var body = this;

        _objectsInMotion += body.isSleeping ? 1 : 0;

        var isWorldStatic = true;

        for (let bodyId in _engine.world.bodies) {
          if (!_engine.world.bodies[bodyId].isSleeping) {
            isWorldStatic = false;
          }
        }

        if (isWorldStatic) {
          var currentState = getBoardState();
          var nextMove = gameLogic.createMove(state, currentState, currentUpdateUI.move.turnIndexAfterMove, settings);
          moveService.makeMove(nextMove);

          _engine.enableSleeping = false;
          
          // Handle next turn for practice
          $timeout(handlePracticeMode, 1000);
        }
      });
    }
  }
  
  // Handle next turn
  export function handlePracticeMode() {
    // Practice
    if (currentMode === "Practice") {
      resetStrikerPosition();
      makeComputerMove();
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
    if (!isHumanTurn()) return;
    var strikerCenterX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
    var strikerCenterY = settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);
    var striker = getStriker();
    Matter.Body.setPosition(striker, {x:strikerCenterX, y:strikerCenterY});
    Matter.Body.setAngle(striker, (6.0 * Math.PI) / 4.0);

    for (let body in _engine.world.bodies) {
      if (_engine.world.bodies[body].label != "Pocket") {
        Matter.Sleeping.set(_engine.world.bodies[body], false);
      }
    }
  }
  
  // Set striker position to top for computer
  export function resetStrikerPositionForComputer() {
    if (!isComputerTurn()) return;
    var strikerCenterX = (settings["bottomOuterStrikerPlacementLineStartX"] + settings["bottomOuterStrikerPlacementLineEndX"]) / 2;
    var strikerCenterY = settings["outerBoardHeight"] - (settings["bottomOuterStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2));
    var striker = getStriker();
    Matter.Body.setPosition(striker, {x:strikerCenterX, y:strikerCenterY});
    Matter.Body.setAngle(striker, 0.5*Math.PI);

    for (let body in _engine.world.bodies) {
      if (_engine.world.bodies[body].label != "Pocket") {
        Matter.Sleeping.set(_engine.world.bodies[body], false);
      }
    }
  }
  
  var translationFactor = 15;
  // Move the striker left
  export function leftClick(){
    if (!isHumanTurn()) return;
    var posX = getStriker().position.x;
    var leftGuard = settings["bottomOuterStrikerPlacementLineStartX"];
    if ((posX - translationFactor) > leftGuard) Matter.Body.translate(getStriker(), { x: -translationFactor, y: 0 });
    else {
      var newTranslationFactor = posX - leftGuard;
      Matter.Body.translate(getStriker(), { x: -newTranslationFactor, y: 0 });
    }
  }

  // Move the striker right
  export function rightClick(){
    if (!isHumanTurn()) return;
    var posX = getStriker().position.x;
    var rightGuard = settings["bottomOuterStrikerPlacementLineEndX"];
    if (posX + translationFactor < rightGuard) Matter.Body.translate(getStriker(), { x: translationFactor, y: 0 });
    else {
      var newTranslationFactor = Math.abs(rightGuard - posX);
      Matter.Body.translate(getStriker(), { x: newTranslationFactor, y: 0 });
    }
  }

  // Rotate the striker left
  export function leftRotate(){
    if (!isHumanTurn()) return;
    rotate(RotateDirection.Left);
  }
  
  // Rotate the striker right
  export function rightRotate(){
    if (!isHumanTurn()) return;
    rotate(RotateDirection.Right);
  }

  // Generic rotate function
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

  // Create the current state of the board
  export function getBoardState() {
    var allCoins : Coin[] = [];
    for (var i = 0; i < _engine.world.bodies.length; i++) {
      var currentCoin = _engine.world.bodies[i];
      if(currentCoin.label == "Coin"){
        var newCoin : Coin = {coordinate: {xPos: currentCoin.position.x/settings["outerBoardWidth"], yPos: currentCoin.position.y/settings["outerBoardHeight"]}, color: currentCoin.render.fillStyle, shouldRescale: true};
        allCoins.push(newCoin);
      }
    }
    var returnedState : IState = {board: allCoins, playerIndex: angular.copy(state.playerIndex), gameScore: angular.copy(state.gameScore), shouldCoverQueen: state.shouldCoverQueen, shouldFlipBoard: state.shouldFlipBoard, realFirstMove: state.realFirstMove};
    return returnedState;
  }
  
  // Redraw the board with the new state
  export function setBoardState(state : IState) {
    Matter.World.clear(_engine.world, false);
    var newBoard : Board = state.board;
    if (state.shouldFlipBoard) drawObjects(newBoard, true);
    else drawObjects(newBoard, false);
    addSleepEventToEngineBodies();
  }

  // Shoot the striker
  export function shootClick(){
    if (!isHumanTurn()) return;
    if (window.location.search === '?throwException') {
      throw new Error("Throwing the error because URL has '?throwException'");
    }
    if (didMakeMove) return;
    didMakeMove = true;
    var striker = getStriker();
    var position = {
        x: striker.position.x + 1.0 * Math.cos(striker.angle),
        y: striker.position.y + 1.0 * Math.sin(striker.angle)
      };
    
    // console.log(_renderLength);
    var force: number = _renderLength/_globalSize * 0.1;

    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      {
        x: force * striker.mass * Math.cos(striker.angle), 
        y: force * striker.mass * Math.sin(striker.angle)
      })
    
    _engine.enableSleeping = true;
  }
  
  // Simulate computer move 
  export function makeComputerMove() {
    
    if (!isComputerTurn()) return;
    resetStrikerPositionForComputer();
    $timeout(makeComputerMoveHelper, 1000);
  }
  
  export function makeComputerMoveHelper() {
    let move : Move = aiService.randomMove();
    // Do translation move
    for (let i = 0; i < move.translationCount; i++) {
      if (move.translationDirection == Direction.Left) leftClick();
      else rightClick();
    }
    // Do angle turn
    for (let i = 0; i < move.angleTurnCount; i++) {
      if (move.angleDirection == Direction.Left) rotate(RotateDirection.Left);
      else rotate(RotateDirection.Right);
    }
    // Same as shoot click, but without human limitation
    if (didMakeMove) return;
    didMakeMove = true;
    
    var striker = getStriker();
    var position = {
        x: striker.position.x + 1.0 * Math.cos(striker.angle),
        y: striker.position.y + 1.0 * Math.sin(striker.angle)
      };
    
    var force : number = 0.05;

    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      {
        x: (_globalSize / document.documentElement.clientWidth) * force * striker.mass * Math.cos(striker.angle), 
        y: (_globalSize / document.documentElement.clientHeight) * force * striker.mass * Math.sin(striker.angle)
      })
      _engine.enableSleeping = true;
  }
}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function() {
    $rootScope['game'] = game;
    game.init();
  });
