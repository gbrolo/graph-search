import { isInside } from './SearchHelpers';
import { getKeyByValue, getPuzzleActions, getNewPuzzleTileWithAction } from './OperationHelpers';
import State from './State';

export default class Problem {
    /**
     * 
     * @param {State} initialState
     * @param {Array} goalStates: a list of goal States (State).
     * @param {String} problemType: either SUDOKU or PUZZLE      
     */
    constructor(initialState, goalStates, problemType) {
        this.initialState = initialState; 
        this.goalStates = goalStates;     
        this.problemType = problemType;  
    }

    getInitialState() {
        return this.initialState;
    }

    actions(s) {
        //console.log('state s is', s);
        if (this.problemType === 'PUZZLE') {
            let locations = s.getState();

            let tileLocation = getKeyByValue(locations, '.');
            //console.log('tileLocation', tileLocation);

            return getPuzzleActions(tileLocation);            

        } else {
            return null;
        }
    }

    result(s, a) {
        if (this.problemType === 'PUZZLE') {
            let locations = s.getState();

            let tileLocation = getKeyByValue(locations, '.');

            let newTileLocation = getNewPuzzleTileWithAction(tileLocation, a, this.actions(s));

            const newTileLocationValue = locations[newTileLocation];
            const tileLocationValue = locations[tileLocation];

            locations[tileLocation] = newTileLocationValue;
            locations[newTileLocation] = tileLocationValue;

            return new State(locations);
        } else {
            return null;
        }
    }

    goalTest(s) {
        return isInside(s, this.goalStates);
    }

    stepCost() {
        return 1
    }

    pathCost(path) {
        return null
    }
}