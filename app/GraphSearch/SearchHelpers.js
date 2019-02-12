import Node from './Node';
import State from './State';

const equal = require('deep-equal');

import { clone } from './OperationHelpers';

function childNode(problem, parent, action) {
    let state = problem.result(parent.getState(), action);
    // let pathCost = clone(parent).getPathCost() + problem.stepCost() + getPuzzleHeuristic(clone(parent.getState())); // TODO test h(n)
    let pathCost = parent.getPathCost() 
                    + problem.stepCost() 
                    + getPuzzleHeuristic(parent.getState()); // TODO test h(n)
    let node = new Node(state, parent, action, pathCost);

    return node;
}

function solution(node) {
    return { solution: true, node };
}

function failure() {
    return { solution: false };
}

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
        
        // node = clone(frontier.dequeue());        
        node = unorderedFrontier.shift();
        // console.log('current state is', clone(node.getState().getState()));
        // console.log('frontier is:', clone(unorderedFrontier));
        // console.log('movements so far', node.getAction());

        if (problem.goalTest(node.getState())) {
            // console.log('inside goaltest');
            return solution(node);
        }

        // console.log('node', clone(node));

        explored.push(node.getState());

        // console.log('about to check actions');
        // console.log('frontier is:', frontier);
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
                // console.log('frontier is:', frontier);
                // console.log('unorderedFrontier is:', unorderedFrontier);
            } else if (childCondition.result === true) { // BAD condition
                // console.log('child is inside frontier with higher pathCost')     
                // console.log('unorderedFrontier just before splice', clone(unorderedFrontier));        
                unorderedFrontier.splice(childCondition.frontierIndex, 1, child);
                unorderedFrontier.sort(function (a,b) {
                    return a.pathCost - b.pathCost
                })                

                // console.log('unorderedFrontier with new node and ordered', clone(unorderedFrontier))

                // console.log('frontier is:', frontier);
                // console.log('unorderedFrontier is:', unorderedFrontier);
            }                                    

        });
    }
}

/**
 * 
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

function getFrontierStateIndex(object, array) {
    for (var i = 0; i < array.length; i++) {
        if (equal(array[i], object)) {
            return i;
        }
    }
}

function isInside(object, array) {          
    for (var i = 0; i < array.length; i++) {
        if (equal(array[i], object)) {
            return true;
        }
    }

    return false;
}

function childHasHigherPathCost(childPathCost, unorderedFrontier) {
    let max = Math.max.apply(Math, unorderedFrontier.map(node => {
        return node.getPathCost()
    }));

    return max === childPathCost;
}

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

function isSudokuStateAGoalState(state) {
    let locations = state;
    console.log('locations', locations);    

    let stateToPlainArray = [];
    
    Object.keys(locations).forEach((key, i) => {
        stateToPlainArray.push(locations[key]);
    });

    console.log('stateToPlainArray', stateToPlainArray);
    let validGoalState = true;

    let row_1 = [
        stateToPlainArray[0],
        stateToPlainArray[1],
        stateToPlainArray[2],
        stateToPlainArray[3]
    ];

    let row_2 = [
        stateToPlainArray[4],
        stateToPlainArray[5],
        stateToPlainArray[6],
        stateToPlainArray[7]
    ];

    let row_3 = [
        stateToPlainArray[8],
        stateToPlainArray[9],
        stateToPlainArray[10],
        stateToPlainArray[11]
    ];

    let row_4 = [
        stateToPlainArray[12],
        stateToPlainArray[13],
        stateToPlainArray[14],
        stateToPlainArray[15]
    ];

    // columns
    let column_1 = [
        stateToPlainArray[0],
        stateToPlainArray[4],
        stateToPlainArray[8],
        stateToPlainArray[12]
    ];

    let column_2 = [
        stateToPlainArray[1],
        stateToPlainArray[5],
        stateToPlainArray[9],
        stateToPlainArray[13]
    ];

    let column_3 = [
        stateToPlainArray[2],
        stateToPlainArray[6],
        stateToPlainArray[10],
        stateToPlainArray[14]
    ];

    let column_4 = [
        stateToPlainArray[3],
        stateToPlainArray[7],
        stateToPlainArray[11],
        stateToPlainArray[15]
    ];

    // subsquares
    let square_1 = [
        stateToPlainArray[0],
        stateToPlainArray[1],
        stateToPlainArray[4],
        stateToPlainArray[5]
    ];

    let square_2 = [
        stateToPlainArray[2],
        stateToPlainArray[3],
        stateToPlainArray[6],
        stateToPlainArray[7]
    ];

    let square_3 = [
        stateToPlainArray[8],
        stateToPlainArray[9],
        stateToPlainArray[12],
        stateToPlainArray[13]
    ];

    let square_4 = [
        stateToPlainArray[10],
        stateToPlainArray[11],
        stateToPlainArray[14],
        stateToPlainArray[15]
    ];

    let arraysToTest = [
        row_1, row_2, row_3, row_4,
        column_1, column_2, column_3, column_4,
        square_1, square_2, square_3, square_4
    ];

    console.log('arraysToTest', arraysToTest);

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

export { childNode, aStar, setInitialState, isInside, getPuzzleHeuristic, setSudokuInitialState, isSudokuStateAGoalState }