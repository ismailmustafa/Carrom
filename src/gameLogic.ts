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
    xPos: number;
    yPos: number;
    size: number;
    type: CoinType;
}
interface IState {
    board: Board;
    boardSize : BoardSize;
}

module gameLogic {
  // Coin counts
  export const NUMCOINS = 19;
  export const NUMBLACK = 9;
  export const NUMWHITE = 9;
  export const NUMQUEEN = 1;
  
  // Coin initializer properties
  export const FIRSTLAYER = 6;
  export const SECONDLAYER = 12;
  export const COINSIZE = 1;
  
  // Board dimensions
  export const BOARDWIDTH = 40;
  export const BOARDHEIGHT = 40;
  
  // Starting coin layer 
  export const NUMBEROFSIDES = 6;
  export const HEXSIZE = COINSIZE*2;

  // Return initial board 
  export function getInitialBoard(): Board {
    let boardSize : BoardSize = getInitialSize();
    let board: Board = [];
    
    // set the position of hte queen
    // insert that qqueen into board
    let queen : Coin = {xPos:boardSize.centerX,
                        yPos:boardSize.centerY,
                        size:COINSIZE,
                        type:CoinType.Queen};

    // Initialize two layers
    let coins : Coin[] = [];
    coins.push(queen);
    let numberOfSides = 6;
    
    let color : boolean = false;
    let circles : Coordinate[] = [];
    for (let i = 1; i <= NUMBEROFSIDES; i++) {
      let c = getCoordinates(boardSize.centerX, boardSize.centerY, i, HEXSIZE);
      let c2 = getCoordinates(boardSize.centerX, boardSize.centerY, i, HEXSIZE*2);
      circles.push(c2);
      let coinType = color ? CoinType.Black : CoinType.White;
      color = !color;
      coins.push(createCoin(c, coinType)); 
      coins.push(createCoin(c2, coinType));
    }
    
    color = false;
    for (let i = 0; i < circles.length; i++) {
      let c : Coordinate = {xPos: (circles[i].xPos + circles[(i+1)%NUMBEROFSIDES].xPos)/2.0,
                            yPos: (circles[i].yPos + circles[(i+1)%NUMBEROFSIDES].yPos)/2.0};
      let coinType = color ? CoinType.Black : CoinType.White;
      color = !color;
      coins.push(createCoin(c, coinType)); 
    }
    return coins;
  }
  
  function createCoin(c : Coordinate, coinType : CoinType) : Coin {
    let coin : Coin = {xPos:c.xPos,
                         yPos:c.yPos,
                         size:COINSIZE,
                         type:coinType};
    return coin;
  }
  
  function getCoordinates(centerX : number, centerY : number, index : number, hexSize : number) : Coordinate {
    
    let c : Coordinate = {xPos: centerX + hexSize * Math.cos(index * 2 * Math.PI / NUMBEROFSIDES),
                          yPos: centerY + hexSize * Math.sin(index * 2 * Math.PI / NUMBEROFSIDES)};
    return c;
  }
  
  export function getInitialSize(): BoardSize {
      let boardSize : BoardSize = {width: BOARDWIDTH, 
                                   height: BOARDHEIGHT,
                                   centerX: BOARDWIDTH/2,
                                   centerY: BOARDHEIGHT/2};
      return boardSize;
  }

  export function getInitialState(): IState {
    return {board: getInitialBoard(), boardSize: getInitialSize()};
  }
}
