const fs = require('fs');
const inputPath = "./input";

function FindOrbits(input) {
    let map = new Map();
    input.forEach(element => {
       const values = element.split(')');
       if(map.has(values[0])) {
           //console.log(map.get(values[0]))
           let val = [map.get(values[0]),values[0]]
           //console.log(val);
           val = val.reduce((acc,val) => acc.concat(val),[]);
            map.set(values[1], val);
            //console.log(map.get(values[0]))
       }
       else {
        map.set(values[1],values[0]);
       }
    });

    let iterator = map.keys();
    let val = iterator.next().value;
    let orbits = 0

    while(val) {
        console.log(`key - ${val}`);
        console.log(`val - ${map.get(val)}`)
        orbits += map.get(val).length
        val = iterator.next().value;
    }

    console.log(orbits);
}

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

const input = ReadInput(inputPath).split('\n')

const result = FindOrbits(input);