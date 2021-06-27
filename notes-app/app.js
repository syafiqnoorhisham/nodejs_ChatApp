const validator = require('validator')
const get = require('./notes.js')      
const chalk = require('chalk')


const message = get()

console.log(message)
 
console.log(validator.isURL('syafiq.com'))

console.log(chalk.green('Success!'))