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
    size: number;
}

interface Coordinate {
  xPos : number;
  yPos : number;
}

enum CoinType {
    Queen,
    Black,
    White
}

interface Coin {
    coordinate : Coordinate;
    //xPos: number;
    //yPos: number;
    size: number;
    type: CoinType;
}
interface IState {
    board: Board;
    boardSize : BoardSize;
}

module gameLogic {
  // Coin counts
  
  let coinSize = 1;
  export let settings : {[setting : string] : number} = {
    "numCoins" : 19,
    "numBlack" : 9,
    "numWhite" : 9,
    "numQueen" : 1,
    "firstLayer" : 6,
    "secondLayer" : 12,
    "coinSize" : coinSize,
    "boardWidth" : 40,
    "boardHeight" : 40,
    "numberOfSides" : 6,
    "hexSize" : coinSize*2
  };

  // Return initial board 
  export function getInitialBoard(gameSettings : {[setting : string] : number}): Board {
    let boardSize : BoardSize = getInitialSize(gameSettings);
    let board: Board = [];
    
    // set the position of hte queen
    // insert that qqueen into board
    let queenCoordinate : Coordinate = {xPos: boardSize.centerX,
                                        yPos: boardSize.centerY};
    let queen : Coin = {coordinate:queenCoordinate,
                        size:gameSettings["coinSize"],
                        type:CoinType.Queen};

    // Initialize two layers
    let coins : Coin[] = [];
    coins.push(queen);
    let numberOfSides = 6;
    
    let color : boolean = false;
    let circles : Coordinate[] = [];
    for (let i = 1; i <= gameSettings["numberOfSides"]; i++) {
      let c = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"]);
      let c2 = getCoordinates(gameSettings, boardSize.centerX, boardSize.centerY, i, gameSettings["hexSize"]*2);
      circles.push(c2);
      let coinType = color ? CoinType.Black : CoinType.White;
      color = !color;
      coins.push(createCoin(gameSettings, c, coinType)); 
      coins.push(createCoin(gameSettings, c2, coinType));
    }
    
    color = false;
    for (let i = 0; i < circles.length; i++) {
      let c : Coordinate = {xPos: (circles[i].xPos + circles[(i+1)%gameSettings["numberOfSides"]].xPos)/2.0,
                            yPos: (circles[i].yPos + circles[(i+1)%gameSettings["numberOfSides"]].yPos)/2.0};
      let coinType = color ? CoinType.Black : CoinType.White;
      color = !color;
      coins.push(createCoin(gameSettings, c, coinType)); 
    }
    return coins;
  }
  
  function createCoin(gameSettings : {[setting : string] : number}, c : Coordinate, coinType : CoinType) : Coin {
    let coinCoordinate : Coordinate = {xPos:c.xPos,
                                   yPos:c.yPos};
    let coin : Coin = {coordinate:coinCoordinate,
                         size:gameSettings["coinSize"],
                         type:coinType};
    return coin;
  }
  
  function getCoordinates(gameSettings : {[setting : string] : number}, centerX : number, centerY : number, index : number, hexSize : number) : Coordinate {
    
    let c : Coordinate = {xPos: centerX + hexSize * Math.cos(index * 2 * Math.PI / gameSettings["numberOfSides"]),
                          yPos: centerY + hexSize * Math.sin(index * 2 * Math.PI / gameSettings["numberOfSides"])};
    return c;
  }
  
  export function getInitialSize(gameSettings : {[setting : string] : number}): BoardSize {
      let boardSize : BoardSize = {width: gameSettings["boardWidth"], 
                                   height: gameSettings["boardHeight"],
                                   centerX: gameSettings["boardWidth"]/2,
                                   centerY: gameSettings["boardHeight"]/2};
      return boardSize;
  }

  export function getInitialState(): IState {
    return {board: getInitialBoard(gameLogic.settings), boardSize: getInitialSize(gameLogic.settings)};
  }
}
