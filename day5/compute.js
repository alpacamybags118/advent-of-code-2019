const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

//refactor so i can run compute against a single command - for output function
//strip loop to be outside of this

//proper format of the code
//consider all combinations
//padStart() 
function Compute(array) {
    let index = 0;
    let cont = array[index] != 99;
    while(cont) {
        const command = String(array[index]).padStart(5,0)
        const mode = command.substr(0,3);
        const op = command.substr(3,2);
        let offset = 0;


        console.log(`op - ${op}`)
        console.log(`mode - ${mode}`)

        switch(+op) {
            case 1: array = AddFunction(array, index, mode); offset+=4; break;
            case 2: array = MultiplyFunction(array, index, mode); offset+=4; break;
            case 3: array = InputFunction(array, index, mode); offset+=2; break;
            case 4: OutputFunction(array, index, mode); offset+=2; break;
            case 5: offset+= Jump(array,index,mode,true); break;
            case 6: offset+= Jump(array,index,mode,false); break;
            case 7: array = Equality(array, index, mode, false); offset+=4; break;
            case 8: array = Equality(array, index, mode, true); offset+=4; break;
            default: process.exit(1);break;
        }
        
        index+= offset;
        console.log(`next index: ${index}`)
        if(cont) {
            cont = op != '99'
        }
    }
    
    return array[0];
}

function AddFunction(array, pos, mode) {
    const num1 = mode[mode.length - 1] == 0 ? Number(array[array[pos + 1]]) : Number(array[pos+1]);
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

//assumed value is 1
function GetInputValue(){return 5};

function InputFunction(array, pos) {array[array[pos + 1]] = GetInputValue(); return array;}

function OutputFunction(array, pos, mode) {
   console.log(array.join(','));mode[2] == '0' ? console.log(array[array[pos + 1]]) : console.log(array[pos + 1]);
}

function Jump(array, pos, mode, gt) {
    let index = 0;
    let param1 = mode[2] == '0' ? array[array[pos+1]] : array[pos+1]
    let param2 = mode[1] == '0' ? array[array[pos+2]] : array[pos+2]
    if(gt) {
        index = param1 != 0 ? param2 - pos : 3
    }
    else {
        index = param1 == 0 ? param2 - pos : 3
    }
    return index
}

function Equality(array,pos,mode,equal) {
    let param1 = mode[2] == '0' ? array[array[pos+1]] : array[pos+1]
    let param2 = mode[1] == '0' ? array[array[pos+2]] : array[pos+2]
    if(equal) {
        if(mode[0] == '0') {
            array[array[pos + 3]] = param1 == param2 ? 1 : 0
            console.log(array[array[pos + 3]] )
        }
        else {
            array[pos + 3] = param1 == param2 ? 1 : 0
            console.log(array[pos + 3])
        }
        
    }
    else {
        if(mode[0] == '0') {
            array[array[pos + 3]] = param1 < param2 ? 1 : 0
            console.log(array[array[pos + 3]] )
        }
        else {
            array[pos + 3] = param1 < param2 ? 1 : 0
            console.log(array[pos + 3])
        }
    }
    return array
}

const input = ReadInput(inputPath).split(',').map(x => Number(x))

array = Compute(input);

//console.log("Final answer - " + array[0]);