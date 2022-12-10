const { apiKey, Adminroles } = require('./config.json');

if(Adminroles.some(value => value.includes("Master"))){
    console.log('True')
}else console.log("false")

console.log(Adminroles)