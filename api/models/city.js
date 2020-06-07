const mongoose = require('mongoose')

const city_schema = mongoose.Schema({
    name:{type:String,required:true},
    province_id:{type:mongoose.Types.ObjectId,required:true},
})

module.exports = mongoose.model('city',city_schema);