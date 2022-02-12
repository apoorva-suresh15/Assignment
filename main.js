const fs = require('fs');
const yargs = require('yargs')
const yargsInteractive = require("yargs-interactive");

//const filename = process.argv[2];
var flag = 0;
var flag1 = 0;

function writefilelist(a){
    fs.writeFile('fileslist.txt',a.toString().replace(/\r\n/g,'\n'),(err)=>{
        if(err){
            console.log(err);
        }
    });
}
function writefile(f){
    fs.writeFile(f,'You are awesome',(err)=>{
        if(err){
            console.log(err);
        }
    });
}

const options = {
    name: { type: "input", describe: "Enter a Filename" }
};

const options1 = {
    name: { type: "input", describe: "Filename already exists, enter a different filename" }
};


yargsInteractive()
.usage("$0 <command> [args]")
.interactive(options)
.then(result => {
    fs.readFile('fileslist.txt', function(err, data) {
        if(err) throw err;
        const arr = data.toString().replace(/\r\n/g,'\n').split(',');
        for(let i of arr) {
            if(`${result.name}` == i){
                flag = 1;
            }
        }
        if(flag == 0){
            writefile(`${result.name}`);
            arr.push(`${result.name}`);
            writefilelist(arr);
        }
        else{
            yargsInteractive()
            .usage("$0 <command> [args]")
            .interactive(options1)
            .then(result1 => {
                for(let i of arr) {
                    if(`${result1.name}` == i){
                        flag1 = 1;
                    }
                }
                if(flag1 == 0){
                    writefile(`${result1.name}`);
                    arr.push(`${result1.name}`);
                    writefilelist(arr);
                }
                else{
                    console.log('File exsits');
                }
            });
        }
    });
});