import { clone } from './OperationHelpers';

export default class Node {
    constructor(state, parent, action, pathCost) {
        this.state = clone(state);
        this.parent = clone(parent);
        this.action = action;
        this.pathCost = pathCost;
    }

    getState() {
        return this.state;
    }

    getParent() {
        return this.parent;
    }

    getAction() {
        return this.action;
    }

    getPathCost() {
        return this.pathCost;
    }
}