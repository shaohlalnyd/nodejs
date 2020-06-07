const mongoose = require('mongoose')

const question_schema = mongoose.Schema({
    title:{type:String,required:true},
    exam_id:{
         type: mongoose.Types.ObjectId, ref: 'exam' 
    },
    score:{
        type:Number,required:true
    },
    true_answer_id:{
        type:mongoose.Types.ObjectId,ref:'question_option',required:true
    }
})

module.exports = mongoose.model('question',question_schema);