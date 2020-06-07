const mongoose = require('mongoose')

const category_schema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String}
})

module.exports = mongoose.model('category',category_schema);