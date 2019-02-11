import Node from './Node';
import State from './State';

const equal = require('deep-equal');

import { clone } from './OperationHelpers';

function childNode(problem, parent, action) {
    let state = problem.result(clone(parent.getState()), action);
    // let pathCost = clone(parent).getPathCost() + problem.stepCost() + getPuzzleHeuristic(clone(parent.getState())); // TODO test h(n)
    let pathCost = clone(parent).getPathCost() + problem.stepCost() + getPuzzleHeuristic(clone(parent.getState())); // TODO test h(n)
    let node = new Node(clone(state), clone(parent), action, pathCost);

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
    var node = new Node(clone(problem.getInitialState()), null, null, 0);    
    var unorderedFrontier = [clone(node)];    
    var explored = [];

    // console.log('node is:', node);    
    // console.log('unorderedFrontier is:', unorderedFrontier);
    // console.log('explored is:', explored);

    let n = 0;
    while(true) {
        n = n+1;
        console.log('n=', n);

        if (unorderedFrontier.length === 0) {
            return failure();
        }
        
        // node = clone(frontier.dequeue());        
        node = clone(unorderedFrontier.shift());
        console.log('current state is', clone(node.getState().getState()));
        // console.log('frontier is:', clone(unorderedFrontier));
        // console.log('movements so far', node.getAction());

        if (problem.goalTest(clone(node.getState()))) {
            // console.log('inside goaltest');
            return solution(clone(node));
        }

        console.log('node', clone(node));

        explored.push(clone(node.getState()));

        // console.log('about to check actions');
        // console.log('frontier is:', frontier);
        // console.log('unorderedFrontier is:', unorderedFrontier);
        // console.log('explored is:', clone(explored));

        problem.actions(clone(node.getState())).forEach(action => {
            // console.log('current action tested is', action);
            var child = childNode(clone(problem), clone(node), action);

            // console.log('new child created:', child);   
            
            var childCondition = isChildStateInFrontierWithHigherPathCost(clone(child), clone(child.getState()), clone(unorderedFrontier));

            if (!isChildStateInExploredOrFrontier(clone(child.getState()), clone(explored), clone(unorderedFrontier))) { // GOOD condition                                    
                unorderedFrontier.push(clone(child));
                unorderedFrontier.sort(function (a,b) {
                    return a.pathCost - b.pathCost
                })
                
                // console.log('child is not inside explored nor frontier');
                // console.log('frontier is:', frontier);
                // console.log('unorderedFrontier is:', unorderedFrontier);
            } else if (childCondition.result === true) { // BAD condition
                // console.log('child is inside frontier with higher pathCost')     
                // console.log('unorderedFrontier just before splice', clone(unorderedFrontier));        
                unorderedFrontier.splice(childCondition.frontierIndex, 1, clone(child));
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
 * @param {State*} childState 
 * @param {Array[State]} explored 
 * @param {Array[Node]} unorderedFrontier 
 */
function isChildStateInExploredOrFrontier(childState, explored, unorderedFrontier) {
    let insideExplored = isInside(childState, explored);
    let frontierStates = unorderedFrontier.map(node => {
        return clone(node.getState());
    })
    let insideFrontier = isInside(childState, frontierStates);

    return insideExplored || insideFrontier;
}

function isChildStateInFrontierWithHigherPathCost(child, childState, unorderedFrontier) {
    let frontierStates = unorderedFrontier.map(node => {
        return clone(node.getState());
    })
    let insideFrontier = isInside(childState, frontierStates);

    // if is inside the frontier, check if that node has the highest path cost
    if (insideFrontier) {
        // console.log('child is inside frontier...');
        let frontierIndex = getFrontierStateIndex(childState, frontierStates);
        let frontierNode = clone(unorderedFrontier[frontierIndex]);
        // console.log('frontier node index is', frontierIndex);
        // console.log('frontier node is', frontierNode);
        let frontierPathCost = frontierNode.getPathCost();
        let childPathCost = clone(child).getPathCost();

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
    console.log('setting initial state for', array);
    let locations = {}
    for (var i = 0; i < array.length; i++) {
        let index = i + 1;
        var value = array[i];
        locations['tile_' + index] = value;        
    }

    console.log('locations is', locations);

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

export { childNode, aStar, setInitialState, isInside, getPuzzleHeuristic }