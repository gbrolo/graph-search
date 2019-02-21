/**
 * SearchHelpers.js
 * Functions that help in solving the problem.
 * Contains the actual A* algorithm.
 */

import Node from './Node';
import State from './State';

const equal = require('deep-equal'); // for comparing objects

/**
 * Generates a child Node for a Problem, given a paren Node and an action
 * @param {Problem} problem 
 * @param {Node} parent 
 * @param {String} action 
 */
function childNode(problem, parent, action) {
    let state = problem.result(parent.getState(), action);
    let problemType = problem.getProblemType();    
    let heuristicCost = 0;

    if (problemType === 'PUZZLE') {
        // heuristicCost = getPuzzleHeuristic(parent.getState());
        heuristicCost = getPuzzleHeuristicManhattan(parent.getState());
        // let heuristics = [
        //     getPuzzleHeuristic(parent.getState()),
        //     getPuzzleHeuristicManhattan(parent.getState())
        // ];

        // heuristicCost = Math.max(...heuristics);
    } else if (problemType === 'SUDOKU') {
        heuristicCost = getSudokuHeuristic(action);
    }
    
    let pathCost = parent.getPathCost() 
                    + problem.stepCost() 
                    + heuristicCost;
    let node = new Node(state, parent, action, pathCost);

    return node;
}

/**
 * Returns a solution response and a solution Node.
 * @param {Node} node 
 */
function solution(node) {
    return { solution: true, node };
}

/**
 * Returns FAILURE: problem can't be solved.
 */
function failure() {
    return { solution: false };
}

/**
 * Solves Problem using A* algorithm
 * @param {Problem} problem 
 */
function aStar(problem) {
    console.log('starting algorithm');
    var node = new Node(problem.getInitialState(), null, null, 0);    
    var unorderedFrontier = [node];    
    var explored = [];

    // console.log('node is:', node);    
    // console.log('unorderedFrontier is:', unorderedFrontier);
    // console.log('explored is:', explored);

    let n = 0;
    while(true) {
        n = n+1;
        // console.log('n=', n);

        if (unorderedFrontier.length === 0) {
            return failure();
        }
           
        node = unorderedFrontier.shift();
        // console.log('current state is', clone(node.getState().getState()));
        // console.log('frontier is:', clone(unorderedFrontier));        

        if (problem.goalTest(node.getState())) {            
            return solution(node);
        }

        // console.log('node', clone(node));

        explored.push(node.getState());

        // console.log('about to check actions');        
        // console.log('unorderedFrontier is:', unorderedFrontier);
        // console.log('explored is:', clone(explored));

        problem.actions(node.getState()).forEach(action => {
            // console.log('current action tested is', action);
            var child = childNode(problem, node, action);

            // console.log('new child created:', child);   
            
            var childCondition = isChildStateInFrontierWithHigherPathCost(child, child.getState(), unorderedFrontier);

            if (!isChildStateInExploredOrFrontier(child.getState(), explored, unorderedFrontier)) { // GOOD condition                                    
                unorderedFrontier.push(child);
                unorderedFrontier.sort(function (a,b) {
                    return a.pathCost - b.pathCost
                })
                
                // console.log('child is not inside explored nor frontier');                
                // console.log('unorderedFrontier is:', unorderedFrontier);
            } else if (childCondition.result === true) { 
                // console.log('child is inside frontier with higher pathCost')     
                // console.log('unorderedFrontier just before splice', clone(unorderedFrontier));        
                unorderedFrontier.splice(childCondition.frontierIndex, 1, child);
                unorderedFrontier.sort(function (a,b) {
                    return a.pathCost - b.pathCost
                })                

                // console.log('unorderedFrontier with new node and ordered', clone(unorderedFrontier))                                
            }                                    

        });
    }
}

/**
 * Determines whether child Node is inside explored list or frontier priority queue
 * @param {State} childState 
 * @param {Array[State]} explored 
 * @param {Array[Node]} unorderedFrontier 
 */
function isChildStateInExploredOrFrontier(childState, explored, unorderedFrontier) {
    let insideExplored = isInside(childState, explored);
    let frontierStates = unorderedFrontier.map(node => {
        return node.getState();
    })
    let insideFrontier = isInside(childState, frontierStates);

    return insideExplored || insideFrontier;
}

/**
 * Determines if State inside child Node is already inside the Frontier (inside another Node),
 * with a higher Path Cost than new child Node.
 * @param {Node} child 
 * @param {State} childState 
 * @param {Array} unorderedFrontier 
 */
function isChildStateInFrontierWithHigherPathCost(child, childState, unorderedFrontier) {
    let frontierStates = unorderedFrontier.map(node => {
        return node.getState();
    })
    let insideFrontier = isInside(childState, frontierStates);

    // if is inside the frontier, check if that node has the highest path cost
    if (insideFrontier) {
        // console.log('child is inside frontier...');
        let frontierIndex = getFrontierStateIndex(childState, frontierStates);
        let frontierNode = unorderedFrontier[frontierIndex];
        // console.log('frontier node index is', frontierIndex);
        // console.log('frontier node is', frontierNode);
        let frontierPathCost = frontierNode.getPathCost();
        let childPathCost = child.getPathCost();

        if (childPathCost <= frontierPathCost) {
            // console.log('and child cost is lower!');
            return { result: true, frontierIndex };
        } else return { result: false };
    } else return { result: false };
}

/**
 * Returns frontier element index
 * @param {Object} object 
 * @param {Array} array 
 */
function getFrontierStateIndex(object, array) {
    for (var i = 0; i < array.length; i++) {
        if (equal(array[i], object)) {
            return i;
        }
    }
}

/**
 * Determines if Object is inside Array
 * @param {Object} object 
 * @param {Array} array 
 */
function isInside(object, array) {          
    for (var i = 0; i < array.length; i++) {
        if (equal(array[i], object)) {
            return true;
        }
    }

    return false;
}

/**
 * Sets PUZZLE initial State
 * @param {Array} array 
 */
function setInitialState(array) {    
    // console.log('setting initial state for', array);
    let locations = {}
    for (var i = 0; i < array.length; i++) {
        let index = i + 1;
        var value = array[i];
        locations['tile_' + index] = value;        
    }

    // console.log('locations is', locations);

    let initialState = new State(locations);

    return initialState;
}

/**
 * Sets SUDOKU initial State
 * @param {Array} array 
 */
function setSudokuInitialState(array) {
    let locations = {}
    let foundFirstBlank = false;

    for (var i = 0; i < array.length; i++) {
        let index = i + 1;
        var value = array[i];
        if (value === "." && !foundFirstBlank) {
            value = "*";
            foundFirstBlank = true;
        }
        locations['tile_' + index] = value;        
    }

    // console.log('locations is', locations);

    let initialState = new State(locations);

    return initialState;
}

/**
 * Returns heuristic value [h(n)] for current State in PUZZLE problem [Misplaced Tiles Heuristic]
 * @param {State} state 
 */
function getPuzzleHeuristic(state) {
    let locations = state.getState();
    let misplaced = 0;

    Object.keys(locations).forEach((key, i) => {
        let index = parseInt(key.substr(5, key.length-1));
        const value = locations[key] === '.' ? 16 : parseInt(locations[key]);

        if (value != index) 
            misplaced = misplaced + 1;
    })

    return misplaced;
}

/**
 * Returns heuristic value [h(n)] for current State in PUZZLE problem [Manhattan + Linear Conflicts Heuristic]
 * @param {State} state 
 */
function getPuzzleHeuristicManhattan(state) {
    let locations = state.getState();
    let manhattanSum = 0;

    let actualPositions = {
        tile_1: [1, 4],
        tile_2: [2, 4],
        tile_3: [3, 4],
        tile_4: [4, 4],
        tile_5: [1, 3],
        tile_6: [2, 3],
        tile_7: [3, 3],
        tile_8: [4, 3],
        tile_9: [1, 2],
        tile_10: [2, 2],
        tile_11: [3, 2],
        tile_12: [4, 2],
        tile_13: [1, 1],
        tile_14: [2, 1],
        tile_15: [3, 1],
        tile_16: [4, 1]
    }

    let puzzleArray = [];

    Object.keys(locations).forEach((key, i) => {
        let index = parseInt(key.substr(5, key.length-1));
        const value = locations[key] === '.' ? 16 : parseInt(locations[key]);

        puzzleArray.push(value);

        if (value != index) {
            const realPosition = actualPositions[key];
            const valueProp = 'tile_' + value;
            const currentPosition = actualPositions[valueProp];

            manhattanSum = manhattanSum + (Math.abs(realPosition[0] - currentPosition[0]) +
                                            Math.abs(realPosition[1] - currentPosition[1]));
        }                    
    })

    let linearConflicts = 0;

    for (var i = 3; i < puzzleArray.length; i = i + 4) {
        for (var j = i; j > i - 3; j--) {
            if ((j + 1) % 4 === 0) {
                let cell_1 = puzzleArray[j - 3];
                let cell_2 = puzzleArray[j - 2];

                if (cell_1 > puzzleArray[j]) { linearConflicts = linearConflicts + 1 }
                if (cell_2 > puzzleArray[j]) { linearConflicts = linearConflicts + 1 }
            }

            if ((j % 2 === 0) || (j % 6 === 0) || (j % 10 === 0) || (j % 14 === 0)) {
                let cell_1 = puzzleArray[j - 2];
                if (cell_1 > puzzleArray[j]) { linearConflicts = linearConflicts + 1 }
            }

            if (puzzleArray[j - 1] > puzzleArray[j]) {
                linearConflicts = linearConflicts + 1
            }
        }
    }

    let columnArrays = [
        [puzzleArray[0], puzzleArray[4], puzzleArray[8], puzzleArray[12]],
        [puzzleArray[1], puzzleArray[5], puzzleArray[9], puzzleArray[13]],
        [puzzleArray[2], puzzleArray[6], puzzleArray[10], puzzleArray[14]],
        [puzzleArray[3], puzzleArray[7], puzzleArray[11], puzzleArray[15]]
    ]

    columnArrays.forEach(column => {
        let i = column.length - 1;
        for (var j = i; j > i - 3; j--) {
            if ((j + 1) % 4 === 0) {
                let cell_1 = column[j - 3];
                let cell_2 = column[j - 2];

                if (cell_1 > column[j]) { linearConflicts = linearConflicts + 1 }
                if (cell_2 > column[j]) { linearConflicts = linearConflicts + 1 }
            }

            if ((j % 2 === 0) || (j % 6 === 0) || (j % 10 === 0) || (j % 14 === 0)) {
                let cell_1 = column[j - 2];
                if (cell_1 > column[j]) { linearConflicts = linearConflicts + 1 }
            }

            if (column[j - 1] > column[j]) {
                linearConflicts = linearConflicts + 1
            }
        }
    })
    
    return manhattanSum + (2 * linearConflicts);
}

/**
 * Returns heuristic value [h(n)] for current State in Sudoku problem
 * @param {String} action 
 */
function getSudokuHeuristic(action) {
    return parseInt(action);
}

/**
 * Get sudoku current condfiguration and return values in arrays
 * @param {State} state 
 */
function getSudokuArraysToTest(state) {
    let locations = state;      

    let stateToPlainArray = [];
    
    Object.keys(locations).forEach((key, i) => {
        stateToPlainArray.push(locations[key]);
    });
    
    // rows
    let row_1 = [ stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[2], stateToPlainArray[3] ];
    let row_2 = [ stateToPlainArray[4], stateToPlainArray[5], stateToPlainArray[6], stateToPlainArray[7] ];
    let row_3 = [ stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[10], stateToPlainArray[11] ];
    let row_4 = [ stateToPlainArray[12], stateToPlainArray[13], stateToPlainArray[14], stateToPlainArray[15] ];
    
    // columns
    let column_1 = [ stateToPlainArray[0], stateToPlainArray[4], stateToPlainArray[8], stateToPlainArray[12] ];
    let column_2 = [ stateToPlainArray[1], stateToPlainArray[5], stateToPlainArray[9], stateToPlainArray[13] ];
    let column_3 = [ stateToPlainArray[2], stateToPlainArray[6], stateToPlainArray[10], stateToPlainArray[14] ];
    let column_4 = [ stateToPlainArray[3], stateToPlainArray[7], stateToPlainArray[11], stateToPlainArray[15] ];
    
    // subsquares
    let square_1 = [ stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[4], stateToPlainArray[5] ];
    let square_2 = [ stateToPlainArray[2], stateToPlainArray[3], stateToPlainArray[6], stateToPlainArray[7] ];
    let square_3 = [ stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[12], stateToPlainArray[13] ];
    let square_4 = [ stateToPlainArray[10], stateToPlainArray[11], stateToPlainArray[14], stateToPlainArray[15] ];
    
    let arraysToTest = [
        row_1, row_2, row_3, row_4,
        column_1, column_2, column_3, column_4,
        square_1, square_2, square_3, square_4
    ];

    return arraysToTest;
}

/**
 * Determine if sudoku is solvable
 * @param {State} state 
 */
function isSudokuSolvable(state) {
    let solvable = true;

    let arraysToTest = getSudokuArraysToTest(state);    

    for (var i = 0; i < arraysToTest.length; i++) {
        let testing = arraysToTest[i];

        var found_1 = 0;
        var found_2 = 0;
        var found_3 = 0;
        var found_4 = 0;

        for (var j = 0; j < testing.length; j++) {
            if (testing[j] === '1') { found_1 = found_1 + 1; } 
            else if (testing[j] === '2') { found_2 = found_2 + 1; } 
            else if (testing[j] === '3') { found_3 = found_3 + 1; } 
            else if (testing[j] === '4') { found_4 = found_4 + 1; }
        }

        if ((found_1 > 1) || (found_2 > 1) || (found_3 > 1) || (found_4 > 1)) {
            solvable = false;
        }
    }

    return solvable;
}

/**
 * Determines if current State is a goal state in SUDOKU problem
 * @param {State} state 
 */
function isSudokuStateAGoalState(state) {
    let validGoalState = true;

    let arraysToTest = getSudokuArraysToTest(state);

    for (var i = 0; i < arraysToTest.length; i++) {
        let testing = arraysToTest[i];

        var found_1 = 0;
        var found_2 = 0;
        var found_3 = 0;
        var found_4 = 0;

        for (var j = 0; j < testing.length; j++) {
            if (testing[j] === '1') {
                found_1 = found_1 + 1;
            } else if (testing[j] === '2') {
                found_2 = found_2 + 1;
            } else if (testing[j] === '3') {
                found_3 = found_3 + 1;
            } else if (testing[j] === '4') {
                found_4 = found_4 + 1;
            }
        }

        if ((found_1 != 1) || (found_2 != 1) || (found_3 != 1) || (found_4 != 1)) {
            validGoalState = false;
        }
    }

    return validGoalState;
}

export { childNode, aStar, setInitialState, isInside, getPuzzleHeuristic, setSudokuInitialState, isSudokuStateAGoalState, isSudokuSolvable }