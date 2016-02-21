describe("In Carrom Game Logic", function () {
    function testSomething(a) {
        if (a)
            throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!");
    }
    function testSomeValue() {
        return 1;
    }
    it("testing some bs function", function () {
        testSomething(false);
    });
    it("testing some bs function 2", function () {
        testSomething(false);
    });
    it("testing some bs function returning value", function () {
        expect(testSomeValue()).toBe(2);
    });
});
//# sourceMappingURL=gameLogic_test.js.map