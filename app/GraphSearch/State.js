import { clone } from './OperationHelpers';

export default class State {
    /**
     * 
     * @param {Object} locations: an object containing the value for each
     * one of the tiles inside the board. 
     * 
     * locations ={
     *      tile_1: 'value',
     *      tile_2: 'value',
     *      .
     *      .
     *      .
     *      tile_16: 'value'
     * }
     */
    constructor(locations) {
        this.locations = locations;
    }

    getState() {
        return this.locations;
    }
}