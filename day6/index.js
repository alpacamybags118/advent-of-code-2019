const fs = require('fs');
const inputPath = "./input";

//need to make a tree and insert node algorithm
class TreeNode {
    constructor(value) {
      this.value = value;
      this.descendents = [];
    }

    insert(node) {

    }
  }

function FindNextInput(list, input) {
    return list.find(element=>{return element.split(')')[0] == input});
}

function FindOrbits(input) {
    let map = new Map();
    let count = input.length;
    let val;

    for(i = 0; i < count; i++) {

        if(i == 0) {
            val = FindNextInput(input,'COM');
        }
        else {
            if(!val) {
                val = input[i];
            }
            console.log(val)
            let search = val.split(')')[1];
            //console.log(search);
            val = FindNextInput(input,search);
        }

        if(!val) {
            continue
        }
        let check = val.split(')');
        
    };

    let iterator = map.keys();
    let x = iterator.next().value;
    let orbits = 0

    while(x) {
        console.log(`key - ${x}`);
        console.log(`val - ${map.get(x)}`)
        console.log(`orbits - ${map.get(x).length}`)
        orbits += map.get(x).length
        x = iterator.next().value;
    }

    console.log(orbits);
}

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

//either write a better sort of make a graph
const input = ReadInput(inputPath).split('\n');

const result = FindOrbits(input);