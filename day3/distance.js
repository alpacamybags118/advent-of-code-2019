//build list of coordinates, find all matches between the two, calculate least manhattan distance

const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

//make key the # of instances, array of value and steps taken
function BuildCoordinateMapBetter(map, command, currentpos) {
    const direction = command.split(/([A-Z])/)[1];
    const distance = command.split(/([A-Z])/)[2];

    switch(direction) {
        case 'R':
            for(i = 1; i <= distance; i++) {
                currentpos = [currentpos[0] + 1, currentpos[1]]
                const cmd = String(currentpos)
                //console.log(cmd);
                map.has(cmd) ? map.set(cmd,map.get(cmd) + 1) : map.set(cmd, 1);
            }
            break;
        case 'L':
            for(i = 1; i <= distance; i++) {
                currentpos = [currentpos[0] - 1, currentpos[1]]
                const cmd = String(currentpos)
                map.has(cmd) ? map.set(cmd,map.get(cmd) + 1) : map.set(cmd, 1);
            }
            break;
        case 'U':
            for(i = 1; i <= distance; i++) {
                currentpos = [currentpos[0], currentpos[1] + 1]
                const cmd = String(currentpos)
                map.has(cmd) ? map.set(cmd,map.get(cmd) + 1) : map.set(cmd, 1);
            }
            break;
        case 'D':
            for(i = 1; i <= distance; i++) {
                currentpos = [currentpos[0], currentpos[1] - 1]
                const cmd = String(currentpos)
                map.has(cmd) ? map.set(cmd,map.get(cmd) + 1) : map.set(cmd, 1);
            }
            break;
        default:
            break;
    }

   return map
}

const commandSetList = ReadInput(inputPath).split('\n').map(x => x.split(','));
let coordinates = new Map();

commandSetList.forEach(commandSet => {
    if(coordinates.has(String([0,0]))) {
        coordinates.delete(String([0,0]));
    }
    coordinates.set(String([0,0]),1);
    commandSet.forEach(commands => {
        const currentpos = Array.from(coordinates)[coordinates.size-1][0].split(',').map(item => Number(item));
        coordinates = BuildCoordinateMapBetter(coordinates, commands, currentpos)
    })
})
//console.log(coordinates);

const matches = [...coordinates.entries()]
        .filter(({ 1: v }) => v === 2)
        .map(([k]) => Math.abs(Number(k.split(',')[0]) + Number(k.split(',')[1])));

console.log(matches);