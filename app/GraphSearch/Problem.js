export default class Problem {
    /**
     * 
     * @param {State} initialState 
     * @param {Graph} graph 
     */
    constructor(initialState, graph) {
        this.initialState = initialState;
        this.graph = graph;
    }

    getInitialState() {
        return this.initialState;
    }

    actions(s) {
        return null;
    }

    result(s, a) {
        return null
    }

    goalTest(s) {
        return null
    }

    stepCost() {
        return 1
    }

    pathCost(path) {
        return null
    }
}