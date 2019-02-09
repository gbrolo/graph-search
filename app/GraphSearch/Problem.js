import { isInside } from './SearchHelpers';
import { getKeyByValue } from './OperationHelpers';

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

            if (tileLocation === 'tile_16') {
                return [ 'LEFT', 'UP' ]
            } else if (tileLocation === 'tile_4') {
                return [ 'LEFT', 'DOWN' ]
            } else if (tileLocation === 'tile_13') {
                return [ 'RIGHT', 'UP' ]
            } else if (tileLocation === 'tile_1') {
                return [ 'RIGHT', 'DOWN' ]
            } else if ((tileLocation === 'tile_2') || (tileLocation === 'tile_3')) {
                return [ 'LEFT', 'RIGHT', 'DOWN' ]
            } else if ((tileLocation === 'tile_14') || (tileLocation === 'tile_15')) {
                return [ 'LEFT', 'RIGHT', 'UP' ]
            } else if ((tileLocation === 'tile_5') || (tileLocation === 'tile_9')) {
                return [ 'UP', 'DOWN', 'RIGHT' ]
            } else if ((tileLocation === 'tile_8') || (tileLocation === 'tile_12')) {
                return [ 'UP', 'DOWN', 'LEFT' ]
            } else {
                return [ 'UP', 'DOWN', 'LEFT', 'RIGHT' ]
            }

        } else {
            return null;
        }
    }

    result(s, a) {
        return null
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