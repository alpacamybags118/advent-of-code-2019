//seriously relook at this garbage code - note to myself
const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function CoordinatesCross(x, y,index,index2) {
    if((String(x[0]) == String(y[0])) && (index != index2)) {
        return true
    }
}

function Walk(currentpos, commands) {
    const direction = commands.split(/([A-Z])/)[1];
    const distance = Number(commands.split(/([A-Z])/)[2]);
    //console.log(commands);
    //console.log(currentpos)
    let steps = [];

    switch(direction) {
        case 'R':
            for(i = 1; i <= distance; i++) {
                const newpos = [[currentpos[0][0] + i, currentpos[0][1]], currentpos[1] + i,currentpos[2]]
                if(String(newpos[0]) == '158,4') {
                    console.log(commands)
                    console.log(newpos[1])
                }
                steps.push(newpos);
            }
            break;
        case 'L':
            for(i = 1; i <= distance; i++) {
                const newpos = [[currentpos[0][0] - i, currentpos[0][1]], currentpos[1] + i,currentpos[2]]
                if(String(newpos[0]) == '158,4') {
                    console.log(commands)
                    console.log(newpos[1])
                }
                steps.push(newpos);
            }
            break;
        case 'U':
            for(i = 1; i <= distance; i++) {
                const newpos = [[currentpos[0][0], currentpos[0][1] + i], currentpos[1] + i,currentpos[2]]
                if(String(newpos[0]) == '158,4') {
                    console.log(commands)
                    console.log(newpos[1])
                }
                steps.push(newpos);
                //console.log(steps)
            }
            break;
        case 'D':
            for(i = 1; i <= distance; i++) {
                const newpos = [[currentpos[0][0], currentpos[0][1] - i], currentpos[1] + i,currentpos[2]]
                if(String(newpos[0]) == '158,4') {
                    console.log(commands)
                    console.log(newpos[1])
                }
                steps.push(newpos);
            }
            break;
        default:
            break;
    }
    
    return steps
}

const commandSetList = ReadInput(inputPath).split('\n').map(x => x.split(','));
let coordinates = [];

for(let i = 0; i < commandSetList.length; i++) {
    coordinates.push([[0,0], 0, i]);
    commandSetList[i].forEach(commands => {
        coordinates = coordinates.concat(Walk(coordinates[coordinates.length - 1], commands))
        })
}

//console.log(coordinates)
let matches = []
let map = new Map
coordinates.forEach((item) => {
    if(String(item[0]) != '0,0') {
        if(map.has(String(item[0]))) {
            if(map.get(String(item[0]))[1] != item[2]) {
                console.log("match! " + item[0] + " " + (Number(item[1]) + map.get(String(item[0]))))
                matches.push(Number(item[1]) + map.get(String(item[0]))[0])
            }
            
        }
        else {
            map.set(String(item[0]),[Number(item[1]), Number(item[2])])
        }
    }

})

console.log(matches.sort((a,b) => a-b))