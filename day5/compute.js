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
        codes = array[index].split(Math.floor(array[index].length / 2));
        switch(codes[1]) {
            case 1: array = AddFunction(array, index, mode); break;
            case 2: array = MultiplyFunction(array, index, mode); break;
            case 3: array = InputFunction(array, index, mode); break;
            case 4: OutputFunction(array, index); break;
            default: cont=false;
        }

        index += array[codes[1].length + codes[2].length];
        if(cont) {
            cont = array[index] != 99;
        }
    }

    return array[0];
}

function AddFunction(array, pos, mode) {
    const num1 = mode[mode.length - 1] == 0 ? Number(array[array[pos + 1]]) : Number(array[pos+1])
    const num2 = mode[mode.length - 2] == 0 ? Number(array[array[pos + 2]]) : Number(array[pos+2])
    mode[mode.length - 3] == 0 ? array[array[pos+3]] = num1 + num2 : array[pos+3] = num1 + num2

    return array
}

function MultiplyFunction(array, pos, mode) {
    const num1 = mode[mode.length - 1] == 0 ? Number(array[array[pos + 1]]) : Number(array[pos+1])
    const num2 = mode[mode.length - 2] == 0 ? Number(array[array[pos + 2]]) : Number(array[pos+2])
    mode[mode.length - 3] == 0 ? array[array[pos+3]] = num1 * num2 : array[pos+3] = num1 * num2

    return array
}

function InputFunction(array, pos, mode) {
    //need to look ahead for input
    input
}

function OutputFunction(array, pos) {return array[pos];}

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