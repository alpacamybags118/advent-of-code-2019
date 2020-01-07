const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function CalculateOrbits(input, graph) {
    if(!graph.has(input)) {
        return 0;
    }
    else if(graph.get(input) == 'SAN') {
        return 0;
    }
    else {
        return 1 + CalculateOrbits(graph.get(input), graph);
    }
}

function FindOrbits(input) {
    let graph = new Map();
    let you;
    input.forEach(element => {
        let x = element.split(')');
        if(x[1] == 'YOU') {
            you = x[0];
        }
        graph.set(x[1], x[0]);
    })

    console.log(graph);

    const dist = CalculateOrbits(graph.get(you),graph);

    console.log(dist);
}

//either write a better sort of make a graph
const input = ReadInput(inputPath).split('\n');

const result = FindOrbits(input);