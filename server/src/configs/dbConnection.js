"use strict"


const mongoose = require('mongoose')

const dbConnection = function() {
    
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* ERROR!!!  * not connected ', err))
}


module.exports = {
    mongoose,
    dbConnection
} 