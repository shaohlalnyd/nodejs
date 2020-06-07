const mongoose = require('mongoose')

const exam_schema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    time_left:{type:Number,required:true},
    exam_type:{type: String,
        enum : ['lesson','season'],
    },
    questions_ids:{type:String,required:true}
})

module.exports = mongoose.model('exam',category_schema);