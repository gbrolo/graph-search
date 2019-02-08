import Node from './Node';
import { PriorityQueue } from 'js-priority-queue';

function childNode(problem, parent, action) {
    let state = problem.result(parent.getState(), action);
    let pathCost = parent.getPathCost() + problem.stepCost();
    let node = new Node(state, parent, action, pathCost);

    return node;
}

function solution(node) {
    return node;
}

function aStar(problem) {
    let node = new Node(problem.getInitialState(), null, null, 0);
    let frontier = new PriorityQueue({ comparator: function(a, b) { return b.getPathCost() > a.getPathCost() } });
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
        if (array[i] === object) {
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

export { childNode, aStar }