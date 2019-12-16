const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function Compute(array, verb, noun) {
    array[1] = noun;
    array[2] = verb;
    let index = 0;
    let cont = array[index] != 99;

    while(cont) {
        switch(array[index]) {
            case 1: array = AddFunction(array, index); break;
            case 2: array = MultiplyFunction(array, index); break;
            default: cont=false;
        }

        index += 4;
        if(cont) {
            cont = array[index] != 99;
        }
    }

    return array[0];
}

function AddFunction(array, pos) {
    array[array[pos+3]] = Number(array[array[pos + 1]]) + Number(array[array[pos + 2]])

    return array
}

function MultiplyFunction(array,pos) {
    array[array[pos+3]] = Number(array[array[pos + 1]]) * Number(array[array[pos + 2]])

    return array
}

const input = ReadInput(inputPath).split(',').map(x => Number(x))
let val = 0
let noun = 12; //increases final by a significant amount
let verb = 2; //increases final by 1
let iterations = 0;
const final = 19690720

while(final > val) {
    val = Compute(input.slice(), verb, ++noun);
    iterations+=1;
}
noun--;
while(final != val) {
    val =  Compute(input.slice(), ++verb, noun);
    iterations+=1;
}

console.log("Total iterations - " + iterations)
console.log("Final answer - " + (100 * noun + verb))