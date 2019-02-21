/**
 * Problem.js
 * An actual Problem that will be solved with A*.
 * Receives initial State, and problem type (SUDOKU or PUZZLE).
 * For PUZZLE you need to provide an array of goal States, which can be calculated with helper functions,
 * see PuzzleBoard.js implementation.
 */

import { isInside ,isSudokuStateAGoalState } from './SearchHelpers';
import { getKeyByValue, getPuzzleActions, getNewPuzzleTileWithAction, clone, getSudokuActions } from './OperationHelpers';
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

    /**
     * Returns PUZZLE for 15-Puzzle problem or SUDOKU for 4x4 Sudoku problem
     */
    getProblemType() {
        return this.problemType;
    }

    /**
     * Returns Problem's initial state
     */
    getInitialState() {
        return this.initialState;
    }

    /**
     * Returns set [Array] of posible actions for the Problem, given some State s
     * @param {State} s
     */
    actions(s) {
        //console.log('state s is', s);
        if (this.problemType === 'PUZZLE') {
            var locations = clone(s.getState());

            var tileLocation = getKeyByValue(locations, '.');
            //console.log('tileLocation', tileLocation);

            return getPuzzleActions(tileLocation);            

        } else {
            var locations = clone(s.getState());
            var tileLocation = getKeyByValue(locations, '*');
            
            return getSudokuActions(tileLocation, clone(s).getState());
        }
    }

    /**
     * Returns the result State for applying action a to State s.
     * @param {State} s 
     * @param {String} a 
     */
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
            var locations = clone(s.getState());
            var tileLocation = getKeyByValue(locations, '*');

            locations[tileLocation] = a;

            let appeared = false;
            let keyToChange = '';
            // result has to have new first blank with * BUG
            Object.keys(locations).forEach((key, index) => {
                if(locations[key] === '.' && !appeared) {
                    keyToChange = key;
                    appeared = true;
                }
            })

            locations[keyToChange] = '*';

            return new State(clone(locations));
        }
    }

    /**
     * Checks if State s is a goal state for the problem
     * @param {State} s 
     */
    goalTest(s) {
        if (this.problemType === 'PUZZLE') {
            return isInside(clone(s).getState(), this.goalStates);
        } else {
            return isSudokuStateAGoalState(clone(s).getState());
        }
    }

    /**
     * The step cost for the problem
     */
    stepCost() {
        if (this.problemType === 'PUZZLE') {
            return 1
        } else {
            return 1;
        }
    }
}