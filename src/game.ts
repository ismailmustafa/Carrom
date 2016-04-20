interface SupportedLanguages { en: string, iw: string};
interface Translations {
  [index: string]: SupportedLanguages;
}

module game {

  export enum CurrentMode {
    Practice,
    PassAndPlay,
    Opponent
  }
  
  export enum RotateDirection {
    Left,
    Right
  }

  export enum Players {
    Player1,
    Player2
  }
  
  export interface GameScore {
    White : number,
    Black : number
  }
  
  export enum CurrentTurn {
    White,
    Black
  }
  
  // ALL INITIAL VARIABLES
  
  // These variable taken from TicTacToe logic
  export let currentUpdateUI: IUpdateUI = null;
  export let didMakeMove: boolean = false;
  export let state: IState = null;
  export let isHelpModalShown: boolean = false;
  
  // My variables
  export let currentMode : CurrentMode; // Current mode
  export let computerTurnFlag : Boolean  = true; // check if computer should play in practice mode
  export let gameScore : GameScore = {White: 0, Black: 0}; // Keep track of game score
  export let queenPocketed : Boolean = false; // Keep track of if queen was pocketed
  export let currentTurn : CurrentTurn = CurrentTurn.White; // White goes first
  export let turnIndex : number = 0; // Initialize turn index
  export let settings : any = null;
  export let enableButtons: boolean = true;

  // Engine initial variables
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
      circles.push(Matter.Bodies.circle(xCoord, yCoord, settings["coinDiameter"] / 2.0, <any>{isStatic: false, collisionFilter: {mask: defaultCategory}, restitution: 1, render: { fillStyle: currentBoard[i].color, strokeStyle: 'black' }, label: 'Coin'}));
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
    // SET CURRENT MODE
    if (params.playMode === "passAndPlay") currentMode = CurrentMode.PassAndPlay;
    else if (params.playMode === "playAgainstTheComputer") currentMode = CurrentMode.Practice;
    else currentMode = CurrentMode.Opponent;
    
    didMakeMove = false;
    currentUpdateUI = params;
    state = params.move.stateAfterMove;
    
    if (isFirstMove()) {
      updateInitialUI();
      $timeout(makeComputerMoveTest, 1000);
      // makeComputerMove();
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
    resizeGameAreaService.setWidthToHeight(1);
    moveService.setGame({
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      checkMoveOk: gameLogic.checkMoveOk,
      updateUI: updateUI
    });
  }
  
  // This should be only called once
  export function updateInitialUI() {
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

    updateScene();

    settings = gameLogic.drawBoard(_sceneWidth, _sceneHeight);

    // This code saves the state to the local storage
    // var localStorageState = localStorage.getItem("boardState");
    // if (localStorageState != null) {
    //   var localBoardState = JSON.parse(localStorageState);
    //   if (localBoardState != undefined) {
    //     setBoardState(localBoardState);
    //   }
    // } else {
    //   drawObjects(undefined, undefined);
    // }
    
    drawObjects(undefined, undefined); // In leiu of local storage

    // Background image
    var renderOptions = _engine.render.options;
    renderOptions.background = 'imgs/carromBackground.png';
    renderOptions.showAngleIndicator = false;
    renderOptions.wireframes = false;
    renderOptions.showDebug = false;

    Matter.Engine.run(_engine);

    Matter.Events.on(_engine.render, 'afterRender', function() {
      var context = _engine.render.context,
        bodies = Matter.Composite.allBodies(_engine.world)

      var striker = getStriker();
      if (striker != undefined) {
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
      }

    });

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
          // Not neeeded, only for local storage
          // localStorage.setItem("boardState", JSON.stringify(<any>state));

          var currentState = getBoardState();
          var nextMove = gameLogic.createMove(state, currentState, currentUpdateUI.move.turnIndexAfterMove, settings);
          moveService.makeMove(nextMove);

          _engine.enableSleeping = false;
          
          if (isComputerTurn()) resetStrikerPositionForComputer();
          else resetStrikerPosition();
          $timeout(makeComputerMoveTest,1000);
          // makeComputerMove();

          // if (isComputerTurn()) {
          //   if (computerTurnFlag) $timeout(makeComputerMove, 1000);
          //   computerTurnFlag = !computerTurnFlag;
          // }
          // else {
          //   resetStrikerPosition();
          // }
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
    console.log("resetting striker normally");
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
    console.log("reseting striker for computer");
    var strikerCenterX = (settings["topOuterStrikerPlacementLineStartX"] + settings["topOuterStrikerPlacementLineEndX"]) / 2;
    var strikerCenterY = settings["topInnerStrikerPlacementLineStartY"] - (settings["innerStrikerPlacementLineOffset"] / 2);
    var striker = getStriker();
    Matter.Body.setPosition(striker, {x:strikerCenterX, y:strikerCenterY});
    Matter.Body.setAngle(striker, (6.0 * Math.PI) / 4.0);

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
    var state : IState = {board: allCoins};
    return state;
  }
  
  // Redraw the board with the new state
  export function setBoardState(state : IState) {
    
    Matter.World.clear(_engine.world, false);
    
    var newBoard : Board = state.board;
    drawObjects(newBoard, true);
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
    
    var force : number = 0.1;
    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      { x: force * Math.cos(striker.angle), y: force * Math.sin(striker.angle) })
    
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
    var force : number = 0.1;
    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      { x: force * Math.cos(striker.angle), y: force * Math.sin(striker.angle) })
    _engine.enableSleeping = true;
  }
  
  export function makeComputerMoveTest() {
    if (!isComputerTurn()) return;
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
    var force : number = 0.1;
    Matter.Body.applyForce(striker, 
      { x: position.x, y: position.y }, 
      { x: force * Math.cos(striker.angle), y: force * Math.sin(striker.angle) })
    _engine.enableSleeping = true;
  }
}



angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function() {
    $rootScope['game'] = game;
    game.init();
  });
