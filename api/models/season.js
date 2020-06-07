const mongoose = require('mongoose')

const season_schema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    creator:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    images:{type:mongoose.Types.ObjectId,ref:'files'}
})

module.exports = mongoose.model('season',season_schema);