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
  export const COINSIZE = 2;
  
  // Board dimensions
  export const BOARDWIDTH = 40;
  export const BOARDHEIGHT = 40;

  // Return initial board 
  function getInitialBoard(): Board {
    let boardSize : BoardSize = getInitialSize();
    let board: Board = [];
    
    // set the position of hte queen
    // insert that qqueen into board
    let queen : Coin = {xPos:boardSize.centerX,
                        yPos:boardSize.centerY,
                        size:COINSIZE,
                        type:CoinType.Queen};
    board.push(queen);
    return board;
  }
      
    // Second ring
    //for (let j = 0; j < COLS; j++) {
    //    board[i][j] = '';
    //}
  
  export function calculateFirstLayer(queen : Coin) : Coin[] {
    let coins : Coin[] = [];
    // Calculate first ring of coins
    let color : boolean = false;
    for (let i = 0; i < FIRSTLAYER; i++) {
        //let x = Math.cos(i*((2*Math.PI)/FIRSTLAYER)) * queen.size + BOARDWIDTH/2;
        //let y = Math.sin(i*((2*Math.PI)/FIRSTLAYER)) * queen.size + BOARDHEIGHT/2;
        let x = Math.cos(i*((2*Math.PI)/FIRSTLAYER)) + BOARDWIDTH/2;
        let y = Math.sin(i*((2*Math.PI)/FIRSTLAYER)) + BOARDHEIGHT/2;
        
        let coinType = color ? CoinType.Black : CoinType.White;
        color = !color;
        let coin : Coin = {xPos:x,
                            yPos:y,
                            size:COINSIZE,
                            type:coinType};
        coins.push(coin);      
    }
    return coins;
  }
  
  function compare(x : number, y : number) : boolean {
    if (Math.abs(x - y) < 0.00001) return true;
    else return false;
  }
  
  function sign(x : number) {
    if (x < 0) return -1;
    else return 1;
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
