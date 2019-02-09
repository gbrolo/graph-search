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

export { cellValuesToPlainArray, setPuzzleGoalStates, getKeyByValue }