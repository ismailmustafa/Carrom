describe("In Carrom Game Logic", function () {
    function expectMove(isOk, turnIndexBeforeMove, boardBeforeMove, row, col, boardAfterMove, turnIndexAfterMove, endMatchScores) {
        var stateTransition = {
            turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: boardBeforeMove ? { board: boardBeforeMove, delta: null } : null,
            move: {
                turnIndexAfterMove: turnIndexAfterMove,
                endMatchScores: endMatchScores,
                stateAfterMove: { board: boardAfterMove, delta: { row: row, col: col } }
            },
            numberOfPlayers: null
        };
        if (isOk) {
            gameLogic.checkMoveOk(stateTransition);
        }
        else {
            // We expect an exception to be thrown :)
            var didThrowException = false;
            try {
                gameLogic.checkMoveOk(stateTransition);
            }
            catch (e) {
                didThrowException = true;
            }
            if (!didThrowException) {
                throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!");
            }
        }
    }
});
//# sourceMappingURL=gameLogic_test.js.map