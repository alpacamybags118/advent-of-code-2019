const fs = require('fs');
const inputPath = "./input";

function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function RunCommand(array, index) {
    codes = array[index].split(Math.floor(array[index].length / 2));

    switch(codes[1]) {
        case 1: return AddFunction(array, index, mode); ;
        case 2: return MultiplyFunction(array, index, mode);
        case 3: return InputFunction(array, index, mode);
        case 4: return OutputFunction(array, index);
        default: return null
    }
}

//refactor so i can run compute against a single command - for output function
//strip loop to be outside of this
function Compute(array) {
    let index = 0;
    let cont = array[index] != 99;

    while(cont) {
        command = String(array[index]);
        //console.log(command);
        if(command.length > 1) {
            op = command.substr(command.length - 2, command.length - 1);
            params = command.substr(0, (command.length - 2));
            //console.log(op);
            //console.log(params);
        }
        else {
            switch(command) {
                case '1':
                case '2':
                    op = command
                    params = '000';
                    break;
                case '3':
                case '4':
                    op = command;
                    params = '0';
                    break;
                default:
                    op = command;
                    params =  '';
                    break;
            }
        }
        switch(op) {
            case '1':
            case '01': array = AddFunction(array, index, params); break;
            case '2':
            case '02': array = MultiplyFunction(array, index, params); break;
            case '3': array = InputFunction(array, index); break;
            case '04':
            case '4': OutputFunction(array, index, params); break;
            default: cont=false;
        }

        //console.log(op.length)
        if(op == '1' || op =='01' || op == '2' || op == '02') {
            index += 4
        }
        else {
            index += 2
        }

        //console.log(index);
        if(cont) {
            cont = op != '99'
        }
    }
    //console.log(array[index]);
    return array[0];
}

function AddFunction(array, pos, mode) {
    const num1 = mode[mode.length - 1] == 0 ? Number(array[array[pos + 1]]) : Number(array[pos+1]);
    const num2 = mode[mode.length - 2] == 0 ? Number(array[array[pos + 2]]) : Number(array[pos+2])
    mode[mode.length - 3] == 0 ? array[array[pos+3]] = num1 + num2 : array[pos+3] = num1 + num2

    //console.log(num1, num2);

    return array
}

function MultiplyFunction(array, pos, mode) {
    const num1 = mode[mode.length - 1] == 0 ? Number(array[array[pos + 1]]) : Number(array[pos+1])
    const num2 = mode[mode.length - 2] == 0 ? Number(array[array[pos + 2]]) : Number(array[pos+2])
    mode[mode.length - 3] == 0 ? array[array[pos+3]] = num1 * num2 : array[pos+3] = num1 * num2
    return array
}

//assumed value is 1
function GetInputValue(){return 1};

function InputFunction(array, pos) {array[array[pos + 1]] = GetInputValue(); return array;}

function OutputFunction(array, pos, mode) {
    mode[0] == '0' ? console.log(array[array[pos]]) : console.log(array[pos]);
}

const input = ReadInput(inputPath).split(',').map(x => Number(x))

array = Compute(input);

//console.log(array)

//console.log("Final answer - " + array[0]);