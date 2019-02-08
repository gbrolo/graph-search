import Node from './Node';
import State from './State';
import { PriorityQueue } from 'js-priority-queue';

function childNode(problem, parent, action) {
    let state = problem.result(parent.getState(), action);
    let pathCost = parent.getPathCost() + problem.stepCost();
    let node = new Node(state, parent, action, pathCost);

    return node;
}

function aStar(problem) {
    let node = new Node(problem.getInitialState(), null, null, 0);
    let frontier = new PriorityQueue({ comparator: function(a, b) { return b.getPathCost() < a.getPathCost() } });
    let explored = [];

    while(true) {
        if (frontier.length === 0) {
            return false;
        } else {
            node = frontier.dequeue()

            if (problem.goalTest(node.getState())) {
                return true; // SOLUTION(node);
            } else {
                explored.push(node.getState());
            }

            problem.actions(node.getState()).forEach(action => {
                let child = childNode(problem, node, action);

                // to be continued
            });
        }
    }
}

export { childNode, aStar }