const mongoose = require('mongoose')

const question_option_schema = mongoose.Schema({
    title:{type:String,required:true},
    question_id:{
        type:mongoose.Types.ObjectId,
        ref:question_option_schema,
        required:true
    },
    order:{type:Number,required:true},
})

module.exports = mongoose.model('question_option',question_option_schema);