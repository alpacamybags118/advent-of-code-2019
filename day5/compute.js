const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function AddFunction(array, pos) {
    array[array[pos+3]] = array[array[pos + 1]] + array[array[pos + 2]]

    return array
}

function MultiplyFunction(array,pos) {
    array[array[pos+3]] = array[array[pos + 1]] * array[array[pos + 2]]

    return array
}

//const input = ReadInput(inputPath);
const input = ReadInput(inputPath).split(',').map(x => Number(x))
let index = 0;
let noun = 12; //increases final by a significant amount
let verb = 2; //increases final by 1
let iterations = 0;

//do a while unwinding
while(verb < 99) {
    while(noun  < 99)  {
        let array = input.slice();
        array[1] = noun;
        array[2] = verb;
        index = 0;
        let cont = array[index] != 99;

        while(cont) {
            switch(array[index]) {
                case 1:
                    array = AddFunction(array, index);
                    break;
                case 2:
                    array = MultiplyFunction(array, index);
                    break;
                default:
                    cont = false;
                    
            }
            index += 4;

            if(array[index] == 99) {
                cont = false;
            }
        }
        iterations++;
        if(array[0] == 19690720)  {
            console.log("iterations - " + iterations)
            console.log("answer: " + (100 * noun + verb))
        }
        else if(array[0] > 19690720) {
            break
        }

        noun++;
    }
    verb++;
    noun = 12;
}