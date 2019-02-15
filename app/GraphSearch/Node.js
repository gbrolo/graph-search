/**
 * Node.js
 * Node that contains current State, parent State that created this child and action, and finally, path cost to
 * obtain this Node.
 */
import { clone } from './OperationHelpers';

export default class Node {
    /**
     * 
     * @param {State} state 
     * @param {Node} parent 
     * @param {String} action 
     * @param {integer} pathCost 
     */
    constructor(state, parent, action, pathCost) {
        this.state = clone(state);
        this.parent = clone(parent);
        this.action = action;
        this.pathCost = pathCost;
    }

    /**
     * Returns Node current State
     */
    getState() {
        return this.state;
    }

    /**
     * Returns parent Node
     */
    getParent() {
        return this.parent;
    }

    /**
     * Returns action that parent took to concieve child
     */
    getAction() {
        return this.action;
    }

    /**
     * Returns path cost of Node
     */
    getPathCost() {
        return this.pathCost;
    }
}