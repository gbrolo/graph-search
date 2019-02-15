/**
 * State.js
 * A State that contains problem's configuration
 */

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

    /**
     * Returns State
     */
    getState() {
        return this.locations;
    }
}