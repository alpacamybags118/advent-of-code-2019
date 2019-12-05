//build list of coordinates, find all matches between the two, calculate least manhattan distance

const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function BuildCoordinateMap(currentpos, command) {
    //figure out why its adding a blank
    const direction = command.split(/([A-Z])/)[1]
    const distance = command.split(/([A-Z])/)[2]
    let coords = [];
    switch(direction) {
        case 'R':
            for(i = 1; i <= distance; i++) {
                coords.push([currentpos[0] + i,currentpos[1]])
            }
            break;
        case 'L':
            for(i = 1; i <= distance; i++) {
                coords.push([currentpos[0] - i,currentpos[1]])
            }
            break;
        case 'U':
            for(i = 1; i <= distance; i++) {
                coords.push([currentpos[0], currentpos[1] + i])
            }
            break;
        case 'D':
            for(i = 1; i <= distance; i++) {
                coords.push([currentpos[0],currentpos[1] - i])
            }
            break;
        default:
            break;
    }
   return coords
    
}

const commands = ReadInput(inputPath).split('\n').map(x => x.split(','));
let coordinates = [];
commands.forEach(element => {
    let array = [];
    element.forEach(function(item, index) {
        if(index == 0) {
            array = array.concat(BuildCoordinateMap([0,0], item))
        }
        else {
            array = array.concat(BuildCoordinateMap(array[array.length - 1], item));
        }
    })
    coordinates.push(array);
})
