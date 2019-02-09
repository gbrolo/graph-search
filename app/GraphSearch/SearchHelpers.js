import Node from './Node';
import State from './State';
import PriorityQueue from 'js-priority-queue';

const equal = require('deep-equal');

function childNode(problem, parent, action) {
    let state = problem.result(parent.getState(), action);
    let pathCost = parent.getPathCost() + problem.stepCost() + getPuzzleHeuristic(parent.getState()); // TODO test h(n)
    let node = new Node(state, parent, action, pathCost);

    return node;
}

function solution(node) {
    return node;
}

// TODO: test
function getPuzzleHeuristic(state) {
    let locations = state.getState();
    let misplaced = 0;

    Object.keys(locations).forEach((key, i) => {
        let index = parseInt(key.substr(5, key.length-1));
        const value = parseInt(locations[index]);

        if (value != index) {
            misplaced = misplaced + 1;
        }
    })

    return misplaced;
}

function aStar(problem) {
    let node = new Node(problem.getInitialState(), null, null, 0);
    let frontier = new PriorityQueue({ comparator: function(a, b) { return a.getPathCost() - b.getPathCost() } });
    frontier.queue(node);
    let unorderedFrontier = [node];
    let explored = [];

    while(true) {
        if (frontier.length === 0) {
            return false;
        } else {
            node = frontier.dequeue()

            if (problem.goalTest(node.getState())) {
                return solution(node);
            } else {
                explored.push(node.getState());
            }

            problem.actions(node.getState()).forEach(action => {
                let child = childNode(problem, node, action);

                if ((!isInside(child.getState(), explored)) || (!isInside(child.getState(), unorderedFrontier))) {
                    frontier.queue(child);
                    unorderedFrontier.push(child);
                } else if (isInside(child.getState(), unorderedFrontier) && childHasHigherPathCost(child.getPathCost(), unorderedFrontier)) {
                    // TODO
                    let newUnorderedFrontier = unorderedFrontier.filter(n => n != node);
                    newUnorderedFrontier.push(child);

                    unorderedFrontier = newUnorderedFrontier;
                    frontier.clear();

                    for (var i = 0; i < newUnorderedFrontier.length; i++) {
                        frontier.queue(newUnorderedFrontier[i]);
                    }
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
    let locations = {};

    for (var i = 0; i < array.length; i++) {
        let index = i + 1;

        locations['tile_' + index] = array[i];
    }

    let initialState = new State(locations);

    return initialState;
}

export { childNode, aStar, setInitialState, isInside }