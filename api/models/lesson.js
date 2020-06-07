const mongoose = require('mongoose')

const lesson_schema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    video:{type:mongoose.Types.ObjectId},
    sound:{type:mongoose.Types.ObjectId},
    link:{type:String,required:true},
    images:[{type:mongoose.Types.ObjectId}],
    reuired_time:{type:Number,required:true}
})

module.exports = mongoose.model('lesson',lesson_schema);