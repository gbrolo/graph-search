import Node from './Node';
import State from './State';
import PriorityQueue from 'js-priority-queue';

const equal = require('deep-equal');

import { clone } from './OperationHelpers';

function childNode(problem, parent, action) {
    let state = problem.result(clone(parent.getState()), action);
    let pathCost = parent.getPathCost() + problem.stepCost() + getPuzzleHeuristic(clone(parent.getState())); // TODO test h(n)
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
    var frontier = new PriorityQueue({ comparator: function(a, b) { return a.getPathCost() - b.getPathCost() } });
    frontier.queue(clone(node));
    var unorderedFrontier = [clone(node)];
    var explored = [];

    // console.log('node is:', node);    
    // console.log('unorderedFrontier is:', unorderedFrontier);
    // console.log('explored is:', explored);

    let n = 0;
    while(true) {
        n = n+1;
        console.log('n=', n);
        if (frontier.length === 0) {
            return failure();
        } else {
            node = clone(frontier.dequeue());
            console.log('current state is', clone(node.getState()));
            console.log('frontier is:', clone(unorderedFrontier));

            if (problem.goalTest(node.getState())) {
                // console.log('inside goaltest');
                return solution(clone(node));
            } else {
                // console.log('not in goaltest');
                explored.push(clone(node.getState()));
            }

            // console.log('about to check actions');
            // console.log('frontier is:', frontier);
            // console.log('unorderedFrontier is:', unorderedFrontier);
            // console.log('explored is:', explored);

            problem.actions(clone(node.getState())).forEach(action => {
                console.log('current action tested is', action);
                let child = childNode(clone(problem), clone(node), action);

                console.log('new child created:', child);

                if ((!isInside(clone(child.getState()), explored)) || (!isInside(clone(child.getState()), unorderedFrontier))) {
                    frontier.queue(clone(child));
                    unorderedFrontier.push(clone(child));
                    console.log('child is not inside explored nor frontier');
                    // console.log('frontier is:', frontier);
                    // console.log('unorderedFrontier is:', unorderedFrontier);
                } else if (isInside(clone(child.getState()), unorderedFrontier) && childHasHigherPathCost(child.getPathCost(), unorderedFrontier)) {
                    console.log('child is inside frontier with higher pathCost')
                    let newUnorderedFrontier = unorderedFrontier.filter(n => equal(n, clone(node)));
                    newUnorderedFrontier.push(clone(child));

                    unorderedFrontier = newUnorderedFrontier;
                    frontier.clear();

                    for (var i = 0; i < newUnorderedFrontier.length; i++) {
                        frontier.queue(clone(newUnorderedFrontier[i]));
                    }

                    // console.log('frontier is:', frontier);
                    // console.log('unorderedFrontier is:', unorderedFrontier);
                }
            });
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

export { childNode, aStar, setInitialState, isInside }