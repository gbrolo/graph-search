function cellValuesToPlainArray(cellValues) {
    let array = [];

    for (var i = 0; i < cellValues.length; i++) {
        let row = cellValues[i];

        for (var j = 0; j < row.length; j++) {
            array.push(row[j])
        }
    }

    return array;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getPuzzleActions(tileLocation) {
    if (tileLocation === 'tile_16') {
        return [ 'LEFT', 'UP' ]
    } else if (tileLocation === 'tile_4') {
        return [ 'LEFT', 'DOWN' ]
    } else if (tileLocation === 'tile_13') {
        return [ 'RIGHT', 'UP' ]
    } else if (tileLocation === 'tile_1') {
        return [ 'RIGHT', 'DOWN' ]
    } else if ((tileLocation === 'tile_2') || (tileLocation === 'tile_3')) {
        return [ 'LEFT', 'RIGHT', 'DOWN' ]
    } else if ((tileLocation === 'tile_14') || (tileLocation === 'tile_15')) {
        return [ 'LEFT', 'RIGHT', 'UP' ]
    } else if ((tileLocation === 'tile_5') || (tileLocation === 'tile_9')) {
        return [ 'UP', 'DOWN', 'RIGHT' ]
    } else if ((tileLocation === 'tile_8') || (tileLocation === 'tile_12')) {
        return [ 'UP', 'DOWN', 'LEFT' ]
    } else {
        return [ 'UP', 'DOWN', 'LEFT', 'RIGHT' ]
    }
}

function getNewPuzzleTileWithAction(tileLocation, action, actions) {
    let index = parseInt(tileLocation.substr(5, tileLocation.length-1));

    if (actions.includes(action)) {
        if (action === 'LEFT') {
            index = index - 1;
        } else if (action === 'RIGHT') {
            index = index + 1;
        } else if (action === 'UP') {
            index = index - 4;
        } else {
            index = index + 4;
        }

        return 'tile_' + index;
    } else return tileLocation;        
}

function setPuzzleGoalStates() {
    let goalState1 = {
        tile_1: "1",
        tile_2: "2",
        tile_3: "3",
        tile_4: "4",
        tile_5: "5",
        tile_6: "6",
        tile_7: "7",
        tile_8: "8",
        tile_9: "9",
        tile_10: "10",
        tile_11: "11",
        tile_12: "12",
        tile_13: "13",
        tile_14: "14",
        tile_15: "15",
        tile_16: "."
    };

    let goalState2 = {
        tile_1: ".",
        tile_2: "1",
        tile_3: "2",
        tile_4: "3",
        tile_5: "4",
        tile_6: "5",
        tile_7: "6",
        tile_8: "7",
        tile_9: "8",
        tile_10: "9",
        tile_11: "10",
        tile_12: "11",
        tile_13: "12",
        tile_14: "13",
        tile_15: "14",
        tile_16: "15"
    };

    return [goalState1, goalState2];   
}

export { cellValuesToPlainArray, setPuzzleGoalStates, getKeyByValue, getPuzzleActions, getNewPuzzleTileWithAction }