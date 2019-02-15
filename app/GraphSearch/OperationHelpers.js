/**
 * OperationHelpers.js
 * Functions that help in solving the problem. 
 */

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

function determinePuzzleSolvability(plainArray) {
    let numberArray = plainArray.map(element => {
        if (element === '.') {
            return 0
        } else return parseInt(element);
    } )

    let inversions = 0;

    for (var i = 0; i < numberArray.length; i++) {
        for (var j = i + 1; j < numberArray.length; j++) {
            if ((numberArray[j] < numberArray[i]) && numberArray[j] != 0)
                inversions = inversions + 1;            
        }
    }

    // find if blank is on even or odd row from the bottom
    let blankIndex = 0;

    for (var i = 0; i < numberArray.length; i++) {
        if (numberArray[i] === 0)
            blankIndex = i;
    }

    // [0-3] : even, [4-7] : odd, [8-11] : even, [12-15] : odd
    let rowIs = [0,1,2,3].includes(blankIndex) ? 'even' : 
                [4,5,6,7].includes(blankIndex) ? 'odd' :
                [8,9,10,11].includes(blankIndex) ? 'even' : 'odd';
                
    let inversionsShouldBe = rowIs === 'even' ? 'odd' : 'even';
    let realInversionsIs = inversions%2 === 0 ? 'even' : 'odd';

    return realInversionsIs === inversionsShouldBe;
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

function getSudokuActions(tileLocation, state) {    
    let locations = state;      
    let stateToPlainArray = [];
    
    Object.keys(locations).forEach((key, i) => {
        stateToPlainArray.push(locations[key]);
    });

    let validNumbers = ['1', '2', '3','4'];
    let actions = [];

    let neighbours = {
        tile_1: {
            rowNeighbours: [stateToPlainArray[1], stateToPlainArray[2], stateToPlainArray[3]],
            colNeighbours: [stateToPlainArray[4], stateToPlainArray[8], stateToPlainArray[12]],
            squareNeighbours: [stateToPlainArray[1], stateToPlainArray[4], stateToPlainArray[5]]
        },
        tile_2: {
            rowNeighbours: [stateToPlainArray[0], stateToPlainArray[2], stateToPlainArray[3]],
            colNeighbours: [stateToPlainArray[5], stateToPlainArray[9], stateToPlainArray[13]],
            squareNeighbours: [stateToPlainArray[0], stateToPlainArray[4], stateToPlainArray[5]]
        },
        tile_3: {
            rowNeighbours: [stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[3]],
            colNeighbours: [stateToPlainArray[6], stateToPlainArray[10], stateToPlainArray[14]],
            squareNeighbours: [stateToPlainArray[3], stateToPlainArray[6], stateToPlainArray[7]]
        },
        tile_4: {
            rowNeighbours: [stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[2]],
            colNeighbours: [stateToPlainArray[7], stateToPlainArray[11], stateToPlainArray[15]],
            squareNeighbours: [stateToPlainArray[2], stateToPlainArray[6], stateToPlainArray[7]]
        },

        tile_5: {
            rowNeighbours: [stateToPlainArray[5], stateToPlainArray[6], stateToPlainArray[7]],
            colNeighbours: [stateToPlainArray[0], stateToPlainArray[8], stateToPlainArray[12]],
            squareNeighbours: [stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[5]]
        },
        tile_6: {
            rowNeighbours: [stateToPlainArray[4], stateToPlainArray[6], stateToPlainArray[7]],
            colNeighbours: [stateToPlainArray[1], stateToPlainArray[9], stateToPlainArray[13]],
            squareNeighbours: [stateToPlainArray[0], stateToPlainArray[1], stateToPlainArray[4]]
        },
        tile_7: {
            rowNeighbours: [stateToPlainArray[4], stateToPlainArray[5], stateToPlainArray[7]],
            colNeighbours: [stateToPlainArray[2], stateToPlainArray[10], stateToPlainArray[14]],
            squareNeighbours: [stateToPlainArray[2], stateToPlainArray[3], stateToPlainArray[7]]
        },
        tile_8: {
            rowNeighbours: [stateToPlainArray[4], stateToPlainArray[5], stateToPlainArray[6]],
            colNeighbours: [stateToPlainArray[3], stateToPlainArray[11], stateToPlainArray[15]],
            squareNeighbours: [stateToPlainArray[2], stateToPlainArray[3], stateToPlainArray[6]]
        },

        tile_9: {
            rowNeighbours: [stateToPlainArray[9], stateToPlainArray[10], stateToPlainArray[11]],
            colNeighbours: [stateToPlainArray[0], stateToPlainArray[4], stateToPlainArray[12]],
            squareNeighbours: [stateToPlainArray[9], stateToPlainArray[12], stateToPlainArray[13]]
        },
        tile_10: {
            rowNeighbours: [stateToPlainArray[8], stateToPlainArray[10], stateToPlainArray[11]],
            colNeighbours: [stateToPlainArray[1], stateToPlainArray[5], stateToPlainArray[13]],
            squareNeighbours: [stateToPlainArray[8], stateToPlainArray[12], stateToPlainArray[13]]
        },
        tile_11: {
            rowNeighbours: [stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[11]],
            colNeighbours: [stateToPlainArray[2], stateToPlainArray[6], stateToPlainArray[14]],
            squareNeighbours: [stateToPlainArray[11], stateToPlainArray[14], stateToPlainArray[15]]
        },
        tile_12: {
            rowNeighbours: [stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[10]],
            colNeighbours: [stateToPlainArray[3], stateToPlainArray[7], stateToPlainArray[15]],
            squareNeighbours: [stateToPlainArray[10], stateToPlainArray[14], stateToPlainArray[15]]
        },

        tile_13: {
            rowNeighbours: [stateToPlainArray[13], stateToPlainArray[14], stateToPlainArray[15]],
            colNeighbours: [stateToPlainArray[0], stateToPlainArray[4], stateToPlainArray[8]],
            squareNeighbours: [stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[13]]
        },
        tile_14: {
            rowNeighbours: [stateToPlainArray[12], stateToPlainArray[14], stateToPlainArray[15]],
            colNeighbours: [stateToPlainArray[1], stateToPlainArray[5], stateToPlainArray[9]],
            squareNeighbours: [stateToPlainArray[8], stateToPlainArray[9], stateToPlainArray[12]]
        },
        tile_15: {
            rowNeighbours: [stateToPlainArray[12], stateToPlainArray[13], stateToPlainArray[15]],
            colNeighbours: [stateToPlainArray[2], stateToPlainArray[6], stateToPlainArray[10]],
            squareNeighbours: [stateToPlainArray[10], stateToPlainArray[11], stateToPlainArray[15]]
        },
        tile_16: {
            rowNeighbours: [stateToPlainArray[12], stateToPlainArray[13], stateToPlainArray[14]],
            colNeighbours: [stateToPlainArray[3], stateToPlainArray[7], stateToPlainArray[11]],
            squareNeighbours: [stateToPlainArray[10], stateToPlainArray[11], stateToPlainArray[14]]
        },
    }

    validNumbers.forEach(number => {
        if ((!neighbours[tileLocation].rowNeighbours.includes(number)) && 
            (!neighbours[tileLocation].colNeighbours.includes(number)) && 
            (!neighbours[tileLocation].squareNeighbours.includes(number))) {
            actions.push(number);
        }
    })

    return actions;
    
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

    // let goalState2 = {
    //     tile_1: ".",
    //     tile_2: "1",
    //     tile_3: "2",
    //     tile_4: "3",
    //     tile_5: "4",
    //     tile_6: "5",
    //     tile_7: "6",
    //     tile_8: "7",
    //     tile_9: "8",
    //     tile_10: "9",
    //     tile_11: "10",
    //     tile_12: "11",
    //     tile_13: "12",
    //     tile_14: "13",
    //     tile_15: "14",
    //     tile_16: "15"
    // };

    return [goalState1];   
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

function finalNodeToStateArray(node) {
    let traverse = true;
    let locations = [];
    let locationArray = [];

    while(traverse) {
        locations.push(node.getState().getState());

        if (node.getPathCost() === 0) {
            traverse = false;
        } else {
            node = node.getParent();
        }
    }

    for(var s = 0; s < locations.length; s++) {
        let location = locations[s];
        let arrayElement = [];

        for (var key in location) {
            arrayElement.push(location[key]);
        }

        locationArray.push(arrayElement);
    }

    let orderedArray = [];

    for (var t = 0; t < locationArray.length; t++) {
        let element = [];

        var arr = locationArray[t];
        for (var x = 0; x < locationArray[t].length; x++) {
            let row = [];

            for (var y = 0; y < 4; y++) {
                row.push(arr.shift());
            }

            element.push(row);

        }

        orderedArray.push(element);
    }

    locations = orderedArray;

    return(locations);
}

export { clone, cellValuesToPlainArray, setPuzzleGoalStates, getKeyByValue, getPuzzleActions, getNewPuzzleTileWithAction, determinePuzzleSolvability, finalNodeToStateArray, getSudokuActions }