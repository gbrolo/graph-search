import { isInside, getPuzzleHeuristic } from './SearchHelpers';
import { getKeyByValue, getPuzzleActions, getNewPuzzleTileWithAction, clone } from './OperationHelpers';
import State from './State';

export default class Problem {
    /**
     * 
     * @param {State} initialState
     * @param {Array} goalStates: a list of goal States (State).
     * @param {String} problemType: either SUDOKU or PUZZLE      
     */
    constructor(initialState, goalStates, problemType) {
        this.initialState = clone(initialState); 
        this.goalStates = clone(goalStates);     
        this.problemType = problemType;  
    }

    puzzleHeuristic() {
        return getPuzzleHeuristic(clone(this.initialState));
    }

    getProblemType() {
        return this.problemType;
    }

    getInitialState() {
        return this.initialState;
    }

    actions(s) {
        //console.log('state s is', s);
        if (this.problemType === 'PUZZLE') {
            var locations = clone(s.getState());

            var tileLocation = getKeyByValue(locations, '.');
            //console.log('tileLocation', tileLocation);

            return getPuzzleActions(tileLocation);            

        } else {
            return null;
        }
    }

    result(s, a) {
        if (this.problemType === 'PUZZLE') {
            var locations = clone(s.getState());

            var tileLocation = getKeyByValue(locations, '.');

            var newTileLocation = getNewPuzzleTileWithAction(tileLocation, a, this.actions(s));

            const newTileLocationValue = locations[newTileLocation];
            const tileLocationValue = locations[tileLocation];

            locations[tileLocation] = newTileLocationValue;
            locations[newTileLocation] = tileLocationValue;

            return new State(clone(locations));
        } else {
            return null;
        }
    }

    goalTest(s) {
        // console.log('entering goalTest function, comparing:');
        // console.log('clone(s)', clone(s));
        // console.log('this.goalStates', this.goalStates);
        return isInside(clone(s).getState(), this.goalStates);
    }

    stepCost() {
        if (this.problemType === 'PUZZLE') {
            return 1
        } else {
            return null;
        }
    }

    pathCost(path) {
        return null
    }
}