const mongoose = require('mongoose')

const province_schema = mongoose.Schema({
    name:{type:String,required:true},
})

module.exports = mongoose.model('province',province_schema);